import { NoMethods } from '../../../../shared/types/noMethods';
import { SalesProduct } from '../../../domain/salesProduct/salesProduct';

export class CreateSalesProductOutputDto {
  productId: string;
  name: string;
  description: string;
  price: number;

  constructor(raw: NoMethods<CreateSalesProductOutputDto>) {
    this.productId = raw.productId;
    this.name = raw.name;
    this.description = raw.description;
    this.price = raw.price;
  }

  static from(product: SalesProduct): CreateSalesProductOutputDto {
    return new CreateSalesProductOutputDto(product);
  }
}
