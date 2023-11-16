import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  CreateSalesProduct,
  createSalesProductOpenApi,
} from '../../domain/salesProduct/commands/createSalesProduct';
import { CreateSalesProductService } from './services/createSalesProduct.service';
import { CreateSalesProductOutputDto } from './dto/createSalesProduct.output.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdjustPriceOutputDto } from './dto/adjustPrice.output.dto';
import {
  AdjustPrice,
  adjustPriceOpenApi,
} from '../../domain/salesProduct/commands/adjustPrice';
import { AdjustPriceService } from './services/adjustPrice.service';

@Controller('sales/product')
@ApiTags('sales/product')
export class SalesProductController {
  constructor(
    private readonly createSalesProductService: CreateSalesProductService,
    private readonly adjustPriceService: AdjustPriceService,
  ) {}

  // TODO: get products by filter (async) + websocket
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

  @Post('adjust-price')
  @ApiOperation({ summary: 'Adjust price' })
  @ApiBody({ schema: adjustPriceOpenApi })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AdjustPriceOutputDto,
  })
  async adjustPrice(
    @Body() command: AdjustPrice,
  ): Promise<AdjustPriceOutputDto> {
    return this.adjustPriceService.create(command);
  }
}
