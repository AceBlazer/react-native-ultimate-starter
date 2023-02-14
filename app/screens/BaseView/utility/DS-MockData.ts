import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../config/colors';
import {fonts} from '../../../config/fonts';

export const childrenMock: React.ReactNode = React.createElement(
  View,
  {style: {backgroundColor: colors.light.darkPurple, flex: 1}},
  [
    React.createElement(
      Text,
      {
        style: {
          fontSize: 20,
          color: colors.light.text,
          fontFamily: fonts.montserrat.extraBold,
        },
        key: 'testText',
      },
      'This is a test text for BaseView as a children prop (ReactNode)',
    ),
  ],
);
