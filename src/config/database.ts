export const database = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
};
