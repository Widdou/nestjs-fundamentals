/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {

    @Post()
    create() {
        return 'create a song'
    }

    @Get()
    findAll() {
        return "find all the songs"
    }

    @Get(':id')
    findOne() {
        return `find one song on the based on id`
    }

    @Put(':id')
    update() {
        return 'update song on the based on id';
    }

    @Delete(':id')
    delete() {
        return 'delete song on the based on id';
    }

}
