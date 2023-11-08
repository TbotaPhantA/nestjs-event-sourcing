import { NoMethods } from '../../../shared/types/noMethods';
import { AdjustPrice } from './commands/adjustPrice';
import { IEvent } from '../../../shared/types/IEvent';
import { PriceAdjusted } from './events/priceAdjusted';
import { CreateProduct } from './commands/createProduct';
import { RandomService } from '../../infrastructure/random/random.service';
import { SalesProductCreated } from './events/salesProductCreated';

interface CreateDeps {
  random: RandomService;
}

export class SalesProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  uncommittedEvents: IEvent[];

  constructor(raw: NoMethods<SalesProduct>) {
    this.productId = raw.productId;
    this.name = raw.name;
    this.description = raw.description;
    this.price = raw.price;
    this.uncommittedEvents = raw.uncommittedEvents;
  }

  static create(command: CreateProduct, deps: CreateDeps): SalesProduct {
    const productId = deps.random.generateULID();
    const event = SalesProductCreated.from(command, productId);

    return new SalesProduct({
      productId,
      name: command.name,
      description: command.description,
      price: command.price,
      uncommittedEvents: [event],
    });
  }

  adjustPrice(command: AdjustPrice): void {
    const oldPrice = this.price;
    const event = PriceAdjusted.from(this.productId, command, oldPrice);
    this.price = command.newPrice;
    this.uncommittedEvents.push(event);
  }
}
