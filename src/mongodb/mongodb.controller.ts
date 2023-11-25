import { Controller, Get, Query } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
// import {}

@Controller('mongodb')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService){}

  @Get('delete-all')
  async deleteFromDb(@Query('collection') collection: string){
    const response = await this.mongodbService.deleteAllFromCollection(collection)
    console.log(response)
  }
}