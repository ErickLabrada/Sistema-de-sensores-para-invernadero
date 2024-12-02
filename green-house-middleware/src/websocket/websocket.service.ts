import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection,OnGatewayDisconnect, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { AlarmsService } from 'src/alarms/alarms.service';
import { DataService } from 'src/data/data.service';
import { throwError } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';
import { GreenHouseDTO } from './DTOs/greenhouse.dto';
import { CheckAlarmDTO } from 'src/alarms/dtos/check-alarm.dto';
import { WsJwtGuard } from 'src/auth/ws-jst/ws-jst.guard';
import { SocketAuthMiddleware } from 'src/auth/websocket.middleware';
import { PersistDataDTO } from 'src/data/dto/persist-data.dto';
import { SendDataDTO } from 'src/alarms/dtos/send-data.dto';
@Injectable()
@WebSocketGateway(80, { cors: { origin: '*' }})
@UseGuards(WsJwtGuard)
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect{
@WebSocketServer()
Server: Server
    constructor(
        private alarmService: AlarmsService,
        private dataService: DataService
    ){}

    afterInit(client: Socket){
        //this is a sort of middleware for socket.io
        client.use(SocketAuthMiddleware()as any);
        Logger.log("AFTER INIT")   
    }

    handleConnection(client: Socket){
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

    @SubscribeMessage("Data")
    getData(@ConnectedSocket() client: Socket, @MessageBody() payload: any){
        console.log(payload)
  
        let data=this.standarizeFormat(payload.payload);
        data=this.standarizeTemperature(data)
        let alarmDTO=new CheckAlarmDTO();
        alarmDTO.data=data.GreenHouse.Sensor.Section.Data
        alarmDTO.identifier=data.GreenHouse.Sensor.Section.Name
        alarmDTO.section=data.GreenHouse.Identifier

        //console.log("AAAAAAAAAAAAAA")
        //console.log(data.GreenHouse.Sensor.Section.Data)
        //console.log(alarmDTO)

        this.alarmService.checkThresholds(alarmDTO);
        let persisDataDto= new PersistDataDTO()
        persisDataDto.identifier=alarmDTO.identifier
        persisDataDto.name=alarmDTO.section
        let sendDataDto = new SendDataDTO()
        sendDataDto.humidity=alarmDTO.data.Humidity
        sendDataDto.temperature=alarmDTO.data.Temperature
        persisDataDto.data=sendDataDto
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(JSON.stringify(persisDataDto))
        this.dataService.persistData(persisDataDto);
    }

    private standarizeFormat(data:string){
        console.log("standarizing")
        console.log(data)
        if(this.isJson(data)){
            return JSON.parse(data);
        }else
        if (this.isXml(data)){
            const parser=new XMLParser();
            return parser.parse(data)
        }else{
            throw Error("Data format not supported yet")
        }
    }

    private standarizeTemperature(data: any) {
        const jsonString = JSON.stringify(data);
        //console.log("Original data:", jsonString);
    
        let trimmedData;
        try {
            const parsedData = JSON.parse(jsonString);
    
            if (parsedData?.GreenHouse?.Sensor?.Section?.Data) {
                trimmedData = parsedData.GreenHouse.Sensor.Section.Data;
            } else {
                console.log('Invalid data structure, missing Data.');
                return data;  
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return data; 
        }
    
        if (trimmedData?.Temperature_Unit === "F") {
            trimmedData.Temperature_Unit = "C";
            trimmedData.Temperature = ((trimmedData.Temperature - 32) * (5 / 9));
            console.log('Converted Temperature:', trimmedData.Temperature);
        } else {
            console.log('Temperature unit is already in Celsius or unknown:', trimmedData.Temperature_Unit);
        }
    
        data.GreenHouse.Sensor.Section.Data = trimmedData;
    
        return data;
    }
    
    

    private isXml(str: string): boolean {
        const parser=new XMLParser();

        try {
            const parsed = parser.parse(str)
            return typeof parsed === 'object' || Array.isArray(parsed);
        } catch (e) {
            return false;
        }    }

    private isJson(string: string): boolean {
        try {
            const parsed = JSON.parse(string);
            console.log(parsed)

            return typeof parsed === 'object' || Array.isArray(parsed);
        } catch (e) {
            return false;
        }
    }
    

}