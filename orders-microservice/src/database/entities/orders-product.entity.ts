// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';

@Entity({
  name: 'orders_products',
  synchronize: true,
})
export class OrdersProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null, length: 100 })
  productId: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.products)
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'order_products_fk',
  })
  order: Orders;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ******************** Functions ********************

  @BeforeInsert()
  insertDates() {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;
  }

  @BeforeUpdate()
  updateDate() {
    const now = new Date();
    this.updated_at = now;
  }
}
