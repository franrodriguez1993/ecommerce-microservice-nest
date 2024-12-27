// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { UserActions } from '../../shared/enum/user-actions.enum';


@Entity({
  name: 'log_users',
  synchronize: true,
})
export class LogUsers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null })
  userId: number;

  @Column({
    type: 'enum',
    enum: UserActions,
  })
  action: UserActions;

  @CreateDateColumn()
  created_at: Date;

  // ******************** Functions ********************

  @BeforeInsert()
  insertDates() {
    const now = new Date();
    this.created_at = now;
  }

}
