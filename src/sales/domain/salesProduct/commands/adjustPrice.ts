import { z } from 'zod';
import { MAX_INT_32, ULID_LENGTH } from '../../../../infrastructure/shared/constants';
import { ExtendedSchemaObject } from '../../../../infrastructure/shared/types/extendedSchemaObject';
import { zodToOpenAPI } from 'nestjs-zod';

const AdjustPriceSchema = z.object({
  productId: z.string().length(ULID_LENGTH),
  newPrice: z.number().int().min(0).max(MAX_INT_32),
});

export type AdjustPrice = z.infer<typeof AdjustPriceSchema>;

export const adjustPriceOpenApi: ExtendedSchemaObject =
  zodToOpenAPI(AdjustPriceSchema);
