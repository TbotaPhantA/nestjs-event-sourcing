import { NoMethods } from '../../../../shared/types/noMethods';
import { AdjustPrice } from '../commands/adjustPrice';
import { IEvent } from '../../../../shared/types/IEvent';

interface PriceAdjustedData {
  readonly oldPrice: number;
  readonly amount: number;
  readonly newPrice: number;
}

export class PriceAdjusted implements IEvent<PriceAdjustedData> {
  readonly aggregateId: string;
  readonly data: PriceAdjustedData;
  readonly version?: number;

  constructor(raw: NoMethods<PriceAdjusted>) {
    this.aggregateId = raw.aggregateId;
    this.data = raw.data;
    if (raw.version) this.version = raw.version;
  }

  static from(
    aggregateId: string,
    command: AdjustPrice,
    oldPrice: number,
  ): PriceAdjusted {
    const amount = command.newPrice - oldPrice;
    const { newPrice } = command;
    const data = { oldPrice, amount, newPrice };
    return new PriceAdjusted({ aggregateId, data });
  }
}
