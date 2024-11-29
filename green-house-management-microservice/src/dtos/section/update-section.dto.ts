import { UpdateThresholdDTO } from "../threshold/update.threshold.dto"

export class UpdateSectionDTO{
    id?: number
    name?: string
    threshold?: UpdateThresholdDTO
}