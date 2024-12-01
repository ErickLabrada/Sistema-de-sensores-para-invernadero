import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Section } from 'src/domain/section.entity';
import { Threshold } from 'src/domain/threshold.entity';
import { CreateSectionDTO } from 'src/dtos/section/create-section.dto';
import { UpdateSectionDTO } from 'src/dtos/section/update-section.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Threshold) private thresholdRepository: Repository<Threshold>,
    ){}

    async createSection(createSection: CreateSectionDTO) {
        try {
            const newThreshold = this.thresholdRepository.create(createSection.threshold);
            const savedThreshold = await this.thresholdRepository.save(newThreshold);
    
            const newSection = this.sectionRepository.create({
                ...createSection,
                threshold: savedThreshold,
            });
    
            return await this.sectionRepository.save(newSection);
        } catch (error) {
            console.error("Error creating section:", error.message);
            throw new Error("Failed to create section");
        }
    }
    

    async getSections(){
        return await this.sectionRepository.find()
    }

    async getSection(id: number){
        return await this.sectionRepository.findOne({
            where:{
                id
            }}
        )
    }
    async updateSection(updateSectionDto: UpdateSectionDTO) {
        const { id, threshold, ...updateData } = updateSectionDto;
    
        try {
            // Find the section with the threshold relation
            const existingSection = await this.sectionRepository.findOne({
                where: { id },
                relations: ['threshold'], // Adjust based on your relations
            });
     
            if (!existingSection) {
                throw new Error(`Section with ID ${id} not found.`);
            }
    
            if (threshold) {
                if (existingSection.threshold) {
                    await this.thresholdRepository.update(existingSection.threshold.id, threshold);
                } else {
                    const newThreshold = this.thresholdRepository.create(threshold);
                    existingSection.threshold = await this.thresholdRepository.save(newThreshold);
                }
            }
    
            Object.assign(existingSection, updateData);
    
             await this.sectionRepository.save(existingSection);
             return await this.sectionRepository.findOne({where:{id},
                relations: ['threshold']})
        } catch (error) {
            console.error("Error updating section:", error.message);
            throw new Error("Unable to update section.");
        }
    }
    

    async deleteSection(id: number) {
        try {
            const section = await this.sectionRepository.findOne({
                where: { id },
                relations: ['threshold'],  // Make sure to load the related threshold
            });
    
            if (!section) {
                throw new Error(`Section with ID ${id} not found.`);
            }
    
            await this.sectionRepository.delete(id);
            await this.thresholdRepository.delete(section.threshold.id)
        } catch (error) {
            console.error("Error deleting section:", error.message);
            throw new Error("Unable to delete section.");
        }
    }
    

}
