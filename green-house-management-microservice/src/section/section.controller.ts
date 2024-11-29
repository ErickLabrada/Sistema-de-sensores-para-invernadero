import { Controller } from '@nestjs/common';
import { SectionService } from './section.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSectionDTO } from 'src/dtos/section/create-section.dto';
import { UpdateSectionDTO } from 'src/dtos/section/update-section.dto';

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService){}

@MessagePattern("create-section")
async createSection(@Payload() newSection: CreateSectionDTO){
    return this.sectionService.createSection(newSection)
}

@MessagePattern("get-sections")
async getSections(){
    return this.sectionService.getSections()
}

@MessagePattern("get-section")
async getSection(@Payload() id: number){
    return this.sectionService.getSection(id)
}

@MessagePattern("update-section")
async updateSection(@Payload() updateSectionDTO: UpdateSectionDTO){  
    return this.sectionService.updateSection(updateSectionDTO )
}

@MessagePattern("delete-section")
async deleteSection(@Payload() id: number){
    return this.sectionService.deleteSection(id )
}

}
