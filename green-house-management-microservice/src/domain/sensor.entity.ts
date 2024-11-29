import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { Greenhouse } from "./greenhouse.entity";

@Entity()
export class Sensor{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Section)
    @JoinColumn()
    section: Section

    @ManyToOne(()=>Greenhouse, greenhouse=>greenhouse.sensors)
    greenHouse: Greenhouse

}