/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {

    constructor(private readonly songsService : SongsService) {}

    @Post()
    create() {

        return this.songsService.create('Animals by Martin Garrix');
        // return 'created a song'
    }

    @Get()
    findAll() {
        return this.songsService.findAll();
        // return "find all the songs"
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
