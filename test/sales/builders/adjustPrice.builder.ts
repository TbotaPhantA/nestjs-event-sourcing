import { InjectionBuilder } from 'ts-fixture-builder';
import { AdjustPrice } from '../../../src/sales/domain/salesProduct/commands/adjustPriceSchema';

export class AdjustPriceBuilder {
  static get defaultAll(): InjectionBuilder<AdjustPrice> {
    return new InjectionBuilder<AdjustPrice>({ newPrice: 1 });
  }
}
