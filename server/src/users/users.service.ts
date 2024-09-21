import { Injectable } from '@nestjs/common';
import { CreateAndUpdateDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    findOne(username: string) {
        return this.userRepository.findOneBy({ username });
    }

    async createOrUpdate(createAndUpdateDto: CreateAndUpdateDto) {
        // catch le duplicate entry for username
        return await this.userRepository.save(createAndUpdateDto);
    }
}
