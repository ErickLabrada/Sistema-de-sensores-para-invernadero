import { Injectable } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection,OnGatewayDisconnect, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
@Injectable()
@WebSocketGateway()
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect{
@WebSocketServer()
Server: Server

    handleConnection(client: any){
        console.log("Client connected:",client.id);
    }
    handleDisconnect(client: any){
        console.log("Client disconnected:",client.id);
    }
    sendMessage(client: any,message: string){
        client.emit("Message:", message)
    }
    @SubscribeMessage("message")
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: string){
        console.log(payload)
    }
}