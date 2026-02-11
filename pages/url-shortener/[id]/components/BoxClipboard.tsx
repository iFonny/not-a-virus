import React from 'react';
import { Box, Button, Flex, Link, Spacer, useClipboard, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface Props {
  value: string;
  label: string;
}

function BoxClipboard({ value, label }: Props) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Flex p="2" border="1px" borderRadius="12" borderColor={useColorModeValue('gray.300', 'gray.600')} width="full">
      <Box p="2">
        <Link href={value} color="teal.500" isExternal>
          {label} <ExternalLinkIcon mx="2px" />
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
