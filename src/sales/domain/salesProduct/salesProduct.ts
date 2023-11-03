import { NoMethods } from '../../../shared/types/noMethods';
import { AdjustPrice } from './commands/adjustPrice';
import { IEvent } from '../../../shared/types/IEvent';
import { PriceAdjusted } from './events/priceAdjusted';

export class SalesProduct {
  productId: number;
  price: number;
  uncommittedEvents: IEvent[] = [];

  constructor(raw: NoMethods<SalesProduct>) {
    this.productId = raw.productId;
    this.price = raw.price;
  }

  adjustPrice(command: AdjustPrice) {
    const oldPrice = this.price;
    this.price = command.newPrice;
    this.uncommittedEvents.push(PriceAdjusted.from(command, oldPrice));
  }
}
