import { ProductStatusEnum } from "src/decorators/productStatus.decorator";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column({ default: ""})
    name: string;

    @Column({ default: ""})
    note: string;
  
    @Column({default:ProductStatusEnum.active})
    status: ProductStatusEnum

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}
