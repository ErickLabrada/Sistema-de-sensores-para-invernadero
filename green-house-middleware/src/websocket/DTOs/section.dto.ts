import { DataDTO } from "./data.dto";

export class SectionDTO {
    Name: string;
    Data: DataDTO;
  
    constructor(name: string, data: DataDTO) {
      this.Name = name;
      this.Data = data;
    }
  
  }
  