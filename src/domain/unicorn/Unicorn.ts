import { unicornStatus } from './UnicornStatus';
import type { UnicornStatus } from './UnicornStatus';

type UnicornId = string;

type Unicorn = Readonly<{
  id: UnicornId;
  name: string;
  status: UnicornStatus;
  sparkleLevel: number;
}>;

type UnicornAdoptionGuard = {
  ensureCanAdopt: (unicorn: Unicorn) => void;
};

const MAX_SPARKLE = 9000;

const createUnicorn = (params: { id: UnicornId; name: string; sparkleLevel: number }): Unicorn => {
  if (!params.id) throw new Error('Unicorn id is required');
  if (!params.name) throw new Error('Unicorn name is required');
  if (params.sparkleLevel < 0 || params.sparkleLevel > MAX_SPARKLE) {
    throw new Error('Sparkle level out of range');
  }

  return {
    id: params.id,
    name: params.name,
    sparkleLevel: params.sparkleLevel,
    status: unicornStatus.available(),
  };
};

const updateStatus = (unicorn: Unicorn, status: UnicornStatus): Unicorn => ({ ...unicorn, status });

const adoptUnicorn =
  (guard: UnicornAdoptionGuard) =>
  (unicorn: Unicorn): Unicorn => {
    guard.ensureCanAdopt(unicorn);
    return updateStatus(unicorn, unicornStatus.adopted());
  };

export { createUnicorn, updateStatus, adoptUnicorn };
export type { Unicorn, UnicornId, UnicornAdoptionGuard };
