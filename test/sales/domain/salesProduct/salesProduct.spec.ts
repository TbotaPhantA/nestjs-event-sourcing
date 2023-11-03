import { AdjustPriceBuilder } from '../../builders/adjustPrice.builder';
import { SalesProductBuilder } from '../../builders/salesProduct.builder';

describe('SalesProduct', () => {
  describe('adjustPrice', () => {
    const priceTestCases = [
      {
        toString: () => '1 - should properly change the price',
        command: AdjustPriceBuilder.defaultAll.with({ newPrice: 2 }).result,
        product: SalesProductBuilder.defaultAll.with({ price: 1 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 2,
        }).result,
      },
      {
        toString: () => '1 - should properly change the price',
        command: AdjustPriceBuilder.defaultAll.with({ newPrice: 3 }).result,
        product: SalesProductBuilder.defaultAll.with({ price: 1 }).result,
        expectedNewProduct: SalesProductBuilder.defaultAll.with({
          price: 3,
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
