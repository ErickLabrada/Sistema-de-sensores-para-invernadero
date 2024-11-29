import { Controller } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateManagerDTO } from 'src/dtos/manager/create-manager.dto';
import { UpdateManagerDto } from 'src/dtos/manager/update-manager.dto';

@Controller('manager')
export class ManagerController {
    constructor(private managerService: ManagerService){}

@MessagePattern("create-manager")
async createThreshold(@Payload() newManager: CreateManagerDTO){
    return this.managerService.createManager(newManager)
}

@MessagePattern("get-managers")
async getManagers(){
    return this.managerService.getManagers()
}

@MessagePattern("get-manager")
async getManager(@Payload() id: number){
    return this.managerService.getManager(id)
}

@MessagePattern("update-manager")
async updateManager(@Payload() updateManagerDTO: UpdateManagerDto){  
    return this.managerService.updateManager(updateManagerDTO )
}

@MessagePattern("delete-manager")
async deleteManager(@Payload() id: number){
    return this.managerService.deleteManager(id )
}
}
