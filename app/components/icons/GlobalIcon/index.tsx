import React, {PropsWithChildren} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import useTheme from '../../../hooks/config/useTheme';
import Icon from './icons';

interface IGlobalIconProps {
  size?: number;
  pressSize?: number;
  iconName: string;
  iconColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
}

function GlobalIcon({
  size = 22,
  pressSize = 32,
  iconName,
  iconColor,
  onPress = () => {},
  style: defaultStyle,
  disabled = false,
  iconStyle = {},
  children = null,
}: PropsWithChildren<IGlobalIconProps>): JSX.Element {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      onTouchEnd={onPress}
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
      style={[
        styles.iconMargin,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: pressSize ? pressSize : size,
          width: pressSize ? pressSize : size,
          alignItems: 'center',
          justifyContent: 'center',
        },
        defaultStyle,
      ]}>
      <TouchableOpacity disabled={disabled} delayPressIn={0}>
        <View style={[styles.container, iconStyle]}>
          {children || (
            <Icon
              size={size}
              iconName={iconName}
              iconColor={iconColor ? iconColor : colors.primary}
            />
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    right: 0,
  },
  iconMargin: {
    margin: 2,
  },
});

export default GlobalIcon;
