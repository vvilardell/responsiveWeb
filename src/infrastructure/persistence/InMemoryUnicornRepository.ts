import type { Unicorn } from '../../domain/unicorn/Unicorn';
import type { UnicornRepository } from '../../application/ports/UnicornRepository';

const createInMemoryUnicornRepository = (seed: ReadonlyArray<Unicorn> = []): UnicornRepository => {
  const store = new Map(seed.map((unicorn) => [unicorn.id, unicorn]));

  const findById: UnicornRepository['findById'] = async (id) => store.get(id) ?? null;

  const save: UnicornRepository['save'] = async (unicorn) => {
    store.set(unicorn.id, unicorn);
  };

  return { findById, save };
};

export { createInMemoryUnicornRepository };
