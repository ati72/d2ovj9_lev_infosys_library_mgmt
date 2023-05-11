import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { LibraryInventoryItem } from './entity/LibraryInventoryItem';
import { Member } from './entity/Member';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'd2ovj9_infosys_library_mgmt',
  synchronize: true,
  logging: true,
  entities: [LibraryInventoryItem, Member],
  migrations: [],
  subscribers: [],
});
