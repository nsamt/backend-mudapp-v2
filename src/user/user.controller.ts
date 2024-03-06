import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/constants/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'all users found' })
  @ApiResponse({ status: 404, description: 'forbidden' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(@Query('limit') limit: string) {
    // console.log('Holiiiii');

    return this.userService.findAll(limit);
  }

  // @Get(':userId')
  // findUser(@Param('userId') userId: string) {
  //   return this.userService.findUser(+userId);
  // }

  @Get(':username')
  @ApiOperation({ summary: 'one user found' })
  @ApiResponse({ status: 200, description: 'user found', type: User })
  findUser(@Param('username') username: string) {
    return this.userService.findUser(username);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'update user' })
  updateUser(@Param('userId') userId: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(userId, user);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'delete user' })
  removeUser(@Param('userId') userId: string) {
    return this.userService.removeUser(userId);
  }
}
