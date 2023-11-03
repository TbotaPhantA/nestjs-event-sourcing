import { z } from 'zod';
import { MAX_INT_32 } from '../../../../shared/constants/maxInt32';

const AdjustPrice = z.object({
  newPrice: z.number().int().min(0).max(MAX_INT_32),
});

export type AdjustPrice = z.infer<typeof AdjustPrice>;
