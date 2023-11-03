import { NoMethods } from '../../../../shared/types/noMethods';
import { AdjustPrice } from '../commands/adjustPriceSchema';
import { IEvent } from '../../../../shared/types/IEvent';

export class PriceAdjusted implements IEvent {
  readonly amount: number;

  constructor(raw: NoMethods<PriceAdjusted>) {
    this.amount = raw.amount;
  }

  static fromCommand(command: AdjustPrice): PriceAdjusted {
    const amount = command.amount;
    return new PriceAdjusted({ amount });
  }
}
