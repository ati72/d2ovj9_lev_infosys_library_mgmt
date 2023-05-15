import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './Member';

@Entity()
export class LibraryInventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  mediaType: string;

  @Column({ type: 'date' })
  dateOfAcquisition: Date;

  @Column({ type: 'text' })
  status: string;

  @ManyToOne((type) => Member, (member) => member.rentedItems, { eager: true })
  rentedBy: Member;
}

//ts-node-dev index.ts
