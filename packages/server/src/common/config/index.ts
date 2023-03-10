import { AuthConfig, DatabaseConfig } from './interfaces/config';

export const databaseConfig: DatabaseConfig = {
  typeorm: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'architect_admin',
    database: 'architect_hub',
    synchronize: true,
  },
};

export const authConfig: AuthConfig = {
  jwt: {
    token: 'QB5MQx1tskc6uzw2KZ',
  },
};
