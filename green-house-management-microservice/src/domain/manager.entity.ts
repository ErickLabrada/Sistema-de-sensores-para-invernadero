import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Greenhouse } from "./greenhouse.entity";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @Column()
    phone: String

    @OneToMany(()=>Greenhouse, greenhouse=>greenhouse.manager)
    greenhouses: Greenhouse[]

}