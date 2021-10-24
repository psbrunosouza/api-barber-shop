import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../modules/users/typeorm/repositories/user.repository';
import AppError from '../errors/AppError';
import authConfig from '../../config/auth/auth.json';
import { BarbersRepository } from '../../modules/barbers/typeorm/repositories/barber.repository';
class AuthService {
  async authenticate(request: Request, response: Response) {
    const user = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const barberRepository = getCustomRepository(BarbersRepository);

    const registeredUser = await userRepository.findOne({
      where: { email: user.email },
    });

    if (!registeredUser) {
      throw new AppError("User doesn't exists", 404);
    }

    let barber;

    if (registeredUser.profile === 'barber') {
      barber = await barberRepository.findOne({
        where: { userId: registeredUser.id },
      });

      if (!barber) throw new AppError("User doesn't exists", 404);
    }

    if (!(await compare(user.password, registeredUser.password))) {
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

    registeredUser.password = '';

    return response.status(200).json({
      token,
      user: {
        id: registeredUser.id,
        name: registeredUser.name,
        profile: registeredUser.profile,
        email: registeredUser.email,
        barberId: barber?.id,
      },
    });
  }
}

export default new AuthService();
