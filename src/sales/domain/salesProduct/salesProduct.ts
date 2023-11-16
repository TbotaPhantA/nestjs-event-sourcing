import { NoMethods } from '../../../shared/types/noMethods';
import { AdjustPrice } from './commands/adjustPrice';
import { PriceAdjusted } from './events/priceAdjusted';
import { CreateSalesProduct } from './commands/createSalesProduct';
import { RandomService } from '../../infrastructure/random/random.service';
import { SalesProductCreated } from './events/salesProductCreated';
import { SalesProductEvent } from '../../application/salesProduct/shared/types/salesProductEvent';
import { exhaustiveCheck } from '../../../shared/utils/exhaustiveCheck';
import { CREATE_EVENT_CANNOT_BE_ADDED } from '../../../shared/errorMessages';

interface SalesProductDeps {
  random: RandomService;
}

export class SalesProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  uncommittedEvents: SalesProductEvent[];

  constructor(raw: NoMethods<SalesProduct>) {
    this.productId = raw.productId;
    this.name = raw.name;
    this.description = raw.description;
    this.price = raw.price;
    this.uncommittedEvents = raw.uncommittedEvents;
  }

  static create(
    command: CreateSalesProduct,
    deps: SalesProductDeps,
  ): SalesProduct {
    const productId = deps.random.generateULID();
    const event = SalesProductCreated.from(command, productId, deps);

    return new SalesProduct({
      productId,
      name: command.name,
      description: command.description,
      price: command.price,
      uncommittedEvents: [event],
    });
  }

  adjustPrice(command: AdjustPrice, deps: SalesProductDeps): void {
    const oldPrice = this.price;
    const event = PriceAdjusted.from(this.productId, command, oldPrice, deps);
    this.addEvent(event);
  }

  addEvent(event: SalesProductEvent): void {
    if (event instanceof PriceAdjusted) {
      return this.applyPriceAdjusted(event);
    }

    if (event instanceof SalesProductCreated) {
      throw new Error(CREATE_EVENT_CANNOT_BE_ADDED);
    }

    throw exhaustiveCheck(event);
  }

  private applyPriceAdjusted(event: PriceAdjusted): void {
    this.price = event.data.newPrice;
    this.uncommittedEvents.push(event);
  }
}
