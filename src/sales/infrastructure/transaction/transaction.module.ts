import { Module } from '@nestjs/common';
import { TRANSACTION_SERVICE } from './shared/constants';
import { NoTransactionService } from './noTransactionService';

@Module({
  providers: [
    {
      provide: TRANSACTION_SERVICE,
      useClass: NoTransactionService,
    },
  ],
})
export class TransactionModule {}
