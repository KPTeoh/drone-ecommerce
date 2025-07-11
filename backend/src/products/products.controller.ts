import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(): Product[] {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Product {
        return this.productsService.findOne(id);
    }
} 