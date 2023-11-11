import { TemplateStatusEnum } from "src/decorators/template-status.decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: "template" })
export class Template {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({default:null})
    productID: string

    @Column({default:null})
    userID: number;

    @Column({default:""})
    name: string;

    @Column('text',{default:""})
    template: string;

    @Column({default: TemplateStatusEnum.active})
    status: TemplateStatusEnum

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}
