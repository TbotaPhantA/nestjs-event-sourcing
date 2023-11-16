import { IEvent } from '../../../../shared/types/IEvent';
import { NoMethods } from '../../../../shared/types/noMethods';
import { CreateSalesProduct } from '../commands/createSalesProduct';

export interface SalesProductCreatedData {
  readonly productId: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

export class SalesProductCreated implements IEvent<SalesProductCreatedData> {
  readonly aggregateId: string;
  readonly data: SalesProductCreatedData;
  readonly version?: number;

  constructor(raw: NoMethods<SalesProductCreated>) {
    this.aggregateId = raw.aggregateId;
    this.data = raw.data;
    if (raw.version) this.version = raw.version;
  }

  static from(
    command: CreateSalesProduct,
    productId: string,
  ): SalesProductCreated {
    return new SalesProductCreated({
      aggregateId: productId,
      data: {
        productId,
        ...command,
      },
    });
  }
}
