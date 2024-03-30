import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv();

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
};

const dataSource = new DataSource(datasourceOptions);
export default dataSource;
