import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  exports:[ProductService],
  controllers: [ProductController],
  providers: [ProductService,PrismaService],
})
export class ProductModule {}
