import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer : MiddlewareConsumer) {

    // Option #1 - Apply to all routes
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // Option #2 - Apply to only a specific route and method
    // consumer.apply(LoggerMiddleware)
    // .forRoutes({path: 'songs', method: RequestMethod.POST})

    // Option #3 - Apply to the controller
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  }

}
