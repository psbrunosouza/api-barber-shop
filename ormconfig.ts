import { database } from './src/config/database';

module.exports = {
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.password,
  database: database.name,
  autoLoadEntities: true,
  synchronize: false,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
