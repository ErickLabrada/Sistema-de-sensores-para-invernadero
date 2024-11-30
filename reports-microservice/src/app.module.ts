import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportController } from '../src/report.controller'; 
import { ReportService } from '../src/report.service'; 
import { Report } from '../src/report.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5432,
      username: 'your-username',  
      password: 'your-password',  
      database: 'your-database',  
      entities: [Report], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Report]), 
  ],
  controllers: [AppController, ReportController], 
  providers: [AppService, ReportService], 
})
export class AppModule {}
