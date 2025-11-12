import { orderStatus } from './OrderStatus';
import type { OrderStatus } from './OrderStatus';

type OrderId = string;

type OrderLine = Readonly<{
  sku: string;
  quantity: number;
  unitPriceCents: number;
}>;

type Order = Readonly<{
  id: OrderId;
  status: OrderStatus;
  lines: ReadonlyArray<OrderLine>;
  totalCents: number;
}>;

type OrderStatusGuard = {
  ensureCanConfirm: (order: Order) => void;
};

const calculateTotalCents = (lines: ReadonlyArray<OrderLine>): number =>
  lines.reduce((acc, line) => acc + line.quantity * line.unitPriceCents, 0);

const createOrder = (params: { id: OrderId; lines: ReadonlyArray<OrderLine> }): Order => {
  if (!params.id) throw new Error('Order id is required');
  if (!params.lines.length) throw new Error('Order must contain at least one line');

  return {
    id: params.id,
    status: orderStatus.pending(),
    lines: params.lines,
    totalCents: calculateTotalCents(params.lines),
  };
};

const applyStatus = (order: Order, status: OrderStatus): Order => ({ ...order, status });

const confirmOrder =
  (guard: OrderStatusGuard) =>
  (order: Order): Order => {
    guard.ensureCanConfirm(order);
    return applyStatus(order, orderStatus.confirmed());
  };

export { createOrder, calculateTotalCents, confirmOrder };
export type { Order, OrderId, OrderLine, OrderStatusGuard };
