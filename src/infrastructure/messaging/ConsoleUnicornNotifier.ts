import type { AdoptionNotifier } from '../../application/ports/AdoptionNotifier';

const createConsoleUnicornNotifier = (): AdoptionNotifier => ({
  notify: async (unicorn) => {
    console.info(`✨ Unicorn ${unicorn.name} adopted (sparkle ${unicorn.sparkleLevel})`);
  },
});

export { createConsoleUnicornNotifier };
