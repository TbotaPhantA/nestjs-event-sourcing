import { IEvent } from '../../../../shared/types/IEvent';
import { NoMethods } from '../../../../shared/types/noMethods';
import { CreateProduct } from '../commands/createProduct';

export interface SalesProductCreatedData {
  productId: string;
  name: string;
  description: string;
  price: number;
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

  static from(command: CreateProduct, productId: string): SalesProductCreated {
    return new SalesProductCreated({
      aggregateId: productId,
      data: {
        productId,
        ...command,
      },
    });
  }
}
