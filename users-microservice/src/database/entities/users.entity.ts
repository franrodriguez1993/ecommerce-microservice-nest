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
import { RoleUser } from '../../enum/RoleUser.enum';

@Entity({
  name: 'users',
  synchronize: true,
})
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null, length: 100 })
  username: string;

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
