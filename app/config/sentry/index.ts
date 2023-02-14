import * as Sentry from '@sentry/react-native';
import config from '..';

/**
 * to allow navigation tracing:
 *
 * new Sentry.ReactNativeTracing({
 * routingInstrumentation: new Sentry.ReactNativeNavigationInstrumentation(
 *   Navigation
 * )
 *
 */
const routingInstrumentation = new Sentry.ReactNavigationV4Instrumentation();

export const SENTRY_CONFIG = {
  dsn: 'https://33168e6eb6f34af896a20395991c25f5@o4504638052761600.ingest.sentry.io/4504638054727680',
  debug: false,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
  tracesSampleRate: config.appEnv === 'testing' ? 1.0 : 0.2,
  environment: config.appEnv,
  //@ts-ignore
  release: `poste@${process.env.npm_package_version}`,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
};
