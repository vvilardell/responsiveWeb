import { createUnicorn } from '../domain/unicorn/Unicorn';
import { createUnicornPolicy } from '../domain/services/UnicornPolicy';
import { createInMemoryUnicornRepository } from '../infrastructure/persistence/InMemoryUnicornRepository';
import { createConsoleUnicornNotifier } from '../infrastructure/messaging/ConsoleUnicornNotifier';
import { createAdoptUnicorn } from '../application/use-cases/AdoptUnicorn';

const createUnicornContainer = () => {
  const repository = createInMemoryUnicornRepository([
    createUnicorn({ id: 'u-1', name: 'Luna', sparkleLevel: 777 }),
  ]);
  const policy = createUnicornPolicy();
  const notifier = createConsoleUnicornNotifier();

  const adoptUnicornUseCase = createAdoptUnicorn({
    repo: repository,
    policy,
    notifier,
  });

  const registry = new Map<string, unknown>([['AdoptUnicorn', adoptUnicornUseCase]]);

  const get = <T>(token: string): T => {
    const resolved = registry.get(token);
    if (!resolved) throw new Error(`Unknown dependency: ${token}`);
    return resolved as T;
  };

  return { get };
};

export { createUnicornContainer };
