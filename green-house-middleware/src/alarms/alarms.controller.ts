import { Body, Controller, Post } from '@nestjs/common';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
    constructor(private alarmService: AlarmsService){}
    

}
