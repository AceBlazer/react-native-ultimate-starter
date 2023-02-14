import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './en.json';
import translationFR from './fr.json';
import translationAR from './ar.json';
import config from '..';

export const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: config.defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {useSuspense: false},
});
