import { Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {  IsNotEmpty} from 'class-validator';

@Entity('establecimientos')
@Unique(['establecimiento'])
export class Establecimiento {
    @PrimaryGeneratedColumn()
    id_establecimiento: number;


    @Column({
        type: 'text',
        unique: true,
        nullable: false,
      })
    @IsNotEmpty()
    establecimiento: string;

    @Column({
        type: 'text',
        nullable: false,
      })
      @IsNotEmpty()
    provincia: string;

    @Column({
        type: 'text',
        nullable: false,
      })
      @IsNotEmpty()
    distrito: string;

    @Column({
        type: 'text',
        nullable: false,
      })
      @IsNotEmpty()
    tipo_atencion: string;

    @Column({
        type: 'text',
        nullable: false,
      })
      @IsNotEmpty()
    eod: string;

    @Column({
        type: 'text',
        nullable: false,
      })
      @IsNotEmpty()
    tipologia: string;

}




