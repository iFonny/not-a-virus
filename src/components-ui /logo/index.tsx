import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import React from 'react';

export const Logo = () => {
  return (
    <Text
      textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
      fontFamily={'heading'}
      color={useColorModeValue('gray.800', 'white')}
    >
      This is Not A Virus
    </Text>
  );
};
