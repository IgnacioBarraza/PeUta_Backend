import { DataSource } from 'typeorm'
import { envConfig } from '../config/env-config'

const { dbHost, dbPort, dbUser, dbPass, dbName, nodeEnv } = envConfig

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost || 'localhost',
  port: dbPort ? parseInt(dbPort, 10) : 5432,
  username: dbUser || 'postgres',
  password: dbPass || 'root',
  database: dbName || 'BackendMapVX',
  synchronize: nodeEnv === 'dev',
  logging: nodeEnv === 'dev',
  entities: ['src/adapters/typeorm/schema/*.ts'],
  migrations: ['src/infrastructure/orm/migrations/*.ts'],
})

export const initDatabase = async () => {
  await AppDataSource.initialize()
}