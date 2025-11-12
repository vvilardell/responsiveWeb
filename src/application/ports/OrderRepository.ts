import type { Order, OrderId } from '../../domain/order/Order';

interface OrderRepository {
  findById: (id: OrderId) => Promise<Order | null>;
  save: (order: Order) => Promise<void>;
}

export type { OrderRepository };
