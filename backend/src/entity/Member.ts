import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LibraryInventoryItem } from './LibraryInventoryItem';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'int' })
  phoneNumber: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'int' })
  idCardNumber: number;

  @OneToMany((type) => LibraryInventoryItem, (item) => item.rentedBy)
  rentedItems: LibraryInventoryItem[];
}
