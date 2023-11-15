import { z } from 'zod';
import { MAX_INT_32, ULID_LENGTH } from '../../../../shared/constants';

const AdjustPrice = z.object({
  productId: z.string().length(ULID_LENGTH),
  newPrice: z.number().int().min(0).max(MAX_INT_32),
});

export type AdjustPrice = z.infer<typeof AdjustPrice>;
