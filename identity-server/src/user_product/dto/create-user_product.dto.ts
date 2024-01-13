import { Product } from "src/products/entities/product.entity"
import { User } from "src/users/entities/user.entity"

export class CreateUserProductDto {
    public products: Product
    public users: User
}
