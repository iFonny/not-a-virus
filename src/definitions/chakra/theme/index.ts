import { Steps, createSystem, defaultConfig } from '@chakra-ui/react';

import styles from './styles';

import colors from './foundations/colors';
import fontSizes from './foundations/fontSizes';
import sizes from './foundations/sizes';

const system = createSystem(defaultConfig, {
 theme: {
  tokens: {
   colors,
   fontSizes,
   sizes,
  },
 },

 ...styles,
});

export default theme;
