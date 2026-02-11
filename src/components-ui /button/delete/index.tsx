import { Steps, Popover, IconButton, ButtonGroup, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { LuTrash2 } from 'react-icons/lu';

interface Props {
  type: 'icon' | 'text';
  popoverBody?: string | ReactNode;
  onDelete: () => void;
  onCancel?: () => void;
}

export const ButtonDelete = ({ type, popoverBody = 'Are you sure?', onDelete, onCancel }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {type === 'icon' ? (
          <IconButton colorPalette="red" aria-label="Delete"><LuTrash2 /></IconButton>
        ) : (
          <Button colorPalette="red" aria-label="Delete">
            Delete
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title fontWeight="semibold">Confirmation</Popover.Title>
          <Popover.Arrow />
          <Popover.CloseTrigger />
          <Popover.Body>{popoverBody}</Popover.Body>
          <Popover.Footer d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button onClick={onCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={onDelete} colorPalette="red">
                Delete
              </Button>
            </ButtonGroup>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
