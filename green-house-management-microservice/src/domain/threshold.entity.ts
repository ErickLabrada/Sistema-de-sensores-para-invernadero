import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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