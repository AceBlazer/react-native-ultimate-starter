import React from 'react';
import useTheme from '../../../hooks/config/useTheme';
import CustomIcon from '../../../Icon';

interface IIconProps {
  iconName: string;
  size?: number;
  iconColor: string;
}

function Icon({iconName, size = 32, iconColor}: IIconProps): JSX.Element {
  const {colors} = useTheme();
  return (
    <CustomIcon
      name={iconName}
      color={iconColor ? iconColor : colors.primary}
      size={size}
    />
  );
}

export default Icon;
