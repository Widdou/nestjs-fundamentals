/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {

    constructor(private readonly songsService : SongsService) {}

    @Post()
    create(@Body() createSongDTO : CreateSongDTO) {

        return this.songsService.create(createSongDTO);
    }

    @Get()
    findAll() {
        return this.songsService.findAll();
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
