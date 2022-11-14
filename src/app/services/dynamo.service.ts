import { Injectable } from '@angular/core';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { environment } from 'src/environments/environment';
import IJoke from '../types/IJoke';

@Injectable({
  providedIn: 'root',
})
export class DynamoService {
  client = new DynamoDBClient({
    region: environment.AWS_REGION as string,
    credentials: {
      accessKeyId: environment.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY as string,
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

  async addNewJoke(newJoke: IJoke): Promise<void> {
    const jokeCount: number = await this.getJokeCount();

    const command = new PutItemCommand({
      TableName: 'Jokes',
      Item: {
        JokeId: {
          N: String(jokeCount),
        },
        Setup: {
          S: newJoke.setup,
        },
        Punchline: {
          S: newJoke.punchline,
        },
      },
    });
    await this.client.send(command);
    const updateCommand = new UpdateItemCommand({
      TableName: 'JokeStats',
      Key: {
        id: { S: 'jokeCount' },
      },
      UpdateExpression: 'set jokeCount = :jokeCount',
      ExpressionAttributeValues: {
        // yes, it's stupid that we have to wrap a number in a number in a string
        // but that's how DynamoDB works
        ':jokeCount': { N: String(Number(jokeCount) + 1) },
      },
    });
    await this.client.send(updateCommand);
  }
}
