import { NoMethods } from '../../../../shared/types/noMethods';
import { AdjustPrice } from '../commands/adjustPriceSchema';
import { IEvent } from '../../../../shared/types/IEvent';

export class PriceAdjusted implements IEvent {
  readonly oldPrice: number;
  readonly amount: number;
  readonly newPrice: number;

  constructor(raw: NoMethods<PriceAdjusted>) {
    this.oldPrice = raw.oldPrice;
    this.amount = raw.amount;
    this.newPrice = raw.newPrice;
  }

  static from(command: AdjustPrice, oldPrice: number): PriceAdjusted {
    const amount = command.newPrice - oldPrice;
    const { newPrice } = command;
    return new PriceAdjusted({ oldPrice, amount, newPrice });
  }
}
