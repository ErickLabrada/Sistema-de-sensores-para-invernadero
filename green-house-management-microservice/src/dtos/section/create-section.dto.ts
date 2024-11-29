import { CreateThresholdDTO } from "../threshold/create-theshold.dto"

export class CreateSectionDTO{
    name: string
    threshold: CreateThresholdDTO
}