import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/database/typeorm/models/order.entity';
import { User } from 'src/database/typeorm/models/user.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User]), JwtModule.register({secret: process.env.SECRET})],
  providers: [OrdersResolver, OrdersService, AuthService]
})
export class OrdersModule {}
