import { isAdopted } from '../unicorn/UnicornStatus';
import type { Unicorn } from '../unicorn/Unicorn';

type UnicornPolicy = {
  ensureCanAdopt: (unicorn: Unicorn) => void;
};

const createUnicornPolicy = (): UnicornPolicy => {
  const ensureCanAdopt = (unicorn: Unicorn): void => {
    if (isAdopted(unicorn.status)) throw new Error('Unicorn already adopted');
    if (unicorn.sparkleLevel <= 0) throw new Error('Sparkle level must be positive');
  };

  return { ensureCanAdopt };
};

export { createUnicornPolicy };
export type { UnicornPolicy };
