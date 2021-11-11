import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth/auth.json';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IBarberRepository } from '../../barbers/repositories/IBarberRepository';

interface IAuthServiceData {
  email: string;
  password: string;
}

interface IAuthServiceResponse {
  token: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthServiceData): Promise<IAuthServiceResponse> {
    const registeredUser = await this.userRepository.findUserByEmail(email);

    if (!registeredUser) {
      throw new AppError("User doesn't exists", 404);
    }

    let barber;

    if (registeredUser.id && registeredUser.profile === 'barber') {
      barber = await this.barberRepository.findOwner(registeredUser.id);
      if (!barber) throw new AppError('Barber was not created', 422);
    }

    if (!(await compare(password || '', registeredUser.password || ''))) {
      throw new AppError(
        "Email or password doesn't match. Check your credentials",
        422,
      );
    }

    const token = jwt.sign(
      {
        user: registeredUser,
        barberId: barber?.id,
      },
      authConfig.secret,
      {
        expiresIn: 86400,
      },
    );

    return { token };
  }
}
