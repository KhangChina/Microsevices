import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class User {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ default: null })
    parentID: number;

    @Column()
    password: string;

    @Column({ default: "" })
    user_name: string;

    @Column({ default: "" })
    name: string;

    @Column({ default: "", unique: true })
    email: string;

    @Column({ default: "", unique: true })
    phone_number: string;

    // @Column({ default: UserStatusEnum.active })
    // status: UserStatusEnum;

    @Column({ default: false })
    verified_phone: boolean

    @Column({ default: false })
    verified_email: boolean

    // @Column({ default: RolesEnum.customer })
    // role: RolesEnum

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}
