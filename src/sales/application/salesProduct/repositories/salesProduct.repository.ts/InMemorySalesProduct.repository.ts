import { ISalesProductRepository } from './ISalesProduct.repository';
import { Injectable } from '@nestjs/common';
import { IEvent } from '../../../../../shared/types/IEvent';
import { SalesProduct } from '../../../../domain/salesProduct/salesProduct';
import { ITransaction } from '../../shared/types/ITransaction';

type AggregateId = string;
type EventStream = IEvent[];
@Injectable()
export class InMemorySalesProductRepository implements ISalesProductRepository {
  private readonly streamStorage = new Map<AggregateId, EventStream>();

  async save(
    product: SalesProduct,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction: ITransaction,
  ): Promise<SalesProduct> {
    const stream = this.streamStorage.get(product.productId);

    if (stream) {
      const newStream = stream.concat(product.uncommittedEvents);
      this.streamStorage.set(product.productId, newStream);
    }

    this.streamStorage.set(product.productId, product.uncommittedEvents);

    return product;
  }
}
