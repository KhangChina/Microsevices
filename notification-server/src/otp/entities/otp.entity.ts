/**
 * Author : khang.nguyen@htgsoft.com
 * Setup :  12/07/2023
 */
import { OtpTypeEnum } from "src/decorators/otp-type.decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: "opt" })
export class Otp {
    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column({default:""})
    value: string;

    @Column({default:OtpTypeEnum.register})
    type: OtpTypeEnum;

    @Column()
    code: string;

    @Column({default:0})
    count: number;

    @Column({default:false})
    verify: boolean;

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}
