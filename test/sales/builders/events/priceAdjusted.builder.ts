import { InjectionBuilder } from 'ts-fixture-builder';
import {
  PriceAdjusted,
  PriceAdjustedData,
} from '../../../../src/sales/domain/salesProduct/events/priceAdjusted';

export class PriceAdjustedDataBuilder {
  static get defaultOnlyRequired(): InjectionBuilder<PriceAdjustedData> {
    return new InjectionBuilder<PriceAdjustedData>({
      oldPrice: 0,
      amount: 1,
      newPrice: 1,
    });
  }
}

export class PriceAdjustedBuilder {
  static get defaultOnlyRequired(): InjectionBuilder<PriceAdjusted> {
    return new InjectionBuilder<PriceAdjusted>(
      new PriceAdjusted({
        id: 'ulid',
        aggregateId: 'ulid',
        data: PriceAdjustedDataBuilder.defaultOnlyRequired.result,
      }),
    );
  }
}
