import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("Environment is 'development! Good coding!");
    configDotenv({
      path: resolve(__dirname, '../.env.development'),
    });
    break;
  case 'test':
    console.log('Good luck on your tests!');
    configDotenv({
      path: resolve(__dirname, '../.env.test'),
    });
    break;
  case 'prod':
    console.log('Production mode lock and loaded!');
    configDotenv({
      path: resolve(__dirname, '../.env'),
    });
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

export const database = String(process.env.database);

export const port = Number(process.env.port);

export const secret = String(process.env.secret);
