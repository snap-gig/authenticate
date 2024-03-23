import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';
import { SpamService } from './spam.service';
import { CreateSpamDto } from './dto/create-spam.dto';

@ApiTags('spam')
@Controller('spam')
export class SpamController {
  constructor(private readonly spamService: SpamService) {}

  @Post()
  @ApiOperation({ summary: 'Mark a phone number as spam' })
  @ApiBody({ type: CreateSpamDto })
  async markAsSpam(@Body() createSpamDto: CreateSpamDto) {
    return await this.spamService.markAsSpam(createSpamDto);
  }

  @Get(':phoneNumber')
  @ApiOperation({ summary: 'Find spam reports by phone number' })
  @ApiParam({
    name: 'phoneNumber',
    type: String,
    description: 'Phone number to search spam reports for',
  })
  async findSpamByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return await this.spamService.findByPhoneNumber(phoneNumber);
  }
}
