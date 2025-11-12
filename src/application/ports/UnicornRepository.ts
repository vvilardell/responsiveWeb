import type { Unicorn, UnicornId } from '../../domain/unicorn/Unicorn';

type UnicornRepository = {
  findById: (id: UnicornId) => Promise<Unicorn | null>;
  save: (unicorn: Unicorn) => Promise<void>;
};

export type { UnicornRepository };
