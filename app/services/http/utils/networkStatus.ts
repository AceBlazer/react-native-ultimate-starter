import {
  addEventListener as addNetInfoListener,
  NetInfoState,
  NetInfoStateType,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

export class NetworkStatus {
  private networkState?: NetInfoState;
  private networkStateSubscriber?: NetInfoSubscription;

  constructor() {
    this.networkStateSubscriber = addNetInfoListener(state => {
      this.networkState = state;
      //   Logger.info('== NETWORK DETAILS => ', state);
    });
  }

  isConnectionAvailable(): boolean {
    return (
      this.networkState !== undefined &&
      this.networkState.type !== NetInfoStateType.unknown &&
      this.networkState.type !== NetInfoStateType.none
    );
  }
}
