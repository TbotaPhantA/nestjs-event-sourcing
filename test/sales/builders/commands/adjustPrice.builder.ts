import { InjectionBuilder } from 'ts-fixture-builder';
import { AdjustPrice } from '../../../../src/sales/domain/salesProduct/commands/adjustPrice';

export class AdjustPriceBuilder {
  static get defaultAll(): InjectionBuilder<AdjustPrice> {
    return new InjectionBuilder<AdjustPrice>({
      productId: '01HFA5JFPR63NGH7R4ZMZXN9ZH',
      newPrice: 1,
    });
  }
}
