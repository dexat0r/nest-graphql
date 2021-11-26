import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/typeorm/models/order.entity';
import { User } from 'src/database/typeorm/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createOrder = async (options: {
        productsId: number[],
    }, context: any) => {
        const { productsId } = options;

        if (!productsId) throw new Error("Incorrect request");

        const order = new Order();
        
        order.productsId = productsId;
        order.user = context.req.user.userId;

        try {
            await this.orderRepository.save(order);
        } catch(e) {
            console.log(e);
            throw e;
        }

        return {
            status: 201,
            order: order
        }
    }

    getUserOrdersList = async (context: any) => {
        const user = (await this.userRepository.findByIds([context.req.user.userId]))[0];
        if (!user.orders) return []
        return user.orders
    }
}
