import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function PageUrl() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <div>id: {id} TODO</div>
      <br />
      <br />
      <br />
      <br />
      {/* <UrlDetails url={url} /> */}
    </div>
  );
}

PageUrl.auth = true;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageUrl;
