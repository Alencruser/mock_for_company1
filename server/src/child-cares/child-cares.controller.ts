import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { ChildCaresService } from './child-cares.service';
import { CreateChildCareDto } from './dto/create-child-care.dto';
import { AmIConnectedGuard } from 'src/guards/am-i-the-owner/am-i-connected.guard';

//Removing the base route from controller to match the test specs, but its not good to do that
@Controller()
export class ChildCaresController {
    constructor(private readonly childCaresService: ChildCaresService) {}

    @Get('child-cares')
    findAll() {
        return this.childCaresService.findAll();
    }

    @Get('child-care/:id')
    findOne(@Param('id') id: string) {
        return this.childCaresService.findOne(+id);
    }

    @Post('child-care')
    @UseGuards(AmIConnectedGuard)
    create(@Body() createChildCareDto: CreateChildCareDto, @Headers('x-auth') authHeader: string) {
        return this.childCaresService.create(createChildCareDto, authHeader);
    }

    @Delete('child-care/:id')
    @UseGuards(AmIConnectedGuard)
    remove(@Param('id') id: string, @Headers('x-auth') authHeader: string) {
        return this.childCaresService.remove(+id, authHeader);
    }
}
