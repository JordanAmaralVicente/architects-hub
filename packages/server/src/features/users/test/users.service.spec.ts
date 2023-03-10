import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../../../common/types/gender';
import { UserRole } from '../../../common/types/user-role';
import * as bcryptUtils from '../../../utils/bcrypt';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneByOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepositository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest
      .spyOn(bcryptUtils, 'encryptPassword')
      .mockReturnValue(Promise.resolve('password-123'));

    it('should encode a new user password', async () => {
      await service.createUser({
        age: 20,
        email: 'teste@jest.com',
        gender: Gender.MALE,
        name: 'fake name',
        telephone: '+55 31 99090 8080',
        userRole: UserRole.ARCHITECT,
        password: 'fake-password',
      });

      expect(bcryptUtils.encryptPassword).toHaveBeenCalledWith('fake-password');
    });

    it('should create a new user', async () => {
      await service.createUser({
        age: 20,
        email: 'teste@jest.com',
        gender: Gender.MALE,
        name: 'fake name',
        telephone: '+55 31 99090 8080',
        userRole: UserRole.ARCHITECT,
        password: 'fake-password',
      });

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith({
        age: 20,
        email: 'teste@jest.com',
        gender: Gender.MALE,
        name: 'fake name',
        telephone: '+55 31 99090 8080',
        userRole: UserRole.ARCHITECT,
        password: 'password-123',
      });
    });
  });
});
