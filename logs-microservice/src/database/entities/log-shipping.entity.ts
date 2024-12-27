// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ShippingStatus } from '../../shared/enum/shipping-status.enum';

@Entity({
  name: 'log_shippings',
  synchronize: true,
})
export class LogShippings {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null })
  shippingId: number;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
  })
  status: ShippingStatus;

  @CreateDateColumn()
  created_at: Date;

  // ******************** Functions ********************

  @BeforeInsert()
  insertDates() {
    const now = new Date();
    this.created_at = now;
  }

}