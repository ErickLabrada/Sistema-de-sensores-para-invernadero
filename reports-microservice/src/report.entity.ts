import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports')  
export class Report {
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()  
  report_date: Date;

  @Column()  
  sensor_name: string;

  @Column()  
  greenhouse_name: string;
}
