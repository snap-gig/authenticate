import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateSpamDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber(null, { message: 'Phone number must be a valid phone number' })
  phoneNumber: string;
}
