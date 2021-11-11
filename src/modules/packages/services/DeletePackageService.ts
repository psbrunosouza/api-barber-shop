import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';

@injectable()
export class DeletePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(id: number, loggedUser: IUserLogged): Promise<void> {
    const packageExists = await this.packageRepository.findById(id);

    if (!packageExists) throw new AppError("Package Doesn't exists", 404);

    if (packageExists.barberId !== loggedUser.barberId)
      throw new AppError('Not authorized', 400);

    await this.packageRepository.delete(id);
  }
}
