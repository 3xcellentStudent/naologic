import { Injectable } from '@nestjs/common';
import {MongoClient} from 'mongodb'

@Injectable()
export class MongodbService {
  private URI = "mongodb+srv://28102000:28102000@cluster0.1mk1mlw.mongodb.net/?retryWrites=true&w=majority"
  private client = new MongoClient(this.URI)
  private db = this.client.db('naologic-task')

  async connectionToDb(){
    try {
      await this.client.connect()
      console.log('Connected to MongoDB !!!')
    } catch(err){
      console.log('Error: ', err)
    }
  }

  async sendtoDB(data: {}[], collectionName: string, response: {status: number}){
    try {
      data.forEach(async (obj) => {
        const collection = this.db.collection(collectionName)
        await collection.insertOne(obj)
      })
      response.status = 201
    } catch(err){
      console.log(err)
      response.status = 500
    }
    return response
  }

  async getAllFromDb(collectionName: string){
    try {
      const collection = this.db.collection(collectionName)
      const cursor = collection.find().limit(10)
      const documents = await cursor.toArray()
      return documents
    } catch(err){
      console.log(err)      
    }
  }

  async deleteAllFromCollection(collectionName: string){
    const collection = this.db.collection(collectionName)
    return await collection.deleteMany()
    .catch(err => console.log(err))
  }
}