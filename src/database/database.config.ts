import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const isCompiled = __filename.endsWith('.js');

export const databaseConfig = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isCompiled ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
});
