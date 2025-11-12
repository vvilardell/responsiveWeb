import type { Unicorn } from '../../domain/unicorn/Unicorn';

type AdoptionNotifier = {
  notify: (unicorn: Unicorn) => Promise<void>;
};

export type { AdoptionNotifier };
