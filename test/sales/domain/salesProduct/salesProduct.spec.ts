import { AdjustPriceBuilder } from '../../builders/adjustPrice.builder';
import { SalesProductBuilder } from '../../builders/salesProduct.builder';
import { PriceAdjustedBuilder } from '../../builders/priceAdjusted.builder';

describe('SalesProduct', () => {
  // TODO: createProduct
  // TODO: updateProductInfo

  describe('adjustPrice', () => {
    const priceTestCases = [
      {
        toString: () => '1 - should properly change the price',
        product: SalesProductBuilder.defaultAll.with({ price: 3 }).result,
        command: AdjustPriceBuilder.defaultAll.with({ newPrice: 5 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 5,
          uncommittedEvents: [
            PriceAdjustedBuilder.defaultAll.with({
              oldPrice: 3,
              newPrice: 5,
              amount: 2,
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
            PriceAdjustedBuilder.defaultAll.with({
              oldPrice: 4,
              newPrice: 1,
              amount: -3,
            }).result,
          ],
        }).result,
      },
    ];

    test.each(priceTestCases)(
      '%s',
      ({ command, product, expectedNewProduct }) => {
        product.adjustPrice(command);
        expect(product).toStrictEqual(expectedNewProduct);
      },
    );
  });
});
