import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dtos';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: ProductDto })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 400, description: 'Failed to create product' })
  async create(@Body() dto: ProductDto) {
    try {
      const result = await this.productService.create(dto);
      return { message: 'Product successfully created', data: result };
    } catch (error) {
      throw new BadRequestException('Failed to create product: ' + error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'Product list returned' })
  async findAll() {
    try {
      const result = await this.productService.findAll();
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to list products: ' + error.message);
    }
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get product by code' })
  @ApiParam({ name: 'code', type: Number })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('code') code: string) {
    try {
      const result = await this.productService.findOne(+code);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to fetch product: ' + error.message);
    }
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Delete product by code' })
  @ApiParam({ name: 'code', type: Number })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('code') code: string) {
    try {
      const result = await this.productService.remove(+code);
      return { message: 'Product successfully deleted', data: result };
    } catch (error) {
      throw new BadRequestException('Failed to delete product: ' + error.message);
    }
  }
}
