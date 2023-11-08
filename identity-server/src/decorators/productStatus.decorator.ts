import { SetMetadata } from '@nestjs/common';

export enum ProductStatusEnum {
    active = 'active',
    deactivate='deactivate',
    deleted = 'deleted'
}
export const ProductStatus = (...productStatus: ProductStatusEnum[]) => SetMetadata('productStatus', ProductStatus);