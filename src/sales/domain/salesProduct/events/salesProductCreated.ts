import { IEvent } from '../../../../infrastructure/shared/types/IEvent';
import { NoMethods } from '../../../../infrastructure/shared/types/noMethods';
import { CreateSalesProduct } from '../commands/createSalesProduct';
import { RandomService } from '../../../infrastructure/random/random.service';

type FromDeps = { random: RandomService };

export interface SalesProductCreatedData {
  readonly productId: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

export class SalesProductCreated implements IEvent<SalesProductCreatedData> {
  readonly id: string;
  readonly aggregateId: string;
  readonly data: SalesProductCreatedData;
  readonly version?: number;

  constructor(raw: NoMethods<SalesProductCreated>) {
    this.id = raw.id;
    this.aggregateId = raw.aggregateId;
    this.data = raw.data;
    if (raw.version) this.version = raw.version;
  }

  static from(
    command: CreateSalesProduct,
    productId: string,
    deps: FromDeps,
  ): SalesProductCreated {
    const id = deps.random.generateULID();

    return new SalesProductCreated({
      id,
      aggregateId: productId,
      data: {
        productId,
        ...command,
      },
    });
  }
}
