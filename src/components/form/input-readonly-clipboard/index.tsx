import React from 'react';
import { Input } from '@chakra-ui/input';
import { Button, InputGroup, InputRightElement, useClipboard } from '@chakra-ui/react';

interface Props {
  value: string;
}

function InputReadOnlyClipboard({ value }: Props) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <InputGroup size="md">
      <Input pr="5rem" value={value} isReadOnly />
      <InputRightElement mr="2" width="auto">
        <Button size="sm" h="1.75rem" paddingX="2" onClick={onCopy}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default InputReadOnlyClipboard;
