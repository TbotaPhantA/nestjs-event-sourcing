import { InjectionBuilder } from 'ts-fixture-builder';
import { CreateSalesProduct } from '../../../../src/sales/domain/salesProduct/commands/createSalesProduct';

export class CreateProductBuilder {
  static get defaultAll(): InjectionBuilder<CreateSalesProduct> {
    return new InjectionBuilder<CreateSalesProduct>({
      name: 'name',
      description: 'description',
      price: 1,
    });
  }
}
