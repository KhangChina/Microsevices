/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 12/07/2023
 */


import { SetMetadata } from '@nestjs/common';

export enum TemplateStatusEnum {
    active = 'active',
    deactivate='deactivate',
    deleted = 'deleted'
}
export const Roles = (...templateStatus: TemplateStatusEnum[]) => SetMetadata('templateStatus', templateStatus);
