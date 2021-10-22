import {
  AlertDescription,
  AlertIcon,
  Box,
  Alert,
  Heading,
  Link,
  Spinner,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { Url } from 'api/urls';
import { useDeleteUrl, useGetAllUrls } from 'api/urls/hooks';
import { getSession } from 'next-auth/react';
import routes from 'src/constants/routes';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import React, { useState, useMemo, useEffect } from 'react';
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { TableLayout } from '@components/table';
import NextLink from 'next/link';

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
            <Popover>
              <PopoverTrigger>
                <IconButton colorScheme="red" aria-label="Delete url" icon={<DeleteIcon />} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Are you sure you want to delete this url?</PopoverBody>
                <PopoverFooter d="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button variant="outline">Cancel</Button>
                    <Button colorScheme="red" onClick={() => onDeleteUrl(cellObj.row.original.id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
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
  const [tableData, setTableData] = useState(null);

  const { isLoading, isError, data, error } = useGetAllUrls();
  const { mutateAsync: mutateDeleteUrl } = useDeleteUrl();

  const handleDeleteUrl = async (urlId: string | number) => await mutateDeleteUrl(urlId);

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

      {isError && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {isLoading || !tableData ? (
        <Spinner />
      ) : (
        <UrlsTableInstance tableData={tableData} onDeleteUrl={handleDeleteUrl} />
      )}
    </Box>
  );
};

PageUrls.auth = true;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageUrls;
