import type { Order } from '../../domain/order/Order';

type SqsLike = {
  sendMessage: (input: { QueueUrl: string; MessageBody: string }) => Promise<void>;
};

const createSQSOrderPublisher = (deps: { client: SqsLike; queueUrl: string }) => {
  const publishConfirmed = async (order: Order): Promise<void> => {
    const message = JSON.stringify({
      orderId: order.id,
      status: order.status,
      totalCents: order.totalCents,
    });

    await deps.client.sendMessage({
      QueueUrl: deps.queueUrl,
      MessageBody: message,
    });
  };

  return { publishConfirmed };
};

export { createSQSOrderPublisher };
