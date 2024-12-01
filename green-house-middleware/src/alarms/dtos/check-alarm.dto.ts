import { DataDTO } from "src/websocket/DTOs/data.dto"

export class CheckAlarmDTO{
    identifier: string
    section: string
    data: DataDTO

}