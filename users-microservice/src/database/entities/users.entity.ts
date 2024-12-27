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
import { RoleUser } from '../../shared/enum/role-user.enum';
import { Addresses } from './address.entity';

@Entity({
  name: 'users',
  synchronize: true,
})
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null, length: 100 })
  username: string;

  @Column({ default: null, length: 100 })
  name: string;
  
  @Column({ default: null, length: 100 })
  lastname: string;

  @Column({ nullable: false, length: 155 })
  email: string;

  @Column({ nullable: false, length: 155 })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleUser,
    comment: 'User Role',
    nullable: true,
    default: RoleUser.USER,
  })
  role: RoleUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ******************** Relations ********************
  @OneToMany(() => Addresses, (address) => address.user)
  addresses: Addresses[];

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
