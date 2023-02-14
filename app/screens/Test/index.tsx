import React from 'react';
import GlobalIconTestComponent from '../../components/icons/GlobalIcon/utility/indexTest';
import OfflineNoticeTestComponent from '../../components/shared/OfflineNotice/utility/indexTest';
import BaseViewTestScreen from '../BaseView/utility/indexTest';

/**
 * this is the test screen that needs to include your (component's / screen)
 * test file (component|screen dir/utility/indexTest) inside thu=is render method
 * in order to test it's behavior with mock data before including it in the real application.
 * to enable this screen you need to enable test mode inside config/index file
 * !do not commit this file after changing it (keep your changes local)
 */

export default function TestScreen() {
  return (
    <>
      <BaseViewTestScreen />
      <GlobalIconTestComponent />
      <OfflineNoticeTestComponent />
    </>
  );
}
