import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';

@Injectable()
export class ChildrenService {
    create(createChildDto: CreateChildDto) {
        return 'This action adds a new child';
    }

    findAll() {
        return `This action returns all children`;
    }

    remove(id: number) {
        return `This action removes a #${id} child`;
    }
}
