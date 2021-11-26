import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/typeorm/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    signIn = async (options: {
        email: string,
        pwd: string
    }) => {
        const { email, pwd } = options;

        if (!email || !pwd) throw new Error("Not enough data");

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (!user) throw new Error('This user isnt registred');

        const hashCompare = await bcrypt.compare(pwd, user.password);

        if (!hashCompare) throw new Error("Invalid email or password");

        const token = this.jwtService.sign(
            {
                data: {
                    id: user.id,
                    email: user.email
                }
            },
            {
                secret:process.env.SECRET,
                expiresIn: "86400000"
            }

        );

        return {
            token,
            user
        }
    }

    signUp = async (options: {
        email: string,
        pwd: string
    }) => {

        const { email, pwd } = options;

        if (!email || !pwd) throw new Error("Not enough data");

        const passwordHash = await bcrypt.hash(
            pwd,
            Number(process.env.SALT_ROUNDS) || 10
        );

        const user = new User();

        user.email = email;
        user.password = passwordHash;

        let exist = await this.userRepository.find({
            where: {
                email: email
            }
        });

        if (exist.length) throw new Error(`Email ${email} already registred`);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new Error("User wasn't saved");
        }

        const token = this.jwtService.sign(
            {
                data: {
                    id: user.id,
                    email: user.email
                }
            },
            {
                secret:process.env.SECRET,
                expiresIn: "86400000"
            }

        );

        return {
            token,
            user
        }

    }

}
