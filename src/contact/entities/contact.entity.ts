import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'phone_number', length: 15 })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.contacts)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: User;
}
