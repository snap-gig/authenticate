import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { SpamService } from 'src/spam/spam.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private spamService: SpamService,
    private userService: UserService,
  ) {}

  async findByUserId(userId: number): Promise<Contact[]> {
    return this.contactRepository.find({
      where: { owner: { id: userId } },
    });
  }

  async searchByName(name: string): Promise<any[]> {
    const startsWithResults = await this.contactRepository.find({
      where: { name: Like(`${name}%`) },
      order: { name: 'ASC' },
    });

    const containsResults = await this.contactRepository.find({
      where: {
        name: Like(`%${name}%`),
        id: Not(In(startsWithResults.map((contact) => contact.id))),
      },
      order: { name: 'ASC' },
    });

    const combinedResults = [...startsWithResults, ...containsResults];

    const resultsWithSpamLikelihood = await Promise.all(
      combinedResults.map(async (contact) => {
        const spamLikelihood = await this.spamService.calculateSpamLikelihood(
          contact.phoneNumber,
        );
        return { ...contact, spamLikelihood };
      }),
    );

    return resultsWithSpamLikelihood;
  }

  async searchByPhoneNumber(phoneNumber: string): Promise<any[]> {
    const registeredUser = await this.userService.findByPhoneNumber(
      phoneNumber,
    );

    if (registeredUser) {
      return [registeredUser];
    }

    const contacts = await this.contactRepository.find({
      where: { phoneNumber },
    });

    return contacts;
  }
}
