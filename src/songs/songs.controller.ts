/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpException,
   HttpStatus,
   Inject,
   Param,
   ParseIntPipe,
   Post,
   Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/middleware/logger/constants/connection';

@Controller('songs')
export class SongsController {
   constructor(
      private readonly songsService: SongsService,
      @Inject('CONNECTION')
      private connection: Connection,
   ) {
      console.log(
         `This is the injected connection string: '${this.connection.CONNECTION_STRING}'`,
      );
   }

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
