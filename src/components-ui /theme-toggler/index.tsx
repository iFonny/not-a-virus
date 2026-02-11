import { Steps, IconButton } from '@chakra-ui/react';
import { useColorMode } from "../../components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';

export const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (<IconButton onClick={toggleColorMode} variant="ghost" aria-label="switch color mode">{colorMode === 'light' ? <LuMoon /> : <LuSun />}</IconButton>);
};

export default ThemeToggler;
