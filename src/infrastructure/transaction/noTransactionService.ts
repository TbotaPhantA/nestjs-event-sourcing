import { ITransactionService } from './ITransaction.service';
import { ITransaction } from '../../sales/application/salesProduct/shared/types/ITransaction';
import { IsolationLevel } from './isolationLevel.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NoTransactionService implements ITransactionService {
  withTransaction<T>(
    level: IsolationLevel,
    fn: (transaction: ITransaction) => T,
  ): T {
    return fn({});
  }
}
