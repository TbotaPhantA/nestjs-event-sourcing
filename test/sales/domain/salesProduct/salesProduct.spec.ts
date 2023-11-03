import { AdjustPriceBuilder } from '../../builders/adjustPrice.builder';
import { SalesProductBuilder } from '../../builders/salesProduct.builder';
import { PriceAdjustedBuilder } from '../../builders/priceAdjusted.builder';

describe('SalesProduct', () => {
  describe('adjustPrice', () => {
    const priceTestCases = [
      {
        toString: () => '1 - should properly change the price',
        command: AdjustPriceBuilder.defaultAll.with({ amount: 3 }).result,
        product: SalesProductBuilder.defaultAll.with({ price: 1 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 4,
          uncommittedEvents: [
            PriceAdjustedBuilder.defaultAll.with({ amount: 3 }).result,
          ],
        }).result,
      },
      {
        toString: () => '2 - should properly change the price',
        command: AdjustPriceBuilder.defaultAll.with({ amount: -2 }).result,
        product: SalesProductBuilder.defaultAll.with({ price: 4 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 2,
          uncommittedEvents: [
            PriceAdjustedBuilder.defaultAll.with({ amount: -2 }).result,
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
