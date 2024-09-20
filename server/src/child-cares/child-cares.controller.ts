import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChildCaresService } from './child-cares.service';
import { CreateChildCareDto } from './dto/create-child-care.dto';
import { UpdateChildCareDto } from './dto/update-child-care.dto';

@Controller('child-cares')
export class ChildCaresController {
  constructor(private readonly childCaresService: ChildCaresService) {}

  @Post()
  create(@Body() createChildCareDto: CreateChildCareDto) {
    return this.childCaresService.create(createChildCareDto);
  }

  @Get()
  findAll() {
    return this.childCaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childCaresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildCareDto: UpdateChildCareDto) {
    return this.childCaresService.update(+id, updateChildCareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childCaresService.remove(+id);
  }
}
