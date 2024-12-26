// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ShippingStatus } from '../../enum/shipping-status.enum';

@Entity({
  name: 'shippings',
  synchronize: true,
})
export class Shippings {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 155 })
  name: string;

  @Column({ nullable: false, length: 155 })
  lastname: string;

  @Column({ nullable: false, length: 155 })
  address_street: string;

  @Column()
  address_number: number;

  @Column({ length: 155 })
  city: string;

  @Column({ length: 155 })
  floor: string;

  @Column({ length: 155 })
  apartment: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    comment: 'Shipping Status',
    nullable: true,
    default: ShippingStatus.PENDING,
  })
  status: ShippingStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ******************** Logic relations ********************

  @Column({ nullable: false })
  order_id: number;

  @Column({ nullable: false })
  user_id: number;

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
