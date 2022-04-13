import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: AppService) {}

  handleConnection(client: any, ...args: any[]): any {
    this.appService.handleConnection(client);
  }

  handleDisconnect(client: any): any {
    this.appService.handleDisconnect(client);
  }
}
