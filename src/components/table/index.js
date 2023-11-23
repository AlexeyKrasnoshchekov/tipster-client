import React from 'react';
import { useSortBy, useTable } from 'react-table';

export default function Table({ columns, data, initialState, bttsEv, overEv, winEv,to15O25,to15W,to15B }) {
  // Use the useTable Hook to send the columns and data to build the table
  console.log('winEv',winEv);
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({ columns, data, initialState }, useSortBy);

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
      styleObject.backgroundColor = value === 'true' ? 'yellow' : 'black';
    }

    //btts prod table clours
    if (bttsEv && header === 'Btts Yes Count') {
      styleObject.backgroundColor = value > bttsEv.totalBttsYesEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Count1') {
      styleObject.backgroundColor = value > bttsEv.totalCountEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Acc Count1') {
      styleObject.backgroundColor = value > bttsEv.totalAccaCountEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Ev Btts Yes Eff') {
      styleObject.backgroundColor = value > bttsEv.totalBttsYesEffEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Ev Over05 Eff1') {
      styleObject.backgroundColor = value > bttsEv.totalOver05EffEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Ev Over15 Eff1') {
      styleObject.backgroundColor = value > bttsEv.totalOver15EffEv ? 'lightgreen' : 'pink';
    }
    if (bttsEv && header === 'Under 25 Num1') {
      styleObject.backgroundColor = value < bttsEv.totalUnder25Count ? 'lightgreen' : 'pink';
    }

    //over prod table clours
    if (overEv && header === 'Count2') {
      styleObject.backgroundColor = value > overEv.totalCountEv ? 'lightgreen' : 'pink';
    }
    if (overEv && header === 'Acc Count2') {
      styleObject.backgroundColor = value > overEv.totalAccaCountEv ? 'lightgreen' : 'pink';
    }
    if (overEv && header === 'Ev Over05 Eff2') {
      styleObject.backgroundColor = value > overEv.totalOver05EffEv ? 'lightgreen' : 'pink';
    }
    if (overEv && header === 'Ev Over15 Eff2') {
      styleObject.backgroundColor = value > overEv.totalOver15EffEv ? 'lightgreen' : 'pink';
    }
    if (overEv && header === 'Ev Over25 Eff2') {
      styleObject.backgroundColor = value > overEv.totalOver25EffEv ? 'lightgreen' : 'pink';
    }
    if (overEv && header === 'Under 25 Num2') {
      styleObject.backgroundColor = value < overEv.totalUnder25Count ? 'lightgreen' : 'pink';
    }

    //win prod table clours
    if (winEv && header === 'Count3') {
      styleObject.backgroundColor = value > winEv.totalCountEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Acc Count3') {
      styleObject.backgroundColor = value > winEv.totalAccaCountEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Win Count') {
      styleObject.backgroundColor = value > winEv.totalWinCountEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Ev WinYes Eff') {
      styleObject.backgroundColor = value > winEv.totalWinYesEffEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Ev Over05 Eff3') {
      styleObject.backgroundColor = value > winEv.totalOver05EffEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Ev Over15 Eff3') {
      styleObject.backgroundColor = value > winEv.totalOver15EffEv ? 'lightgreen' : 'pink';
    }
    if (winEv && header === 'Under 25 Num3') {
      styleObject.backgroundColor = value < winEv.totalUnder25Count ? 'lightgreen' : 'pink';
    }

    //full table prod table clours
    if (header === 'CountU') {
      styleObject.backgroundColor = value >= 2 ? 'yellow' : 'transparent';
    }
    if (header === 'Top O15O') {
      styleObject.backgroundColor = value >= 1 ? 'lightgreen' : 'transparent';
    }
    if (header === 'Top O15B') {
      styleObject.backgroundColor = value >= 1 ? 'lightgreen' : 'transparent';
    }
    if (header === 'Top O15W') {
      styleObject.backgroundColor = value >= 1 ? 'lightgreen' : 'transparent';
    }
    // if (header === 'CountU') {
    //   styleObject.backgroundColor = value >= 2 ? 'yellow' : 'transparent';
    // }


    if (header === 'Over Yes') {
      styleObject.backgroundColor = value === 'true' ? 'yellow' : 'black';
    }
    if (header === 'Draw Yes') {
      styleObject.backgroundColor = value === 'true' ? 'yellow' : 'black';
    }
    if (header === 'Under Yes') {
      styleObject.backgroundColor = value === 'true' ? 'yellow' : 'black';
    }
    if (header === 'Win Yes') {
      styleObject.backgroundColor = value === 'true' ? 'yellow' : 'black';
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
                <span style={{marginLeft: '5px'}}>
                  {column.isSorted ? (column.isSortedDesc ? 1 : 2) : ""}
                </span>
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
