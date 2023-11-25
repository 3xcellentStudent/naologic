import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson'
import * as fs from 'fs'
import { configDotenv } from 'dotenv';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { nanoid } from 'nanoid';
import { ProductModel } from 'src/types';
configDotenv()

@Injectable()
export class CsvtojsonService {
  constructor(
    private mongodbService: MongodbService
  ){}

  async readCSVFile(){
    const csvFilePath = process.env.PATH_TO_CSV_FILE
    const chunckSize = 5 * 1024 * 1024
    const readableStream = fs.createReadStream(csvFilePath, {
      highWaterMark: chunckSize,
    })
    const jsonArr = []
    const csvToJson = csv({delimiter: '\t'});

    csvToJson.on('data', async (data) => {
      const object: ProductModel = JSON.parse(data.toString('utf8'))
      object.docId = nanoid(24)
      jsonArr.push(object)
    });
    const response = {status: 100}
    
    await csvToJson.on('done', async () => {
      await this.mongodbService.sendtoDB(jsonArr, 'products', response)
      jsonArr.length = 0
      return response
    }).end(() => response)

    readableStream.pipe(csvToJson)

    return response
  }
}