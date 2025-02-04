/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpException,
   HttpStatus,
   Param,
   ParseIntPipe,
   Post,
   Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
   constructor(private readonly songsService: SongsService) {}

   @Post()
   create(@Body() createSongDTO: CreateSongDTO) {
      return this.songsService.create(createSongDTO);
   }

   @Get()
   findAll() {
      try {
         return this.songsService.findAll();
      } catch (error) {
         throw new HttpException(
            'Server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: error },
         );
      }
   }

   @Get(':id')
   findById(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      const song = this.songsService.findById(id);
      return `find one song on the based on id ${id}\n${JSON.stringify(song)}`;
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
