import { Injectable } from '@nestjs/common';
import {OpenAI} from 'langchain/llms/openai'

@Injectable()
export class OpenaiService {
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY
  private model = new OpenAI({
    openAIApiKey: this.OPENAI_API_KEY,
    temperature: .9,
    modelName: 'gpt-4-1106-preview'
  })

  async sendDataToGPT(data: {}[]){
    const message = "You should create new short value for newDescription field in each object using information from fields: ProductName, ProductDescription, CategoryName. You can't remove any fields from objects, instead just add a new valueto newDescription field. Don't write to me anything other than the result of your work"
    const str = `Description: ${message} - Data JSON:${JSON.stringify(data)}`
    const response = await this.model.call(str)
    const splited = response.split('```json\n').join(' ')
    const sliced = splited.slice(0, splited.length - 3)
    const toJSON = JSON.parse(sliced)
    console.log(toJSON)
  }
}
