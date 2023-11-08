import { InjectionBuilder } from 'ts-fixture-builder';
import { SalesProduct } from '../../../src/sales/domain/salesProduct/salesProduct';

export class SalesProductBuilder {
  static get defaultAll(): InjectionBuilder<SalesProduct> {
    return new InjectionBuilder<SalesProduct>(
      new SalesProduct({
        productId: 'ulid',
        name: 'name',
        description: 'description',
        price: 1,
        uncommittedEvents: [],
      }),
    );
  }
}
