import { SectionDTO } from "./section.dto";

export class SensorDTO {
    Section: SectionDTO;
  
    constructor(section: SectionDTO) {
      this.Section = section;
    } 
  }
  