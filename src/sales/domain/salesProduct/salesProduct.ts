import { NoMethods } from '../../../shared/types/noMethods';
import { AdjustPrice } from './commands/adjustPriceSchema';

export class SalesProduct {
  price: number;

  constructor(raw: NoMethods<SalesProduct>) {
    this.price = raw.price;
  }

  adjustPrice(command: AdjustPrice) {
    this.price = command.newPrice;
  }
}
