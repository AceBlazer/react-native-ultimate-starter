import {
  configLoggerType,
  logger,
  transportFunctionType,
} from 'react-native-logs';
import AppConfig from '../../config/';
import {getIfLogAllowed, LEVEL, LOGGER_OPTIONS} from '../../config/logger';
import connectedUser from '../../singletons/user/user.singleton';
// import {getLogger} from '../socket/loggerInterceptor'; in case we need to send logs to backend

const customTransport: transportFunctionType = ({level, rawMsg}) => {
  if (!getIfLogAllowed(level.text)) {
    return;
  }

  const showLogs = AppConfig.showConsoleLogs;
  if (!showLogs) {
    return;
  }

  const toBeLogged = [
    '[' + logDate() + ']',
    rawMsg[0].text,
    rawMsg[0].message,
    extra(),
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

const generalLogger = logger.createLogger(config);

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

function extra() {
  try {
    const {loginID} = connectedUser.getUserInfo();
    return `| user: ${loginID}`;
  } catch (error) {
    return '';
  }
}

const extractArgs = (args: Array<any>) => {
  const message = args[args.length - 1];
  let text = '|';
  if (args.length > 1) {
    args.pop();
    text = args.join(' | ');
  }
  return {text, message};
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
    console.log('apiArg ', apiArg);
    if (!allowedLevel([apiArg])) {
      return {
        error: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
      };
    }
    return {
      error: appLogger.error,
      debug: appLogger.debug,
      info: appLogger.info,
      warn: appLogger.info,
    };
  },
  error: (...args: Array<any>) => generalLogger.error(extractArgs(args)),
  debug: (...args: Array<any>) => generalLogger.debug(extractArgs(args)),
  info: (...args: Array<any>) => generalLogger.info(extractArgs(args)),
  warn: (...args: Array<any>) => generalLogger.warn(extractArgs(args)),
};
