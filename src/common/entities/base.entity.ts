import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'created_by', nullable: true })
  createdBy: number; // Changed to number if it's an ID reference

  @Column({ type: 'integer', name: 'updated_by', nullable: true })
  updatedBy: number; // Changed to number if it's an ID reference

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'integer', name: 'deleted_by', nullable: true })
  deletedBy: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
