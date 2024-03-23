import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'Find contacts by user ID' })
  @ApiBearerAuth()
  async findByUserId(@Param('userId') userId: string) {
    return this.contactService.findByUserId(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  @ApiOperation({ summary: 'Search contacts by name or phone number' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to search for',
  })
  @ApiQuery({
    name: 'phoneNumber',
    required: false,
    description: 'Phone number to search for',
  })
  @ApiBearerAuth()
  async search(
    @Query('name') name?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ) {
    if (name) {
      return this.contactService.searchByName(name);
    } else if (phoneNumber) {
      return this.contactService.searchByPhoneNumber(phoneNumber);
    } else {
      return [];
    }
  }
}
