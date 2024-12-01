import { CreateThresholdDTO } from "src/greenhouse-manager/dtos/threshold/create-theshold.dto"
import { DataDTO } from "src/websocket/DTOs/data.dto"
import { SendDataDTO } from "./send-data.dto"

export class SendAlarmDTO{
    identifier: string
    section: string
    data: SendDataDTO
    thresholds: any
    phone: string
    msg: string
}