declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_SYNCHRONIZE: string;
    }
  }
}

export {};
