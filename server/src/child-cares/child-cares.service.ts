import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChildCareDto } from './dto/create-child-care.dto';
import { UpdateChildCareDto } from './dto/update-child-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCare } from './entities/child-care.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChildCaresService {
    constructor(
        @InjectRepository(ChildCare) private childCarerepository: Repository<ChildCare>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
    async create(createChildCareDto: CreateChildCareDto, authHeader: string) {
        const actualUser = await this.userRepository.findOneBy({ username: authHeader });

        const childCareData = await this.childCarerepository.create({
            ...createChildCareDto,
            referent: actualUser.email,
        });

        return await this.childCarerepository.save(childCareData);
    }

    findAll() {
        return this.childCarerepository.findBy({});
    }

    findOne(id: number) {
        return this.childCarerepository.findOneBy({ id });
    }

    async remove(id: number, authHeader: string) {
        const myChildCare = await this.childCarerepository.findOneBy({ id });
        const actualUser = await this.userRepository.findOneBy({ username: authHeader });
        if (myChildCare?.referent === actualUser?.email) {
            return await this.childCarerepository.delete(id);
        }
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}
