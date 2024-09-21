import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CreateAndUpdateDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    find(@Query('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Put()
    createOrUpdate(@Body() createAndUpdateDto: CreateAndUpdateDto) {
        return this.usersService.createOrUpdate(createAndUpdateDto);
    }
}
