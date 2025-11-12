import { isConfirmed } from '../order/OrderStatus';
import type { Order } from '../order/Order';

type OrderPolicy = {
  ensureCanConfirm: (order: Order) => void;
};

const createOrderPolicy = (): OrderPolicy => {
  const ensureCanConfirm = (order: Order): void => {
    if (isConfirmed(order.status)) throw new Error('Order already confirmed');
    if (order.totalCents <= 0) throw new Error('Order total must be positive');
  };

  return { ensureCanConfirm };
};

export { createOrderPolicy };
export type { OrderPolicy };
