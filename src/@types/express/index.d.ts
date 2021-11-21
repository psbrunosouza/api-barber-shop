import ITokenDTO from '@shared/dtos/ITokenDTO';

declare global {
  namespace Express {
    interface Request {
      userId: number;
      barberId: number;
      name: string;
    }
  }
}
