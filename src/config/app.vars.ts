import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const DB_HOST = configService.getOrThrow<string>('DB_HOST');
export const DB_USERNAME = configService.getOrThrow<string>('DB_USERNAME');
export const DB_PASSWORD = configService.getOrThrow<string>('DB_PASSWORD');
export const DB_NAME = configService.getOrThrow<string>('DB_NAME');
export const DB_PORT = configService.getOrThrow<number>('DB_PORT');
