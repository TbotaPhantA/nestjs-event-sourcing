import { Module } from '@nestjs/common';
import { CreateSalesProductService } from './salesProduct/services/createSalesProduct.service';
import { RandomModule } from '../infrastructure/random.module';
import { SALES_PRODUCT_REPOSITORY } from './salesProduct/shared/constants';
import { TransactionModule } from '../infrastructure/transaction/transaction.module';
import { InMemorySalesProductRepository } from './salesProduct/repositories/salesProduct.repository.ts/InMemorySalesProduct.repository';

@Module({
  imports: [RandomModule, TransactionModule],
  providers: [
    CreateSalesProductService,
    {
      provide: SALES_PRODUCT_REPOSITORY,
      useClass: InMemorySalesProductRepository,
    },
  ],
})
export class SalesModule {}
