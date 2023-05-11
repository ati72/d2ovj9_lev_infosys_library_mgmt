import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'number' })
  phoneNumber: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'number' })
  idCardNumber: number;
}
