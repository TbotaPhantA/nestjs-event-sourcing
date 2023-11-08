import { InjectionBuilder } from 'ts-fixture-builder';
import {
  SalesProductCreated,
  SalesProductCreatedData,
} from '../../../../src/sales/domain/salesProduct/events/salesProductCreated';

export class SalesProductCreatedDataBuilder {
  static get defaultOnlyRequired(): InjectionBuilder<SalesProductCreatedData> {
    return new InjectionBuilder<SalesProductCreatedData>({
      name: 'name',
      description: 'description',
      price: 1,
      productId: 'productId',
    });
  }
}

export class SalesProductCreatedBuilder {
  static get defaultOnlyRequired(): InjectionBuilder<SalesProductCreated> {
    return new InjectionBuilder<SalesProductCreated>(
      new SalesProductCreated({
        aggregateId: 'id',
        data: SalesProductCreatedDataBuilder.defaultOnlyRequired.result,
      }),
    );
  }
}
