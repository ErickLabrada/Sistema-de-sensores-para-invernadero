import { Injectable } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection,OnGatewayDisconnect, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { AlarmsService } from 'src/alarms/alarms.service';
import { DataService } from 'src/data/data.service';
import { throwError } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';
import { GreenHouseDTO } from './DTOs/greenhouse.dto';
@Injectable()
@WebSocketGateway()
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect{
@WebSocketServer()
Server: Server
    constructor(
        private alarmService: AlarmsService,
        private dataService: DataService
    ){}

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

    @SubscribeMessage("Data")
    getData(@ConnectedSocket() client: Socket, @MessageBody() payload: string){
        let data=this.standarizeFormat(payload);
        console.log(data);
        data=this.standarizeTemperature(data)

        console.log(JSON.stringify(data))

        this.alarmService.checkThresholds();
        //this.dataService.persist();
    }

    private standarizeFormat(data:string){
        if(this.isJson(data)){
            return JSON.parse(data);
        }
        if (this.isXml(data)){
            const parser=new XMLParser();
            return parser.parse(data)
        }else{
            throw Error("Data format not supported yet")
        }
    }

    private standarizeTemperature(data: any) {
        // Step 1: Convert the input `data` to a JSON string for debugging (optional)
        const jsonString = JSON.stringify(data);
        console.log("Original data:", jsonString);
    
        let trimmedData;
        try {
            // Step 2: Parse the JSON string to work with the object
            const parsedData = JSON.parse(jsonString);
    
            // Step 3: Access the relevant part of the data (GreenHouse > Sensor > Section > Data)
            if (parsedData?.GreenHouse?.Sensor?.Section?.Data) {
                trimmedData = parsedData.GreenHouse.Sensor.Section.Data;
            } else {
                console.log('Invalid data structure, missing Data.');
                return data;  // Return the original data if the structure is invalid
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return data;  // Return the original data in case of error
        }
    
        // Step 4: Perform the temperature conversion if the unit is Fahrenheit
        if (trimmedData?.Temperature_Unit === "F") {
            trimmedData.Temperature_Unit = "C";
            trimmedData.Temperature = ((trimmedData.Temperature - 32) * (5 / 9));
            console.log('Converted Temperature:', trimmedData.Temperature);
        } else {
            console.log('Temperature unit is already in Celsius or unknown:', trimmedData.Temperature_Unit);
        }
    
        // Step 5: Replace the data in the original structure and return the updated data
        data.GreenHouse.Sensor.Section.Data = trimmedData;
    
        // Return the updated data with replaced temperature
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
            return typeof parsed === 'object' || Array.isArray(parsed);
        } catch (e) {
            return false;
        }
    }
    

}