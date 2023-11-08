import { UserStatusEnum } from "src/decorators/userStatus.decorator";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class User {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ default: ""})
    productID: number;

    @Column({ default: ""})
    password: string;

    @Column({ default: "" })
    username: string;

    @Column({ default: "" })
    full_name: string;

    @Column({ default: "", unique: true })
    email: string;

    @Column({ default: "", unique: true })
    phone: string;

    @Column({ default: false })
    verified_phone: boolean

    @Column({ default: false })
    verified_email: boolean

    @Column({default:UserStatusEnum.active})
    status: UserStatusEnum

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}
