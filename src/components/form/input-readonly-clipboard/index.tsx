/*
 MIGRATION NOTE: The following Chakra UI hooks have been removed.
 Please replace them with the suggested alternatives:

//   - useClipboard: Use react-use: useCopyToClipboard

 See: https://chakra-ui.com/docs/get-started/migration#hooks
*/
import React from 'react';
import { Input } from '@chakra-ui/input';
import { Steps, Button, InputGroup, InputRightElement } from '@chakra-ui/react';

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
