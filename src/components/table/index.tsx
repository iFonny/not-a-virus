import {
  Steps,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
} from '@chakra-ui/react';
import { useAsyncDebounce } from 'react-table';
import React, { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

const TWO_HUNDRED_MS = 200;

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, TWO_HUNDRED_MS);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon color="gray.300" asChild><LuSearch /></Icon>
      </InputLeftElement>
      <Input
        value={String(value || '')}
        onValueChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search"
      />
    </InputGroup>
  );
}

export const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  state: { globalFilter },
  visibleColumns,
  preGlobalFilteredRows,
  setGlobalFilter,
}) => {
  return (
    <Table.Root {...getTableProps()}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader colSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Table.ColumnHeader>
        </Table.Row>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <Table.Row key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <Table.ColumnHeader key={key} {...restColumn}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}</span>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <Table.Row key={key} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <Table.Cell key={key} {...restCellProps}>
                    {cell.render('Cell')}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
