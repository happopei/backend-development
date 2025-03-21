// Next, let's create a metadata decorator to indicate ABAC requirements
// src/decorators/require-abac.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ABAC_KEY = 'abac';
export const ABAC = (resource: string) => SetMetadata(ABAC_KEY, resource);