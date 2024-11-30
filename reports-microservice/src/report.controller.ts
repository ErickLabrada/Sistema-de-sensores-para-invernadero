import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportService } from '../src/report.service'; 

@Controller('reports') 
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()

  async create(@Body() reportData: { report_date: Date; sensor_name: string; greenhouse_name: string }) {
    return this.reportService.create(reportData);
  }

  @Get()
  
  async findAll() {
    return this.reportService.findAll();
  }
}
