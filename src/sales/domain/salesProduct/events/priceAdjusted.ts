import { NoMethods } from '../../../../infrastructure/shared/types/noMethods';
import { AdjustPrice } from '../commands/adjustPrice';
import { IEvent } from '../../../../infrastructure/shared/types/IEvent';
import { RandomService } from '../../../infrastructure/random/random.service';

type FromDeps = { random: RandomService };

export interface PriceAdjustedData {
  readonly oldPrice: number;
  readonly amount: number;
  readonly newPrice: number;
}

export class PriceAdjusted implements IEvent<PriceAdjustedData> {
  readonly id: string;
  readonly aggregateId: string;
  readonly data: PriceAdjustedData;
  readonly version?: number;

  constructor(raw: NoMethods<PriceAdjusted>) {
    this.id = raw.id;
    this.aggregateId = raw.aggregateId;
    this.data = raw.data;
    if (raw.version) this.version = raw.version;
  }

  static from(
    aggregateId: string,
    command: AdjustPrice,
    oldPrice: number,
    deps: FromDeps,
  ): PriceAdjusted {
    const amount = command.newPrice - oldPrice;
    const { newPrice } = command;
    const data = { oldPrice, amount, newPrice };
    const id = deps.random.generateULID();
    return new PriceAdjusted({ id, aggregateId, data });
  }
}
