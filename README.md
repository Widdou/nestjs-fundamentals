<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

---

# Tutorial

## Custom Dependencies

- class-validator
- class-transformer

### Class Validation

```bash
npm i class-validator class-transformer
```

The first class provides @Decorators to use in the classes to validate the definition of a class.

Such as:

```TypeScript
@IsNotEmpty()
@IsArray()
readonly items : string[];
```

### Auto-validation

We'll start by binding ValidationPipe at the application level, thus **ensuring all endpoints are protected from receiving incorrect data**.

```TypeScript

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

?

### Validation Pipes

(Official Documentation)[https://docs.nestjs.com/techniques/validation]

?

#### Input Parse Pipe

When passing parameters to a route, we use the decorator `@Param(«name», «Pipe»)`
This allow us to automatically validate the input type of the parameter, and Nest will handle the error if it is not provided properly, returning an error as `Bad Request`

```TypeScript
   @Get(':id')
   findOne(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      const song = this.songsService.findOne(id);
      return `find one song on the based on id ${id}\n${JSON.stringify(song)}`;
   }
```

Example error if a string is passed here instead of a number:

```JSON
{
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

It is also possible to define the error message on the pipe validation.
By instatiating the pipe and providing the options with a message:

```TypeScript
@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
```

#### Custom Validation Pipes

How to have your own validation pipes

## Middlewares

#### Logger Middleware

```TypeScript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request ...', new Date.toDataString());
    next();
  }
}
```

#### Error handler Middleware -- Exception Handling

```TypeScript
@
```

It is useful to have a middleware that would catch the unexpected errors within the application, for that:

---

`throw new HttpException()`

## HttpStatus Object Class

HttpStatus.

# Providers

When defining your modules the standard way would be to just declare them in an array, as such:

`songs.module.ts`

```TypeScript
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
   controllers: [SongsController],
   providers: [SongsService],
})
export class SongsModule {}
```

But you also have the capacity to control the behaviour of the providers by specifiying different hooks to override them.

## Class Provider -- useClass()

## Value Providers -- useValue()

Useful for providing mocking data to a module. For example to test initial data to the application:

```TypeScript
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
   ],
})
export class SongsModule {}
```

Here it's the same module, but it's been defined a mocked object that mimics the SongsService (only the `findAll()` for simplicity), making it already return example data

### Non-Class based Providers

If it's necessary to provide a non-class object, it can be done as well with providers.

For example a connection object to a database.

`src/common/constants/connection.ts`:

```TypeScript
export const connection: Connection = {
   CONNECTION_STRING: 'CONNECTION_STRING',
   DB: 'MYSQL',
   DBNAME: 'TEST',
};

export type Connection = {
   CONNECTION_STRING: string;
   DB: string;
   DBNAME: string;
};
```

`src/songs/songs.module.ts`:

```TypeScript
...
@Module({
   controllers: [SongsController],
   providers: [
      SongsService,
      {
         provide: 'CONNECTION',
         useValue: connection,
      },
   ],
})
...
```

Here the `provide` is used to name/label the non-class provider as `"CONNECTION"`, holding the value of the `connection.ts` object.

From this it can be injected into the `song.controller.ts` constructor to be used.

```TypeScript
...
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
...
}
```

Just by using the `@Inject()` decorator it will fetch the provider with that name, thus making it available across the controller.

## Factory Providers -- useFactory()

## Existing Providers -- useExisting()

---

```

```
