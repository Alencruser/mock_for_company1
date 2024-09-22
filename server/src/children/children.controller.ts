import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { AmIConnectedGuard } from 'src/guards/am-i-the-owner/am-i-connected.guard';

@Controller()
export class ChildrenController {
    constructor(private readonly childrenService: ChildrenService) {}

    @Get('/child-care/:childCareId/children')
    findAll(@Param('childCareId') childCareId: string) {
        return this.childrenService.findAllByChildCareId(+childCareId);
    }

    @Post('child')
    @UseGuards(AmIConnectedGuard)
    create(@Body() createChildDto: CreateChildDto, @Headers('x-auth') authHeader: string) {
        return this.childrenService.create(createChildDto, authHeader);
    }

    @Post('child-care/:childCareId/child/:childId')
    @UseGuards(AmIConnectedGuard)
    addChildToChildCare(
        @Param('childCareId') childCareId: string,
        @Param('childId') childId: string,
        @Headers('x-auth') authHeader: string,
    ) {
        return this.childrenService.addChildTochildCare(+childCareId, +childId, authHeader);
    }

    @Delete('/child-care/:childCareId/child/:childId')
    @UseGuards(AmIConnectedGuard)
    remove(
        @Param('childCareId') childCareId: string,
        @Param('childId') childId: string,
        @Headers('x-auth') authHeader: string,
    ) {
        return this.childrenService.remove(+childCareId, +childId, authHeader);
    }
}
