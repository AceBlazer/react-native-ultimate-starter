import React, {JSXElementConstructor} from 'react';
import * as Sentry from '@sentry/react-native';
import {SENTRY_CONFIG} from './app/config/sentry';
import CombineProviders from './app/helpers/CombineProviders';
import './app/config/i18n';
import {Provider} from 'react-redux';
import {defaultStore} from './app/store';
import BaseView from './app/screens/BaseView';
import Application from './app/screens/Application';
import config from './app/config';
import TestScreen from './app/screens/Test';
import {PersistGate} from 'redux-persist/integration/react';

type AppProvider = JSXElementConstructor<any> & {prototype: {props?: object}};

function App(): JSX.Element {
  Sentry.init(SENTRY_CONFIG);
  const {testModeEnabled} = config;
  let appProviders: Array<AppProvider> = [];

  const initProviders = () => {
    Provider.prototype.props = {store: defaultStore.store};
    appProviders.push(Provider);
    if (config.enableReduxPersist) {
      //@ts-ignore
      PersistGate.prototype.props = {
        loading: null,
        persistor: defaultStore.persistor,
      };
      appProviders.push(PersistGate);
    }
  };

  initProviders();

  return (
    <CombineProviders providers={appProviders}>
      {testModeEnabled ? (
        <TestScreen />
      ) : (
        <BaseView>
          <Application />
        </BaseView>
      )}
    </CombineProviders>
  );
}

export default App;
