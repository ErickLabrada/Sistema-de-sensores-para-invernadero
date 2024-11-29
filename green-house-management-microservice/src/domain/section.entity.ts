import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Threshold } from "./threshold.entity";

@Entity()
export class Section{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(()=>Threshold)
    @JoinColumn()
    threshold: Threshold

}