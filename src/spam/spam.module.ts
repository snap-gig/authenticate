import { Module } from '@nestjs/common';
import { SpamService } from './spam.service';
import { SpamController } from './spam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spam } from './entities/spam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spam])],
  controllers: [SpamController],
  providers: [SpamService],
  exports: [SpamService],
})
export class SpamModule {}
