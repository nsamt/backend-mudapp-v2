import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const findUser: User = {
  username: 'Nacho',
  password: '13345',
  email: 'nachitobonito@gmail.com',
  name: 'Nachito',
  lastname: 'Sambade',
  admin: true,
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let mockService = {
      create: jest.fn()
      //(dto) => { 
      // return {
      //   id: Math.random() * (1000 - 1) + 1, 
      //   ...dto,
      // };
    /*}*/
    .mockImplementation((createUserDto: CreateUserDto) => Promise.resolve({...createUserDto, id: 2}))
    ,
    updateUser: jest.fn((id, dto) => {
      return {
        id: id,
        ...dto 
      }
    }),
    findUser: jest.fn()
    .mockImplementation((username: string) => Promise.resolve(findUser.find((user: User) => user.username === username))) 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockService)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should create user', ()  => {
    const createUserDto: CreateUserDto = {
      username: 'Nacho',
      password: '13345',
      email: 'nachitobonito@gmail.com',
      name: 'Nachito',
      lastname: 'Sambade',
      admin: true,
    };
    it('should call userService createuser with the provided createUserDto  ', async () => {
      const createUserSpy = jest.spyOn(service, "create");
      await controller.create(createUserDto);
      expect(createUserSpy).toHaveBeenCalledWith(createUserDto);
    })
    
    
  //   expect(controller.create(createUserDto)).toEqual({ 
  //     id: expect.any(Number),
  //     ...createUserDto,
  // })
})
  // it('should update user', ()=> {
  //   const updateUserDto: UpdateUserDto = {
  //     username: 'Balbino',
  //     password: '139345',
  //     email: 'nachitobonitoclaroquesi@gmail.com',
  //     name: 'Nacha',
  //     lastname: 'Sambade',
  //     admin: true,
  //   }
  //   const userId = 3;

  //   expect(controller.updateUser(userId, updateUserDto)).toEqual(
  //     {
  //       id: userId,
  //       ...updateUserDto
  //     }
  //   );
  //   expect(mockService.updateUser).toHaveBeenCalledWith( 
  //     userId,
  //     updateUserDto,
  //     )
  // });

  describe('should find one user', () => {
    
    it('should return one user acording the introduce user name', async ()=>{
      const userName = "Isiah";
      const findUserSpy = jest.spyOn(service, 'findUser');
      await controller.findUser(userName)
      expect(findUserSpy).toHaveBeenCalledWith(userName)    
    })
    // jest.spyOn(service, 'findUser').mockImplementation(() => {});

    // expect(controller.findUser('username')).toBe(result);
  });

  
});
