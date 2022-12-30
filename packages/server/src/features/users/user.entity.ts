import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../../common/types/gender';
import { UserRole } from '../../common/types/user-role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({
    type: 'tinyint',
  })
  age: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  userRole: UserRole;
}
