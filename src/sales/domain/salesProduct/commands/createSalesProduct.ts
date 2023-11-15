import { z } from 'zod';
import {
  MIN_PRODUCT_NAME_LENGTH,
  MAX_PRODUCT_NAME_LENGTH,
  MAX_INT_32,
  MAX_PRODUCT_DESCRIPTION_LENGTH,
} from '../../../../shared/constants';
import { ExtendedSchemaObject } from '../../../../shared/types/extendedSchemaObject';
import { zodToOpenAPI } from 'nestjs-zod';

export const CreateSalesProductSchema = z.object({
  name: z.string().min(MIN_PRODUCT_NAME_LENGTH).max(MAX_PRODUCT_NAME_LENGTH),
  description: z.string().max(MAX_PRODUCT_DESCRIPTION_LENGTH),
  price: z.number().min(0).max(MAX_INT_32),
});

export type CreateSalesProduct = z.infer<typeof CreateSalesProductSchema>;

export const createSalesProductOpenApi: ExtendedSchemaObject = zodToOpenAPI(
  CreateSalesProductSchema,
);
