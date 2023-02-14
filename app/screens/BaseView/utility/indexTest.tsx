import React from 'react';
import BaseView from '..';
import {childrenMock} from './DS-MockData';

function BaseViewTestScreen() {
  return <BaseView children={childrenMock} />;
}

export default BaseViewTestScreen;
