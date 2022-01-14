import { Table, Thead, Tr, Th, Tbody, Td, Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { useAsyncDebounce } from 'react-table';
import React, { useState } from 'react';
import { Search2Icon, SearchIcon } from '@chakra-ui/icons';

const TWO_HUNDRED_MS = 200;

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, TWO_HUNDRED_MS);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input
        value={value || ''}
        onChange={(e) => {
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
    <Table {...getTableProps()}>
      <Thead>
        <Tr>
          <Th colSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Th>
        </Tr>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <Tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <Th key={key} {...restColumn}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}</span>
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <Tr key={key} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <Td key={key} {...restCellProps}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
