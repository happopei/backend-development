import { SetMetadata } from '@nestjs/common';
import { UserRole } from './constants';

export const ABAC = (...roles: UserRole[]) => SetMetadata('roles', roles);