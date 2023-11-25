import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MongodbService} from './mongodb/mongodb.service'

async function bootstrap() {
  const PORT = process.env.PORT || 8080

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(8080, () => {
    console.log(`Server has been started on PORT: ${PORT}...`)
    new MongodbService().connectionToDb()
  })
}
bootstrap();
