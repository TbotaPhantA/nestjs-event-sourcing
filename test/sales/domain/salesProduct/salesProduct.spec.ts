import { AdjustPriceBuilder } from '../../builders/commands/adjustPrice.builder';
import { SalesProductBuilder } from '../../builders/salesProduct.builder';
import {
  PriceAdjustedBuilder,
  PriceAdjustedDataBuilder,
} from '../../builders/events/priceAdjusted.builder';
import { CreateProductBuilder } from '../../builders/commands/createProduct.builder';
import { SalesProduct } from '../../../../src/sales/domain/salesProduct/salesProduct';
import {
  SalesProductCreatedBuilder,
  SalesProductCreatedDataBuilder,
} from '../../builders/events/salesProductCreated.builder';
import { createFakeRandomService } from '../../fakes/createFakeRandomService';

describe('SalesProduct', () => {
  // TODO: updateProductInfo
  describe('createProduct', () => {
    const productId1 = 'ulid';

    const testCases = [
      {
        toString: () => '1 - should create proper product',
        command: CreateProductBuilder.defaultAll.with({
          name: 'iPhone',
          price: 999,
          description: 'A phone designed by Apple.',
        }).result,
        productId: productId1,
        expectedProduct: SalesProductBuilder.defaultAll.with({
          productId: productId1,
          name: 'iPhone',
          price: 999,
          description: 'A phone designed by Apple.',
          uncommittedEvents: [
            SalesProductCreatedBuilder.defaultOnlyRequired.with({
              aggregateId: productId1,
              data: SalesProductCreatedDataBuilder.defaultOnlyRequired.with({
                productId: productId1,
                name: 'iPhone',
                description: 'A phone designed by Apple.',
                price: 999,
              }).result,
            }).result,
          ],
        }).result,
      },
    ];

    test.each(testCases)('%s', ({ command, productId, expectedProduct }) => {
      const random = createFakeRandomService();
      random.generateULID = jest.fn().mockReturnValue(productId);
      const product = SalesProduct.create(command, { random });
      expect(product).toStrictEqual(expectedProduct);
    });
  });

  describe('adjustPrice', () => {
    const priceTestCases = [
      {
        toString: () => '1 - should properly change the price',
        product: SalesProductBuilder.defaultAll.with({ price: 3 }).result,
        command: AdjustPriceBuilder.defaultAll.with({ newPrice: 5 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 5,
          uncommittedEvents: [
            PriceAdjustedBuilder.defaultOnlyRequired.with({
              data: PriceAdjustedDataBuilder.defaultOnlyRequired.with({
                oldPrice: 3,
                amount: 2,
                newPrice: 5,
              }).result,
            }).result,
          ],
        }).result,
      },
      {
        toString: () => '2 - should properly change the price',
        product: SalesProductBuilder.defaultAll.with({ price: 4 }).result,
        command: AdjustPriceBuilder.defaultAll.with({ newPrice: 1 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 1,
          uncommittedEvents: [
            PriceAdjustedBuilder.defaultOnlyRequired.with({
              data: PriceAdjustedDataBuilder.defaultOnlyRequired.with({
                oldPrice: 4,
                amount: -3,
                newPrice: 1,
              }).result,
            }).result,
          ],
        }).result,
      },
    ];

    test.each(priceTestCases)(
      '%s',
      ({ command, product, expectedNewProduct }) => {
        const id = 'ulid';
        const random = createFakeRandomService();
        random.generateULID = jest.fn().mockReturnValue(id);
        product.adjustPrice(command, { random });
        expect(product).toStrictEqual(expectedNewProduct);
      },
    );
  });
});
