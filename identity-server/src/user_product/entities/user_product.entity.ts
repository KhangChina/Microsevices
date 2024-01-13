import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
@Entity({ name: "user-product" })
export class UserProduct {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    products: Product

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    users: User

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}
