import type { NextApiRequest, NextApiResponse } from 'next';
import { createContainer } from '../container';
import type { CreateOrderUseCase } from '../../application/use-cases/CreateOrder';

type Container = ReturnType<typeof createContainer>;

const createOrderHandler =
  (containerFactory: () => Container = createContainer) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }

    const container = containerFactory();
    const useCase = container.get<CreateOrderUseCase>('CreateOrder');

    await useCase.execute(req.body);
    res.status(201).json({ message: 'Order created' });
  };

export default createOrderHandler();
