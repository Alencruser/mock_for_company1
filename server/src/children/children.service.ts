import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCaresService } from 'src/child-cares/child-cares.service';
import { ChildCareChild } from 'src/child_care_child/entities/child-care-child.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
import { Child } from './entities/child.entity';

@Injectable()
export class ChildrenService {
    constructor(
        @InjectRepository(Child) private childRepository: Repository<Child>,
        @Inject(UsersService) private usersService: UsersService,
        @Inject(ChildCaresService) private childCaresService: ChildCaresService,
        @InjectRepository(ChildCareChild)
        private childCareChildRepository: Repository<ChildCareChild>,
    ) {}
    async create(createChildDto: CreateChildDto, authHeader: string) {
        const actualUser = await this.usersService.findOne(authHeader);

        const childData = await this.childRepository.create({
            ...createChildDto,
            referent: actualUser.email,
        });
        return await this.childRepository.save(childData);
    }

    findAllByChildCareId(childCareId: number) {
        //Bypass typeorm for this request because i dont want to call 2 times the database
        return this.childRepository
            .createQueryBuilder('child')
            .innerJoin(
                ChildCareChild,
                'associative',
                'associative.childId = child.id AND associative.childCareId = :childCareId',
                { childCareId },
            )
            .getMany();
    }

    async addChildTochildCare(childCareId: number, childId: number, authHeader: string) {
        // I have to check if im the dad of the child and if the childCare really exists
        const actualUser = await this.usersService.findOne(authHeader);
        const actualChild = await this.childRepository.findOneBy({ id: childId });
        const actualChildCare = await this.childCaresService.findOne(childCareId);
        if (actualUser?.email !== actualChild?.referent || !actualChildCare?.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const childCareChildData = await this.childCareChildRepository.create({
            childId,
            childCareId,
        });
        return await this.childCareChildRepository.save(childCareChildData);
    }

    async remove(childCareId: number, childId: number, authHeader: string) {
        const actualUser = await this.usersService.findOne(authHeader);
        const actualChild = await this.childRepository.findOneBy({ id: childId });
        const actualChildCare = await this.childCaresService.findOne(childCareId);
        if (actualUser?.email !== actualChild?.referent || !actualChildCare?.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const removeData = await this.childCareChildRepository.delete({ childCareId, childId });
        const remainingChildCareForThisChild = await this.childCareChildRepository.findOneBy({
            childId,
        });
        if (!remainingChildCareForThisChild?.id) {
            return await this.childRepository.delete(childId);
        }
        return removeData;
    }
}
