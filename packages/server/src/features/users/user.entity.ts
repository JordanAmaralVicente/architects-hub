import { Gender } from 'src/common/types/gender';
import { UserRole } from 'src/common/types/user-role';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
