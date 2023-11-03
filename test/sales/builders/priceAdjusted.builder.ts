import { InjectionBuilder } from 'ts-fixture-builder';
import { PriceAdjusted } from '../../../src/sales/domain/salesProduct/events/priceAdjusted';

export class PriceAdjustedBuilder {
  static get defaultAll(): InjectionBuilder<PriceAdjusted> {
    return new InjectionBuilder<PriceAdjusted>(
      new PriceAdjusted({ amount: 1 }),
    );
  }
}
