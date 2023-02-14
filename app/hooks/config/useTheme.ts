import {useEffect, useState} from 'react';
import COLORS from '../../config/colors';
import config from '../../config';

const useTheme = () => {
  const [colors, setColors] = useState(COLORS.light);

  useEffect(() => {
    if (config.defaultTheme === 'dark') {
      setColors(COLORS.dark);
      return;
    }
    if (colors !== COLORS.light) {
      setColors(COLORS.light);
    }
  }, []);

  return {
    colors,
  };
};

export default useTheme;
