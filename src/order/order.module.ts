import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductService } from '../product/product.service';
import {ProductModule} from '../product/product.module';
import {PrismaService} from '../prisma/prisma.service';

@Module({
  imports: [ProductModule],
  controllers: [OrderController],
  providers: [OrderService,PrismaService],
})
export class OrderModule {}
