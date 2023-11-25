import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron } from '@nestjs/schedule';
import { CsvtojsonService } from './csvtojson/csvtojson.service';
import { OpenaiService } from './openai/openai.service';
import { MongodbService } from './mongodb/mongodb.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly csvtojsonService: CsvtojsonService,
    private readonly mongodbService: MongodbService,
    private readonly openaiService: OpenaiService,
  ){}

  @Get('mongodb')

  @Cron('0 0 12 * * *')
  async csvToJSONSheduled(){
    console.log('Sheduler activated !!!')
    const message = "You should create new value for newDescription field in each object using information from fields: ProductName, ProductDescription, CategoryName"
    const resCSVToJSONMongoDb = await this.csvtojsonService.readCSVFile()
    const resGetProductsFromMongoDb = await this.mongodbService.getAllFromDb('products')
    const resOpenAI = await this.openaiService.sendDataToGPT(resGetProductsFromMongoDb)
  }
}
