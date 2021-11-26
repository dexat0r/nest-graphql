import { Query, Req, Request } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { User } from 'src/database/typeorm/models/user.entity';
import { AuthService } from './auth.service';


@ObjectType()
class AuthPayload {
    @Field()
    token: string
    @Field()
    user: User
}

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(returns => AuthPayload)
    async signUp(@Args('email') email: string, @Args('pwd') pwd: string): Promise<AuthPayload> {
        return await this.authService.signUp({email: email, pwd: pwd});
    }

    @Mutation(returns => AuthPayload)
    async signIn (@Args('email') email: string, @Args('pwd') pwd: string, @Request() req ): Promise<AuthPayload> {
        console.log(req);
        return await this.authService.signIn({email: email, pwd: pwd});
    }
    
}
