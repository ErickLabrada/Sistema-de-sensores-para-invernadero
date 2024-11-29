import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Section } from "./section.entity"

@Entity({name: "threshold"})
export class Threshold {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    minimumTemperature: number

    @Column()
    maximumTemperature: number

    @Column()
    minimumHumidity: number

    @Column()
    maximumHumidity: number



}