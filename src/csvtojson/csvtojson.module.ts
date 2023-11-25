import { Module } from '@nestjs/common';
import { CsvtojsonService } from './csvtojson.service';
import { MongodbController } from 'src/mongodb/mongodb.controller';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Module({
  controllers: [MongodbController],
  providers: [CsvtojsonService, MongodbService],
})
export class CsvtojsonModule {}