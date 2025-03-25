// Next, let's create a metadata decorator to indicate ABAC requirements

import { SetMetadata } from '@nestjs/common';

export const ABAC_KEY = 'abac';
export const ABAC = (resource: string) => SetMetadata(ABAC_KEY, resource);