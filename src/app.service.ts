import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  private readonly websockets: Map<string, any> = new Map();

  constructor(private httpService: HttpService) {
    setInterval(() => {
      this.httpService
        .get(process.env.MINING_STATS_URI)
        .subscribe((response) => {
          const data = response.data;
          for (const socket of this.websockets.values()) {
            socket.emit('data', data);
          }
        });
    }, 1000);
  }

  handleConnection(ws: any) {
    ws.uid = crypto.randomUUID();
    this.websockets.set(ws.uid, ws);
  }

  handleDisconnect(ws: any) {
    this.websockets.delete(ws.uid);
  }
}
