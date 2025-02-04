import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
   // Local DB

   // Local array mock
   private readonly songs = [];

   create(song) {
      // Save the song in the database
      this.songs.push(song);
      return this.songs;
   }

   findAll() {
      // Fetch the songs from the db

      // Example error to be handled by the middleware
      // throw new Error('Error in db while fetching all songs...');
      return this.songs;
   }

   findById(id: number) {
      return this.songs.filter((x) => x.id == id) ?? null;
   }
}
