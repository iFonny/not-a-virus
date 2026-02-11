/*
 MIGRATION NOTE: The following Chakra UI hooks have been removed.
 Please replace them with the suggested alternatives:

//   - useClipboard: Use react-use: useCopyToClipboard

 See: https://chakra-ui.com/docs/get-started/migration#hooks
*/
import React from 'react';
import { useColorModeValue } from "../../../../src/components/ui/color-mode";
import { Steps, Box, Button, Flex, Link, Spacer, Icon } from '@chakra-ui/react';
import { LuExternalLink } from 'react-icons/lu';

interface Props {
  value: string;
  label: string;
}

function BoxClipboard({ value, label }: Props) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Flex p="2" border="1px" borderRadius="12" borderColor={useColorModeValue('gray.300', 'gray.600')} width="full">
      <Box p="2">
        <Link href={value} color="teal.500" target='_blank' rel='noopener noreferrer'>
          {label} <Icon mx="2px" asChild><LuExternalLink /></Icon>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Box>
    </Flex>
  );
}

export default BoxClipboard;
