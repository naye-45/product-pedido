import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';
import {PrismaService} from '../prisma/prisma.service';
import {OrderStatus} from '../generated/prisma/enums';
import {randomInt} from 'node:crypto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const productExiste = await this.productService.findByName(
      createOrderDto.nameProduct,
    );
    // El producto existe

    if (!productExiste) {
      throw new NotFoundException('Producto no existe.');
    }

    const pedidoPendiente = await this.prisma.order.findFirst({
      where: {
        nameClient: createOrderDto.nameClient,
        status: OrderStatus.PENDING,
      },
    });
    if (pedidoPendiente) {
      throw new UnprocessableEntityException(
        'El cliente ya tiene un pedido pendiente',
      );
    }

    // Comprobar el stock

    if (productExiste.stock < createOrderDto.quantityProduct) {
      throw new UnprocessableEntityException(
        'No hay suficienete stock del producto',
      );
    }

    // Descontar el stock

    await this.prisma.product.update({
      where: {
        id: productExiste.id,
      },
      data: {
        stock: {
          decrement: createOrderDto.quantityProduct,
        },
      },
    });

    const verificationCode = randomInt(100000, 1000000).toString();

    return this.prisma.order.create({
      data: {
        nameClient: createOrderDto.nameClient,
        nameProduct: createOrderDto.nameProduct,
        quantityProduct: createOrderDto.quantityProduct,
        verificationCode: verificationCode,
        product: {
          connect: {
            id: productExiste.id,
          },
        },
      },
    });
  }

  // Pasar de pendiente a recibido
  async shipOrder(id: number) {
    // 1. Buscar el pedido
    const orderExiste = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    // 2. Comprobar que exista
    if (!orderExiste) {
      throw new NotFoundException('Pedido no encontrado.');
    }

    // 3. Comprobar que esté pendiente
    if (orderExiste.status !== OrderStatus.PENDING) {
      throw new UnprocessableEntityException('El pedido no está pendiente.');
    }

    // 4. Cambiar el estado
    return this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: OrderStatus.SHIPPED,
      },
    });
  }

  // Pasar a recibido
  async receiveOrder(id: number) {
    // 1. Buscar el pedido
    const orderExiste = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    // 2. Comprobar que exista
    if (!orderExiste) {
      throw new NotFoundException('Pedido no encontrado.');
    }

    // 3. Comprobar que esté enviado
    if (orderExiste.status !== OrderStatus.SHIPPED) {
      throw new UnprocessableEntityException(
        'El pedido debe estar enviado para poder recibirlo.',
      );
    }

    // 4. Cambiar a recibido
    return this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: OrderStatus.RECEIVED,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
