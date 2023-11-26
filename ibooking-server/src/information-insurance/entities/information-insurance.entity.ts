import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class InformationInsurance {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    IDInformationExtend: string;

    @Column({ default: "" })
    taxCode: string;

    @Column({ default: "" })
    nameInsurance: string;

    @Column({ default: "" })
    codeInsurance : string;

    @Column({ default: "" })
    locationRegister : string;
   
    @Column({ default: "" })
    expirationDate : string;
   
    @CreateDateColumn()
    create_at: Date
}
