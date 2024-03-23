import { Injectable } from '@nestjs/common';
import { CreateSpamDto } from './dto/create-spam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Spam } from './entities/spam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpamService {
  constructor(
    @InjectRepository(Spam)
    private spamRepository: Repository<Spam>,
  ) {}

  async markAsSpam(createSpamDto: CreateSpamDto): Promise<Spam> {
    let spam = await this.spamRepository.findOne({
      where: { phoneNumber: createSpamDto.phoneNumber },
    });

    if (spam) {
      spam.spamCount += 1;
      return this.spamRepository.save(spam);
    } else {
      spam = this.spamRepository.create(createSpamDto);
      return this.spamRepository.save(spam);
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Spam> {
    return this.spamRepository.findOne({
      where: { phoneNumber },
    });
  }

  async calculateSpamLikelihood(phoneNumber: string): Promise<number> {
    const spamReportsCount = await this.spamRepository.count({
      where: { phoneNumber: phoneNumber },
    });

    return spamReportsCount > 0 ? spamReportsCount / (1 + spamReportsCount) : 0;
  }
}
