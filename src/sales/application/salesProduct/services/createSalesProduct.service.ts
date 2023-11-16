import { Injectable } from '@nestjs/common';
import { CreateSalesProduct } from '../../../domain/salesProduct/commands/createSalesProduct';
import { SalesProduct } from '../../../domain/salesProduct/salesProduct';
import { RandomService } from '../../../infrastructure/random/random.service';
import { ISalesProductRepository } from '../repositories/salesProduct.repository.ts/ISalesProduct.repository';
import { CreateSalesProductOutputDto } from '../dto/createSalesProduct.output.dto';
import { InjectSalesProductRepository } from '../shared/decorators/injectSalesProductRepository';
import { ITransactionService } from '../../../../infrastructure/transaction/ITransaction.service';
import { InjectTransactionService } from '../../../../infrastructure/transaction/shared/decorators/injectTransactionService';
import { ITransaction } from '../shared/types/ITransaction';

@Injectable()
export class CreateSalesProductService {
  constructor(
    @InjectTransactionService()
    private readonly transactionService: ITransactionService,
    @InjectSalesProductRepository()
    private readonly repo: ISalesProductRepository,
    private readonly random: RandomService,
  ) {}

  async create(
    command: CreateSalesProduct,
  ): Promise<CreateSalesProductOutputDto> {
    return this.transactionService.withTransaction(
      'SERIALIZABLE',
      (transaction) => this.createWithTransaction(command, transaction),
    );
  }

  private async createWithTransaction(
    command: CreateSalesProduct,
    transaction: ITransaction,
  ): Promise<CreateSalesProductOutputDto> {
    const product = SalesProduct.create(command, { random: this.random });
    const savedProduct = await this.repo.save(product, transaction);
    return CreateSalesProductOutputDto.from(savedProduct);
  }
}
