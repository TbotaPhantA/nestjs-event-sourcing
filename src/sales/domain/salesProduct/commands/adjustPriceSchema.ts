import { z } from 'zod';
import { MAX_INT_32 } from '../../../../shared/constants/maxInt32';

const AdjustPriceSchema = z.object({
  amount: z.number().int().min(-MAX_INT_32).max(MAX_INT_32),
});

export type AdjustPrice = z.infer<typeof AdjustPriceSchema>;
