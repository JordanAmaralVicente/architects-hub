import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from '../../../common/types/gender';
import { UserRole } from '../../../common/types/user-role';
import { User } from '../user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            listArchitects: () => [
              { id: 'fake-id', userRole: UserRole.ARCHITECT },
            ],
            createUser: (user: Partial<User>) => user,
            findAll: () => [],
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should test index', async () => {
    const result = usersController.index();

    expect(result).toStrictEqual([]);
  });

  it('should test listArchitects', async () => {
    const result = usersController.listArchitects();

    expect(result).toStrictEqual([
      { id: 'fake-id', userRole: UserRole.ARCHITECT },
    ]);
  });

  it('should test create user', async () => {
    const result = await usersController.createUser({
      userRole: UserRole.ARCHITECT,
      age: 20,
      email: 'fake@email.com',
      gender: Gender.MALE,
      name: 'fake name',
      password: 'fake-password',
      telephone: '123',
    });

    expect(result).toStrictEqual({
      userRole: UserRole.ARCHITECT,
      age: 20,
      email: 'fake@email.com',
      gender: Gender.MALE,
      name: 'fake name',
      password: 'fake-password',
      telephone: '123',
    });
  });
});
