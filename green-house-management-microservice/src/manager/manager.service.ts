import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Greenhouse } from 'src/domain/greenhouse.entity';
import { Manager } from 'src/domain/manager.entity';
import { CreateManagerDTO } from 'src/dtos/manager/create-manager.dto';
import { UpdateManagerDto } from 'src/dtos/manager/update-manager.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
      @InjectRepository(Manager) private managerRepository: Repository<Manager>,
      @InjectRepository(Greenhouse) private greenhouseRepository: Repository<Greenhouse>
   ){
    }
async createManager(CreateManagerDTO: CreateManagerDTO){
   const newManager = this.managerRepository.create(CreateManagerDTO)
   return await this.managerRepository.save(newManager)
}

async getManagers(){
   return await this.managerRepository.find()
}

async getManager(id: number){
   return await this.managerRepository.findOne({
       where:{
           id
       }}
   )
}

async getManagerByGreenhouse(identifier: string){
   console.log(identifier)

   const greenhouse=await this.greenhouseRepository.findOne({
      where: {identifier: identifier}, relations:["manager"]
  })

  if(!greenhouse){
      throw new Error('Greenhouse not found');
  }
  console.log(greenhouse)
  return greenhouse.manager
}


async updateManager(updateManager: UpdateManagerDto) {
   const { id, ...updateData } = updateManager; 
   await this.managerRepository.update(id, updateData);
   return await this.managerRepository.findOne({
       where:{id}
   })
}

async deleteManager(id: number){
   return await this.managerRepository.delete(id)
}
}
