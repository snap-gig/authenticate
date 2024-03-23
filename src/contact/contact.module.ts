import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpamModule } from 'src/spam/spam.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), SpamModule, UserModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
