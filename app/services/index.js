import settings from './settings/settings.service';
import appLogger from './logger/logger.service';
import axios from './http';

const services = {
  settings,
  appLogger,
  axios,
  transaction: 'transaction',
};

export default services;
