import { Injectable, NotFoundException } from '@nestjs/common';
import { AdjustPrice } from '../../../domain/salesProduct/commands/adjustPrice';
import { InjectTransactionService } from '../../../../infrastructure/transaction/shared/decorators/injectTransactionService';
import { ITransactionService } from '../../../../infrastructure/transaction/ITransaction.service';
import { InjectSalesProductRepository } from '../shared/decorators/injectSalesProductRepository';
import { ISalesProductRepository } from '../repositories/salesProduct.repository.ts/ISalesProduct.repository';
import { ITransaction } from '../shared/types/ITransaction';
import { AdjustPriceOutputDto } from '../dto/adjustPrice.output.dto';
import { SalesProduct } from '../../../domain/salesProduct/salesProduct';
import { PRODUCT_NOT_FOUND } from '../../../../infrastructure/shared/errorMessages';
import { RandomService } from '../../../infrastructure/random/random.service';

@Injectable()
export class AdjustPriceService {
  constructor(
    @InjectTransactionService()
    private readonly transactionService: ITransactionService,
    @InjectSalesProductRepository()
    private readonly repo: ISalesProductRepository,
    private readonly random: RandomService,
  ) {}

  async create(command: AdjustPrice): Promise<AdjustPriceOutputDto> {
    return this.transactionService.withTransaction(
      'SERIALIZABLE',
      (transaction) => this.createWithTransaction(command, transaction),
    );
  }

  private async createWithTransaction(
    command: AdjustPrice,
    transaction: ITransaction,
  ): Promise<AdjustPriceOutputDto> {
    const product = await this.getOneById(command.productId);
    product.adjustPrice(command, { random: this.random });
    const savedProduct = await this.repo.save(product, transaction);
    return AdjustPriceOutputDto.from(savedProduct);
  }

  private async getOneById(productId: string): Promise<SalesProduct> {
    const product = await this.repo.findOneById(productId);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return product;
  }
}
