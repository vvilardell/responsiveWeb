import { adoptUnicorn } from '../../domain/unicorn/Unicorn';
import type { UnicornId } from '../../domain/unicorn/Unicorn';
import type { UnicornPolicy } from '../../domain/services/UnicornPolicy';
import type { UnicornRepository } from '../ports/UnicornRepository';
import type { AdoptionNotifier } from '../ports/AdoptionNotifier';

type AdoptUnicornRequest = {
  id: UnicornId;
};

const createAdoptUnicorn = (deps: {
  repo: UnicornRepository;
  policy: UnicornPolicy;
  notifier?: AdoptionNotifier;
}) => {
  const execute = async (request: AdoptUnicornRequest) => {
    const existing = await deps.repo.findById(request.id);
    if (!existing) throw new Error('Unicorn not found');

    const adopted = adoptUnicorn(deps.policy)(existing);
    await deps.repo.save(adopted);
    if (deps.notifier) await deps.notifier.notify(adopted);
    return adopted;
  };

  return { execute };
};

type AdoptUnicornUseCase = ReturnType<typeof createAdoptUnicorn>;

export { createAdoptUnicorn };
export type { AdoptUnicornRequest, AdoptUnicornUseCase };
