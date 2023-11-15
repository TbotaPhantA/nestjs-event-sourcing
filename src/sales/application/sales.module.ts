import { Module } from '@nestjs/common';
import { CreateSalesProductService } from './salesProduct/services/createSalesProduct.service';
import { RandomModule } from '../infrastructure/random/random.module';
import { SALES_PRODUCT_REPOSITORY } from './salesProduct/shared/constants';
import { TransactionModule } from '../infrastructure/transaction/transaction.module';
import { InMemorySalesProductRepository } from './salesProduct/repositories/salesProduct.repository.ts/InMemorySalesProduct.repository';
import { SalesProductController } from './salesProduct/salesProduct.controller';
import { AdjustPriceService } from './salesProduct/services/adjustPrice.service';

@Module({
  imports: [RandomModule, TransactionModule],
  controllers: [SalesProductController],
  providers: [
    CreateSalesProductService,
    AdjustPriceService,
    {
      provide: SALES_PRODUCT_REPOSITORY,
      useClass: InMemorySalesProductRepository,
    },
  ],
})
export class SalesModule {}
