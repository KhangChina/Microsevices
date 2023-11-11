import { UserStatusEnum } from "src/decorators/userStatus.decorator";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    ID: number;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]
    
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
