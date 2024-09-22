import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChildCareDto } from './dto/create-child-care.dto';
import { ChildCare } from './entities/child-care.entity';

@Injectable()
export class ChildCaresService {
    constructor(
        @InjectRepository(ChildCare) private childCarerepository: Repository<ChildCare>,
        @Inject(UsersService) private usersService: UsersService,
    ) {}
    async create(createChildCareDto: CreateChildCareDto, authHeader: string) {
        const actualUser = await this.usersService.findOne(authHeader);

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
        const actualUser = await this.usersService.findOne(authHeader);
        if (myChildCare?.referent === actualUser?.email) {
            return await this.childCarerepository.delete(id);
        }
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}
