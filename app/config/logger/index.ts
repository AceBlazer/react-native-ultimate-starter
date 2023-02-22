import services from '..';

export const LOGGER_OPTIONS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};
const ACTIVE_CHANNEL = LOGGER_OPTIONS.DEBUG;

export const LOGGER_LEVELS: {[key: string]: string} = Object.keys(
  services,
).reduce(
  (prev, curr) => ({
    ...prev,
    [curr.toUpperCase()]: curr,
  }),
  {},
);

export function getIfLogAllowed(name: string) {
  const active = ACTIVE_CHANNEL;

  /*Logger Matrix */
  if (active === LOGGER_OPTIONS.DEBUG) {
    return true;
  }

  if (active === LOGGER_OPTIONS.INFO) {
    if (name === LOGGER_OPTIONS.DEBUG) {
      return false;
    }
    return true;
  }

  if (active === LOGGER_OPTIONS.WARN) {
    if (name === LOGGER_OPTIONS.INFO || name === LOGGER_OPTIONS.DEBUG) {
      return false;
    }
    return true;
  }

  if (active === LOGGER_OPTIONS.ERROR) {
    if (name !== LOGGER_OPTIONS.ERROR) {
      return false;
    }
    return true;
  }
}

export const LEVEL = [
  LOGGER_LEVELS.SETTINGS,
  // '*', to allow all levels
];
