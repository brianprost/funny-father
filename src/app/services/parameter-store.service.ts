import { Injectable } from '@angular/core';
import { GetParameterCommand } from '@aws-sdk/client-ssm';

@Injectable({
  providedIn: 'root',
})
export class ParameterStoreService {
  // client = new SSMClient({});
  constructor() {}

  async getParameter(parameterName: string): Promise<string> {
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    });
    return await this.client
      .send(command)
      .then((data: any) => data.Parameter.Value);
  }
}
