import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  CreateSalesProduct,
  createSalesProductOpenApi,
} from '../../domain/salesProduct/commands/createSalesProduct';
import { CreateSalesProductService } from './services/createSalesProduct.service';
import { CreateSalesProductOutputDto } from './dto/createSalesProduct.output.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('sales/product')
@ApiTags('sales/product')
export class SalesProductController {
  constructor(
    private readonly createSalesProductService: CreateSalesProductService,
  ) {}

  @Post('create-sales-product')
  @ApiOperation({ summary: 'Create sales product' })
  @ApiBody({ schema: createSalesProductOpenApi })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateSalesProductOutputDto,
  })
  async createSalesProduct(
    @Body() command: CreateSalesProduct,
  ): Promise<CreateSalesProductOutputDto> {
    return this.createSalesProductService.create(command);
  }
}
