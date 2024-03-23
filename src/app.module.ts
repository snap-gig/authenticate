import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { SpamModule } from './spam/spam.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Contact } from './contact/entities/contact.entity';
import { Spam } from './spam/entities/spam.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gagansoni',
      password: 'roots',
      database: 'authenticate',
      entities: [User, Contact, Spam],
      synchronize: true,
    }),
    UserModule,
    ContactModule,
    SpamModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
