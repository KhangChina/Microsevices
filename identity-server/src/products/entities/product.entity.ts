import { ProductStatusEnum } from "src/decorators/productStatus.decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    ID: number;

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
