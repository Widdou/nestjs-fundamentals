import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {

    // Local DB

    // Local array mock
    private readonly songs = []

    create(song) {
        // Save the song in the database
        this.songs.push(song);
        return this.songs;
    }

    findAll() {
        // Fetch the songs from the db
        return this.songs;
    }

    
 
}
