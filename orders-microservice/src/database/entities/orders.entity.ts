// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { OrdersProduct } from './orders-product.entity';

@Entity({
  name: 'orders',
  synchronize: true,
})
export class Orders {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null })
  userId: number;

  @Column({ nullable: false })
  total: number;

  @OneToMany(() => OrdersProduct, (orderProduct) => orderProduct.order)
  products: OrdersProduct[];

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
