module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  migrations: ['./src/shared/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/database/migrations',
  },
};
