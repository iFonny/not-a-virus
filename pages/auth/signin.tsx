import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box } from '@chakra-ui/layout';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, signIn } from 'next-auth/react';
import { SiDiscord } from 'react-icons/si';

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const icons = {
  discord: <Icon as={SiDiscord} w={6} h={6} />,
};

export default function SignIn({ providers }: Props) {
  return (
    <Box textAlign="center" paddingY={125}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button size="lg" leftIcon={icons[provider.id]} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </Box>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session?.user) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      providers: await getProviders(),
    },
  };
}
