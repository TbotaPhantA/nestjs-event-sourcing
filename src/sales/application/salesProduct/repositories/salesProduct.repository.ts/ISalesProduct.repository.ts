import { SalesProduct } from '../../../../domain/salesProduct/salesProduct';
import { ITransaction } from '../../shared/types/ITransaction';

export interface ISalesProductRepository {
  findOneById(productId: string): Promise<SalesProduct | null>;
  save(product: SalesProduct, transaction: ITransaction): Promise<SalesProduct>;
}
