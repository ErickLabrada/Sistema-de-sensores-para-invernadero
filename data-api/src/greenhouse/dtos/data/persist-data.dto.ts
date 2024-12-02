import { CreateDataDTO } from "./create-data.dto"

export class PersistDataDto{
    identifier: string
    name: string
    data: CreateDataDTO
}