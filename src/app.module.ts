import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './account/account.module';

@Global()
@Module({
  imports: [
    MulterModule.register({dest: '/uploads'}),
    AccountModule, 
  ],
})
export class AppModule {}