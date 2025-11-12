import type { NextApiRequest, NextApiResponse } from 'next';
import { createUnicornContainer } from '../unicornContainer';
import type { AdoptUnicornUseCase } from '../../application/use-cases/AdoptUnicorn';

type Container = ReturnType<typeof createUnicornContainer>;

const createUnicornHandler =
  (containerFactory: () => Container = createUnicornContainer) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }

    const container = containerFactory();
    const useCase = container.get<AdoptUnicornUseCase>('AdoptUnicorn');

    const unicorn = await useCase.execute(req.body);
    res.status(202).json({ message: `${unicorn.name} adopted`, unicorn });
  };

export default createUnicornHandler();
