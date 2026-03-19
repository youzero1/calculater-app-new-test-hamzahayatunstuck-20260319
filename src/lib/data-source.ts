import { DataSource } from 'typeorm';
import { Calculation } from '@/entities/Calculation';
import path from 'path';

const databasePath = process.env.DATABASE_URL || './database.sqlite';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: false,
  logging: false,
  entities: [Calculation],
  migrations: [path.join(__dirname, '../migrations/*')],
  subscribers: [],
});

// Initialize the data source
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database initialized');
      // Run migrations automatically
      await AppDataSource.runMigrations();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};