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
import { Users } from './users.entity';

@Entity({
  name: 'addresses',
  synchronize: true,
})
export class Addresses {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 155 })
  city: string;

  @Column({ length: 155 })
  street_name: string;

  @Column({ default: 0 })
  street_number: number;

  @Column({ length: 155 })
  floor: string;

  @Column({ length: 155 })
  apartment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ******************** Relations ********************

  @ManyToOne(() => Users, (user) => user.addresses)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'user_address_fk',
  })
  user: Users;

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
