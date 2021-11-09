import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../infra/typeorm/entities/Barber';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { UserRepository } from '../../users/infra/typeorm/repositories/UserRepository';
import { IUserLogged } from '../../../shared/infra/typeorm/entities/userLogged.model';
import { inject, injectable } from 'tsyringe';
import { IBarberDTO } from '../dtos/IBarberDTO';
import { IBarberRepository } from '../repositories/IBarberRepository';
import { IUserRepository } from '../../users/repositories/IUserRepository';

@injectable()
export default class UpdateBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(
    barber: Barber,
    userLogged: IUserLogged,
  ): Promise<IBarberDTO> {
    const userLoggedExists = await this.userRepository.findUserByEmail(
      userLogged.email || '',
    );

    const userOwnerExists = await this.barberRepository.findOwner(
      barber.userId,
    );

    if (!userLoggedExists) {
      throw new AppError('Nothing here, come back later', 404);
    }

    if (!userOwnerExists) {
      throw new AppError('Nothing here, come back later', 404);
    }

    if (userLoggedExists.id !== userOwnerExists.userId) {
      throw new AppError('User access unauthorized', 404);
    }

    return await this.barberRepository.save(barber);
  }
}
