import { InjectionBuilder } from 'ts-fixture-builder';
import { CreateProduct } from '../../../../src/sales/domain/salesProduct/commands/createProduct';

export class CreateProductBuilder {
  static get defaultAll(): InjectionBuilder<CreateProduct> {
    return new InjectionBuilder<CreateProduct>({
      name: 'name',
      description: 'description',
      price: 1,
    });
  }
}
