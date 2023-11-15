import { SalesProductCreated } from '../../../../domain/salesProduct/events/salesProductCreated';
import { PriceAdjusted } from '../../../../domain/salesProduct/events/priceAdjusted';

export type SalesProductEvent = SalesProductCreated | PriceAdjusted;
