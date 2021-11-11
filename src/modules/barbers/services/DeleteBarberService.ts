import AppError from '../../../shared/errors/AppError';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { inject, injectable } from "tsyringe";
import { IBarberRepository } from '../repositories/IBarberRepository';
import { UserRepository } from "../../users/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../users/repositories/IUserRepository";

@injectable()
export default class DeleteBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository
  ) {}

  public async execute(id: number, loggedUser: IUserLogged): Promise<void> {
    const barberExists = await this.barberRepository.findBarberById(id);
    const loggedUserExists = await this.userRepository.findUserByEmail(
      loggedUser.email || '',
    );

    if (!loggedUserExists) throw new AppError('User not authorized', 404);

    if (!barberExists) throw new AppError('Nothing here, come back later', 404);

    if (barberExists.userId !== loggedUserExists.id)
      throw new AppError('User not authorized', 404);

    await this.barberRepository.delete(id);
  }
}
