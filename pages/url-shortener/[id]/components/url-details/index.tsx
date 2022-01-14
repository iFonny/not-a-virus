import { Button } from '@chakra-ui/button';
import { useClipboard } from '@chakra-ui/hooks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/layout';
import { StatGroup, Stat, StatLabel, StatNumber, Badge, useColorModeValue } from '@chakra-ui/react';
import InputReadOnlyClipboard from '@components/form/input-readonly-clipboard';
import { Url } from 'api/urls';
import { useDeleteUrl } from 'api/urls/hooks';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import { ButtonDelete } from 'src/components-ui /button/delete';
import routes from 'src/constants/routes';

interface Props {
  url: Url;
}

export function UrlDetails({ url }: Props) {
  const urlWithoutHttp = `${process.env.NEXT_PUBLIC_BASE_HOST}/u/${url.urlCode}`; // to handle custom domains in the future?
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${url.urlCode}`;

  const router = useRouter();
  const { value, hasCopied, onCopy } = useClipboard(fullUrl);
  const { mutateAsync: mutateDeleteUrl } = useDeleteUrl();

  const handleDeleteUrl = async (urlId: string | number) => {
    await mutateDeleteUrl(urlId)
      .then(() => router.push(routes.urls.list))
      .catch(() => {}); // Error toast already handled in _app.tsx
  };

  return (
    <Container maxWidth="2xl" centerContent>
      <Flex p="2" border="1px" borderRadius="12" borderColor={useColorModeValue('gray.300', 'gray.600')} width="full">
        <Box p="2">
          <Link href={value} color="teal.500" isExternal>
            {urlWithoutHttp} <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </Box>
      </Flex>

      <Box
        mt="4"
        p="5"
        border="1px"
        borderRadius="12"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
        width="full"
      >
        <Flex mb="4">
          <Heading size="lg" textTransform="capitalize" textAlign="left">
            {url.name}
          </Heading>
          <Spacer />
          <ButtonDelete
            type="icon"
            popoverBody="Are you sure you want to delete this url?"
            onDelete={() => handleDeleteUrl(url.id)}
          />
        </Flex>

        <InputReadOnlyClipboard value={url.longUrl} />

        {url.description && <Text mt="4">{url.description}</Text>}

        <StatGroup mt="4">
          <Stat>
            <StatLabel>Created at</StatLabel>
            <StatNumber>
              <Badge>{format(parseISO(url.createdAt), 'Pp')}</Badge>
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>{url.clickCount}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Container>
  );
}

export default UrlDetails;
