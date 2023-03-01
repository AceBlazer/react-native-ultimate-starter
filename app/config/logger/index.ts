import config from '..';
import services from '../../services/';

export const LOGGER_OPTIONS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

const ACTIVE_CHANNEL =
  config.appEnv === 'production' ? LOGGER_OPTIONS.INFO : LOGGER_OPTIONS.DEBUG;

type UppercaseKeys<T> = {[K in keyof T as Uppercase<string & K>]: T[K]};
type LoggerLevels = UppercaseKeys<{[K in keyof typeof services]: string}>;
const defaultServiceKey = Object.keys(services)[0] as keyof typeof services;
export const LOGGER_LEVELS: LoggerLevels = Object.keys(services).reduce(
  (acc, curr) => ({
    ...acc,
    [curr.toUpperCase()]: curr,
  }),
  {
    [defaultServiceKey.toUpperCase()]: services[defaultServiceKey],
  } as LoggerLevels,
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
  LOGGER_LEVELS.AXIOS,
  LOGGER_LEVELS.TRANSACTION,
  // '*', to allow all levels
];
