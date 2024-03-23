import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('spam')
export class Spam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone_number', length: 15, unique: true })
  phoneNumber: string;

  @Column({ name: 'spam_count', default: 1 })
  spamCount: number;
}
