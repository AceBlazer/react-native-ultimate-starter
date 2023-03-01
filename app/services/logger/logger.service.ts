import {
  configLoggerType,
  logger,
  transportFunctionType,
} from 'react-native-logs';
import AppConfig from '../../config/';
import {getIfLogAllowed, LEVEL, LOGGER_OPTIONS} from '../../config/logger';
import connectedUser from '../../singletons/user/user.singleton';
import APP_PERFORMANCE from '../performance/performance.service';
// import {getLogger} from '../socket/loggerInterceptor'; in case we need to send logs to backend

const customTransport: transportFunctionType = ({level, rawMsg}) => {
  if (!getIfLogAllowed(level.text)) {
    return;
  }

  const showLogs = AppConfig.showLogs;
  if (!showLogs) {
    return;
  }

  if (rawMsg[0].text.includes('started')) {
    APP_PERFORMANCE.mark(rawMsg[0].text.split('started')[0]).start();
  }

  const toBeLogged = [
    '[' + logDate() + ']',
    rawMsg[0].text,
    rawMsg[0].message,
    extra(rawMsg[0]),
  ];

  if (level.text === LOGGER_OPTIONS.ERROR) {
    console.error(...toBeLogged);
  } else if (level.text === LOGGER_OPTIONS.WARN) {
    console.warn(...toBeLogged);
  } else {
    console.log(...toBeLogged);
  }

  // const {text: api = '', message = ''} = rawMsg[0];
  // const {text: loglevel = ''} = level;
  // const logPayload = {
  //   _api: api.split(' | '),
  //   level: loglevel,
  //   message,
  // };
  // getLogger().userSockets.get('userLogs')?.emit('sendLog', logPayload);
};

const config: configLoggerType = {
  transport: customTransport,
};

const loggerInstance = logger.createLogger(config);

function addZero(date: number, n: number) {
  return String(date).padStart(n, '0');
}

function logDate() {
  var d = new Date();
  var y = addZero(d.getFullYear(), 2);
  var M = addZero(d.getMonth() + 1, 2);
  var D = addZero(d.getDate(), 2);
  var h = addZero(d.getHours(), 2);
  var m = addZero(d.getMinutes(), 2);
  var s = addZero(d.getSeconds(), 2);
  var ms = addZero(d.getMilliseconds(), 3);
  var display = y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s + ':' + ms;
  return display;
}

function extra(rawMsg: {text: string; message: any; api: string}) {
  try {
    const {text, api} = rawMsg;
    const {loginID} = connectedUser.getUserInfo();

    const elapsedTime = text.includes('ended')
      ? `| elapsedTime: ${APP_PERFORMANCE.mark(
          text.split('ended')[0],
        ).getDuration()}`
      : '';

    return `| api: ${api} | user: ${loginID} ${elapsedTime}`;
  } catch (error) {
    return '';
  }
}

const extractArgs = (args: Array<any>) => {
  let message = args[args.length - 2];
  const api = args[args.length - 1];
  let text = '|';

  if (args.length > 2) {
    text = args.slice(0, args.length - 2).join(' | ');
  } else {
    text = args.slice(0, args.length - 1).join(' | ');
  }

  if (text === message) {
    message = '';
  }

  return {text, message, api};
};

const allowedLevel = (args: Array<any>) => {
  if (!LEVEL || LEVEL.includes('*')) {
    return 1;
  }
  const intersection = args.filter(arg => LEVEL.includes(arg));
  return intersection.length;
};

export const appLogger = {
  api: (apiArg: string) => {
    if (!allowedLevel([apiArg])) {
      return {
        error: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
      };
    }
    return {
      error: appLogger.error(apiArg),
      debug: appLogger.debug(apiArg),
      info: appLogger.info(apiArg),
      warn: appLogger.warn(apiArg),
    };
  },
  error:
    (apiArg: string) =>
    (...args: Array<any>) =>
      loggerInstance.error(extractArgs.apply(this, [[...args, apiArg]])),
  debug:
    (apiArg: string) =>
    (...args: Array<any>) =>
      loggerInstance.debug(extractArgs.apply(this, [[...args, apiArg]])),
  info:
    (apiArg: string) =>
    (...args: Array<any>) =>
      loggerInstance.info(extractArgs.apply(this, [[...args, apiArg]])),
  warn:
    (apiArg: string) =>
    (...args: Array<any>) =>
      loggerInstance.warn(extractArgs.apply(this, [[...args, apiArg]])),
};
