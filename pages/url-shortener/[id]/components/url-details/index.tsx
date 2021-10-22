import { Button } from '@chakra-ui/button';
import { useClipboard } from '@chakra-ui/hooks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/layout';
import { StatGroup, Stat, StatLabel, StatNumber, Badge } from '@chakra-ui/react';
import InputReadOnlyClipboard from '@components/form/input-readonly-clipboard';
import { Url } from 'api/urls';
import { format, parseISO } from 'date-fns';

interface Props {
  url: Url;
}

export function UrlDetails({ url }: Props) {
  const urlWithoutHttp = `${process.env.NEXT_PUBLIC_BASE_HOST}/u/${url.urlCode}`; // to handle custom domains in the future?
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${url.urlCode}`;

  const { value, hasCopied, onCopy } = useClipboard(fullUrl);

  return (
    <Container maxWidth="2xl" centerContent>
      <Flex p="2" border="1px" borderRadius="12" borderColor="gray" width="full">
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

      <Box mt="4" p="5" border="1px" borderRadius="12" borderColor="gray" width="full">
        <Heading size="lg" mb="4" textTransform="capitalize" textAlign="left">
          {url.name}
        </Heading>

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
