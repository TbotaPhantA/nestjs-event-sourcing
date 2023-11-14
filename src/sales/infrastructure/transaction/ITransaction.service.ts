import { ITransaction } from '../../application/salesProduct/shared/types/ITransaction';
import { IsolationLevel } from './isolationLevel.enum';

export interface ITransactionService {
  withTransaction<T>(
    level: IsolationLevel,
    fn: (transaction: ITransaction) => T,
  ): T;
}
