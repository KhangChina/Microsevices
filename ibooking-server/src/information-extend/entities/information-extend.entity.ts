import { Column, CreateDateColumn ,Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "information-extend" })
export class InformationExtend {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column({ default: "", unique: true })
    IDPatient: string;

    @Column({ default: "" })
    phone: string;

    @Column({ default: "" })
    email: string;

    @Column({ default: "" })
    note: string;

    @CreateDateColumn()
    create_at: Date
}
