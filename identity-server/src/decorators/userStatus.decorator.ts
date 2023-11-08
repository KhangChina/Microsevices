import { SetMetadata } from '@nestjs/common';

export enum UserStatusEnum {
    active = 'active',
    deactivate='deactivate',
    deleted = 'deleted'
}
export const UserStatus = (...userStatus: UserStatusEnum[]) => SetMetadata('userStatus', UserStatus);