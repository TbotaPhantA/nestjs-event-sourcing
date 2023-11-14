import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSalesProduct } from '../../domain/salesProduct/commands/createSalesProduct';
import { CreateSalesProductService } from './services/createSalesProduct.service';
import { CreateSalesProductOutputDto } from './dto/createSalesProduct.output.dto';

@Controller('sales/product')
export class SalesProductController {
  constructor(
    private readonly createSalesProductService: CreateSalesProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createSalesProduct(
    @Body() command: CreateSalesProduct,
  ): Promise<CreateSalesProductOutputDto> {
    return this.createSalesProductService.create(command);
  }
}
