// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { OrderAction } from '../../modules/order-log/enum/order-action.enum';

@Entity({
  name: 'log_orders',
  synchronize: true,
})
export class LogOrders {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null })
  userId: number;

  @Column({ default: null })
  orderId: number;

  @Column({
    type: 'enum',
    enum: OrderAction,
  })
  action: OrderAction;

  @CreateDateColumn()
  created_at: Date;

  // ******************** Functions ********************

  @BeforeInsert()
  insertDates() {
    const now = new Date();
    this.created_at = now;
  }

}
