export interface DatabaseConfig {
  typeorm: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
  };
}

export interface AuthConfig {
  jwt: {
    token: string;
  };
}
