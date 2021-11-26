import { UseGuards } from '@nestjs/common';
import { Args, Context, Field, Int, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Order } from 'src/database/typeorm/models/order.entity';
import { OrdersService } from './orders.service';

@ObjectType()
class CreateOrderResponse {
    @Field()
    status: number
    @Field()
    order: Order
}


@Resolver()
export class OrdersResolver {

    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Query(() => [Order])
    async getUsersOrders (@Context() context): Promise<Order[] | []> {
        return await this.ordersService.getUserOrdersList(context);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => CreateOrderResponse)
    async createOrder(@Args({ name:'productsId', type: () =>[Int]} ) productsId: Array<number>, @Context() context): Promise<CreateOrderResponse> {
        return await this.ordersService.createOrder({ productsId }, context)
    }
}
