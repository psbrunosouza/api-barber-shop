import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../modules/users/typeorm/repositories/user.repository';
import AppError from '../errors/AppError';
import authConfig from '../../config/auth/auth.json';
class AuthService {
  async authenticate(request: Request, response: Response) {
    const userToAuthenticated = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const registeredUser = await userRepository.findOne({
      where: { email: userToAuthenticated.email },
    });

    if (!registeredUser) {
      throw new AppError("User doesn't exists", 404);
    }

    if (
      !(await compare(userToAuthenticated.password, registeredUser.password))
    ) {
      throw new AppError(
        "Email or password doesn't match. Check your credentials",
        422,
      );
    }

    const token = jwt.sign(
      {
        user: registeredUser,
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
      },
    });
  }
}

export default new AuthService();
