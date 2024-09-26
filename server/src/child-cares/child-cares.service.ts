import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { DataSource, Repository } from 'typeorm';
import { CreateChildCareDto } from './dto/create-child-care.dto';
import { ChildCare } from './entities/child-care.entity';

@Injectable()
export class ChildCaresService {
    constructor(
        @InjectRepository(ChildCare) private childCarerepository: Repository<ChildCare>,
        @InjectDataSource() private dataSource: DataSource,
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
            await this.childCarerepository.delete(id);
            await this.dataSource.query(`DELETE from child_care_child WHERE child_care_id = ${id}`);
            return await this.dataSource.query(
                `DELETE FROM child WHERE NOT EXISTS ( SELECT 1 FROM child_care_child where child.id = child_care_child.child_id )`,
            );
        }
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}
