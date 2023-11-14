import { Module } from '@nestjs/common';
import { CreateSalesProductService } from './services/createSalesProduct.service';
import { RandomModule } from '../infrastructure/random.module';
import { SALES_PRODUCT_REPOSITORY } from './shared/constants';
import { InMemorySalesProductRepository } from './repositories/salesProduct.repository.ts/InMemorySalesProduct.repository';
import { TransactionModule } from '../infrastructure/transaction/transaction.module';

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
