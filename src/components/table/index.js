import React from 'react';
import { useSortBy, useTable } from 'react-table';

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({ columns, data }, useSortBy);

  const combinedCellProps = (defaultCellProps, { cell }) => {
    return [
      defaultCellProps,
      generateCellStyles(cell.value, cell.column.Header),
    ];
  };

  const generateCellStyles = (value, header) => {
    let styleObject = {
      backgroundColor: 'transparent',
      textAlign: 'center',
    };

    // color BttsYes data
    if (header === 'Btts Yes') {
      styleObject.backgroundColor = value ? 'yellow' : 'black';
    }
    if (header === 'Home Team') {
      styleObject.textAlign = 'left';
    }
    if (header === 'Away Team') {
      styleObject.textAlign = 'left';
    }

    return {
      style: styleObject,
    };
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? 'sort-desc'
                      : 'sort-asc'
                    : ''
                }
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps(combinedCellProps)}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
