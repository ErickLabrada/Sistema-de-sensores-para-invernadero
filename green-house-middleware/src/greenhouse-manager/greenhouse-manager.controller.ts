import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GreenhouseManagerService } from './greenhouse-manager.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateThresholdDTO } from './dtos/threshold/create-theshold.dto';
import { UpdateThresholdDTO } from './dtos/threshold/update.threshold.dto';
import { CreateSectionDTO } from './dtos/section/create-section.dto';
import { UpdateSectionDTO } from './dtos/section/update-section.dto';
import { CreateManagerDTO } from './dtos/manager/create-manager.dto';
import { UpdateManagerDto } from './dtos/manager/update-manager.dto';
import { CreateSensorDTO } from './dtos/sensor/create-sensor.dto';
import { UpdateSensorDTO } from './dtos/sensor/update-sensor.dto';
import { CreateGreenhouseDTO } from './dtos/greenhouse/create-greenhouse.dto';
import { UpdateGreenhouseDTO } from './dtos/greenhouse/update-greenhouse.dto';
import { GetThresholdsDTO } from './dtos/threshold/get-threshold.dto';

@Controller('greenhouse-manager')
export class GreenhouseManagerController {


    constructor(private greenhouseManagerService: GreenhouseManagerService){

       
    }

    @Post("/threshold")
    async createThreshold(@Body() newThreshold: CreateThresholdDTO) {
        return await this.greenhouseManagerService.createThreshold(newThreshold); 
    }

    @Get("/threshold/:id")
    async getThreshold(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.getTheshold(id)
    }

    @Get("/threshold")
    async getThresholds(){
        return await this.greenhouseManagerService.getThresholds()
    }
    
    @Get("/threshold-by-greenhouse-and-section")
    async getThresholdByGreenHouseAndSection(@Body() getThresholdsDTO: GetThresholdsDTO) {
        return await this.greenhouseManagerService.getThesholdByGreenhouseAndSection(
            getThresholdsDTO.identifier,
            getThresholdsDTO.section
        );
    }
    


    @Patch("/threshold/:id")
    async updateThresholds(@Param("id",ParseIntPipe)id: number,@Body() updateThreshold: UpdateThresholdDTO){
        return await this.greenhouseManagerService.updateThreshold(id,updateThreshold)
    }

    @Delete("/threshold/:id")
    async deleteThreshold(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.deleteThreshold(id)
    }


    @Post("/section")
    async createSection(@Body() newSection: CreateSectionDTO) {
        return await this.greenhouseManagerService.createSection(newSection);
    }

    @Get("/section/:id")
    async getSection(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.getSection(id)
    }

    @Get("/section")
    async getSections(){
        return await this.greenhouseManagerService.getSections()
    }

    @Patch("/section/:id")
    async updateSections(@Param("id",ParseIntPipe)id: number,@Body() updateSection: UpdateSectionDTO){
        return await this.greenhouseManagerService.updateSection(id,updateSection)
    }

    @Delete("/section/:id")
    async deleteSection(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.deleteSection(id)
    }

    

    @Post("/manager")
    async createManager(@Body() newManager: CreateManagerDTO) {
        return await this.greenhouseManagerService.createManager(newManager);
    }

    @Get("/manager/:id")
    async getManager(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.getManager(id)
    }

    @Get("/manager")
    async getManagers(){
        return await this.greenhouseManagerService.getManagers()
    }

    @Patch("/manager/:id")
    async updateManager(@Param("id",ParseIntPipe)id: number,@Body() updateManager: UpdateManagerDto){
        return await this.greenhouseManagerService.updateManager(id,updateManager)
    }

    @Delete("/manager/:id")
    async deleteManager(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.deleteManager(id)
    }


    @Post("/sensor")
    async createSensor(@Body() newSensor: CreateSensorDTO) {
        return await this.greenhouseManagerService.createSensor(newSensor);
    }

    @Get("/sensor/:id")
    async getSensor(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.getSensor(id)
    }

    @Get("/sensor")
    async getSensors(){
        return await this.greenhouseManagerService.getSensors()
    }

    @Patch("/sensor/:id")
    async updateSensors(@Param("id",ParseIntPipe)id: number,@Body() updateSensor: UpdateSensorDTO){
        return await this.greenhouseManagerService.updateSensor(id,updateSensor)
    }

    @Delete("/sensor/:id")
    async deleteSensor(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.deleteSensor(id)
    }

    @Post("/greenhouse")
    async createGreenhouse(@Body() newGreenhouse: CreateGreenhouseDTO) {
        return await this.greenhouseManagerService.createGreenhouse(newGreenhouse);
    }

    @Get("/greenhouse/:id")
    async getGreenhouse(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.getGreenhouse(id)
    }

    @Get("/greenhouse")
    async getGreenhouses(){
        return await this.greenhouseManagerService.getGreenhouses()
    }

    @Patch("/greenhouse/:id")
    async updateGreenhouse(@Param("id",ParseIntPipe)id: number,@Body() updateGreenhouseDTO: UpdateGreenhouseDTO){
        return await this.greenhouseManagerService.updateGreenhouse(id,updateGreenhouseDTO)
    }

    @Delete("/greenhouse/:id")
    async deleteGreenhouse(@Param("id",ParseIntPipe)id: number){
        return await this.greenhouseManagerService.deleteGreenhouse(id)
    }
}
