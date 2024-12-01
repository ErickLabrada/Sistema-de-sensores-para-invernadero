import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sensor } from "./sensor.entity";
import { Manager } from "./manager.entity";

@Entity()
export class Greenhouse{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    identifier: string

    @OneToMany(()=>Sensor, sensor=>sensor.greenHouse)
    sensors: Sensor[]

    @ManyToOne(()=>Manager, manager=>manager.greenhouses)
    manager: Manager

}