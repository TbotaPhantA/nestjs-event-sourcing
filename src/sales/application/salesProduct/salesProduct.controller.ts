import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSalesProduct } from '../../domain/salesProduct/commands/createSalesProduct';
import { CreateSalesProductService } from './services/createSalesProduct.service';

@Controller('sales/product')
export class SalesProductController {
  constructor(
    private readonly createSalesProductService: CreateSalesProductService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createSalesProduct(@Body() command: CreateSalesProduct): Promise<void> {
    await this.createSalesProductService.create(command);
  }
}
