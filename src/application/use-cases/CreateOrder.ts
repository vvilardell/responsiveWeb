import { confirmOrder, createOrder } from '../../domain/order/Order';
import type { OrderLine, OrderId } from '../../domain/order/Order';
import type { OrderPolicy } from '../../domain/services/OrderPolicy';
import type { OrderRepository } from '../ports/OrderRepository';

type CreateOrderRequest = {
  id: OrderId;
  lines: ReadonlyArray<OrderLine>;
};

const createCreateOrder = (deps: { orders: OrderRepository; policy: OrderPolicy }) => {
  const execute = async (request: CreateOrderRequest): Promise<void> => {
    const order = createOrder({ id: request.id, lines: request.lines });
    const confirmed = confirmOrder(deps.policy)(order);
    await deps.orders.save(confirmed);
  };

  return { execute };
};

type CreateOrderUseCase = ReturnType<typeof createCreateOrder>;

export { createCreateOrder };
export type { CreateOrderRequest, CreateOrderUseCase };
