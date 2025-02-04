import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/middleware/logger/constants/connection';

const mockSongService = {
   findAll() {
      return [
         {
            id: 0,
            title: 'Example song',
            artists: ['Artist #1', 'Artist #2'],
            releaseDate: '2014-10-21',
            duration: '12:57',
         },
      ];
   },
};

@Module({
   controllers: [SongsController],
   providers: [
      SongsService,
      {
         provide: SongsService,
         useValue: mockSongService,
      },
      {
         provide: 'CONNECTION',
         useValue: connection,
      },
   ],
})
export class SongsModule {}
