import { createOrderPolicy } from '../domain/services/OrderPolicy';
import { createCreateOrder } from '../application/use-cases/CreateOrder';
import { createPrismaOrderRepository } from '../infrastructure/persistence/PrismaOrderRepository';
import { createSQSOrderPublisher } from '../infrastructure/messaging/SQSOrderPublisher';

type PrismaClientStub = {
  order: {
    upsert: (input: unknown) => Promise<void>;
  };
};

type SqsClientStub = {
  sendMessage: (input: { QueueUrl: string; MessageBody: string }) => Promise<void>;
};

const createPrismaClient = (): PrismaClientStub => ({
  order: {
    upsert: async () => {
      // Replace with real Prisma call in production.
    },
  },
});

const createSqsClient = (): SqsClientStub => ({
  sendMessage: async () => {
    // Replace with real AWS SDK call in production.
  },
});

const createContainer = () => {
  const prisma = createPrismaClient();
  const sqs = createSqsClient();

  const orderRepository = createPrismaOrderRepository(prisma);
  const orderPolicy = createOrderPolicy();
  const createOrderUseCase = createCreateOrder({ orders: orderRepository, policy: orderPolicy });
  const orderPublisher = createSQSOrderPublisher({ client: sqs, queueUrl: 'orders-queue-url' });

  const registry = new Map<string, unknown>([
    ['CreateOrder', createOrderUseCase],
    ['OrderPublisher', orderPublisher],
  ]);

  const get = <T>(token: string): T => {
    const resolved = registry.get(token);
    if (!resolved) throw new Error(`Unknown dependency: ${token}`);
    return resolved as T;
  };

  return { get };
};

export { createContainer };
