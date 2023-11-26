import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "information-enterprise" })
export class InformationEnterprise {

    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    IDInformationExtend: string;

    @Column({ default: "" })
    taxCode: string;

    @Column({ default: "" })
    nameEnterprise: string;

    @Column({ default: "" })
    location: string;

    @Column('simple-json',{ nullable: true })
    locationMapping: any

    @CreateDateColumn()
    create_at: Date
    
}
