type UnicornStatus = 'available' | 'adopted';

const unicornStatus = {
  available: (): UnicornStatus => 'available',
  adopted: (): UnicornStatus => 'adopted',
} as const;

const isAdopted = (status: UnicornStatus): boolean => status === 'adopted';

export { unicornStatus, isAdopted };
export type { UnicornStatus };
