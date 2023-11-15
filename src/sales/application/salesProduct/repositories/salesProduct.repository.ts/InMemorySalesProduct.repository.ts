import { ISalesProductRepository } from './ISalesProduct.repository';
import { Injectable } from '@nestjs/common';
import { IEvent } from '../../../../../shared/types/IEvent';
import { SalesProduct } from '../../../../domain/salesProduct/salesProduct';
import { ITransaction } from '../../shared/types/ITransaction';
import { SalesProductCreated } from '../../../../domain/salesProduct/events/salesProductCreated';
import { FIRST_EVENT_MUST_BE_THE_CREATE_INSTANCE } from '../../../../../shared/errorMessages';
import { SalesProductEvent } from '../../shared/types/salesProductEvent';

type AggregateId = string;
type EventStream = SalesProductEvent[];

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

  async findOneById(productId: string): Promise<SalesProduct | null> {
    const stream = this.streamStorage.get(productId);

    if (stream && stream.length > 0) {
      applyStreamToInstance(stream);
    }

    return null;

    function applyStreamToInstance(stream: SalesProductEvent[]) {
      const [first, ...rest] = stream;
      assertSalesProductCreatedEvent(first);

      const product = new SalesProduct({
        ...first.data,
        uncommittedEvents: [],
      });

      for (const event of rest) {
        product.addEvent(event);
      }

      return product;
    }

    function assertSalesProductCreatedEvent(
      event: IEvent,
    ): asserts event is SalesProductCreated {
      if (!(event instanceof SalesProductCreated)) {
        throw new Error(FIRST_EVENT_MUST_BE_THE_CREATE_INSTANCE);
      }
    }
  }
}
