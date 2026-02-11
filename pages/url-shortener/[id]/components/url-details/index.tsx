import { Box, Container, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from "../../../../../src/components/ui/color-mode";
import { Steps, Stat, Badge } from '@chakra-ui/react';
import InputReadOnlyClipboard from '@components/form/input-readonly-clipboard';
import { Url } from 'api/urls';
import { useDeleteUrl } from 'api/urls/hooks';
import { format, parseISO } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BoxClipboard from 'pages/url-shortener/[id]/components/BoxClipboard';
import { ButtonDelete } from 'src/components-ui /button/delete';
import routes from 'src/constants/routes';

interface Props {
  url: Url;
}

export function UrlDetails({ url }: Props) {
  const { data: session } = useSession();
  const urlWithoutHttp = `${process.env.NEXT_PUBLIC_BASE_HOST}/u/${url.urlCode}`; // to handle custom domains in the future?
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${url.urlCode}`;

  const router = useRouter();
  const { mutateAsync: mutateDeleteUrl } = useDeleteUrl();

  const handleDeleteUrl = async (urlId: string | number) => {
    await mutateDeleteUrl(urlId)
      .then(() => router.push(routes.urls.list))
      .catch(() => {}); // Error toast already handled in _app.tsx
  };

  return (
    <Container maxWidth="2xl" centerContent>
      <VStack width="full">
        <BoxClipboard value={fullUrl} label={urlWithoutHttp} />
        <BoxClipboard value={`https://en-f.eu/u/${url.urlCode}`} label={`en-f.eu/u/${url.urlCode}`} />
        {session?.user.role === 'ADMIN' && (
          <>
            <BoxClipboard value={`https://virus.gouv.fr/u/${url.urlCode}`} label={`virus.gouv.fr/u/${url.urlCode}`} />
            <BoxClipboard value={`https://image.gouv.fr/u/${url.urlCode}`} label={`image.gouv.fr/u/${url.urlCode}`} />
            <BoxClipboard value={`https://game.gouv.fr/u/${url.urlCode}`} label={`game.gouv.fr/u/${url.urlCode}`} />
          </>
        )}
      </VStack>
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

        <Stat.Root mt="4">
          <Stat.Root>
            <Stat.Label>Created at</Stat.Label>
            <Stat.ValueText>
              <Badge>{format(parseISO(url.createdAt), 'Pp')}</Badge>
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root>
            <Stat.Label>Clicked</Stat.Label>
            <Stat.ValueText>{url.clickCount}</Stat.ValueText>
          </Stat.Root>
        </Stat.Root>
      </Box>
    </Container>
  );
}

export default UrlDetails;
