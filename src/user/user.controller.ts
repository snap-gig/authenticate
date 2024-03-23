import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'The user data to create a new account',
    examples: {
      aNewUser: {
        summary: 'A new user example',
        value: {
          name: 'John Doe',
          phoneNumber: '+1234567890',
          email: 'johndoe@example.com',
          password: 'password123',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
}
