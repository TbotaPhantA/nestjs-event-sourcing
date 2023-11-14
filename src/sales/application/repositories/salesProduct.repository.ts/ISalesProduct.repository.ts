import { SalesProduct } from '../../../domain/salesProduct/salesProduct';
import { ITransaction } from '../../shared/types/ITransaction';

export interface ISalesProductRepository {
  save(product: SalesProduct, transaction: ITransaction): Promise<SalesProduct>;
}
