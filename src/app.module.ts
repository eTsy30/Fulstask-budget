import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiggyBankModule } from './piggy-bank/piggy-bank.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    AuthModule,
    TransactionModule,
    PiggyBankModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // port: configService.get('DB_PORT'),
        // username: 'postgres',
        // password: 'postgres',
        // database: 'budget',
        // host: 'localhost',

        url: configService.get('POSTGRES_URL'), // Используйте POSTGRES_URL здесь
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        ssl: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
