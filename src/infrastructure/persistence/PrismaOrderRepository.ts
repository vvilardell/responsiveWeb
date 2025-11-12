import type { Order } from '../../domain/order/Order';
import type { OrderRepository } from '../../application/ports/OrderRepository';

type PrismaLike = {
  order: {
    upsert: (input: unknown) => Promise<void>;
  };
};

const mapOrderToPersistence = (order: Order) => ({
  id: order.id,
  status: order.status,
  totalCents: order.totalCents,
});

const createPrismaOrderRepository = (client: PrismaLike): OrderRepository => ({
  findById: async () => {
    // Implement find logic when wiring a real Prisma client.
    return null;
  },
  save: async (order) => {
    await client.order.upsert({
      where: { id: order.id },
      update: mapOrderToPersistence(order),
      create: mapOrderToPersistence(order),
    });
  },
});

export { createPrismaOrderRepository };
