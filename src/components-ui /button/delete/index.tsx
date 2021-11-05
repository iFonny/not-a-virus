import { DeleteIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  type: 'icon' | 'text';
  popoverBody?: string | ReactNode;
  onDelete: () => void;
  onCancel?: () => void;
}

export const ButtonDelete = ({ type, popoverBody = 'Are you sure?', onDelete, onCancel }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        {type === 'icon' ? (
          <IconButton colorScheme="red" aria-label="Delete" icon={<DeleteIcon />} />
        ) : (
          <Button colorScheme="red" aria-label="Delete">
            Delete
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{popoverBody}</PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={onDelete} colorScheme="red">
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
