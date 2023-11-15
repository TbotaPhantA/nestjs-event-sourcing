import { NoMethods } from '../../../../shared/types/noMethods';
import { SalesProduct } from '../../../domain/salesProduct/salesProduct';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalesProductOutputDto {
  @ApiProperty({ example: '01HFA5JFPR63NGH7R4ZMZXN9ZH' })
  productId: string;

  @ApiProperty({ example: 'Phone' })
  name: string;

  @ApiProperty({ example: 'An android phone' })
  description: string;

  @ApiProperty({ example: 500 })
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
