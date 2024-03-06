import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
// Cambiar todos los src de las rutas por puntos y barras ../- para que los test pasen.
const mockUsers: User[] = [
  {
    id: 1,
    username: 'Nacho',
    password: '13345',
    email: 'nachitobonito@gmail.com',
    name: 'Nachito',
    lastname: 'Sambade',
    admin: true,
     async hashPassword(): Promise<void>{
      try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(this.password, salt);
        this.password = hashedPassword;
        console.log(hashedPassword);
      } catch (error) {
        throw new Error('Encripting password failed');
      }
    },
    tickets: []
  },
];

describe('UserService', () => {
  let service: UserService;
  const mockRepositoryUser = {
    save: jest.fn().mockImplementation((createUserDTO: CreateUserDto) => {
      return Promise.resolve({
        id: 1,
        tickets: [],
        ...createUserDTO,
      });
    }),
    // find: jest.fn().mockImplementation(() => mockUsers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositoryUser,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('method create', () => {

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create one user', async () => {
      const createUserDto = {
        username: 'Nacho',
        password: '13345',
        email: 'nachitobonito@gmail.com',
        name: 'Nachito',
        lastname: 'Sambade',
        admin: true,
      };
      const result = await service.create(createUserDto);
          // Expect the essential properties to match
    expect(result.username).toBe(createUserDto.username);
    expect(result.email).toBe(createUserDto.email);
    expect(result.name).toBe(createUserDto.name);
    expect(result.lastname).toBe(createUserDto.lastname);
    expect(result.admin).toBe(createUserDto.admin);

    // Ensure that the password is hashed and not equal to the plain password
    expect(result.password).not.toBe(createUserDto.password);
    });

    it('should find a user by username', async () => {
      const username = 'user1';
      const foundUser = await service.findUser(username);

      expect(foundUser).toBeDefined();
      expect(foundUser?.username).toEqual(username);
    });
  });
});
