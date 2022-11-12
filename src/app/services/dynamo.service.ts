import { Injectable } from '@angular/core';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { environment } from 'src/environments/environment';
import IJoke from '../types/IJoke';

@Injectable({
  providedIn: 'root',
})
export class DynamoService {

  client = new DynamoDBClient({
    region: environment.AWS_REGION,
    credentials: {
      accessKeyId: environment.AWS_ACCESS_KEY_ID,
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor() {}

  async getJokeCount(): Promise<number> {
    const command = new GetItemCommand({
      TableName: 'JokeStats',
      Key: {
        id: { S: 'jokeCount' },
      },
    });
    // return just the number of jokes
    return await this.client
      .send(command)
      .then((data: any) => data.Item.jokeCount.N);
  }

  async getRandomJoke(): Promise<IJoke> {
    const jokeCount: number = await this.getJokeCount();
    const command = new GetItemCommand({
      TableName: 'Jokes',
      Key: {
        JokeId: {
          N: String(Math.floor(Math.random() * jokeCount)),
        },
      },
    });
    return this.client.send(command).then((data: any) => {
      return {
        id: data.Item.JokeId.N,
        setup: data.Item.Setup.S,
        punchline: data.Item.Punchline.S,
      };
    });
  }
}
