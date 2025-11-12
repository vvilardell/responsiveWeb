type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

const orderStatus = {
  pending: (): OrderStatus => 'pending',
  confirmed: (): OrderStatus => 'confirmed',
  cancelled: (): OrderStatus => 'cancelled',
} as const;

const isConfirmed = (status: OrderStatus): boolean => status === 'confirmed';

export { orderStatus, isConfirmed };
export type { OrderStatus };
