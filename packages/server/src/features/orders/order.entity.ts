import { OrderStatus } from 'src/common/types/order-status';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('orders')
export class Order {
  @BeforeInsert()
  setCreatedAtDate(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  @BeforeInsert()
  setUpdatedAtDate(): void {
    this.updatedAt = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.SOLICITED,
  })
  status: OrderStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_fk' })
  client: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'architect_fk' })
  architect?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
