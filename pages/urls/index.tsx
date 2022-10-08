import { AlertDescription, AlertIcon, Box, Alert, Heading, Link, Spinner } from '@chakra-ui/react';
import { Url } from 'api/urls';
import { useDeleteUrl, useGetAllUrls } from 'api/urls/hooks';
import { getSession, GetSessionParams } from 'next-auth/react';
import routes from 'src/constants/routes';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { TableLayout } from '@components/table';
import NextLink from 'next/link';
import { RoleEnum } from '.prisma/client';
import { ButtonDelete } from 'src/components-ui /button/delete';

const UrlsTableInstance = ({ tableData, onDeleteUrl }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      { Header: 'Name', accessor: 'nameComponent' },
      { Header: 'Url', accessor: 'shortUrlComponent', isVisible: true },
      { Header: 'Original', accessor: 'longUrlComponent', isVisible: false },

      // Hidden colums for search
      { id: 'nameAlt', accessor: 'name' },
      { id: 'shortUrlAlt', accessor: 'shortUrl' },
      { id: 'longUrlAlt', accessor: 'longUrl' },

      {
        accessor: '[deleteButton]',
        Cell: function DeleteButton(cellObj: { row: { original: Url } }) {
          return (
            <ButtonDelete
              type="icon"
              popoverBody="Are you sure you want to delete this url?"
              onDelete={() => onDeleteUrl(cellObj.row.original.id)}
            />
          );
        },
        disableSortBy: true,
      },
    ];
    return [columns, tableData];
  }, [tableData, onDeleteUrl]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: ['nameAlt', 'shortUrlAlt', 'longUrlAlt'] },
    },
    useGlobalFilter,
    useSortBy,
  );

  return <TableLayout {...tableInstance} />;
};

const PageUrls = () => {
  const [tableData, setTableData] = useState<unknown[]>(null);

  const { data, error, status } = useGetAllUrls();
  const { mutateAsync: mutateDeleteUrl } = useDeleteUrl();

  const handleDeleteUrl = async (urlId: string | number) => await mutateDeleteUrl(urlId).catch(() => {}); // Error toast already handled in _app.tsx

  useEffect(() => {
    setTableData(
      data?.urls?.map((url) => ({
        ...url,
        nameComponent: (
          <>
            <NextLink href={routes.urlShortener.show(url.id)} passHref>
              <Link color="teal.500">{url.name}</Link>
            </NextLink>{' '}
            ({url.clickCount} clicks)
          </>
        ),
        longUrlComponent: (
          <Link href={url.longUrl} isExternal>
            {url.longUrl} <ExternalLinkIcon pb="2px" />
          </Link>
        ),
        shortUrlComponent: (
          <Link href={url.shortUrl} isExternal>
            {url.shortUrl} <ExternalLinkIcon pb="2px" />
          </Link>
        ),
      })),
    );
  }, [data]);

  return (
    <Box textAlign="center" mt={3} paddingX={5}>
      <Heading mb={3}>URLs</Heading>

      {status === 'error' && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {status === 'loading' && <Spinner />}

      {status === 'success' &&
        (!tableData ? 'Empty' : <UrlsTableInstance tableData={tableData} onDeleteUrl={handleDeleteUrl} />)}
    </Box>
  );
};

PageUrls.auth = true;
PageUrls.authRoles = [RoleEnum.USER, RoleEnum.ADMIN];
export const getServerSideProps = async (ctx: GetSessionParams) => ({ props: { session: await getSession(ctx) } });

export default PageUrls;
