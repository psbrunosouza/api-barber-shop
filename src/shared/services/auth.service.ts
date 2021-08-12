import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@shared/database/repositories/user.repository';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth/auth.json';
import AppError from '@shared/errors/AppError';
class AuthService {
  async authenticate(request: Request, response: Response) {
    const userToAutheticate = request.body;
    const userRepository = getCustomRepository(UserRepository);

    const registeredUser = await userRepository.findOne({
      where: { email: userToAutheticate.email },
    });

    if (!registeredUser) {
      throw new AppError("User doesn't exists", 404);
    }

    if (!(await compare(userToAutheticate.password, registeredUser.password))) {
      throw new AppError(
        "Email or password doesn't match. Check your credentials",
        422,
      );
    }

    const token = jwt.sign({ id: registeredUser.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    registeredUser.password = '';

    return response.status(200).json({
      token,
    });
  }
}

export default new AuthService();
