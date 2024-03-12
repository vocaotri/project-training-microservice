import { ConnectionOptions } from 'typeorm';

// Define your database configurations here
const databaseConfigs: Record<string, ConnectionOptions> = {
  users: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [__dirname + '/../module1/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  module2: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [__dirname + '/../module2/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  // Add more configurations as needed
};

export function getTypeOrmConfig(moduleName: string): ConnectionOptions {
  const config = databaseConfigs[moduleName];

  if (!config) {
    throw new Error(`No TypeORM configuration found for module: ${moduleName}`);
  }

  return config;
}
