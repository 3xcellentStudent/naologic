import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ScheduleModule} from '@nestjs/schedule'
import { CsvtojsonService } from './csvtojson/csvtojson.service';
import { CsvtojsonModule } from './csvtojson/csvtojson.module';
import { MongodbService } from './mongodb/mongodb.service';
import { MongodbController } from './mongodb/mongodb.controller';
import { MongodbModule } from './mongodb/mongodb.module';
import { OpenaiModule } from './openai/openai.module';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [ScheduleModule.forRoot(), CsvtojsonModule, MongodbModule, OpenaiModule],
  controllers: [AppController, MongodbController],
  providers: [AppService, CsvtojsonService, MongodbService, OpenaiService],
})
export class AppModule {}