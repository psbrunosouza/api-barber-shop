import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { auth } from '../../../config/auth';
import { IUserRepository } from '../repositories/IUserRepository';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '../../barbers/repositories/IBarberRepository';

interface IAuthServiceDTO {
  email: string;
  password: string;
}

interface IPayloadDTO {
  userId: number;
  barberId?: number;
  name: string;
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
  }: IAuthServiceDTO): Promise<IAuthServiceResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError(
        "Email or password doesn't match. Check your credentials",
        422,
      );
    }

    if (!(await compare(password, user.password))) {
      throw new AppError(
        "Email or password doesn't match. Check your credentials",
        422,
      );
    }

    const barberExists = await this.barberRepository.findOwner(Number(user.id));

    if (user.profile === 'barber' && !barberExists) {
      throw new AppError('User needs to create a Barber Shop', 401);
    }

    const payload: IPayloadDTO = {
      userId: user.id,
      barberId: barberExists?.id,
      name: user.name,
    } as IPayloadDTO;

    const token = jwt.sign(payload, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    return { token };
  }
}
