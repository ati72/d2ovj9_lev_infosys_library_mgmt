import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
