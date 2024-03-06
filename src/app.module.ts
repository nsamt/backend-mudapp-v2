import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ProviderModule } from './provider/provider.module';
import { Provider } from './provider/entities/provider.entity';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/entities/ticket.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mudapp-mudapp.a.aivencloud.com',
      port: 22116,
      username: 'avnadmin',
      password: 'AVNS_hrKqpPiiy920OvJoLs_',
      database: 'mudapp',
      entities: [User, Provider, Ticket],
      synchronize: false,
    }),
    UserModule,
    ProviderModule,
    TicketModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
