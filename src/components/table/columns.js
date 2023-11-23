//TABLE

export const columnsBttsAdm = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  
  {
    // first group - TV Show
    Header: 'Over & Btts',
    // First group columns
    columns: [
      {
        Header: 'Count',
        accessor: 'count',
      },
      {
        Header: 'Acc Count',
        accessor: 'numAcca',
      },
      {
        Header: 'Btts Yes Num',
        accessor: 'bttsYesNum',
      },
      {
        Header: 'Btts No Num',
        accessor: 'bttsNoNum',
      },
    ],
  },
  {
    Header: 'Ev o05',
    accessor: 'everageOver05Eff',
  },

  // {
  //   // first group - TV Show
  //   Header: "Btts",
  //   // First group columns
  //   columns: [
  //     {
  //       Header: "Btts Count",
  //       accessor: "bttsCount",
  //     },
  //     {
  //       Header: "Acc Count",
  //       accessor: "bttsAccaCount",
  //     },
  //     {
  //       Header: "Btts Yes Num",
  //       accessor: "bttsYesNum",
  //     },
  //     {
  //       Header: "Btts No Num",
  //       accessor: "bttsNoNum",
  //     },
  //   ],
  // },
  // {
  //   // first group - TV Show
  //   Header: "Over25",
  //   // First group columns
  //   columns: [
  //     {
  //       Header: "O25 Count",
  //       accessor: "overCount",
  //     },
  //     {
  //       Header: "Acc Count",
  //       accessor: "overAccaCount",
  //     }
  //   ],
  // },
  {
    // first group - TV Show
    Header: 'Under25',
    // First group columns
    columns: [
      {
        Header: 'U25 Count',
        accessor: 'underCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'underAccaCount',
      },
    ],
  },
  {
    // first group - TV Show
    Header: 'Win',
    // First group columns
    columns: [
      {
        Header: 'Win Count',
        accessor: 'winCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'winAccaCount',
      },
    ],
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  {
    Header: 'Over 05',
    accessor: 'over05',
  },
  // {
  //   // first group - TV Show
  //   Header: "Draw",
  //   // First group columns
  //   columns: [
  //     {
  //       Header: "Draw Count",
  //       accessor: "drawCount",
  //     },
  //     {
  //       Header: "Acc Count",
  //       accessor: "drawAccaCount",
  //     }
  //   ],
  // },
];
export const columnsFullTable = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'All Count',
    accessor: 'allCount',
  },
  {
    Header: 'All Ev 15',
    accessor: 'allEv15',
  },
  {
    // first group - TV Show
    Header: 'Over',
    columns: [
      {
        Header: 'Count',
        accessor: 'overCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'overAccaCount',
      },
      {
        Header: 'Ev O15 EffO',
        accessor: 'everageOver15EffO',
      },
      {
        Header: 'Top O15O',
        accessor: 'countTopO15O',
      },
    ],
  },
  {
    // first group - TV Show
    Header: 'Btts',
    columns: [
      {
        Header: 'Count',
        accessor: 'bttsCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'bttsAccaCount',
      },
      {
        Header: 'BttsYes',
        accessor: 'bttsYesNum',
      },
      {
        Header: 'Btts No',
        accessor: 'bttsNoNum',
      },
      {
        Header: 'Ev O15 EffB',
        accessor: 'everageOver15EffB',
      },
      {
        Header: 'Top O15B',
        accessor: 'countTopO15B',
      },
    ],
  },
  {
    // first group - TV Show
    Header: 'Win',
    columns: [
      {
        Header: 'Count',
        accessor: 'winCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'winAccaCount',
      },
      {
        Header: 'Ev O15 EffW',
        accessor: 'everageOver15EffW',
      },
      {
        Header: 'Top O15W',
        accessor: 'countTopO15W',
      },
    ],
  },
  {
    // first group - TV Show
    Header: 'Under',
    columns: [
      {
        Header: 'CountU',
        accessor: 'underCount',
      },
      {
        Header: 'Acc Count',
        accessor: 'underAccaCount',
      },
    ],
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  {
    Header: 'Date2',
    accessor: 'updatedAt',
  },
];

//PROD TABLES
export const columnsBttsProd = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'Count1',
    accessor: 'count',
  },
  {
    Header: 'Acc Count1',
    accessor: 'numAcca',
  },
  {
    Header: 'Btts Yes Count',
    accessor: 'bttsYesNum',
  },
  {
    Header: 'Btts No Count',
    accessor: 'bttsNoNum',
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  // {
  //   Header: 'Btts Yes',
  //   accessor: 'bttsRes',
  // },
  // {
  //   Header: 'Over 05',
  //   accessor: 'over05',
  // },
  // {
  //   Header: 'High Btts Yes Eff',
  //   accessor: 'highBttsYesEff',
  // },
  {
    Header: 'Ev Btts Yes Eff',
    accessor: 'everageBttsYesEffB',
  },
  // {
  //   Header: 'Low Btts Yes Eff',
  //   accessor: 'lowBttsYesEff',
  // },
  // {
  //   Header: 'High Over05 Eff',
  //   accessor: 'highOver05YesEff',
  // },
  {
    Header: 'Ev Over05 Eff1',
    accessor: 'everageOver05YesEffB',
  },
  // {
  //   Header: 'Low Over05 Eff',
  //   accessor: 'lowOver05Eff',
  // },
  // {
  //   Header: 'High Over15 Eff',
  //   accessor: 'highOver15YesEff',
  // },
  {
    Header: 'Ev Over15 Eff1',
    accessor: 'everageOver15YesEffB',
  },
  // {
  //   Header: 'Low Over15 Eff',
  //   accessor: 'lowOver15Eff',
  // },
  {
    Header: 'Top o05',
    accessor: 'countTopO05B',
  },
  {
    Header: 'Top o15',
    accessor: 'countTopO15B',
  },
  {
    Header: 'Under 25 Num1',
    accessor: 'under25Count',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Date2',
    accessor: 'updatedAt',
  },
];
export const columnsOverProd = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'Count2',
    accessor: 'count',
  },
  {
    Header: 'Acc Count2',
    accessor: 'numAcca',
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  // {
  //   Header: 'Over Yes',
  //   accessor: 'overYes',
  // },
  // {
  //   Header: 'Over 05',
  //   accessor: 'over05',
  // },
  // {
  //   Header: 'High Over05 Eff',
  //   accessor: 'highOver05Eff',
  // },
  {
    Header: 'Ev Over05 Eff2',
    accessor: 'everageOver05EffO',
  },
  // {
  //   Header: 'Low Over05 Eff',
  //   accessor: 'lowOver05Eff',
  // },
  // {
  //   Header: 'High Over15 Eff',
  //   accessor: 'highOver15Eff',
  // },
  {
    Header: 'Ev Over15 Eff2',
    accessor: 'everageOver15EffO',
  },
  // {
  //   Header: 'Low Over15 Eff',
  //   accessor: 'lowOver15Eff',
  // },
  // {
  //   Header: 'High Over25 Eff',
  //   accessor: 'highOver25Eff',
  // },
  {
    Header: 'Ev Over25 Eff2',
    accessor: 'everageOver25EffO',
  },
  // {
  //   Header: 'Low Over25 Eff',
  //   accessor: 'lowOver25Eff',
  // },
  {
    Header: 'Top o05',
    accessor: 'countTopO05O',
  },
  {
    Header: 'Top o15',
    accessor: 'countTopO15O',
  },
  {
    Header: 'Top o25',
    accessor: 'countTopO25O',
  },
  {
    Header: 'Under 25 Num2',
    accessor: 'under25Count',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Date2',
    accessor: 'updatedAt',
  },
  // {
  //   Header: 'Sources',
  //   accessor: 'sources',
  // },
];
export const columnsUnderProd = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'Count',
    accessor: 'count',
  },
  {
    Header: 'Acc Count',
    accessor: 'numAcca',
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  // {
  //   Header: 'Under Yes',
  //   accessor: 'underYes',
  // },
  // {
  //   Header: 'Under 45',
  //   accessor: 'under45',
  // },
  // {
  //   Header: 'High Under25 Eff',
  //   accessor: 'highUnder25Eff',
  // },
  {
    Header: 'Ev Under25 Eff',
    accessor: 'everageUnder25EffU',
  },
  // {
  //   Header: 'Low Under25 Eff',
  //   accessor: 'lowUnder25Eff',
  // },
  // {
  //   Header: 'High Under35 Eff',
  //   accessor: 'highUnder35Eff',
  // },
  {
    Header: 'Ev Under35 Eff',
    accessor: 'everageUnder35EffU',
  },
  // {
  //   Header: 'Low Under35 Eff',
  //   accessor: 'lowUnder35Eff',
  // },
  // {
  //   Header: 'High Under45 Eff',
  //   accessor: 'highUnder45Eff',
  // },
  {
    Header: 'Ev Under45 Eff',
    accessor: 'everageUnder45EffU',
  },
  // {
  //   Header: 'Low Under45 Eff',
  //   accessor: 'lowUnder45Eff',
  // },
  {
    Header: 'Under 35 Top',
    accessor: 'countTopU35',
  },
  {
    Header: 'Under 45 Top',
    accessor: 'countTopU45',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Date2',
    accessor: 'updatedAt',
  },
];
export const columnsWinProd = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'Prediction',
    accessor: 'prediction',
  },
  {
    Header: 'Count3',
    accessor: 'count',
  },
  {
    Header: 'Acc Count3',
    accessor: 'numAcca',
  },
  {
    Header: 'Win Count',
    accessor: 'winNum',
  },
  {
    Header: 'Xwin Count',
    accessor: 'xwinNum',
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  // {
  //   Header: 'Win Yes',
  //   accessor: 'winRes',
  // },
  // {
  //   Header: 'Over 05',
  //   accessor: 'over05',
  // },
  // {
  //   Header: 'High WinYes Eff',
  //   accessor: 'highWinYesEff',
  // },
  {
    Header: 'Ev WinYes Eff',
    accessor: 'everageWinYesEffW',
  },
  // {
  //   Header: 'Low WinYes Eff',
  //   accessor: 'lowWinYesEff',
  // },
  // {
  //   Header: 'High Over05 Eff',
  //   accessor: 'highOver05Eff',
  // },
  {
    Header: 'Ev Over05 Eff3',
    accessor: 'everageOver05EffW',
  },
  // {
  //   Header: 'Low Over05 Eff',
  //   accessor: 'lowOver05Eff',
  // },
  // {
  //   Header: 'High Over15 Eff',
  //   accessor: 'highOver15Eff',
  // },
  {
    Header: 'Ev Over15 Eff3',
    accessor: 'everageOver15EffW',
  },
  // {
  //   Header: 'Low Over15 Eff',
  //   accessor: 'lowOver15Eff',
  // },
  {
    Header: 'Top o05',
    accessor: 'countTopO05W',
  },
  {
    Header: 'Top o15',
    accessor: 'countTopO15W',
  },
  {
    Header: 'Under 25 Num3',
    accessor: 'under25Count',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Date2',
    accessor: 'updatedAt',
  },
];
export const columnsDrawProd = [
  {
    Header: 'Home Team',
    accessor: 'homeTeam',
  },
  {
    Header: 'Away Team',
    accessor: 'awayTeam',
  },
  {
    Header: 'Count',
    accessor: 'count',
  },
  {
    Header: 'Acc Count',
    accessor: 'numAcca',
  },
  {
    Header: 'Result',
    accessor: 'resultScore',
  },
  {
    Header: 'Draw Yes',
    accessor: 'drawYes',
  },
  {
    Header: 'High DrawYes Eff',
    accessor: 'highDrawYesEff',
  },
  {
    Header: 'Ev DrawYes Eff',
    accessor: 'everageDrawYesEffD',
  },
  {
    Header: 'Low DrawYes Eff',
    accessor: 'lowDrawYesEff',
  },
];
//DAILY STAT TOTALS TABLES
export const columnsBttsDailyStat = [
  {
    Header: 'Source',
    accessor: 'source',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
  {
    Header: 'Total Preds',
    accessor: 'totalPreds',
  },
  {
    Header: 'Total Preds Yes',
    accessor: 'totalPredsYes',
  },
  {
    Header: 'Btts Yes Count',
    accessor: 'bttsYesCount',
  },
  {
    Header: 'Over 05 Count',
    accessor: 'over05Count',
  },
];
export const columnsOverDailyStat = [
  {
    Header: 'Source',
    accessor: 'source',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
  {
    Header: 'Total Preds',
    accessor: 'totalPreds',
  },
  {
    Header: 'Over 05 count',
    accessor: 'over05Count',
  },
  {
    Header: 'Over 15 count',
    accessor: 'over15Count',
  },
  {
    Header: 'Over 25 count',
    accessor: 'over25Count',
  },
];
export const columnsUnderDailyStat = [
  {
    Header: 'Source',
    accessor: 'source',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
  {
    Header: 'Total Preds',
    accessor: 'totalPreds',
  },
  {
    Header: 'Under 25 count',
    accessor: 'under25Count',
  },
  {
    Header: 'Under 35 count',
    accessor: 'under35Count',
  },
  {
    Header: 'Under 45 count',
    accessor: 'under45Count',
  },
];
export const columnsWinDailyStat = [
  {
    Header: 'Source',
    accessor: 'source',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
  {
    Header: 'Total Preds',
    accessor: 'totalPreds',
  },
  {
    Header: 'Win Yes Count',
    accessor: 'winYesCount',
  },
];
export const columnsDrawDailyStat = [
  {
    Header: 'Source',
    accessor: 'source',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
  {
    Header: 'Total Preds',
    accessor: 'totalPreds',
  },
  {
    Header: 'Draw Yes Count',
    accessor: 'drawYesCount',
  },
];

//TOTAL STAT TOTALS TABLES
export const columnsBttsTotalStat = [
    {
      Header: 'Source',
      accessor: 'source',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Total Preds',
      accessor: 'totalPreds',
    },
    {
      Header: 'Total Preds Yes',
      accessor: 'totalPredsYes',
    },
    {
      Header: 'Btts Yes Count',
      accessor: 'bttsYesCount',
    },
    {
      Header: 'Btts Yes Eff',
      accessor: 'bttsYesEff',
    },
    {
      Header: 'Over 05 Count',
      accessor: 'over05Count',
    },
    {
      Header: 'Over 05 Eff',
      accessor: 'over05Eff',
    },
    {
      Header: 'Over 15 Count',
      accessor: 'over15Count',
    },
    {
      Header: 'Over 15 Eff',
      accessor: 'over15Eff',
    },
  ];
  export const columnsOverTotalStat = [
    {
      Header: 'Source',
      accessor: 'source',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Total Preds',
      accessor: 'totalPreds',
    },
    {
      Header: 'Over 05 count',
      accessor: 'over05Count',
    },
    {
      Header: 'Over 05 Eff',
      accessor: 'over05Eff',
    },
    {
      Header: 'Over 15 count',
      accessor: 'over15Count',
    },
    {
      Header: 'Over 15 Eff',
      accessor: 'over15Eff',
    },
    {
      Header: 'Over 25 count',
      accessor: 'over25Count',
    },
    {
      Header: 'Over 25 Eff',
      accessor: 'over25Eff',
    },
   
  ];
  export const columnsUnderTotalStat = [
    {
      Header: 'Source',
      accessor: 'source',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Total Preds',
      accessor: 'totalPreds',
    },
    {
      Header: 'Under 25 count',
      accessor: 'under25Count',
    },
    {
      Header: 'Under 25 Eff',
      accessor: 'under25Eff',
    },
    {
      Header: 'Under 35 count',
      accessor: 'under35Count',
    },
    {
      Header: 'Under 35 Eff',
      accessor: 'under35Eff',
    },
    {
      Header: 'Under 45 count',
      accessor: 'under45Count',
    },
    {
      Header: 'Under 45 Eff',
      accessor: 'under45Eff',
    },
   
  ];
  export const columnsWinTotalStat = [
    {
      Header: 'Source',
      accessor: 'source',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Total Preds',
      accessor: 'totalPreds',
    },
    {
      Header: 'Win Yes Count',
      accessor: 'winYesCount',
    },
    {
      Header: 'Win Yes Eff',
      accessor: 'winYesEff',
    },
    {
        Header: 'Over 05 Count',
        accessor: 'over05Count',
      },
      {
        Header: 'Over 05 Eff',
        accessor: 'over05Eff',
      },
      {
        Header: 'Over 15 Count',
        accessor: 'over15Count',
      },
      {
        Header: 'Over 15 Eff',
        accessor: 'over15Eff',
      },
  ];
  export const columnsDrawTotalStat = [
    {
      Header: 'Source',
      accessor: 'source',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Total Preds',
      accessor: 'totalPreds',
    },
    {
      Header: 'Draw Yes Count',
      accessor: 'drawYesCount',
    },
    {
      Header: 'Draw Yes Eff',
      accessor: 'drawYesEff',
    },
  ];
