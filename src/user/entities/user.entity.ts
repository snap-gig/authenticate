import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'phone_number', length: 15, unique: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Contact, (contact) => contact.owner)
  contacts: Contact[];
}
