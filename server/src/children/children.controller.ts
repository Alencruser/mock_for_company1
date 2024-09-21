import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { AmIConnectedGuard } from 'src/guards/am-i-the-owner/am-i-connected.guard';

@Controller()
export class ChildrenController {
    constructor(private readonly childrenService: ChildrenService) {}

    @Get('/child-care/:childCareId/children')
    findAll() {
        return this.childrenService.findAll();
    }

    @Post('child')
    @UseGuards(AmIConnectedGuard)
    create(@Body() createChildDto: CreateChildDto) {
        return this.childrenService.create(createChildDto);
    }

    @Delete('/child-care/:childCareId/child/:childId')
    @UseGuards(AmIConnectedGuard)
    remove(@Param('id') id: string) {
        return this.childrenService.remove(+id);
    }
}
