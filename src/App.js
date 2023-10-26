import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from './context/context';
import './App.css';
// import { getResultsMongo } from './api/getResultsMongo';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import React from 'react';

import { AppBar } from '@mui/material';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { deleteResultsTotalMongo } from './api/deleteResultsTotalMongo';
import { getClubStat } from './api/getClubStat';

import {
  deleteBtts,
  getBtts,
  loadBtts,
  loadBttsWithVpn,
  saveBtts,
} from './api/btts';
import {
  deleteUnder,
  getUnder,
  loadUnder,
  loadUnderWithVpn,
  saveUnder,
} from './api/under';
import {
  deleteWin,
  getWinData,
  loadWin,
  loadWinWithVpn,
  saveWinData,
} from './api/win';
import { loadTest } from './api/test';
import {
  deleteResult,
  getResult,
  getResultTotal,
  getZeroCounter,
  loadResult,
  saveResultTotal,
  saveZeroCounter,
} from './api/result';
import {
  deleteOverData,
  loadCrawlData,
  loadOverData,
  loadOverDataWithVpn,
} from './api/over';
import { getHomeTeamName, getSourcesProd, getSourcesProdInverse, sortData } from './utils';
import Counter from './components/counter';
import { deleteDraw, getDraw, loadDraw, loadDrawWithVpn } from './api/draw';
import Table from './components/table';
import { getBttsProd, getDrawProd, getOverProd, getUnderProd, getWinProd, saveBttsProd, saveDrawProd, saveOverProd, saveUnderProd, saveWinProd, updateBttsProd, updateDrawProd, updateOverProd, updateUnderProd, updateWinProd } from './api/prod';

function App() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = format(yesterday, 'dd.MM.yyyy');
  const yesterdayString = formattedYesterday.toString();

  const {
    setResultsTotal,
    zeroCounter,
    increment,
    pushMatches,
    bttsSources,
    o25Sources,
    u25Sources,
    winSources,
    drawSources,
    setBttsSources,
    setO25Sources,
    setCounterFromMongo,
    setCounterFromMongoYesterday,
    calcTotal,
  } = useContext(context);

  // console.log('zeroCounterYesterday', zeroCounterYesterday);
  // console.log('zeroCounter', zeroCounter);

  //today draw total arrs
  let todayDrawStatArr = [];
  let todayWinStatArr = [];
  let todayOverStatArr = [];
  let todayUnderStatArr = [];
  let todayBttsStatArr = [];

  let todayDrawStatTotalArr = [];
  let todayWinStatTotalArr = [];
  let todayOverStatTotalArr = [];
  let todayUnderStatTotalArr = [];
  let todayBttsStatTotalArr = [];

  //stat totals
    const [todayStatDraw, setTodayStatDraw] = useState([]);
    const [todayStatBtts, setTodayStatBtts] = useState([]);
    const [todayStatOver, setTodayStatOver] = useState([]);
    const [todayStatUnder, setTodayStatUnder] = useState([]);
    const [todayStatWin, setTodayStatWin] = useState([]);

  //sources totals
    const [bttsSourcesLength, setBttsSourcesLength] = useState(0);
    const [overSourcesLength, setOverSourcesLength] = useState(0);
    const [winSourcesLength, setWinSourcesLength] = useState(0);
    const [underSourcesLength, setUnderSourcesLength] = useState(0);
    const [drawSourcesLength, setDrawSourcesLength] = useState(0);

  //production arrays
  const [productionBttsLocal, setProductionBtts] = useState([]);
  const [productionOverLocal, setProductionOver] = useState([]);
  const [productionUnderLocal, setProductionUnder] = useState([]);
  const [productionWinLocal, setProductionWin] = useState([]);
  const [productionDrawLocal, setProductionDraw] = useState([]);

  const [bttsLocal, setBttsLocal] = useState([]);
  const [bttsOnlyLocal, setBttsOnlyLocal] = useState([]);
  const [over25OnlyLocal, setOver25OnlyLocal] = useState([]);

  const [allRes, setAllRes] = useState([]);
  // const [bttsWLLocal, setBttsWLLocal] = useState([]);
  // const [isInclude, setIsInclude] = useState(false);
  const [winDataLocal, setWinDataLocal] = useState([]);
  const [drawDataLocal, setDrawDataLocal] = useState([]);
  // const [accasDataLocal, setAccasDataLocal] = useState([]);
  const [under25DataLocal, setUnder25DataLocal] = useState([]);
  const [resultsLocal, setResultsLocal] = useState([]);
  // const [todayBet, setTodayBet] = useState(null);
  const [resultsTotalLocal, setResultsTotalLocal] = useState([]);
  const [resultsTotalLocalFil, setResultsTotalLocalFil] = useState([]);
  const [todayDate, setDate] = useState('');
  const [showZero, setShowZero] = useState(false);
  const [addWin, setAddWinToBtts] = useState(false);
  const [bttsSourcesCount, setBttsSourcesCount] = useState({});
  const [overSourcesCount, setOverSourcesCount] = useState({});
  const [bttsHomeTeamCount, setBttsHomeTeamCount] = useState({});
  const [bttsAndOverArr, setBttsAndOverArr] = useState([]);
  const [winSourcesCount, setWinSourcesCount] = useState({});
  const [drawSourcesCount, setDrawSourcesCount] = useState({});
  const [teamDrawCount, setTeamDrawCount] = useState({});
  const [underSourcesCount, setUnderSourcesCount] = useState({});
  const [underHomeTeamCount, setUnderHomeTeamCount] = useState({});
  const [winPredTeamCount, setWinPredTeamCount] = useState({});
  const [clubStatLocal, setClubStatLocal] = useState(null);
  const [resultTotalSourcesCount, setResultTotalSourcesCount] = useState({});

  const [loader, setLoader] = useState(false);
  const [totalLoader, setTotalLoader] = useState(false);

  //for buttons
  const [winDataExist, setWinDataExist] = useState(false);
  const [drawDataExist, setDrawDataExist] = useState(false);
  const [bttsDataExist, setBttsDataExist] = useState(false);
  const [vpnDataExist, setVpnDataExist] = useState(false);
  const [overDataExist, setOverDataExist] = useState(false);
  const [crawlDataExist, setCrawlDataExist] = useState(false);
  const [resultDataExist, setResultDataExist] = useState(false);
  const [totalDataExist, setTotalDataExist] = useState(false);
  const [underDataExist, setUnderDataExist] = useState(false);

  //zero counter match inputs state
  const [matchesO25Tip_win, setMatchesO25Tip_win] = useState('');
  const [matchesO25Tip_high, setMatchesO25Tip_high] = useState('');
  const [matchesBettingtips_o25, setMatchesBettingtips_o25] = useState('');
  const [matchesWincomparator_o25, setMatchesWincomparator_o25] = useState('');
  const [matchesAccum_btts, setMatchesAccum_btts] = useState('');
  const [matchesFst_btts, setMatchesFst_btts] = useState('');
  const [matchesR2bet_o25, setMatchesR2bet_o25] = useState('');
  const [matchesHello_o25, setMatchesHello_o25] = useState('');
  const [matchesFbp_o25, setMatchesFbp_o25] = useState('');
  const [matchesFst_o25, setMatchesFst_o25] = useState('');
  const [matchesFootsuper_o25, setMatchesFootsuper_o25] = useState('');
  const [matchesFootsuper_btts, setMatchesFootsuper_btts] = useState('');
  const [matchesBettingtips_btts, setMatchesBettingtips_btts] = useState('');
  const [matchesProt_o25, setMatchesProt_o25] = useState('');
  const [matchesR2bet_btts, setMatchesR2bet_btts] = useState('');
  const [matchesGoalnow_o25, setMatchesGoalnow_o25] = useState('');
  const [matchesAccum_o25, setMatchesAccum_o25] = useState('');
  const [matchesWincomparator_btts, setMatchesWincomparator_btts] =
    useState('');
  const [matchesWincomparator_win, setMatchesWincomparator_win] = useState('');
  const [matchesMybets_win, setMatchesMybets_win] = useState('');
  const [matchesVenasbet_win, setMatchesVenasbet_win] = useState('');
  const [matchesProt_win, setMatchesProt_win] = useState('');
  const [matchesFooty_win, setMatchesFooty_win] = useState('');
  const [matchesBetgenuine_win, setMatchesBetgenuine_win] = useState('');
  const [matchesVitibet_win, setMatchesVitibet_win] = useState('');
  const [matchesVitibet_o25, setMatchesVitibet_o25] = useState('');
  const [matchesR2bet_win, setMatchesR2bet_win] = useState('');
  const [matchesMines_win, setMatchesMines_win] = useState('');
  const [matchesPassion_win, setMatchesPassion_win] = useState('');
  const [matchesFbp_win, setMatchesFbp_win] = useState('');
  const [matchesFootsuper_win, setMatchesFootsuper_win] = useState('');
  const [matchesHello_win, setMatchesHello_win] = useState('');
  const [matchesBettingtips_win, setMatchesBettingtips_win] = useState('');

  const [isNoFilVisible, setIsNoFilVisible] = useState(false);
  const [predType, setPredType] = useState('btts');
  const [isAcca, setIsAccaType] = useState('notAcca');

  // const [predTypeAcca, setPredTypeAcca] = useState('btts');
  const [homeTeamTotalPred, setHomeTeamTotalPred] = useState('');

  // const [homeTeamAccaPred, setHomeTeamAccaPred] = useState('');
  const [homeTeamWinPred, setHomeTeamWinPred] = useState('');
  const [predTeamWinPred, setPredTeamWinPred] = useState('');
  const [sourceTotalPred, setSourceTotalPred] = useState('betshoot');
  // const [sourceAccaPred, setSourceAccaPred] = useState('betshoot');
  const [sourceWinPred, setSourceWinPred] = useState('footsuper');

  const initialState = {
    sortBy: [
      {
        id: 'count',
        desc: true,
      },
    ],
  };

  //TABLE
  const columnsBttsProd = [
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Acc Count",
            accessor: "numAcca",
          },
          {
            Header: "Btts Yes Count",
            accessor: "bttsYesNum",
          },
          {
            Header: "Btts No Count",
            accessor: "bttsNoNum",
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Btts Yes",
            accessor: "bttsRes",
          },
          {
            Header: "Over 05",
            accessor: "over05",
          },
        ];
  const columnsBttsAdm = [
    
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            // first group - TV Show
            Header: "Over & Btts",
            // First group columns
            columns: [
              {
                Header: "Count",
                accessor: "count",
              },
              {
                Header: "Acc Count",
                accessor: "numAcca",
              },
              {
                Header: "Btts Yes Num",
                accessor: "bttsYesNum",
              },
              {
                Header: "Btts No Num",
                accessor: "bttsNoNum",
              },              
            ],
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
            Header: "Under25",
            // First group columns
            columns: [
              {
                Header: "U25 Count",
                accessor: "underCount",
              },
              {
                Header: "Acc Count",
                accessor: "underAccaCount",
              }
            ],
          },
          {
            // first group - TV Show
            Header: "Win",
            // First group columns
            columns: [
              {
                Header: "Win Count",
                accessor: "winCount",
              },
              {
                Header: "Acc Count",
                accessor: "winAccaCount",
              }
            ],
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Over 05",
            accessor: "over05",
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
  const columnsOverProd = [
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Acc Count",
            accessor: "numAcca",
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Over Yes",
            accessor: "overYes",
          },
          {
            Header: "Over 05",
            accessor: "over05",
          },
        ];
  const columnsUnderProd = [
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Acc Count",
            accessor: "numAcca",
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Under Yes",
            accessor: "underYes",
          },
          {
            Header: "Under 45",
            accessor: "under45",
          },
        ];
  const columnsWinProd = [
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            Header: "Prediction",
            accessor: "prediction",
          },
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Acc Count",
            accessor: "numAcca",
          },
          {
            Header: "Win Count",
            accessor: "winNum",
          },
          {
            Header: "Xwin Count",
            accessor: "xwinNum",
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Win Yes",
            accessor: "winRes",
          },
          {
            Header: "Over 05",
            accessor: "over05",
          },
        ];
  const columnsDrawProd = [
          {
            Header: "Home Team",
            accessor: "homeTeam",
          },
          {
            Header: "Away Team",
            accessor: "awayTeam",
          },
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Acc Count",
            accessor: "numAcca",
          },
          {
            Header: "Result",
            accessor: "resultScore",
          },
          {
            Header: "Draw Yes",
            accessor: "drawYes",
          },
        ];

  // console.log('sourceAccaPred', sourceAccaPred);
  // console.log('predTypeAcca', predTypeAcca);

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  async function handleLoadResProd() {
    
    for (let i = 0; i < resultsLocal.length; i++) {
      for (let j = 0; j < bttsAndOverArr.length; j++) {
        if (
          resultsLocal[i].homeTeam === bttsAndOverArr[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45

          bttsAndOverArr[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(bttsAndOverArr[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(bttsAndOverArr[j].homeTeam)
        ) {
          bttsAndOverArr[j].resultScore = resultsLocal[i].score;
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 0) {
            bttsAndOverArr[j].over05 = 'true';
          } else {
            bttsAndOverArr[j].over05 = 'false';
          }
          
        }
      }
      for (let j = 0; j < productionBttsLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionBttsLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45

          productionBttsLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionBttsLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(productionBttsLocal[j].homeTeam)
        ) {
          productionBttsLocal[j].resultScore = resultsLocal[i].score;
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 &&
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 0) {
            productionBttsLocal[j].bttsRes = 'true';
          } else {
            productionBttsLocal[j].bttsRes = 'false';
          }
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 0) {
            productionBttsLocal[j].over05 = 'true';
          } else {
            productionBttsLocal[j].over05 = 'false';
          }
          
        }
      }
      for (let j = 0; j < productionOverLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionOverLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45
          productionOverLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionOverLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(productionOverLocal[j].homeTeam)
        ) {
          productionOverLocal[j].resultScore = resultsLocal[i].score;
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) +
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 2) {
            productionOverLocal[j].overYes = 'true';
          } else {
            productionOverLocal[j].overYes = 'false';
          }

          if (parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 0) {
            productionOverLocal[j].over05 = 'true';
          } else {
            productionOverLocal[j].over05 = 'false';
          }
          
        }
      }
      for (let j = 0; j < productionUnderLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionUnderLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45
          productionUnderLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionUnderLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(productionUnderLocal[j].homeTeam)
        ) {
          productionUnderLocal[j].resultScore = resultsLocal[i].score;
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) +
          parseInt(resultsLocal[i].score.split(' - ')[1]) < 3) {
            productionUnderLocal[j].underYes = 'true';
          } else {
            productionUnderLocal[j].underYes = 'false';
          }
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) +
          parseInt(resultsLocal[i].score.split(' - ')[1]) < 5) {
            productionUnderLocal[j].under45 = 'true';
          } else {
            productionUnderLocal[j].under45 = 'false';
          }
          
        }
      }
      for (let j = 0; j < productionWinLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionWinLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45
          productionWinLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionWinLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(productionWinLocal[j].homeTeam)
        ) {
          productionWinLocal[j].resultScore = resultsLocal[i].score;
          let win1 = parseInt(resultsLocal[i].score.split(' - ')[0]) > parseInt(resultsLocal[i].score.split(' - ')[1]);
          let win2 = parseInt(resultsLocal[i].score.split(' - ')[0]) < parseInt(resultsLocal[i].score.split(' - ')[1]);
          if ((win1 && productionWinLocal[j].homeTeam === productionWinLocal[j].prediction) || (win2 && productionWinLocal[j].awayTeam === productionWinLocal[j].prediction)) {
            productionWinLocal[j].winRes = 'true';
          } else {
            productionWinLocal[j].winRes = 'false';
          }

          if (parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
          parseInt(resultsLocal[i].score.split(' - ')[1]) > 0) {
            productionWinLocal[j].over05 = 'true';
          } else {
            productionWinLocal[j].over05 = 'false';
          }
          

          // let xwin1 = parseInt(resultsLocal[i].score.split(' - ')[0]) >= parseInt(resultsLocal[i].score.split(' - ')[1]);
          // let xwin2 = parseInt(resultsLocal[i].score.split(' - ')[0]) <= parseInt(resultsLocal[i].score.split(' - ')[1]);
          // productionWinLocal[j].winRes = (win1 && productionWinLocal[j].homeTeam === productionWinLocal[j].prediction) || (win2 && productionWinLocal[j].awayTeam === productionWinLocal[j].prediction);
        }
      }
      for (let j = 0; j < productionDrawLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionDrawLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45
          productionDrawLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionDrawLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam === getHomeTeamName(productionDrawLocal[j].homeTeam)
        ) {
          productionDrawLocal[j].resultScore = resultsLocal[i].score;
          if (parseInt(resultsLocal[i].score.split(' - ')[0]) ===
          parseInt(resultsLocal[i].score.split(' - ')[1])) {
            productionDrawLocal[j].drawYes = 'true';
          } else {
            productionDrawLocal[j].drawYes = 'false';
          }
          
        }
      }
    }
    console.log('productionBttsLocal333',productionBttsLocal);
  }
  function toggleZero() {
    console.log('toggleZero');
    setShowZero((current) => !current);
  }
  function toggleAddWin() {
    console.log('toggleAddWin');
    setAddWinToBtts((current) => !current);
  }

  function handleSaveUnderProd() {
    if (productionUnderLocal.length !==0) {
      const over2Sources = productionUnderLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      saveUnderProd(over2Sources);
    }
  }
  function handleUpdUnderProd() {
    // updateUnderProd();
    if (productionUnderLocal.length !==0) {
      const over2Sources = productionUnderLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      updateUnderProd(over2Sources);
    }
  }
  function handleSaveBttsProd() {
    if (productionBttsLocal.length !==0) {
      const over2Sources = productionBttsLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      saveBttsProd(over2Sources);
    }
  }
  function handleUpdBttsProd() {
    // updateUnderProd();
    if (productionBttsLocal.length !==0) {
      const over2Sources = productionBttsLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      updateBttsProd(over2Sources);
    }
  }
  function handleSaveOverProd() {
    if (productionOverLocal.length !==0) {
      const over2Sources = productionOverLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      saveOverProd(over2Sources);
    }
  }
  function handleUpdOverProd() {
    // updateUnderProd();
    if (productionOverLocal.length !==0) {
      const over2Sources = productionOverLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      updateOverProd(over2Sources);
    }
  }
  function handleSaveWinProd() {
    if (productionWinLocal.length !==0) {
      const over2Sources = productionWinLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      saveWinProd(over2Sources);
    }
  }
  function handleUpdWinProd() {
    // updateUnderProd();
    if (productionWinLocal.length !==0) {
      const over2Sources = productionWinLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      updateWinProd(over2Sources);
    }
  }
  function handleSaveDrawProd() {
    if (productionDrawLocal.length !==0) {
      const over2Sources = productionDrawLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      saveDrawProd(over2Sources);
    }
  }
  function handleUpdDrawProd() {
    // updateUnderProd();
    if (productionDrawLocal.length !==0) {
      const over2Sources = productionDrawLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      updateDrawProd(over2Sources);
    }
  }

  //SAVING TODAY TOTAL PRODS 
  function handleSaveTodayTotalUnder() {

     if (productionUnderLocal.length !==0) {
      const prodUnderFil = productionUnderLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      // console.log('prodOverFil',prodOverFil);
      prodUnderFil.forEach(elem => {

        elem.sources.forEach(item => {
          const sourceName = `${getSourcesProdInverse(item)}_u25`;

          let under25 = '';
          let under35 = '';
          let under45 = '';

          if (parseInt(elem.resultScore.split(' - ')[0]) +
          parseInt(elem.resultScore.split(' - ')[1]) < 3) {
            under25 = 'true';
          } else {
            under25 = 'false';
          }
          if (parseInt(elem.resultScore.split(' - ')[0]) +
          parseInt(elem.resultScore.split(' - ')[1]) < 4) {
            under35 = 'true';
          } else {
            under35 = 'false';
          }
          if (parseInt(elem.resultScore.split(' - ')[0]) +
          parseInt(elem.resultScore.split(' - ')[1]) < 5) {
            under45 = 'true';
          } else {
            under45 = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            sourceName: sourceName,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            under25,
            under35,
            under45
          }

          todayUnderStatArr.push(obj);
        })
      })

      console.log('todayUnderStatArr',todayUnderStatArr);
    }
    if (todayUnderStatArr.length !==0) {
      let sourcesArr = todayUnderStatArr.map(elem => elem.sourceName);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach(elem => {
        let obj = {
          source: elem,
          action: 'under25',
          totalPreds: todayUnderStatArr.filter(item => item.sourceName === elem).length,
          under25Count: todayUnderStatArr.filter(item => item.sourceName === elem && item.under25 === 'true').length,
          under35Count: todayUnderStatArr.filter(item => item.sourceName === elem && item.under35 === 'true').length,
          under45Count: todayUnderStatArr.filter(item => item.sourceName === elem && item.under45 === 'true').length,
          date: todayDate,
        }
        todayUnderStatTotalArr.push(obj);
      })

      console.log('todayUnderStatTotalArr',todayUnderStatTotalArr);
      todayUnderStatTotalArr.length !==0 && setTodayStatDraw(todayUnderStatTotalArr);
    }
  }
  function handleSaveTodayTotalOver() {
    if (productionOverLocal.length !==0) {
      const prodOverFil = productionOverLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      // console.log('prodOverFil',prodOverFil);
      prodOverFil.forEach(elem => {

        elem.sources.forEach(item => {
          const sourceName = `${getSourcesProdInverse(item)}_o25`;

          let over05 = '';
          let over15 = '';
          let over25 = '';

          if (parseInt(elem.resultScore.split(' - ')[0]) +
          parseInt(elem.resultScore.split(' - ')[1]) > 2) {
            over25 = 'true';
          } else {
            over25 = 'false';
          }
          if (parseInt(elem.resultScore.split(' - ')[0]) +
          parseInt(elem.resultScore.split(' - ')[1]) > 1) {
            over15 = 'true';
          } else {
            over15 = 'false';
          }

          if (parseInt(elem.resultScore.split(' - ')[0]) > 0 ||
          parseInt(elem.resultScore.split(' - ')[1]) > 0) {
            over05 = 'true';
          } else {
            over05 = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            sourceName: sourceName,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            over05,
            over15,
            over25
          }

          todayOverStatArr.push(obj);
        })
      })

      console.log('todayOverStatArr',todayOverStatArr);
    }
    if (todayOverStatArr.length !==0) {
      let sourcesArr = todayOverStatArr.map(elem => elem.sourceName);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach(elem => {
        let obj = {
          source: elem,
          action: 'over25',
          totalPreds: todayOverStatArr.filter(item => item.sourceName === elem).length,
          over05Count: todayOverStatArr.filter(item => item.sourceName === elem && item.over05 === 'true').length,
          over15Count: todayOverStatArr.filter(item => item.sourceName === elem && item.over15 === 'true').length,
          over25Count: todayOverStatArr.filter(item => item.sourceName === elem && item.over25 === 'true').length,
          date: todayDate,
        }
        todayOverStatTotalArr.push(obj);
      })

      console.log('todayOverStatTotalArr',todayOverStatTotalArr);
      todayOverStatTotalArr.length !==0 && setTodayStatDraw(todayOverStatTotalArr);
    }
  }
  function handleSaveTodayTotalBtts() {

    if (productionBttsLocal.length !==0) {
      const prodBttsFil = productionBttsLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      // console.log('prodBttsFil',prodBttsFil);
      prodBttsFil.forEach(elem => {

        elem.sources.forEach(item => {
          const sourceName = `${getSourcesProdInverse(item)}_btts`;

          let over05 = '';
          let bttsYes = '';

          if (parseInt(elem.resultScore.split(' - ')[0]) > 0 ||
          parseInt(elem.resultScore.split(' - ')[1]) > 0) {
            over05 = 'true';
          } else {
            over05 = 'false';
          }

          if (parseInt(elem.resultScore.split(' - ')[0]) > 0 &&
          parseInt(elem.resultScore.split(' - ')[1]) > 0) {
            bttsYes = 'true';
          } else {
            bttsYes = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            sourceName: sourceName,
            action: 'btts',
            resScore: elem.resultScore,
            date: todayDate,
            over05,
            bttsYes
          }

          todayBttsStatArr.push(obj);
        })
      })

      console.log('todayBttsStatArr',todayBttsStatArr);
    }
    if (todayBttsStatArr.length !==0) {
      let sourcesArr = todayBttsStatArr.map(elem => elem.sourceName);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach(elem => {
        let obj = {
          source: elem,
          action: 'btts',
          totalPreds: todayBttsStatArr.filter(item => item.sourceName === elem).length,
          bttsYesCount: todayBttsStatArr.filter(item => item.sourceName === elem && item.bttsYes === 'true').length,
          over05Count: todayBttsStatArr.filter(item => item.sourceName === elem && item.over05 === 'true').length,
          date: todayDate,
        }
        todayBttsStatTotalArr.push(obj);
      })

      console.log('todayBttsStatTotalArr',todayBttsStatTotalArr);
      todayBttsStatTotalArr.length !==0 && setTodayStatDraw(todayBttsStatTotalArr);
    }
  }
  function handleCreateTodayStatArrWin() {
    if (productionWinLocal.length !==0) {
      const prodWinFil = productionWinLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      // console.log('prodWinFil',prodWinFil);
      prodWinFil.forEach(elem => {

        elem.sources.forEach(item => {
          const sourceName = `${getSourcesProdInverse(item)}_win`;

          let xwinRes = '';

          let win1 = parseInt(elem.resultScore.split(' - ')[0]) > parseInt(elem.resultScore.split(' - ')[1]);
          let win2 = parseInt(elem.resultScore.split(' - ')[0]) < parseInt(elem.resultScore.split(' - ')[1]);
          let draw = parseInt(elem.resultScore.split(' - ')[0]) === parseInt(elem.resultScore.split(' - ')[1]);
          if (((win1 || draw) && elem.homeTeam === elem.prediction) || ((win2 || draw) && elem.awayTeam === elem.prediction)) {
            xwinRes = 'true';
          } else {
            xwinRes = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            sourceName: sourceName,
            action: 'xwin',
            resScore: elem.resultScore,
            date: todayDate,
            prediction: elem.prediction,
            xwinRes
          }

          todayWinStatArr.push(obj);
        })
      })

      console.log('todayWinStatArr',todayWinStatArr);
    }
    if (todayWinStatArr.length !==0) {
      let sourcesArr = todayWinStatArr.map(elem => elem.sourceName);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach(elem => {
        let obj = {
          source: elem,
          action: 'xwin',
          totalPreds: todayWinStatArr.filter(item => item.sourceName === elem).length,
          winYesCount: todayWinStatArr.filter(item => item.sourceName === elem && item.xwinRes === 'true').length,
          date: todayDate,
        }
        todayWinStatTotalArr.push(obj);
      })

      console.log('todayWinStatTotalArr',todayWinStatTotalArr);
      todayWinStatTotalArr.length !==0 && setTodayStatDraw(todayWinStatTotalArr);
    }
  }
  function handleCreateTodayStatArrDraw() {
    if (productionDrawLocal.length !==0) {
      const prodDrawFil = productionDrawLocal.filter(elem => elem.count > 2 || elem.numAcca !==0);
      // console.log('prodDrawFil',prodDrawFil);
      prodDrawFil.forEach(elem => {

        elem.sources.forEach(item => {
          const sourceName = `${getSourcesProdInverse(item)}_draw`;
          let drawYes = '';

          if (parseInt(elem.resultScore.split(' - ')[0]) ===
          parseInt(elem.resultScore.split(' - ')[1])) {
            drawYes = 'true';
          } else {
            drawYes = 'false';
          }

          // const withItem = prodDrawFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            sourceName: sourceName,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            drawYes
          }

          todayDrawStatArr.push(obj);
        })
      })

      console.log('todayDrawStatArr',todayDrawStatArr);
    }
    if (todayDrawStatArr.length !==0) {
      let sourcesArr = todayDrawStatArr.map(elem => elem.sourceName);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach(elem => {
        let obj = {
          source: elem,
          action: 'draw',
          totalPreds: todayDrawStatArr.filter(item => item.sourceName === elem).length,
          drawYesCount: todayDrawStatArr.filter(item => item.sourceName === elem && item.drawYes === 'true').length,
          date: todayDate,
        }
        todayDrawStatTotalArr.push(obj);
      })

      console.log('todayDrawStatTotalArr',todayDrawStatTotalArr);
      todayDrawStatTotalArr.length !==0 && setTodayStatDraw(todayDrawStatTotalArr);
    }
  }

  function handleSaveDailyStatToMongoDraw() {

  }
  function handleSaveDailyStatToMongoWin() {

  }
  function handleSaveDailyStatToMongoBtts() {

  }
  function handleSaveDailyStatToMongoOver() {

  }
  function handleSaveDailyStatToMongoUnder() {
    
  }

  async function handleLoadWithVpn() {
    setLoader(true);
    const res = await loadBttsWithVpn();
    const res2 = await loadOverDataWithVpn();
    const res3 = await loadWinWithVpn();
    const res4 = await loadDrawWithVpn();
    const res5 = await loadUnderWithVpn();
    res === 'btts VPN loaded' &&
      res2 === 'over VPN loaded' &&
      res3 === 'win VPN loaded' &&
      res4 === 'draws VPN loaded' &&
      res5 === 'under VPN loaded' &&
      setLoader(false);
  }
  async function handleLoadBtts() {
    setLoader(true);
    const res = await loadBtts();
    console.log('22233',res)
    res === 'btts loaded' && setBttsDataExist(true);
    setLoader(false);
  }
  async function handleDeleteBtts() {
    setLoader(true);
    const res = await deleteBtts(todayDate);
    res === 'btts deleted' && setBttsDataExist(false);
    setLoader(false);
  }

  async function handleLoadUnder() {
    setLoader(true);
    const res = await loadUnder();
    console.log('22233',res)
    res === 'under loaded' && setUnderDataExist(true);
    setLoader(false);
  }
  async function handleDeleteUnder() {
    setLoader(true);
    const res = await deleteUnder(todayDate);
    res === 'under deleted' && setUnderDataExist(false);
    setLoader(false);
  }

  async function handleLoadTotal1() {
    setTotalLoader(true);
    const res = await saveResultTotal();
    res === 'total loaded' && setTotalDataExist(true);
    setTotalLoader(false);
  }
  async function handleLoadTotal() {
    setTotalLoader(true);
    const res = await saveResultTotal();
    res === 'total loaded' && setTotalDataExist(true);
    setTotalLoader(false);
  }

  async function handleLoadOver() {
    setLoader(true);
    const res = await loadOverData();
    res === 'over loaded' && setOverDataExist(true);
    setLoader(false);
  }
  async function handleDeleteOver() {
    setLoader(true);
    const res = await deleteOverData(todayDate);
    res === 'over deleted' && setOverDataExist(false);
    setLoader(false);
  }

  async function handleLoadCrawl() {
    setLoader(true);
    const res = await loadCrawlData();
    res === 'crawl loaded' && setCrawlDataExist(true);
    setLoader(false);
  }

  async function handleLoadWin() {
    setLoader(true);
    const res = await loadWin();
    res === 'win loaded' && setWinDataExist(true);
    setLoader(false);
  }
  async function handleDeleteWin() {
    setLoader(true);
    console.log('todayDateWin', todayDate);
    const res = await deleteWin(todayDate);
    res === 'win deleted' && setWinDataExist(false);
    setLoader(false);
  }

  async function handleLoadDraw() {
    setLoader(true);
    const res = await loadDraw();
    res === 'draws loaded' && setDrawDataExist(true);
    setLoader(false);
  }
  async function handleDeleteDraw() {
    setLoader(true);
    const res = await deleteDraw(todayDate);
    res === 'draws deleted' && setDrawDataExist(false);
    setLoader(false);
  }

  async function handleLoadResults() {
    setLoader(true);
    const res = await loadResult();
    res === 'result loaded' && setResultDataExist(true);
    setLoader(false);
  }
  async function handleDeleteResult() {
    setLoader(true);
    const res = await deleteResult(todayDate);
    res === 'result deleted' && setResultDataExist(false);
    setLoader(false);
  }
  // async function handleGetBtts() {
  //   await fetch(`http://localhost:8000/btts/get`);

  //   const bttsDataMongo = await getBttsMongo(todayDate);

  //   bttsLocal.length !== 0 && setBttsLocal([]);
  //   setBttsLocal(bttsDataMongo);
  // }

  // useEffect(() => {
  //   if (bttsLocal.length !== 0 && bttsSources) {
  //     if (bttsLocal.some((elem) => elem.source === 'fbp_acc_btts')) {
  //       bttsSources['fbp_acc_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'footsuper_btts')) {
  //       bttsSources['footsuper_btts'].exist = true;
  //     } else if (
  //       bttsLocal.some((elem) => elem.source === 'footsuper_acc_btts')
  //     ) {
  //       bttsSources['footsuper_acc_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'r2bet_btts')) {
  //       bttsSources['r2bet_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'footy_btts')) {
  //       bttsSources['footy_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'predutd_btts')) {
  //       bttsSources['predutd_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'mighty_btts')) {
  //       bttsSources['mighty_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'betimate_btts')) {
  //       bttsSources['betimate_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'kcpredict_btts')) {
  //       bttsSources['kcpredict_btts'].exist = true;
  //     } else if (
  //       bttsLocal.some((elem) => elem.source === 'trustpredict_btts')
  //     ) {
  //       bttsSources['trustpredict_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'accum_btts')) {
  //       bttsSources['accum_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'banker_btts')) {
  //       bttsSources['banker_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'venas_btts')) {
  //       bttsSources['venas_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'goalsnow_btts')) {
  //       bttsSources['goalsnow_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'prot_btts')) {
  //       bttsSources['prot_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'betshoot_btts')) {
  //       bttsSources['betshoot_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'betclan_btts')) {
  //       bttsSources['betclan_btts'].exist = true;
  //     } else if (
  //       bttsLocal.some((elem) => elem.source === 'wincomparator_btts')
  //     ) {
  //       bttsSources['wincomparator_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'bettingtips_btts')) {
  //       bttsSources['bettingtips_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'betprotips_btts')) {
  //       bttsSources['betprotips_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'vitibet_btts')) {
  //       bttsSources['vitibet_btts'].exist = true;
  //     } else if (bttsLocal.some((elem) => elem.source === 'passion_btts')) {
  //       bttsSources['passion_btts'].exist = true;
  //     }
  //   }

  //   console.log('bttsSources222',bttsSources);
  // }, [bttsLocal, bttsSources]);

  useEffect(() => {
    async function fetchData() {
      const bttsDataMongo = await getBtts(todayDate);
      console.log('bttsDataMongo', bttsDataMongo);
      bttsDataMongo.length !== 0 &&
        bttsDataMongo.some((elem) => elem.action === 'btts') &&
        setBttsDataExist(true);
      bttsDataMongo.length !== 0 &&
        bttsDataMongo.some((elem) => elem.action === 'over25') &&
        setOverDataExist(true);

      // console.log('yesterdayString', yesterdayString);
      // const resYest = await getZeroCounter(yesterdayString);
      // if (resYest.length !== 0) {
      //   setCounterFromMongoYesterday(resYest[0]);
      // }
      // console.log('zeroCounterYesterday', zeroCounterYesterday);

      const res = await getZeroCounter(todayDate);
      console.log('res222', res);
      // if (res.length !== 0) {
      //   setCounterFromMongo(res[0]);
      // }
      // setZeroCounterDate(todayDate);
      // console.log('zeroCounter', zeroCounter);

      const winDataMongo = await getWinData(todayDate);
      winDataMongo.length !== 0 &&
        winDataMongo.some((elem) => elem.source === 'hello') &&
        setWinDataExist(true);

      const drawDataMongo = await getDraw(todayDate);
      drawDataMongo.length !== 0 && setDrawDataExist(true);

      const under25DataMongo = await getUnder(todayDate);
      under25DataMongo.length !== 0 && setUnderDataExist(true);

      // ((winDataMongo.length !== 0 &&
      //   (winDataMongo.some((elem) => elem.source === 'bettingtips') ||
      //     winDataMongo.some((elem) => elem.source === 'wincomparator'))) ||
      //   (bttsDataMongo.length !== 0 &&
      //     (bttsDataMongo.some((elem) => elem.source === 'bettingtips') ||
      //       bttsDataMongo.some((elem) => elem.source === 'wincomparator')))) &&
      //   setCrawlDataExist(true);
    }

    // console.log('zeroCounter', zeroCounter);

    todayDate && todayDate === format(new Date(), 'dd.MM.yyyy') && fetchData();
  }, [todayDate]);

  useEffect(() => {
    console.log('showZero', showZero);

    if (showZero) {
      const res = resultsLocal.filter((res) => res.score.includes('0 - 0'));
      // console.log('btts333', res);
      setResultsLocal(res);
    } else {
      setResultsLocal(allRes);
    }
  }, [showZero]);
  useEffect(() => {
    console.log('addWin', addWin);

    if (addWin) {
      let allData = [];
      allData = allData.concat(bttsLocal).concat(winDataLocal);
      setBttsLocal(allData);
    } else {
      const btts = bttsLocal.filter(
        (elem) => elem.action === 'btts' || elem.action === 'over25'
      );
      console.log('btts333', btts);
      setBttsLocal(btts);
    }
  }, [addWin]);

  const countByPropSorted = (arr, prop) => {
    let obj = arr.reduce(
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );

    let sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    let sortedByValues = Object.fromEntries(sorted);
    console.log('sortedByValues', sortedByValues);
    return sortedByValues;
  };

  const countByPropTeams = (arr, prop) => {
    
    let obj1 = {};

    // const hasAcca = arr.some(elem => elem.isAcca);

    let obj = arr.reduce(
      // (prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1),
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );

    
      
    if (arr.some((elem) => elem.action.includes('btts'))) {
      Object.keys(obj).forEach((key, i) => {
        let fff = arr.filter((elem) => elem.homeTeam === key &&  elem.awayTeam && elem.awayTeam !== '')[0];
        obj1[key] = {
          homeTeam: key,
          awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
          count: obj[key],
          sources: arr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
          numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
          bttsYesNum: arr.filter((elem) => elem.homeTeam === key && !elem.action.includes('btts no')).length,
          bttsNoNum: arr.filter((elem) => elem.homeTeam === key && elem.action.includes('btts no')).length,
          resultScore: '',
          bttsRes: '',
          date: todayDate,
          totalSources: bttsSourcesLength,
          totalItems: bttsOnlyLocal.length
        };
        // if (i === 0) {
        //   obj1[key].totalSources = bttsSourcesLength;
        //   obj1[key].totalItems = bttsItemsLength;
        // }
      });
    } else if (arr.some((elem) => elem.action.includes('xwin'))) {
      Object.keys(obj).forEach((key, i) => {

        let elems = arr.filter(elem => elem.homeTeam === key);
        // console.log('elems', elems);

        let homeWinArr = elems.filter(elem => elem.homeTeam === elem.prediction);
        // console.log('homeWinArr', homeWinArr);

        let awayWinArr = elems.filter(elem => elem.awayTeam === elem.prediction);
        // console.log('awayWinArr', awayWinArr);

        homeWinArr.length !==0 && homeWinArr.forEach(elem => {
          obj1[`${key}`] = {
            homeTeam: elem.homeTeam,
            awayTeam: elem && elem.hasOwnProperty('awayTeam') && elem.awayTeam,
            prediction: elem && elem.hasOwnProperty('prediction') && elem.prediction,
            count: homeWinArr.length,
            sources: homeWinArr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
            numAcca: homeWinArr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
            winNum: homeWinArr.filter((elem) => elem.homeTeam === key && (elem.action === 'win' || elem.action.includes('win ') || elem.action.includes('2win') || elem.action.includes('win 1') || elem.action.includes('win 2'))).length,
            xwinNum: homeWinArr.filter((elem) => elem.homeTeam === key && elem.action.includes('xwin')).length,
            resultScore: '',
            winRes: '',
            date: todayDate,
            totalSources: winSourcesLength,
            totalItems: over25OnlyLocal.length
          };
          // if (i === 0) {
          //   obj1[key].totalSources = Object.keys(winSourcesCount).length;
          //   obj1[key].totalItems = winDataLocal.lenght;
          // }
        })
        awayWinArr.length !==0 && awayWinArr.forEach(elem => {
          obj1[`${key} 2`] = {
            homeTeam: elem.homeTeam,
            awayTeam: elem && elem.hasOwnProperty('awayTeam') && elem.awayTeam,
            prediction: elem && elem.hasOwnProperty('prediction') && elem.prediction,
            count: awayWinArr.length,
            sources: awayWinArr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
            numAcca: awayWinArr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
            winNum: awayWinArr.filter((elem) => elem.homeTeam === key && (elem.action === 'win' || elem.action.includes('win ') || elem.action.includes('2win') || elem.action.includes('win 1') || elem.action.includes('win 2'))).length,
            xwinNum: awayWinArr.filter((elem) => elem.homeTeam === key && elem.action.includes('xwin')).length,
            resultScore: '',
            winRes: '',
            date: todayDate,
            totalSources: winSourcesLength,
            totalItems: winDataLocal.length
          };
          // if (i === 0) {
          //   obj1[key].totalSources = Object.keys(winSourcesCount).length;
          //   obj1[key].totalItems = winDataLocal.lenght;
          // }
        })


      // let fff = arr.filter((elem) => elem.homeTeam === key &&  elem.awayTeam && elem.awayTeam !== '')[0];
      // let ddd = arr.filter((elem) => elem.homeTeam === key &&  elem.prediction && elem.prediction !== '')[0];

      //   if (ddd && ddd.hasOwnProperty('prediction') && ddd.prediction === key) {
      //     obj1[key] = {
      //       homeTeam: key,
      //       awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
      //       prediction: ddd && ddd.hasOwnProperty('prediction') && ddd.prediction,
      //       count: obj[key],
      //       numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
      //       winNum: arr.filter((elem) => elem.homeTeam === key && (elem.action === 'win' || elem.action.includes('win ') || elem.action.includes('2win') || elem.action.includes('win 1') || elem.action.includes('win 2'))).length,
      //       xwinNum: arr.filter((elem) => elem.homeTeam === key && elem.action.includes('xwin')).length,
      //       resultScore: '',
      //       winYes: null
      //     };
      //   }

        
      });
    } else {
      Object.keys(obj).forEach((key, i) => {
        let fff = arr.filter((elem) => elem.homeTeam === key &&  elem.awayTeam && elem.awayTeam !== '')[0];
        let action = '';

        if (arr.length !==0) {
          // if (arr[0].action.includes('under25')) {
          if (arr.some((elem) => elem.action.includes('under25'))) {
            action = 'under25';

            obj1[key] = {
              homeTeam: key,
              awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
              count: obj[key],
              sources: arr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
              numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
              action: action,
              resultScore: '',
              underYes: '',
              date: todayDate,
              totalSources: underSourcesLength,
              totalItems: under25DataLocal.length
            };
            // if (i === 0) {
            //   obj1[key].totalSources = Object.keys(underSourcesCount).length;
            //   obj1[key].totalItems = under25DataLocal.lenght;
            // }
          // } else if (arr[0].action.includes('over25')) {
          } else if (arr.some((elem) => elem.action.includes('over25'))) {
            action = 'over25';

            obj1[key] = {
              homeTeam: key,
              awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
              count: obj[key],
              sources: arr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
              numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
              action: action,
              resultScore: '',
              overYes: '',
              date: todayDate,
              totalSources: overSourcesLength,
              totalItems: over25OnlyLocal.length
            };
            // if (i === 0) {
            //   obj1[key].totalSources = Object.keys(overSourcesCount).length;
            //   obj1[key].totalItems = over25OnlyLocal.lenght;
            // }
          // } else if (arr[0].action.includes('draws')) {
          } else if (arr.some((elem) => elem.action.includes('draws'))) {
            action = 'draws';

            obj1[key] = {
                homeTeam: key,
                awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
                count: obj[key],
                sources: arr.filter((elem) => elem.homeTeam === key &&  elem.source && elem.source !== '').map(item => getSourcesProd(item.source)),
                numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca).length,
                action: action,
                resultScore: '',
                drawYes: '',
                date: todayDate,
                totalSources: drawSourcesLength,
                totalItems: drawDataLocal.length
            };
            // if (i === 0) {
            //   obj1[key].totalSources = Object.keys(drawSourcesCount).length;
            //   obj1[key].totalItems = drawDataLocal.lenght;
            // }
          }
        }
        

        
      });
    }

    

    // console.log('obj1', obj1);

    return obj1;
  };

  const countByProp = (arr, prop) => {
    return arr.reduce(
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );
  };

  async function onSelect(date) {
    const formattedDate = format(date, 'dd.MM.yyyy');
    setDate(formattedDate);

    const resultsData = await getResult(formattedDate);
    resultsData.length !== 0 && setResultDataExist(true);
    addWin && setAddWinToBtts(false);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //GET BTTS
    let bttsDataMongo = await getBtts(todayDate);

    bttsDataMongo = bttsDataMongo.filter(item => item.homeTeam !== 'BTTS/GG').map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();

      let awayTeam =
        elem.awayTeam &&
        elem.awayTeam !== '' &&
        elem.awayTeam
        .replace('SSC ', '')
        .replace('SC ', '')
        .replace('CS ', '')
        .replace('SG ', '')
        .replace('CD ', '')
        .replace(' IS', '')
        .replace('1. ', '')
        .replace('1.', '')
        .replace('1 ', '')
        .replace('FC ', '')
        .replace('FK ', '')
        .replace(' IF', '')
        .replace(' Utd', ' United')
        .replace('AC ', '')
        .replace('AS ', '')
        .replace(' FF', '')
        .replace(' FC', '')
        .replace(' CF', '')
        .trim();
      obj.homeTeam = getHomeTeamName(homeTeam);
      obj.awayTeam = getHomeTeamName(awayTeam);
      return obj;
    });
    console.log('bttsDataMongo444', bttsDataMongo);
    setBttsLocal(bttsDataMongo);


    const bttsDataOnly = bttsDataMongo.filter((elem) =>
      elem.action.includes('btts')
    );
    const overDataOnly = bttsDataMongo.filter(
      (elem) => elem.action === 'over25' || elem.action === 'high score'
    );

    bttsOnlyLocal.length !== 0 && setBttsOnlyLocal([]);
    over25OnlyLocal.length !== 0 && setOver25OnlyLocal([]);
    setBttsOnlyLocal(bttsDataOnly);
    setOver25OnlyLocal(overDataOnly);

    console.log('bttsDataOnly.length',bttsDataOnly); 
    console.log('overDataOnly.length',overDataOnly); 

    let countedObjBtts = bttsDataOnly.length !== 0 && countByProp(bttsDataOnly, 'source');
    countedObjBtts && setBttsSourcesLength(Object.keys(countedObjBtts).length); 

    let countedObjOver = overDataOnly.length !== 0 && countByProp(overDataOnly, 'source');
    countedObjOver && setOverSourcesLength(Object.keys(countedObjOver).length); 
    // bttsDataOnly.length !== 0 && setBttsItemsLength(bttsDataOnly.lenght);

    //GET WIN
    let winDataMongo = await getWinData(todayDate);
    winDataMongo = winDataMongo.map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();
      let awayTeam =
        elem.awayTeam &&
        elem.awayTeam !== '' &&
        elem.awayTeam
        .replace('SSC ', '')
        .replace('SC ', '')
        .replace('CS ', '')
        .replace('SG ', '')
        .replace('CD ', '')
        .replace(' IS', '')
        .replace('1. ', '')
        .replace('1.', '')
        .replace('1 ', '')
        .replace('FC ', '')
        .replace('FK ', '')
        .replace(' IF', '')
        .replace(' Utd', ' United')
        .replace('AC ', '')
        .replace('AS ', '')
        .replace(' FF', '')
        .replace(' FC', '')
        .replace(' CF', '')
        .trim();
      let pred = elem.prediction
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();
      obj.homeTeam = getHomeTeamName(homeTeam);
      obj.awayTeam = getHomeTeamName(awayTeam);
      obj.prediction = getHomeTeamName(pred);
      return obj;
    });
    winDataLocal.length !== 0 && setWinDataLocal([]);
    setWinDataLocal(winDataMongo);

    let countedObjWin = winDataMongo.length !== 0 && countByProp(winDataMongo, 'source');
    countedObjWin && setWinSourcesLength(Object.keys(countedObjWin).length); 

    //GET DRAW
    let drawDataMongo = await getDraw(todayDate);
    drawDataMongo = drawDataMongo.map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();
      let awayTeam =
        elem.awayTeam &&
        elem.awayTeam !== '' &&
        elem.awayTeam
        .replace('SSC ', '')
        .replace('SC ', '')
        .replace('CS ', '')
        .replace('SG ', '')
        .replace('CD ', '')
        .replace(' IS', '')
        .replace('1. ', '')
        .replace('1.', '')
        .replace('1 ', '')
        .replace('FC ', '')
        .replace('FK ', '')
        .replace(' IF', '')
        .replace(' Utd', ' United')
        .replace('AC ', '')
        .replace('AS ', '')
        .replace(' FF', '')
        .replace(' FC', '')
        .replace(' CF', '')
        .trim();
      obj.homeTeam = getHomeTeamName(homeTeam);
      obj.awayTeam = getHomeTeamName(awayTeam);
      return obj;
    });
    // console.log('drawDataMongo222', drawDataMongo);
    drawDataLocal.length !== 0 && setDrawDataLocal([]);
    setDrawDataLocal(drawDataMongo);

    let countedObjDraw = drawDataMongo.length !== 0 && countByProp(drawDataMongo, 'source');
    countedObjDraw && setDrawSourcesLength(Object.keys(countedObjDraw).length); 

    //GET UNDER
    let under25DataMongo = await getUnder(todayDate);
    under25DataMongo = under25DataMongo.map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();
      let awayTeam =
        elem.awayTeam &&
        elem.awayTeam !== '' &&
        elem.awayTeam
        .replace('SSC ', '')
        .replace('SC ', '')
        .replace('CS ', '')
        .replace('SG ', '')
        .replace('CD ', '')
        .replace(' IS', '')
        .replace('1. ', '')
        .replace('1.', '')
        .replace('1 ', '')
        .replace('FC ', '')
        .replace('FK ', '')
        .replace(' IF', '')
        .replace(' Utd', ' United')
        .replace('AC ', '')
        .replace('AS ', '')
        .replace(' FF', '')
        .replace(' FC', '')
        .replace(' CF', '')
        .trim();
      obj.homeTeam = getHomeTeamName(homeTeam);
      obj.awayTeam = getHomeTeamName(awayTeam);
      return obj;
    });
    let sortedUnder25 = sortData(under25DataMongo);
    under25DataLocal.length !== 0 && setUnder25DataLocal([]);
    setUnder25DataLocal(sortedUnder25);

    let countedObjUnder = under25DataMongo.length !== 0 && countByProp(under25DataMongo, 'source');
    countedObjUnder && setUnderSourcesLength(Object.keys(countedObjUnder).length); 

    //GET RESULT AND TOTAL
    const resultsTotalData = await getResultTotal(todayDate);

    //GET RESULT
    let resultsData = await getResult(todayDate);
    resultsData = resultsData.map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
      .replace('SSC ', '')
        .replace('SC ', '')
        .replace('CS ', '')
        .replace('SV ', '')
        .replace('AD ', '')
        .replace('SD ', '')
        .replace('UD ', '')
        .replace('CA ', '')
        .replace('EC ', '')
        .replace('CF ', '')
        .replace('SG ', '')
        .replace('CD ', '')
        .replace(' IS', '')
        .replace('1. ', '')
        .replace('1.', '')
        .replace('1 ', '')
        .replace('FC ', '')
        .replace('FK ', '')
        .replace(' IF', '')
        .replace(' Utd', ' United')
        .replace('AC ', '')
        .replace('AS ', '')
        .replace(' FF', '')
        .replace(' FC', '')
        .replace(' CF', '')
        .trim();
      let awayTeam = elem.awayTeam
      .replace('SSC ', '')
      .replace('SC ', '')
      .replace('CS ', '')
      .replace('SD ', '')
      .replace('AD ', '')
      .replace('UD ', '')
      .replace('SG ', '')
      .replace('CD ', '')
      .replace(' IS', '')
      .replace('1. ', '')
      .replace('1.', '')
      .replace('1 ', '')
      .replace('FC ', '')
      .replace('FK ', '')
      .replace(' IF', '')
      .replace(' Utd', ' United')
      .replace('AC ', '')
      .replace('AS ', '')
      .replace(' FF', '')
      .replace(' FC', '')
      .replace(' CF', '')
      .trim();
      obj.homeTeam = getHomeTeamName(homeTeam);
      obj.awayTeam = getHomeTeamName(awayTeam);
      return obj;
    });
    
    resultsLocal.length !== 0 && setResultsLocal([]);
    setResultsLocal(resultsData);

    setAllRes(resultsData);
    setResultsTotalLocal(resultsTotalData);
    setResultsTotalLocalFil(resultsTotalData);

    console.log('winDataMongo444', winDataMongo);
    
    let countedHomeTeamAdmBtts =
      bttsDataMongo.length !== 0 && countByPropTeams(bttsDataMongo, 'homeTeam');

      Object.keys(countedHomeTeamAdmBtts).forEach(elem => {
        if (countedHomeTeamAdmBtts[elem].count < 2) {
          delete countedHomeTeamAdmBtts[elem]
        }
      })

    console.log('countedHomeTeamAdmBtts444', countedHomeTeamAdmBtts);
    setBttsHomeTeamCount(countedHomeTeamAdmBtts);

    
    
    const countedPredTeam =
    winDataLocal.length !== 0 && countByPropTeams(winDataLocal, 'homeTeam');
    countedPredTeam && setWinPredTeamCount(countedPredTeam);
    const countedTeamDraw =
    drawDataLocal.length !== 0 && countByPropTeams(drawDataLocal, 'homeTeam');
    countedTeamDraw && setTeamDrawCount(countedTeamDraw);
    const countedHomeTeamUnder =
      under25DataLocal.length !== 0 &&
      countByPropTeams(under25DataLocal, 'homeTeam');
      countedHomeTeamUnder && setUnderHomeTeamCount(countedHomeTeamUnder);

    await setResultsTotal(resultsTotalData);

    //Form submission happens here
  };

  const handleCreateLoadMonitor = async () => {
    //ADM AND MONITOR

    console.log('over25OnlyLocal333', over25OnlyLocal);

    let countedObjBtts =
    bttsOnlyLocal.length !== 0 && countByProp(bttsOnlyLocal, 'source');
      countedObjBtts && setBttsSourcesCount(countedObjBtts); 

    let countedObjOver =
    over25OnlyLocal.length !== 0 && countByProp(over25OnlyLocal, 'source');
      countedObjOver && setOverSourcesCount(countedObjOver); 

    const countedObjWin =
      winDataLocal.length !== 0 && countByProp(winDataLocal, 'source');
 
    countedObjWin && setWinSourcesCount(countedObjWin);

    const countedObjDraw =
      drawDataLocal.length !== 0 && countByProp(drawDataLocal, 'source');
   
    countedObjDraw && setDrawSourcesCount(countedObjDraw);
    

    const countedObjUnder =
      under25DataLocal.length !== 0 && countByProp(under25DataLocal, 'source');
    
    countedObjUnder && setUnderSourcesCount(countedObjUnder);
    
  }
  const handleCreateProd = async () => {
    //PRODUCTION OBJECTS
    // console.log('bttsDataOnly444', bttsOnlyLocal);
    // console.log('winDataLocal444', winDataLocal.length !== 0 && winDataLocal);
    
    console.log('bttsHomeTeamCount444', bttsHomeTeamCount);

    let productionBtts =
      bttsOnlyLocal.length !== 0 && countByPropTeams(bttsOnlyLocal, 'homeTeam');
    let productionOver =
    over25OnlyLocal.length !== 0 && countByPropTeams(over25OnlyLocal, 'homeTeam');
    let productionWin =
    winDataLocal.length !== 0 && countByPropTeams(winDataLocal, 'homeTeam');

    console.log('productionBtts222',productionBtts);
    let productionUnder =
    under25DataLocal.length !== 0 && countByPropTeams(under25DataLocal, 'homeTeam');
    console.log('productionUnder222',productionUnder);

    let productionDraw =
    drawDataLocal.length !== 0 && countByPropTeams(drawDataLocal.length !== 0 && drawDataLocal, 'homeTeam');

    if (bttsHomeTeamCount) {
      console.log('bttsHomeTeamCount222',bttsHomeTeamCount);
      Object.keys(bttsHomeTeamCount).forEach(elem => {
        if (productionOver[elem]) {
          bttsHomeTeamCount[elem].overCount = productionOver[elem].count;
          bttsHomeTeamCount[elem].overAccaCount = productionOver[elem].numAcca;
        } else {
          bttsHomeTeamCount[elem].overCount = 0;
          bttsHomeTeamCount[elem].overAccaCount = 0;
        }
        if (productionBtts[elem]) {
          bttsHomeTeamCount[elem].bttsCount = productionBtts[elem].count;
          bttsHomeTeamCount[elem].bttsAccaCount = productionBtts[elem].numAcca;
          bttsHomeTeamCount[elem].bttsYesNum = productionBtts[elem].bttsYesNum;
          bttsHomeTeamCount[elem].bttsNoNum = productionBtts[elem].bttsNoNum;
        } else {
          bttsHomeTeamCount[elem].bttsCount = 0;
          bttsHomeTeamCount[elem].bttsAccaCount = 0;
          bttsHomeTeamCount[elem].bttsYesNum = 0;
          bttsHomeTeamCount[elem].bttsNoNum = 0;
        }
        if (productionUnder[elem]) {
          bttsHomeTeamCount[elem].underCount = productionUnder[elem].count;
          bttsHomeTeamCount[elem].underAccaCount = productionUnder[elem].numAcca;
        } else {
          bttsHomeTeamCount[elem].underCount = 0;
          bttsHomeTeamCount[elem].underAccaCount = 0;
        }
        if (productionWin[elem]) {
          bttsHomeTeamCount[elem].winCount = productionWin[elem].count;
          bttsHomeTeamCount[elem].winAccaCount = productionWin[elem].numAcca;
        } else {
          bttsHomeTeamCount[elem].winCount = 0;
          bttsHomeTeamCount[elem].winAccaCount = 0;
        }
        // if (productionDraw[elem]) {
        //   bttsHomeTeamCount[elem].drawCount = productionDraw[elem].count;
        //   bttsHomeTeamCount[elem].drawAccaCount = productionDraw[elem].numAcca;
        // } else {
        //   bttsHomeTeamCount[elem].drawCount = 0;
        //   bttsHomeTeamCount[elem].drawAccaCount = 0;
        // }
        
      })

      let countedAdmBttsAndOver = bttsHomeTeamCount && Object.values(bttsHomeTeamCount);
      console.log('countedAdmBttsAndOver222',countedAdmBttsAndOver);
      countedAdmBttsAndOver.length !== 0 && setBttsAndOverArr(countedAdmBttsAndOver);
    }


    Object.keys(productionBtts).forEach(elem => {
      if (productionBtts[elem].count < 2) {
        delete productionBtts[elem]
      }
    })
    Object.keys(productionOver).forEach(elem => {
      if (productionOver[elem].count < 2) {
        delete productionOver[elem]
      }
    })
    Object.keys(productionUnder).forEach(elem => {
      if (productionUnder[elem].count < 2) {
        delete productionUnder[elem]
      }
    })
    Object.keys(productionWin).forEach(elem => {
      if (productionWin[elem].count < 2) {
        delete productionWin[elem]
      }
    })
    Object.keys(productionDraw).forEach(elem => {
      if (productionDraw[elem].count < 2) {
        delete productionDraw[elem]
      }
    })

    console.log('productionBtts444', productionBtts);
    productionBtts = Object.values(productionBtts);
    productionBtts.length !== 0 && setProductionBtts(productionBtts);
    console.log('productionBtts555', productionBtts);

    console.log('productionOver444', productionOver);
    productionOver = Object.values(productionOver);
    productionOver.length !== 0 && setProductionOver(productionOver);
    console.log('productionOver555', productionOver);

    console.log('productionUnder444', productionUnder);
    productionUnder = Object.values(productionUnder);
    productionUnder.length !== 0 && setProductionUnder(productionUnder);
    console.log('productionUnder555', productionUnder);

    console.log('productionWin444', productionWin);
    productionWin = Object.values(productionWin);
    productionWin.length !== 0 && setProductionWin(productionWin);
    console.log('productionWin555', productionWin);

    console.log('productionDraw444', productionDraw);
    productionDraw = Object.values(productionDraw);
    productionDraw.length !== 0 && setProductionDraw(productionDraw);
    console.log('productionDraw555', productionDraw);


    
  }
  const handleDeleteResultClick = async (homeTeam) => {
    await deleteResultsTotalMongo(homeTeam);
  };
  // const handleTeamAggClick = async (homeTeam) => {
  //   const clubStat = await getClubStat(homeTeam);
  //   setClubStatLocal(clubStat);
  // };
  // const handleAddToTodayBet = async (homeTeam) => {
  //   let innerObj = {
  //     homeTeam: homeTeam,
  //     footyStat: clubStatLocal,
  //   };

  //   setTodayBetObj((prevState) => ({
  //     ...prevState,
  //     date: todayDate,
  //     bets: [...prevState.bets, innerObj],
  //   }));

  //   let htArr = bttsLocal.filter((elem) => elem.homeTeam === homeTeam);

  //   setTodayBetPredsArr((prevArray) => [...prevArray, ...htArr]);
  // };
  const handleOverPredSubmit = async (e) => {
    console.log('handleOverPredSubmit');
    e.preventDefault();
    const htArr = homeTeamTotalPred.split(',');

    let result = await saveBtts({
      source: sourceTotalPred,
      action: predType,
      homeTeam: htArr,
      date: todayDate,
      isAcca: isAcca === 'isAcca' ? true : false,
    });
    setHomeTeamTotalPred('');
    if (result === 'success') {
      alert('Pred succesfully saved');
      return false;
    } else {
      alert('Error while saving preds');
      return false;
    }
  };
  const handleUnderPredSubmit = async (e) => {
    e.preventDefault();
    const htArr = homeTeamTotalPred.split(',');

    let result = await saveUnder({
      source: sourceTotalPred,
      action: predType,
      homeTeam: htArr,
      date: todayDate,
      isAcca: isAcca === 'isAcca' ? true : false,
    });
    setHomeTeamTotalPred('');
    if (result === 'success') {
      alert('Pred succesfully saved');
      return false;
    } else {
      alert('Error while saving preds');
      return false;
    }
  };
  // const handleAccaSubmit = async (e) => {
  //   e.preventDefault();
  //   const htArr = homeTeamAccaPred.split(',');

  //   let result = await saveAccaMongo({
  //     source: sourceAccaPred,
  //     action: predTypeAcca,
  //     prediction: htArr,
  //     date: todayDate,
  //   });
  //   setHomeTeamAccaPred('');
  //   if (result === 'success') {
  //     alert('Pred succesfully saved');
  //     return false;
  //   } else {
  //     alert('Error while saving preds');
  //     return false;
  //   }
  // };
  const handleWinPredSubmit = async (e) => {
    e.preventDefault();
    // const htArr = homeTeamPred.split(',');
    let result = await saveWinData({
      source: sourceWinPred,
      action: 'win',
      homeTeam: [homeTeamWinPred],
      prediction: predTeamWinPred,
      date: todayDate,
      isAcca: true,
    });
    setHomeTeamWinPred('');
    setPredTeamWinPred('');
    if (result === 'success') {
      alert('Pred succesfully saved');
      return false;
    } else {
      alert('Error while saving preds');
      return false;
    }
  };
  const handleZeroResSubmit = async (e) => {
    e.preventDefault();
    console.log('zeroCounter333', zeroCounter);
    // await calcTotal();
    const res = await saveZeroCounter(zeroCounter);
    res === 'zero counter inserted' && alert('zero counter saved');
  };
  const handleSaveMatches = async (e, title) => {
    e.preventDefault();
    // console.log('e.target.value', matchesO25Tip);
    switch (title) {
      case 'o25tip_win':
        pushMatches(matchesO25Tip_win, title);
        setMatchesO25Tip_win('');
        break;
      case 'o25tip_high':
        pushMatches(matchesO25Tip_high, title);
        setMatchesO25Tip_high('');
        break;
      case 'bettingtips_o25':
        pushMatches(matchesBettingtips_o25, title);
        setMatchesBettingtips_o25('');
        break;
      case 'wincomparator_o25':
        pushMatches(matchesWincomparator_o25, title);
        setMatchesWincomparator_o25('');
        break;
      case 'accum_btts':
        pushMatches(matchesAccum_btts, title);
        setMatchesAccum_btts('');
        break;
      case 'fst_btts':
        pushMatches(matchesFst_btts, title);
        setMatchesFst_btts('');
        break;
      case 'r2bet_o25':
        pushMatches(matchesR2bet_o25, title);
        setMatchesR2bet_o25('');
        break;
      case 'hello_o25':
        pushMatches(matchesHello_o25, title);
        setMatchesHello_o25('');
        break;
      case 'fbp_o25':
        pushMatches(matchesFbp_o25, title);
        setMatchesFbp_o25('');
        break;
      case 'fst_o25':
        pushMatches(matchesFst_o25, title);
        setMatchesFst_o25('');
        break;
      case 'footsuper_o25':
        pushMatches(matchesFootsuper_o25, title);
        setMatchesFootsuper_o25('');
        break;
      case 'footsuper_btts':
        pushMatches(matchesFootsuper_btts, title);
        setMatchesFootsuper_btts('');
        break;
      case 'bettingtips_btts':
        pushMatches(matchesBettingtips_btts, title);
        setMatchesBettingtips_btts('');
        break;
      case 'prot_o25':
        pushMatches(matchesProt_o25, title);
        setMatchesProt_o25('');
        break;
      case 'r2bet_btts':
        pushMatches(matchesR2bet_btts, title);
        setMatchesR2bet_btts('');
        break;
      case 'goalnow_o25':
        pushMatches(matchesGoalnow_o25, title);
        setMatchesGoalnow_o25('');
        break;
      case 'accum_o25':
        pushMatches(matchesAccum_o25, title);
        setMatchesAccum_o25('');
        break;
      case 'wincomparator_btts':
        pushMatches(matchesWincomparator_btts, title);
        setMatchesWincomparator_btts('');
        break;
      case 'wincomparator_win':
        pushMatches(matchesWincomparator_win, title);
        setMatchesWincomparator_win('');
        break;
      case 'mybets_win':
        pushMatches(matchesMybets_win, title);
        setMatchesMybets_win('');
        break;
      case 'venasbet_win':
        pushMatches(matchesVenasbet_win, title);
        setMatchesVenasbet_win('');
        break;
      case 'prot_win':
        pushMatches(matchesProt_win, title);
        setMatchesProt_win('');
        break;
      case 'footy_win':
        pushMatches(matchesFooty_win, title);
        setMatchesFooty_win('');
        break;
      case 'betgenuine_win':
        pushMatches(matchesBetgenuine_win, title);
        setMatchesBetgenuine_win('');
        break;
      case 'vitibet_win':
        pushMatches(matchesVitibet_win, title);
        setMatchesVitibet_win('');
        break;
      case 'vitibet_o25':
        pushMatches(matchesVitibet_o25, title);
        setMatchesVitibet_o25('');
        break;
      case 'r2bet_win':
        pushMatches(matchesR2bet_win, title);
        setMatchesR2bet_win('');
        break;
      case 'mines_win':
        pushMatches(matchesMines_win, title);
        setMatchesMines_win('');
        break;
      case 'passion_win':
        pushMatches(matchesPassion_win, title);
        setMatchesPassion_win('');
        break;
      case 'fbp_win':
        pushMatches(matchesFbp_win, title);
        setMatchesFbp_win('');
        break;
      case 'footsuper_win':
        pushMatches(matchesFootsuper_win, title);
        setMatchesFootsuper_win('');
        break;
      case 'hello_win':
        pushMatches(matchesHello_win, title);
        setMatchesHello_win('');
        break;
      case 'bettingtips_win':
        pushMatches(matchesBettingtips_win, title);
        setMatchesBettingtips_win('');
        break;
      // case 'morph_o25':
      //   pushMatches(matchesMorph_o25, title);
      //   setMatchesMorph_o25('');
      //   break;
      // case 'kcpredict_o25':
      //   pushMatches(matchesKcpredict_o25, title);
      //   setMatchesMorph_o25('');
      //   break;
      // case 'kcpredict_btts':
      //   pushMatches(matchesKcpredict_btts, title);
      //   setMatchesMorph_o25('');
      //   break;
      // case 'trustpredict_btts':
      //   pushMatches(matchesTrustpredict_btts, title);
      //   setMatchesTrustpredict_btts('');
      //   break;
      // case 'trustpredict_o25':
      //   pushMatches(matchesTrustpredict_o25, title);
      //   setMatchesTrustpredict_o25('');
      //   break;
      default:
        console.log(`Sorry, we are out of ${title}.`);
    }
  };
  const radioChangeHandler = (e) => {
    setPredType(e.target.value);
  };
  const isAccaChangeHandler = (e) => {
    setIsAccaType(e.target.value);
  };
  // const radioChangeHandlerAcca = (e) => {
  //   setPredTypeAcca(e.target.value);
  // };
  // const handleIncludeWL = () => {
  //   let arr = [...bttsLocal, ...winDataLocal];
  //   console.log('arr', arr);
  //   setIsInclude((prevState) => !prevState);
  //   // isInclude && setBttsWLLocal(arr);
  //   setBttsWLLocal(arr);
  // };
  // const getTodayBet = async () => {
  //   const todayBet = await getTodayBetMongo(todayDate);
  //   const todayBetArr = await getTodayBetArrMongo(todayDate);
  //   console.log('todayBet111', todayBet);
  //   console.log('todayBetArr111', todayBetArr);
  //   todayBet && setTodayBetLocal(todayBet);
  //   todayBetArr.length > 0 && setTodayBetArrLocal(todayBetArr);
  // };

  const handleSourceClick = (source) => {
    let filtered = resultsTotalLocalFil.filter(
      (elem) => elem.source === source
    );
    setResultsTotalLocalFil([]);
    setResultsTotalLocalFil(filtered);
    setIsNoFilVisible(true);
  };
  const handleDelFilter = () => {
    setResultsTotalLocalFil([]);
    setResultsTotalLocalFil(resultsTotalLocal);
    setIsNoFilVisible(false);
  };

  // const formatPredictionDate = (elem) => {
  //   if (elem.source === 'fbp') {
  //     return elem.predictionDate.split(':')[0];
  //   }
  //   return elem.predictionDate;
  // };

  return (
    <div className="App">
      <div class="wrapper-up">
        <div>
          <form onSubmit={onSubmitHandler}>
            <DayPicker
              mode="single"
              required
              selected={todayDate}
              onSelect={onSelect}
            />
            {todayDate && (
              <>
                <button class="button" type="submit">
                  Get Data
                </button>
                <button class="button" onClick={loadTest}>
                  Load Test
                </button>
                <button class="button" onClick={handleLoadWithVpn}>
                      Load With Vpn
                    </button>
                {/* {bttsDataExist &&
                  winDataExist &&
                  drawDataExist &&
                  overDataExist && (
                    <button class="button" onClick={handleLoadWithVpn}>
                      Load With Vpn
                    </button>
                  )} */}
                  
              </>
            )}
          </form>
        </div>
        {todayDate && todayDate !== '' ? (
          <div class="wrapper-actions">
            <h3>Действия</h3>

            {!loader ? (
              <div>
                {todayDate &&
                  todayDate === format(new Date(), 'dd.MM.yyyy') && (
                    <div>
                      <div class="buttons">
                        {!bttsDataExist ? (
                          <button
                            class="button"
                            onClick={() => handleLoadBtts()}
                            type="button"
                          >
                            load btts
                          </button>
                        ) : (
                          <button
                            class="button active"
                            onClick={() => handleDeleteBtts()}
                            type="button"
                          >
                            delete btts
                          </button>
                        )}
                      </div>
                      <div class="buttons">
                        {!overDataExist ? (
                          <button
                            class="button"
                            onClick={() => handleLoadOver()}
                            type="button"
                          >
                            load over
                          </button>
                        ) : (
                          <button
                            class="button active"
                            onClick={() => handleDeleteOver()}
                            type="button"
                          >
                            delete over
                          </button>
                        )}
                      </div>
                      <div class="buttons">
                        {!underDataExist ? (
                          <button
                            class="button"
                            onClick={() => handleLoadUnder()}
                            type="button"
                          >
                            load under
                          </button>
                        ) : (
                          <button
                            class="button active"
                            onClick={() => handleDeleteUnder()}
                            type="button"
                          >
                            delete under
                          </button>
                        )}
                      </div>
                      <div class="buttons">
                        {!crawlDataExist && (
                          <button
                            class="button"
                            onClick={() => handleLoadCrawl()}
                            type="button"
                          >
                            load crawl
                          </button>
                        )}
                      </div>
                      <div class="buttons">
                        {!winDataExist ? (
                          <button
                            class="button"
                            onClick={() => handleLoadWin()}
                            type="button"
                          >
                            load win
                          </button>
                        ) : (
                          <button
                            class="button active"
                            onClick={() => handleDeleteWin()}
                            type="button"
                          >
                            delete win
                          </button>
                        )}
                      </div>
                      <div class="buttons">
                        {!drawDataExist ? (
                          <button
                            class="button"
                            onClick={() => handleLoadDraw()}
                            type="button"
                          >
                            load draw
                          </button>
                        ) : (
                          <button
                            class="button active"
                            onClick={() => handleDeleteDraw()}
                            type="button"
                          >
                            delete draw
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                {todayDate &&
                  todayDate !== format(new Date(), 'dd.MM.yyyy') && (
                    <div class="buttons">
                      {!resultDataExist ? (
                        <button
                          class="button"
                          type="button"
                          onClick={() => handleLoadResults()}
                        >
                          load result
                        </button>
                      ) : (
                        <button
                          class="button active"
                          type="button"
                          onClick={() => handleDeleteResult()}
                        >
                          delete result
                        </button>
                      )}
                      {loader && <span>loading...</span>}
                    </div>
                  )}
              </div>
            ) : (
              <span>loading...</span>
            )}
          </div>
        ) : (
          <div class="wrapper-actions">
            <h3>Действия</h3>
            <h5>Выберите дату</h5>
          </div>
        )}
      </div>

      {/* <div class="buttons">
        <button onClick={() => handleGetBtts()} type="button">get btts</button>
      </div> */}
      <h4 className="date">Selected date: {todayDate}</h4>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="BTTS & Over25" {...a11yProps(0)} />
          <Tab label="Results All" {...a11yProps(1)} />
          <Tab label="Results" {...a11yProps(2)} />
          <Tab label="Under 25" {...a11yProps(3)} />
          <Tab label="Win Preds" {...a11yProps(4)} />
          <Tab label="Draws" {...a11yProps(5)} />
          <Tab label="Zeros" {...a11yProps(6)} />
          <Tab label="Load Mon" {...a11yProps(7)} />
          <Tab label="Prod" {...a11yProps(8)} />
          <Tab label="Stat" {...a11yProps(9)} />
          {/*<Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <div className="wrapper"> */}

        <h2>{`Prediction type: Btts & over25 (${bttsLocal.length})`}</h2>

        {bttsLocal.length !== 0 && (
          <button
            className={'button' + (addWin ? ' active' : '')}
            type="button"
            onClick={() => toggleAddWin()}
          >
            {addWin ? 'del win' : 'add win'}
          </button>
        )}

        <div style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
          {/* <button
              style={{ width: '10%', marginRight: '2%' }}
              type="button"
              onClick={() => saveTodayBet()}
            >
              Save today bet
            </button>
            <button
              style={{ width: '10%' }}
              type="button"
              onClick={() => getTodayBet()}
            >
              See today bet
            </button> */}
          <form
            onSubmit={handleOverPredSubmit}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              minWidth: '40%',
            }}
          >
            <input
              type="text"
              value={homeTeamTotalPred}
              placeholder="home team of pred..."
              onChange={(e) => setHomeTeamTotalPred(e.target.value)}
              // style={{marginRight: '2%'}}
            />
            <select
              value={sourceTotalPred}
              onChange={(e) => setSourceTotalPred(e.target.value)}
            >
              <option value="accum_btts">accum_btts</option>
              <option value="accum_o25">accum_o25</option>
              <option value="fst_btts">fst_btts</option>
              <option value="fst_o25">fst_o25</option>
              <option value="fbp_btts">fbp_btts</option>
              <option value="fbp_o25">fbp_o25</option>
              <option value="wdw_btts">wdw_btts</option>
              <option value="wdw_o25">wdw_o25</option>
              <option value="footsuper">footsuper</option>
              <option value="redscores">redscores</option>
              <option value="fbp_btts">fbp_btts</option>
              <option value="betshoot">betshoot</option>
              <option value="betclan_btts">betclan_btts</option>
              <option value="betclan_o25">betclan_o25</option>
              <option value="o25tip_acc">o25tip_acc</option>
              <option value="mines_acc_o25">mines_acc_o25</option>
              <option value="prot">prot</option>
            </select>
            <div className="radio-btn-container">
              <div className="RadioButton">
                <input
                  id="1"
                  onChange={radioChangeHandler}
                  value="btts"
                  type="radio"
                  checked={predType === 'btts'}
                />
                <label htmlFor={'1'}>btts</label>
              </div>
              <div className="RadioButton">
                <input
                  id="2"
                  onChange={radioChangeHandler}
                  value="over25"
                  type="radio"
                  checked={predType === 'over25'}
                />
                <label htmlFor={'2'}>over25</label>
              </div>
            </div>
            <div className="radio-btn-container">
              <div className="RadioButton">
                <input
                  id="3"
                  onChange={isAccaChangeHandler}
                  value="isAcca"
                  type="radio"
                  checked={isAcca === 'isAcca'}
                />
                <label htmlFor={'3'}>isAcca</label>
              </div>
              <div className="RadioButton">
                <input
                  id="4"
                  onChange={isAccaChangeHandler}
                  value="notAcca"
                  type="radio"
                  checked={isAcca === 'notAcca'}
                />
                <label htmlFor={'4'}>notAcca</label>
              </div>
            </div>
            <button class="button" type="submit">
              Post
            </button>
          </form>
          {/* <button type="button" onClick={handleIncludeWL}>
              Include WL
            </button> */}
        </div>

        <div className="wrap-collabsible">
          <input id="collapsible" className="toggle" type="checkbox"></input>
          <label for="collapsible" className="lbl-toggle">
            Show Aggs
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '20px',
                  width: '100%',
                }}
              >
                <Table columns={columnsBttsAdm} data={bttsAndOverArr} initialState={initialState}/>
                {/* {Object.keys(bttsHomeTeamCount).length !== 0 &&
                  Object.keys(bttsHomeTeamCount).map((homeTeam, i) => {
                    return (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          width: '50%',
                        }}
                      >
                        {bttsHomeTeamCount[homeTeam].count >= 2 && (
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '50%',
                              }}
                            >
                              <div
                                // onClick={() => handleTeamAggClick(homeTeam)}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  marginRight: '10px',
                                  outline: bttsHomeTeamCount[homeTeam].numAcca > 0
                                    ? '2px dashed green'
                                    : 'none',
                                }}
                              >
                                {homeTeam}
                              </div>
                              <div>{bttsHomeTeamCount[homeTeam].count}</div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })} */}
              </ul>
            </div>
          </div>
        </div>

        {bttsLocal.length !== 0 && (
          <table className="table">
            <tbody>
              {/* <th className="cell width10">Res</th> */}
              <th className="cell width20">Home Team</th>
              {/* <th className="cell width20">Pred Team</th> */}
              <th className="cell width20">Away Team</th>
              <th className="cell width20">Source</th>
              <th className="cell width10">Action</th>
              <th className="cell width10">Date</th>
              {bttsLocal
                .sort((a, b) => {
                  if (a.homeTeam < b.homeTeam) {
                    return -1;
                  }
                  if (a.homeTeam > b.homeTeam) {
                    return 1;
                  }
                  return 0;
                })
                .map((elem) => {
                  return (
                    <tr
                      key={elem._id}
                      style={{
                        backgroundColor:
                          elem.source === 'gnowAcc'
                            ? 'lightgray'
                            : 'transparent' &&
                              (elem.source === 'footy_o25' ||
                                elem.source === 'footy_btts')
                            ? '#CCF5AC'
                            : 'transparent' && elem.source === 'morph'
                            ? '#006EAF'
                            : 'transparent' && elem.source === 'accum'
                            ? '#5BC0BE'
                            : 'transparent' &&
                              (elem.source === 'r2bet_o25' ||
                                elem.source === 'r2bet_btts')
                            ? '#F9F5E3'
                            : 'transparent' &&
                              (elem.source === 'venas_o25' ||
                                elem.source === 'venas_btts')
                            ? '#A95E4C'
                            : 'transparent' && elem.source === 'passion_o25'
                            ? '#E1BC29'
                            : 'transparent' &&
                              (elem.source === 'fbp_o25' ||
                                elem.source === 'fbp_btts')
                            ? '#A095C6'
                            : 'transparent' &&
                              (elem.source === 'prot_o25' ||
                                elem.source === 'prot_btts')
                            ? '#a2d2ff'
                            : 'transparent' && elem.source === 'footsuper'
                            ? '#fee440'
                            : 'transparent' &&
                              (elem.source === 'predutd_o25' ||
                                elem.source === 'predutd_btts')
                            ? '#006EAF'
                            : 'transparent' &&
                              (elem.source === 'hello_o25' ||
                                elem.source === 'hello_btts')
                            ? 'lightpink'
                            : 'transparent' && elem.source === 'mines_o25'
                            ? 'green'
                            : 'transparent' && elem.source === 'redscores'
                            ? '#f72585'
                            : 'transparent' && elem.source === 'betshoot'
                            ? '#fdf0d5'
                            : 'transparent' && elem.source === 'bettingtips'
                            ? '#ffd8be'
                            : 'transparent' && elem.source === 'bettingtips_b'
                            ? '#ffd8be'
                            : 'transparent' &&
                              (elem.source === 'banker_o25' ||
                                elem.source === 'banker_btts')
                            ? '#007ea7'
                            : 'transparent' &&
                              (elem.source === 'soccertipz_o25' ||
                                elem.source === 'soccertipz_btts')
                            ? '#70a288'
                            : 'transparent' && elem.source === 'wincomparator'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'vitibet'
                            ? '#FFB6D9'
                            : 'transparent' && elem.source === 'betgenuine'
                            ? '#E19898'
                            : 'transparent' && elem.source === 'footsuper_o25'
                            ? '#CECE5A'
                            : 'transparent' &&
                              (elem.source === 'fbpai_o25' ||
                                elem.source === 'fbpai_btts')
                            ? '#fb5607'
                            : 'transparent',
                        fontWeight: elem.isAcca ? '700' : '400',
                        border: elem.isAcca ? '4px dashed green' : 'none',
                        opacity:
                          elem.source === 'accum_o25'
                            ? '0.3'
                            : '1' && elem.source === 'accum_btts'
                            ? '0.3'
                            : '1' && elem.source === 'banker_btts'
                            ? '0.3'
                            : '1' && elem.source === 'banker_o25'
                            ? '0.3'
                            : '1' && elem.source === 'mighty_btts'
                            ? '0.3'
                            : '1' && elem.source === 'r2bet_btts'
                            ? '0.3'
                            : '1' && elem.source === 'r2bet_o25'
                            ? '0.3'
                            : '1' && elem.source === 'bettingtips'
                            ? '0.3'
                            : '1' && elem.source === 'o25tip'
                            ? '0.3'
                            : '1' && elem.source === 'footy_btts'
                            ? '0.3'
                            : '1' && elem.source === 'footy_o25'
                            ? '0.3'
                            : '1' && elem.source === 'trustpredict_btts'
                            ? '0.3'
                            : '1' && elem.source === 'trustpredict_o25'
                            ? '0.3'
                            : '1' && elem.source === 'kcpredict_btts'
                            ? '0.3'
                            : '1' && elem.source === 'kcpredict_o25'
                            ? '0.3'
                            : '1' && elem.source === 'venas_btts'
                            ? '0.3'
                            : '1' && elem.source === 'venas_o25'
                            ? '0.3'
                            : '1',
                        // (elem.source.includes('fst')) ||
                        // (elem.source === 'o25tip') ||
                        // (elem.source === 'footsuper_o25' && elem.action === 'over25') ||
                        // (elem.source === 'gnowAcc' && elem.action === 'over25') ||
                        // (elem.source === 'hello_o25' && elem.action === 'over25') ||
                        // (elem.source === 'footsuper_btts' && elem.action === 'btts') ||
                        // (elem.source === 'bettingtips') ||
                        // (elem.source.includes('r2bet')) ||
                        // (elem.source === 'wincomparator') ||
                        // (elem.source === 'accum')
                        // ? '3px dashed blue' : 'none',
                        // opacity:
                        //   (elem.source === 'fbp' && elem.action === 'over25') ||
                        //   (elem.source === 'fst' && elem.action === 'over25') ||
                        //   (elem.source === 'accum' && elem.action === 'btts') ||
                        //   (elem.source === 'vitibet' && elem.action === 'over25') ||
                        //   (elem.source === 'footsuper_o25' && elem.action === 'over25') ||
                        //   elem.source === 'footsuper' ||
                        //   (elem.source === 'prot' &&
                        //     elem.action === 'over25') ||
                        //   (elem.source === 'accum' &&
                        //     elem.action === 'over25') ||
                        //   (elem.source === 'r2bet' && elem.action === 'btts') ||
                        //   (elem.source === 'r2bet' && elem.action === 'over25') ||
                        //   (elem.source === 'wincomparator' &&
                        //     elem.action === 'btts') ||
                        //   (elem.source === 'passion' &&
                        //     elem.action === 'win') ||
                        //   (elem.source === 'bettingtips' &&
                        //     elem.action === 'btts') ||
                        //   (elem.source === 'r2bet' && elem.action === 'win') ||
                        //   (elem.source === 'mines' && (elem.action.includes('1') || elem.action.includes('2'))) ||
                        //   (elem.source === 'prot' && elem.action === 'win') ||
                        //   (elem.source === 'vitibet' && elem.action === 'win') ||
                        //   (elem.source === 'venas' && elem.action === 'XWin') ||
                        //   (elem.source === 'betgenuine' && elem.action === 'XWin') ||
                        //   (elem.source === 'wincomparator' && elem.action === 'win') ||
                        //   (elem.source === 'bettingtips' &&
                        //     elem.action === 'win') ||
                        //   (elem.source === 'fst' && elem.action === 'win') ||
                        //   (elem.source === 'r2bet' && elem.action === 'XWin') ||
                        //   (elem.source === 'fbp' && elem.action === 'win') ||
                        //   (elem.source === 'passion' && elem.action === 'win') ||
                        //   (elem.source === 'footsuper' &&
                        //     elem.action === 'win') ||
                        //   (elem.source === 'hello' && elem.action === 'XWin') ||
                        //   (elem.source === 'gnowAcc' &&
                        //     elem.action === 'over25')
                        //     ? 0.3
                        //     : 1,
                      }}
                    >
                      <td className="cell width20">{elem.homeTeam}</td>
                      {/* <td className="cell width20">{elem.predTeam}</td> */}
                      <td className="cell width20">{elem.awayTeam}</td>
                      <td className="cell width20">{elem.source}</td>
                      <td className="cell width20">{elem.action}</td>
                      <td className="cell width20">
                        {/* {elem.predictionDate !== '' &&
                              formatPredictionDate(elem)} */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {/* </div> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>{`All Results: (${resultsLocal.length})`}</h2>

        {resultsLocal.length !== 0 && (
          <button
            className={'button' + (showZero ? ' active' : '')}
            type="button"
            onClick={() => toggleZero()}
          >
            {showZero ? 'show all' : 'Show only 0 - 0'}
          </button>
        )}

        {/* <h4>{`fbp: ${bttsSourcesCount.fbp} fst: ${bttsSourcesCount.fst} footy: ${bttsSourcesCount.footy} accum: ${bttsSourcesCount.accum} fbpai: ${bttsSourcesCount.fbpai}`}</h4> */}
        {resultsLocal.length !== 0 && (
          <table className="table">
            <tbody>
              <th className="cell width20">Home Team</th>
              <th className="cell width20">Away Team</th>
              <th className="cell width10">Score</th>
              {/* <th className="cell width10">Source</th>
            <th className="cell width10">btts res</th>
            <th className="cell width10">over 05 res</th>
            <th className="cell width10">over 15 res</th>
            <th className="cell width10">over 25 res</th> */}
              <>
                {resultsLocal
                  .sort((a, b) => {
                    if (a.homeTeam < b.homeTeam) {
                      return -1;
                    }
                    if (a.homeTeam > b.homeTeam) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((elem) => {
                    return (
                      <tr
                        key={elem._id}
                        // style={{
                        //   display: 'flex',
                        //   width: '60%',
                        //   justifyContent: 'space-between',
                        //   marginBottom: '20px',
                        // }}
                      >
                        <td className="cell width20">{elem.homeTeam}</td>
                        <td className="cell width20">{elem.awayTeam}</td>
                        <td className="cell width10">{elem.score}</td>
                        {/* <td className="cell width10">{elem.source}</td>
                      <td className="cell width10">
                        {elem.bttsRes ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over05Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over15Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over25Res ? 'True' : 'False'}
                      </td> */}
                        {/* <td className="cellResult">{elem.prediction}</td> */}
                      </tr>
                    );
                  })}
              </>
            </tbody>
          </table>
        )}

        {resultsLocal.length === 0 && <p>Результатов на эту дату еще нет</p>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>{`BTTS Results (${resultsTotalLocalFil.length})`}</h2>

        {bttsLocal.length !== 0 &&
          resultsLocal.length !== 0 &&
          !totalDataExist && (
            <div>
              {!totalLoader ? (
                <button
                  className="button"
                  type="button"
                  onClick={() => handleLoadTotal()}
                >
                  calc Total
                </button>
              ) : (
                <span>loading...</span>
              )}
            </div>
          )}

        <p
          style={{
            width: '100px',
            backgroundColor: 'red',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {isNoFilVisible && (
            <div onClick={() => handleDelFilter()}>X (no filter)</div>
          )}
        </p>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            marginBottom: '20px',
            width: '100%',
          }}
        >
          {Object.keys(resultTotalSourcesCount).length !== 0 &&
            Object.keys(resultTotalSourcesCount).map((source, i) => {
              return (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    width: `calc(100%/${
                      Object.keys(resultTotalSourcesCount).length
                    })`,
                  }}
                >
                  <div style={{ fontWeight: '700', marginRight: '10px' }}>
                    {source}
                  </div>
                  <div>{resultTotalSourcesCount[source]}</div>
                </li>
              );
            })}
        </ul>
        {/* <h4>{`fbp: ${resultTotalSourcesCount.fbp} fst: ${resultTotalSourcesCount.fst} footy: ${resultTotalSourcesCount.footy} accum: ${resultTotalSourcesCount.accum} fbpai: ${resultTotalSourcesCount.fbpai}`}</h4> */}
        {resultsTotalLocalFil.length !== 0 && (
          <table className="table">
            <th className="cell">X</th>
            <th className="cell width20">Home Team</th>
            <th className="cell width20">Away Team</th>
            <th className="cell width10">Score</th>
            <th className="cell width10">Source</th>
            <th className="cell width10">Prediction</th>
            <th className="cell width10">btts res</th>
            <th className="cell width10">over 05 res</th>
            <th className="cell width10">over 15 res</th>
            <th className="cell width10">over 25 res</th>
            <tbody>
              {resultsTotalLocalFil
                .sort((a, b) => {
                  if (a.homeTeam < b.homeTeam) {
                    return -1;
                  }
                  if (a.homeTeam > b.homeTeam) {
                    return 1;
                  }
                  return 0;
                })
                .map((elem) => {
                  return (
                    <tr
                      key={elem._id}
                      // style={{
                      //   display: 'flex',
                      //   width: '60%',
                      //   justifyContent: 'space-between',
                      //   marginBottom: '20px',
                      // }}
                    >
                      <td className="cell">
                        <p
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDeleteResultClick(elem.homeTeam)}
                        >
                          X
                        </p>
                      </td>
                      <td className="cell width20">{elem.homeTeam}</td>
                      <td className="cell width20">{elem.awayTeam}</td>
                      <td className="cell width10">{elem.score}</td>
                      <td
                        onClick={() => {
                          handleSourceClick(elem.source);
                        }}
                        className="cell width10"
                        style={{ cursor: 'pointer' }}
                      >
                        {elem.source}
                      </td>
                      <td className="cell width10">{elem.prediction}</td>
                      <td
                        className="cell width10"
                        style={{
                          backgroundColor: elem.bttsRes
                            ? 'lightgreen'
                            : 'lightred',
                        }}
                      >
                        {elem.bttsRes ? 'True' : 'False'}
                      </td>
                      <td
                        className="cell width10"
                        style={{
                          backgroundColor: elem.over05Res
                            ? 'lightgreen'
                            : 'lightred',
                        }}
                      >
                        {elem.over05Res ? 'True' : 'False'}
                      </td>
                      <td
                        className="cell width10"
                        style={{
                          backgroundColor: elem.over15Res
                            ? 'lightgreen'
                            : 'lightred',
                        }}
                      >
                        {elem.over15Res ? 'True' : 'False'}
                      </td>
                      <td
                        className="cell width10"
                        style={{
                          backgroundColor: elem.over25Res
                            ? 'lightgreen'
                            : 'lightred',
                        }}
                      >
                        {elem.over25Res ? 'True' : 'False'}
                      </td>
                      {/* <td className="cellResult">{elem.prediction}</td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {/* <button type="button" onClick={() => handleGetTodayBet()}>
          Get Today Bet
        </button> */}
        {resultsLocal.length === 0 && <p>Результатов на эту дату еще нет</p>}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <h2>{`Count: (${under25DataLocal.length})`}</h2> */}

        <h2>{`Prediction type: Under45 (${under25DataLocal.length})`}</h2>
        {/* <ul className="sourcesAggs">
          {Object.keys(underSourcesCount).length !== 0 &&
            Object.keys(underSourcesCount).map((source, i) => {
              return (
                <li key={i} className="sourcesAggsElem">
                  <div style={{ fontWeight: '700', marginRight: '10px' }}>
                    {source}
                  </div>
                  <div>{underSourcesCount[source]}</div>
                </li>
              );
            })}
        </ul> */}

        <div style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
          {/* <button
              style={{ width: '10%', marginRight: '2%' }}
              type="button"
              onClick={() => saveTodayBet()}
            >
              Save today bet
            </button>
            <button
              style={{ width: '10%' }}
              type="button"
              onClick={() => getTodayBet()}
            >
              See today bet
            </button> */}
          <form
            onSubmit={handleUnderPredSubmit}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              minWidth: '40%',
            }}
          >
            <input
              type="text"
              value={homeTeamTotalPred}
              placeholder="home team of pred..."
              onChange={(e) => setHomeTeamTotalPred(e.target.value)}
              // style={{marginRight: '2%'}}
            />
            <select
              value={sourceTotalPred}
              onChange={(e) => setSourceTotalPred(e.target.value)}
            >
              <option value="wdw">wdw</option>
              <option value="betshoot">betshoot</option>
              <option value="zakabet">zakabet</option>
              <option value="stips">stips</option>
              <option value="overl">overl</option>
              <option value="mines">mines</option>
              <option value="redscores">redscores</option>
              <option value="footsuper">footsuper</option>
              <option value="predutd">predutd</option>
              <option value="fbp">fbp</option>
              <option value="mines">mines</option>
              <option value="fst">fst</option>
              <option value="accum">accum</option>
            </select>
            <div className="radio-btn-container">
              <div className="RadioButton">
                <input
                  id="1"
                  onChange={radioChangeHandler}
                  value="under25"
                  type="radio"
                  checked={predType === 'under25'}
                />
                <label htmlFor={'1'}>under25</label>
              </div>
            </div>
            <div className="radio-btn-container">
              <div className="RadioButton">
                <input
                  id="3"
                  onChange={isAccaChangeHandler}
                  value="isAcca"
                  type="radio"
                  checked={isAcca === 'isAcca'}
                />
                <label htmlFor={'3'}>isAcca</label>
              </div>
              <div className="RadioButton">
                <input
                  id="4"
                  onChange={isAccaChangeHandler}
                  value="notAcca"
                  type="radio"
                  checked={isAcca === 'notAcca'}
                />
                <label htmlFor={'4'}>notAcca</label>
              </div>
            </div>
            <button class="button" type="submit">
              Post
            </button>
          </form>
          {/* <button type="button" onClick={handleIncludeWL}>
              Include WL
            </button> */}
        </div>
        <div className="wrap-collabsible">
          <input id="collapsible3" className="toggle" type="checkbox"></input>
          <label for="collapsible3" className="lbl-toggle">
            Show Aggs
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '20px',
                  width: '100%',
                }}
              >
                {Object.keys(underHomeTeamCount).length !== 0 &&
                  Object.keys(underHomeTeamCount).map((homeTeam, i) => {
                    return (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          width: '50%',
                        }}
                      >
                        {underHomeTeamCount[homeTeam].count > 1 && (
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '50%',
                              }}
                            >
                              <div
                                // onClick={() => handleTeamAggClick(homeTeam)}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  marginRight: '10px',
                                  outline: underHomeTeamCount[homeTeam].numAcca > 0
                                    ? '2px dashed green'
                                    : 'none',
                                }}
                              >
                                {homeTeam}
                              </div>
                              <div>{underHomeTeamCount[homeTeam].count}</div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        {/* <h4>{`fbp: ${bttsSourcesCount.fbp} fst: ${bttsSourcesCount.fst} footy: ${bttsSourcesCount.footy} accum: ${bttsSourcesCount.accum} fbpai: ${bttsSourcesCount.fbpai}`}</h4> */}
        {under25DataLocal.length !== 0 && (
          <table className="table">
            <th className="cell width20">Home Team</th>
            <th className="cell width20">Away Team</th>
            <th className="cell width20">Source</th>
            <th className="cell width20">Action</th>
            {/* <th className="cell width10">Score</th> */}
            {/* <th className="cell width10">Source</th>
            <th className="cell width10">btts res</th>
            <th className="cell width10">over 05 res</th>
            <th className="cell width10">over 15 res</th>
            <th className="cell width10">over 25 res</th> */}
            <tbody>
              {under25DataLocal
                // .sort((a, b) => {
                //   if (a.homeTeam < b.homeTeam) {
                //     return -1;
                //   }
                //   if (a.homeTeam > b.homeTeam) {
                //     return 1;
                //   }
                //   return 0;
                // })
                .map((elem) => {
                  return (
                    <tr
                      key={elem._id}
                      style={{
                        backgroundColor:
                          elem.source === 'fbp'
                            ? 'lightgray'
                            : 'transparent' && elem.source === 'mybets'
                            ? '#CCF5AC'
                            : 'transparent' && elem.source === 'passion'
                            ? '#E1BC29'
                            : 'transparent' && elem.source === 'morph'
                            ? '#006EAF'
                            : 'transparent' && elem.source === 'goalsnow'
                            ? '#A095C6'
                            : 'transparent' && elem.source === 'venas'
                            ? '#A95E4C'
                            : 'transparent',
                        outline: elem.isAcca ? '3px dashed black' : 'none',
                      }}
                    >
                      <td className="cell width20">{elem.homeTeam}</td>
                      <td className="cell width20">{elem.awayTeam}</td>
                      <td className="cell width20">{elem.source}</td>
                      <td className="cell width20">{elem.action}</td>
                      {/* <td className="cell width20">{elem.predictionDate}</td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h2>{`Prediction Type: Win (${winDataLocal.length})`}</h2>
        {/* <ul className="sourcesAggs">
          {Object.keys(winSourcesCount).length !== 0 &&
            Object.keys(winSourcesCount).map((source, i) => {
              return (
                <li key={i} className="sourcesAggsElem">
                  <div style={{ fontWeight: '700', marginRight: '10px' }}>
                    {source}
                  </div>
                  <div>{winSourcesCount[source]}</div>
                </li>
              );
            })}
        </ul> */}
        <form
          onSubmit={handleWinPredSubmit}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: '40%',
          }}
        >
          <input
            type="text"
            value={homeTeamWinPred}
            placeholder="home team of pred..."
            onChange={(e) => setHomeTeamWinPred(e.target.value)}
            // style={{marginRight: '2%'}}
          />
          <input
            type="text"
            value={predTeamWinPred}
            placeholder="prediction team..."
            onChange={(e) => setPredTeamWinPred(e.target.value)}
            // style={{marginRight: '2%'}}
          />
          <select
            value={sourceWinPred}
            onChange={(e) => setSourceWinPred(e.target.value)}
          >
            <option value="footsuper">footsuper</option>
            <option value="fst">fst</option>
            <option value="nvtips">nvtips</option>
            <option value="fbp">fbp</option>
            <option value="wdw">wdw</option>
            <option value="bettingtips">bettingtips</option>
            <option value="betshoot">betshoot</option>
            <option value="mines">mines</option>
            <option value="prot">prot</option>
            <option value="accum">accum</option>
            {/* <option value="betshoot">betshoot</option>
            <option value="zakabet">zakabet</option> */}
            {/* <option value="o25tips">o25tips</option> */}
          </select>
          {/* <div className="radio-btn-container">
            <div className="RadioButton">
              <input
                id="3"
                onChange={radioChangeHandler}
                value="win"
                type="radio"
                checked={predType === 'win'}
              />
              <label htmlFor={'3'}>win</label>
            </div>
          </div> */}
          <button type="submit" className="button">
            Post
          </button>
        </form>
        <div className="wrap-collabsible">
          <input id="collapsible2" className="toggle" type="checkbox"></input>
          <label for="collapsible2" className="lbl-toggle">
            Show Aggs
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '20px',
                  width: '100%',
                }}
              >
                {Object.keys(winPredTeamCount).length !== 0 &&
                  Object.keys(winPredTeamCount).map((homeTeam, i) => {
                    return (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          width: '50%',
                        }}
                      >
                        {winPredTeamCount[homeTeam].count > 1 && (
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '50%',
                              }}
                            >
                              <div
                                // onClick={() => handleTeamAggClick(homeTeam)}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  marginRight: '10px',
                                  outline: winPredTeamCount[homeTeam].numAcca > 0
                                    ? '2px dashed green'
                                    : 'none',
                                }}
                              >
                                {homeTeam}
                              </div>
                              <div>{winPredTeamCount[homeTeam].count}</div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        {winDataLocal.length !== 0 && (
          <table className="table">
            <th className="cell width20">Home Team</th>
            <th className="cell width20">Away Team</th>
            <th className="cell width20">Prediction</th>
            <th className="cell width20">Source</th>
            <th className="cell width20">Action</th>
            {/* <th className="cell width10">Score</th> */}
            {/* <th className="cell width10">Source</th>
            <th className="cell width10">btts res</th>
            <th className="cell width10">over 05 res</th>
            <th className="cell width10">over 15 res</th>
            <th className="cell width10">over 25 res</th> */}
            <tbody>
              {winDataLocal
                .sort((a, b) => {
                  if (a.homeTeam < b.homeTeam) {
                    return -1;
                  }
                  if (a.homeTeam > b.homeTeam) {
                    return 1;
                  }
                  return 0;
                })
                .map((elem) => {
                  return (
                    <tr
                      key={elem._id}
                      style={{
                        backgroundColor:
                          elem.source === 'gnowAcc'
                            ? 'lightgray'
                            : 'transparent' && elem.source === 'footy'
                            ? '#CCF5AC'
                            : 'transparent' && elem.source === 'accum'
                            ? '#5BC0BE'
                            : 'transparent' && elem.source === 'r2bet'
                            ? '#F9F5E3'
                            : 'transparent' && elem.source === 'venas'
                            ? '#A95E4C'
                            : 'transparent' && elem.source === 'passion'
                            ? '#E1BC29'
                            : 'transparent' && elem.source === 'fbp'
                            ? '#A095C6'
                            : 'transparent' && elem.source === 'prot'
                            ? '#a2d2ff'
                            : 'transparent' && elem.source === 'hello'
                            ? '#fee440'
                            : 'transparent' && elem.source === 'morph'
                            ? '#006EAF'
                            : 'transparent' && elem.source === 'mybets'
                            ? 'lightblue'
                            : 'transparent' && elem.source === 'mines'
                            ? 'green'
                            : 'transparent' && elem.source === 'betshoot'
                            ? '#fdf0d5'
                            : 'transparent' && elem.source === 'bettingtips'
                            ? '#ffd8be'
                            : 'transparent' && elem.source === 'banker'
                            ? '#007ea7'
                            : 'transparent' && elem.source === 'wincomparator'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'vitibet'
                            ? '#FFB6D9'
                            : 'transparent' && elem.source === 'betgenuine'
                            ? '#E19898'
                            : 'transparent' && elem.source === 'footsuper_o25'
                            ? '#CECE5A'
                            : 'transparent' && elem.source === 'soccertipz'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'wdw'
                            ? '#fb5607'
                            : 'transparent',
                        border:
                          elem.source === 'betgenuine'
                            ? '4px dashed black'
                            : 'none' && elem.source === 'vitibet'
                            ? '4px dashed black'
                            : 'none' && elem.source === 'bettingtips_b'
                            ? '4px dashed black'
                            : 'none' && elem.source === 'o25tip'
                            ? '4px dashed black'
                            : 'none' && elem.source === 'wincomparator'
                            ? '4px dashed black'
                            : 'none',
                        opacity:
                          elem.source === 'r2bet' ||
                          elem.source === 'mines' ||
                          elem.source === 'passion' ||
                          elem.source === 'fst' ||
                          elem.source === 'fbp' ||
                          elem.source === 'footsuper'
                            ? 0.5
                            : 1,
                      }}
                    >
                      <td className="cell width20">{elem.homeTeam}</td>
                      <td className="cell width20">{elem.awayTeam}</td>
                      <td className="cell width20">{elem.prediction}</td>
                      <td className="cell width20">{elem.source}</td>
                      <td className="cell width20">{elem.action}</td>
                      {/* <td className="cell width20">{elem.predictionDate}</td> */}

                      {/* <td className="cell width10">{elem.source}</td>
                      <td className="cell width10">
                        {elem.bttsRes ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over05Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over15Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over25Res ? 'True' : 'False'}
                      </td> */}
                      {/* <td className="cellResult">{elem.prediction}</td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h2>{`Prediction Type: Draw (${drawDataLocal.length})`}</h2>
        {/* <ul className="sourcesAggs">
          {Object.keys(drawSourcesCount).length !== 0 &&
            Object.keys(drawSourcesCount).map((source, i) => {
              return (
                <li key={i} className="sourcesAggsElem">
                  <div style={{ fontWeight: '700', marginRight: '10px' }}>
                    {source}
                  </div>
                  <div>{drawSourcesCount[source]}</div>
                </li>
              );
            })}
        </ul> */}

        <div className="wrap-collabsible">
          <input id="collapsible5" className="toggle" type="checkbox"></input>
          <label for="collapsible5" className="lbl-toggle">
            Show Aggs
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '20px',
                  width: '100%',
                }}
              >
                {Object.keys(teamDrawCount).length !== 0 &&
                  Object.keys(teamDrawCount).map((homeTeam, i) => {
                    return (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          width: '50%',
                        }}
                      >
                        {teamDrawCount[homeTeam].count > 1 && (
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                width: '50%',
                              }}
                            >
                              <div
                                // onClick={() => handleTeamAggClick(homeTeam)}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  marginRight: '10px',
                                  outline: teamDrawCount[homeTeam].numAcca > 0
                                    ? '2px dashed green'
                                    : 'none',
                                }}
                              >
                                {homeTeam}
                              </div>
                              <div>{teamDrawCount[homeTeam].count}</div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        {drawDataLocal.length !== 0 && (
          <table className="table">
            <th className="cell width20">Home Team</th>
            <th className="cell width20">Away Team</th>
            <th className="cell width20">Source</th>
            <th className="cell width20">Action</th>
            {/* <th className="cell width10">Score</th> */}
            {/* <th className="cell width10">Source</th>
            <th className="cell width10">btts res</th>
            <th className="cell width10">over 05 res</th>
            <th className="cell width10">over 15 res</th>
            <th className="cell width10">over 25 res</th> */}
            <tbody>
              {drawDataLocal
                .sort((a, b) => {
                  if (a.homeTeam < b.homeTeam) {
                    return -1;
                  }
                  if (a.homeTeam > b.homeTeam) {
                    return 1;
                  }
                  return 0;
                })
                .map((elem) => {
                  return (
                    <tr
                      key={elem._id}
                      style={{
                        backgroundColor:
                          elem.source === 'gnowAcc'
                            ? 'lightgray'
                            : 'transparent' && elem.source === 'footy'
                            ? '#CCF5AC'
                            : 'transparent' && elem.source === 'accum'
                            ? '#5BC0BE'
                            : 'transparent' && elem.source === 'r2bet'
                            ? '#F9F5E3'
                            : 'transparent' && elem.source === 'venas'
                            ? '#A95E4C'
                            : 'transparent' && elem.source === 'passion'
                            ? '#E1BC29'
                            : 'transparent' && elem.source === 'fbp'
                            ? '#A095C6'
                            : 'transparent' && elem.source === 'prot'
                            ? '#a2d2ff'
                            : 'transparent' && elem.source === 'hello'
                            ? '#fee440'
                            : 'transparent' && elem.source === 'morph'
                            ? '#006EAF'
                            : 'transparent' && elem.source === 'mybets'
                            ? 'lightblue'
                            : 'transparent' && elem.source === 'mines'
                            ? 'green'
                            : 'transparent' && elem.source === 'betshoot'
                            ? '#fdf0d5'
                            : 'transparent' && elem.source === 'bettingtips'
                            ? '#ffd8be'
                            : 'transparent' && elem.source === 'banker'
                            ? '#007ea7'
                            : 'transparent' && elem.source === 'wincomparator'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'vitibet'
                            ? '#FFB6D9'
                            : 'transparent' && elem.source === 'betgenuine'
                            ? '#E19898'
                            : 'transparent' && elem.source === 'footsuper_o25'
                            ? '#CECE5A'
                            : 'transparent' && elem.source === 'soccertipz'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'wdw'
                            ? '#fb5607'
                            : 'transparent',
                      }}
                    >
                      <td className="cell width20">{elem.homeTeam}</td>
                      <td className="cell width20">{elem.awayTeam}</td>
                      <td className="cell width20">{elem.source}</td>
                      <td className="cell width20">{elem.action}</td>
                      {/* <td className="cell width20">{elem.predictionDate}</td> */}

                      {/* <td className="cell width10">{elem.source}</td>
                      <td className="cell width10">
                        {elem.bttsRes ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over05Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over15Res ? 'True' : 'False'}
                      </td>
                      <td className="cell width10">
                        {elem.over25Res ? 'True' : 'False'}
                      </td> */}
                      {/* <td className="cellResult">{elem.prediction}</td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {/* <h2>{`Zero Since 6 sept 2023 (${winDataLocal.length})`}</h2> */}

        <form
          onSubmit={handleZeroResSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'str',
            minWidth: '40%',
          }}
        >
          <Counter
            title="o25tip_win"
            increment={increment}
            setMatches={setMatchesO25Tip_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="bettingtips_o25"
            increment={increment}
            setMatches={setMatchesBettingtips_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="wincomparator_o25"
            increment={increment}
            setMatches={setMatchesWincomparator_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="accum_btts"
            increment={increment}
            setMatches={setMatchesAccum_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="fst_btts"
            increment={increment}
            setMatches={setMatchesFst_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="r2bet_o25"
            increment={increment}
            setMatches={setMatchesR2bet_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="hello_o25"
            increment={increment}
            setMatches={setMatchesHello_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="fbp_o25"
            increment={increment}
            setMatches={setMatchesFbp_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="fst_o25"
            increment={increment}
            setMatches={setMatchesFst_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="footsuper_o25"
            increment={increment}
            setMatches={setMatchesFootsuper_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="footsuper_btts"
            increment={increment}
            setMatches={setMatchesFootsuper_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="bettingtips_btts"
            increment={increment}
            setMatches={setMatchesBettingtips_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="prot_o25"
            increment={increment}
            setMatches={setMatchesProt_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="r2bet_btts"
            increment={increment}
            setMatches={setMatchesR2bet_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="goalnow_o25"
            increment={increment}
            setMatches={setMatchesGoalnow_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="accum_o25"
            increment={increment}
            setMatches={setMatchesAccum_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="wincomparator_btts"
            increment={increment}
            setMatches={setMatchesWincomparator_btts}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="wincomparator_win"
            increment={increment}
            setMatches={setMatchesWincomparator_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="mybets_win"
            increment={increment}
            setMatches={setMatchesMybets_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="venasbet_win"
            increment={increment}
            setMatches={setMatchesVenasbet_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="prot_win"
            increment={increment}
            setMatches={setMatchesProt_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="footy_win"
            increment={increment}
            setMatches={setMatchesFooty_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="betgenuine_win"
            increment={increment}
            setMatches={setMatchesBetgenuine_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="vitibet_win"
            increment={increment}
            setMatches={setMatchesVitibet_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="vitibet_o25"
            increment={increment}
            setMatches={setMatchesVitibet_o25}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="r2bet_win"
            increment={increment}
            setMatches={setMatchesR2bet_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="mines_win"
            increment={increment}
            setMatches={setMatchesMines_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="passion_win"
            increment={increment}
            setMatches={setMatchesPassion_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="fbp_win"
            increment={increment}
            setMatches={setMatchesFbp_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="footsuper_win"
            increment={increment}
            setMatches={setMatchesFootsuper_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="hello_win"
            increment={increment}
            setMatches={setMatchesHello_win}
            saveMatches={handleSaveMatches}
          />
          <Counter
            title="bettingtips_win"
            increment={increment}
            setMatches={setMatchesBettingtips_win}
            saveMatches={handleSaveMatches}
          />

          <button class="button" type="submit">
            Send to mongo
          </button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <button class="button" onClick={handleCreateLoadMonitor}>
                  Create Load Monitor
                </button>
        <>
          {bttsOnlyLocal.lenght !== 0 && (
            <div>
              <h4>BTTS - {Object.keys(bttsSourcesCount).length}</h4>
              <ul className="sourcesAggs">
                {Object.keys(bttsSources).length !== 0 &&
                  Object.keys(bttsSources).map((source, i) => {
                    if (bttsSourcesCount[source]) {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{ fontWeight: '700', marginRight: '10px' }}
                          >
                            {source}
                          </div>
                          <div>{bttsSourcesCount[source]}</div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{
                              fontWeight: '700',
                              color: 'red',
                              marginRight: '10px',
                            }}
                          >
                            {source}
                          </div>

                          {/* <div>{bttsSources[source].exist}</div> */}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </>
        <>
          {over25OnlyLocal.lenght !== 0 && (
            <div>
              <h4>Over 25 - {Object.keys(overSourcesCount).length}</h4>
              <ul className="sourcesAggs">
                {Object.keys(o25Sources).length !== 0 &&
                  Object.keys(o25Sources).map((source, i) => {
                    if (overSourcesCount[source]) {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{ fontWeight: '700', marginRight: '10px' }}
                          >
                            {source}
                          </div>
                          <div>{overSourcesCount[source]}</div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{
                              fontWeight: '700',
                              color: 'red',
                              marginRight: '10px',
                            }}
                          >
                            {source}
                          </div>

                          {/* <div>{bttsSources[source].exist}</div> */}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </>
        <>
          {under25DataLocal.lenght !== 0 && (
            <div>
              <h4>Under 25 - {Object.keys(underSourcesCount).length}</h4>
              <ul className="sourcesAggs">
                {Object.keys(u25Sources).length !== 0 &&
                  Object.keys(u25Sources).map((source, i) => {
                    if (underSourcesCount[source]) {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{ fontWeight: '700', marginRight: '10px' }}
                          >
                            {source}
                          </div>
                          <div>{underSourcesCount[source]}</div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{
                              fontWeight: '700',
                              color: 'red',
                              marginRight: '10px',
                            }}
                          >
                            {source}
                          </div>

                          {/* <div>{bttsSources[source].exist}</div> */}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </>
        <>
          {winDataLocal.lenght !== 0 && (
            <div>
              <h4>Win Data - {Object.keys(winSourcesCount).length}</h4>
              <ul className="sourcesAggs">
                {Object.keys(winSources).length !== 0 &&
                  Object.keys(winSources).map((source, i) => {
                    if (winSourcesCount[source]) {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{ fontWeight: '700', marginRight: '10px' }}
                          >
                            {source}
                          </div>
                          <div>{winSourcesCount[source]}</div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{
                              fontWeight: '700',
                              color: 'red',
                              marginRight: '10px',
                            }}
                          >
                            {source}
                          </div>

                          {/* <div>{bttsSources[source].exist}</div> */}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </>
        <>
          {drawDataLocal.lenght !== 0 && (
            <div>
              <h4>Draw Data - {Object.keys(drawSourcesCount).length}</h4>
              <ul className="sourcesAggs">
                {Object.keys(drawSources).length !== 0 &&
                  Object.keys(drawSources).map((source, i) => {
                    if (drawSourcesCount[source]) {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{ fontWeight: '700', marginRight: '10px' }}
                          >
                            {source}
                          </div>
                          <div>{drawSourcesCount[source]}</div>
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="sourcesAggsElem">
                          <div
                            style={{
                              fontWeight: '700',
                              color: 'red',
                              marginRight: '10px',
                            }}
                          >
                            {source}
                          </div>

                          {/* <div>{bttsSources[source].exist}</div> */}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <button class="button" onClick={handleCreateProd}>
                  Create Prod
                </button>
        
                <button
                  className="button"
                  type="button"
                  onClick={() => handleLoadResProd()}
                >
                  load res
                </button>
                <div className="prodButtonWrapper">
                  <button class="button" onClick={handleSaveUnderProd}>
                    Save Under Prod to Mongo
                  </button>
                  <button class="button" onClick={handleUpdUnderProd}>
                    Upd Under Prod to Mongo
                  </button>
                  <button class="button" onClick={() => {getUnderProd(todayDate)}}>
                    Get Under Prod from Mongo
                  </button>
                  
                </div>
                <div className="prodButtonWrapper">
                  <button class="button" onClick={handleSaveBttsProd}>
                    Save Btts Prod to Mongo
                  </button>
                  <button class="button" onClick={handleUpdBttsProd}>
                    Upd Btts Prod to Mongo
                  </button>
                  <button class="button" onClick={() => {getBttsProd(todayDate)}}>
                    Get Btts Prod from Mongo
                  </button>
                  
                </div>
                <div className="prodButtonWrapper">
                  <button class="button" onClick={handleSaveOverProd}>
                    Save Over Prod to Mongo
                  </button>
                  <button class="button" onClick={handleUpdOverProd}>
                    Upd Over Prod to Mongo
                  </button>
                  <button class="button" onClick={() => {getOverProd(todayDate)}}>
                    Get Over Prod from Mongo
                  </button>
                  
                </div>
                <div className="prodButtonWrapper">
                  <button class="button" onClick={handleSaveWinProd}>
                    Save Win Prod to Mongo
                  </button>
                  <button class="button" onClick={handleUpdWinProd}>
                    Upd Win Prod to Mongo
                  </button>
                  <button class="button" onClick={() => {getWinProd(todayDate)}}>
                    Get Win Prod from Mongo
                  </button>
                  
                </div>
                <div className="prodButtonWrapper">
                  <button class="button" onClick={handleSaveDrawProd}>
                    Save Draw Prod to Mongo
                  </button>
                  <button class="button" onClick={handleUpdDrawProd}>
                    Upd Draw Prod to Mongo
                  </button>
                  <button class="button" onClick={() => {getDrawProd(todayDate)}}>
                    Get Draw Prod from Mongo
                  </button>
                  
                </div>
        <div>
          <p>btts</p>
          <>
          {productionBttsLocal.length !== 0 && (
            <Table columns={columnsBttsProd} data={productionBttsLocal.filter(elem => elem.count > 2 || elem.numAcca !==0)} initialState={initialState}/>
          // <table className="table">
          //   <tbody>
          //     {/* <th className="cell width10">Res</th> */}
          //     <th className="cell width20">Home Team</th>
          //     {/* <th className="cell width20">Pred Team</th> */}
          //     <th className="cell width20">Away Team</th>
          //     <th className="cell width10">Count</th>
          //     <th className="cell width10">Acc Count</th>
          //     <th className="cell width10">Btts Yes</th>
          //     <th className="cell width10">Btts No</th>
          //     <th className="cell width20">Result</th>
          //     <th className="cell width20">Btts Yes</th>
          //     {productionBttsLocal
          //       .sort((a, b) => {
          //         if (a.homeTeam < b.homeTeam) {
          //           return -1;
          //         }
          //         if (a.homeTeam > b.homeTeam) {
          //           return 1;
          //         }
          //         return 0;
          //       })
          //       .map((elem) => {
          //         return (
          //           <tr
          //             key={elem._id}
          //           >
          //             <td className="cell width20">{elem.homeTeam}</td>
          //             {/* <td className="cell width20">{elem.predTeam}</td> */}
          //             <td className="cell width20">{elem.awayTeam}</td>
          //             <td className="cell width10">{elem.count}</td>
          //             <td className="cell width10">{elem.numAcca}</td>
          //             <td className="cell width10">
          //               {elem.bttsYesNum}
          //             </td>
          //             <td className="cell width10">
          //               {elem.bttsNoNum}
          //             </td>
          //             <td className="cell width20">{elem.resultScore}</td>
          //             <td className="cell width20" style={{backgroundColor: elem.bttsYes ? 'yellow'
          //                   : 'black' }}></td>
          //           </tr>
          //         );
          //       })}
          //   </tbody>
          // </table>
        )}
          </>
        </div>
        <div>
          <p>over</p>
          <>
          {productionOverLocal.length !== 0 && (
            <Table columns={columnsOverProd} data={productionOverLocal.filter(elem => elem.count > 2 || elem.numAcca !==0)} initialState={initialState}/>
          // <table className="table">
          //   <tbody>
          //     {/* <th className="cell width10">Res</th> */}
          //     <th className="cell width20">Home Team</th>
          //     {/* <th className="cell width20">Pred Team</th> */}
          //     <th className="cell width20">Away Team</th>
          //     <th className="cell width20">Count</th>
          //     <th className="cell width20">Acc Count</th>
          //     <th className="cell width20">Result</th>
          //     <th className="cell width20">Over Yes</th>
          //     {productionOverLocal
          //       .sort((a, b) => {
          //         if (a.homeTeam < b.homeTeam) {
          //           return -1;
          //         }
          //         if (a.homeTeam > b.homeTeam) {
          //           return 1;
          //         }
          //         return 0;
          //       })
          //       .map((elem) => {
          //         return (
          //           <tr
          //             key={elem._id}
          //           >
          //             <td className="cell width20">{elem.homeTeam}</td>
          //             {/* <td className="cell width20">{elem.predTeam}</td> */}
          //             <td className="cell width20">{elem.awayTeam}</td>
          //             <td className="cell width20">{elem.count}</td>
          //             <td className="cell width20">{elem.numAcca}</td>
          //             <td className="cell width20">{elem.resultScore}</td>
          //             <td className="cell width20" style={{backgroundColor: elem.overYes ? 'yellow'
          //                   : 'black' }}></td>
          //           </tr>
          //         );
          //       })}
          //   </tbody>
          // </table>
        )}
          </>
        </div>
        <div>
          <p>under</p>
          <>
          {productionUnderLocal.length !== 0 && (
            <Table columns={columnsUnderProd} data={productionUnderLocal.filter(elem => elem.count > 2 || elem.numAcca !==0)} initialState={initialState}/>
          // <table className="table">
          //   <tbody>
          //     {/* <th className="cell width10">Res</th> */}
          //     <th className="cell width20">Home Team</th>
          //     {/* <th className="cell width20">Pred Team</th> */}
          //     <th className="cell width20">Away Team</th>
          //     <th className="cell width20">Count</th>
          //     <th className="cell width20">Acc Count</th>
          //     <th className="cell width20">Result</th>
          //     <th className="cell width20">Under Yes</th>
          //     {productionUnderLocal
          //       .sort((a, b) => {
          //         if (a.homeTeam < b.homeTeam) {
          //           return -1;
          //         }
          //         if (a.homeTeam > b.homeTeam) {
          //           return 1;
          //         }
          //         return 0;
          //       })
          //       .map((elem) => {
          //         return (
          //           <tr
          //             key={elem._id}
          //           >
          //             <td className="cell width20">{elem.homeTeam}</td>
          //             {/* <td className="cell width20">{elem.predTeam}</td> */}
          //             <td className="cell width20">{elem.awayTeam}</td>
          //             <td className="cell width20">{elem.count}</td>
          //             <td className="cell width20">{elem.numAcca}</td>
          //             <td className="cell width20">{elem.resultScore}</td>
          //             <td className="cell width20" style={{backgroundColor: elem.underYes ? 'yellow': 'black' }}></td>
          //           </tr>
          //         );
          //       })}
          //   </tbody>
          // </table>
        )}
          </>
        </div>
        <div>
          <p>win</p>
          <>
          {productionWinLocal.length !== 0 && (
            <Table columns={columnsWinProd} data={productionWinLocal.filter(elem => elem.count > 2 || elem.numAcca !==0)} initialState={initialState}/>
          // <table className="table">
          //   <tbody>
          //     {/* <th className="cell width10">Res</th> */}
          //     <th className="cell width15">Home Team</th>
          //     {/* <th className="cell width15">Pred Team</th> */}
          //     <th className="cell width15">Away Team</th>
          //     <th className="cell width15">Prediction</th>
          //     <th className="cell width10">Count</th>
          //     <th className="cell width10">Acc Count</th>
          //     <th className="cell width10">Win Count</th>
          //     <th className="cell width10">Xwin Count</th>
          //     <th className="cell width10">Result</th>
          //     <th className="cell width10">WinYes</th>
          //     {productionWinLocal
          //       .sort((a, b) => {
          //         if (a.homeTeam < b.homeTeam) {
          //           return -1;
          //         }
          //         if (a.homeTeam > b.homeTeam) {
          //           return 1;
          //         }
          //         return 0;
          //       })
          //       .map((elem) => {
          //         return (
          //           <tr
          //             key={elem._id}
          //           >
          //             <td className="cell width15">{elem.homeTeam}</td>
          //             {/* <td className="cell width15">{elem.predTeam}</td> */}
          //             <td className="cell width15">{elem.awayTeam}</td>
          //             <td className="cell width15">{elem.prediction}</td>
          //             <td className="cell width10">{elem.count}</td>
          //             <td className="cell width10">{elem.numAcca}</td>
          //             <td className="cell width10">{elem.winNum}</td>
          //             <td className="cell width10">{elem.xwinNum}</td>
          //             <td className="cell width10">{elem.resultScore}</td>
          //             <td className="cell width10" style={{backgroundColor: elem.winYes ? 'yellow'
          //                   : 'black' }}></td>
          //           </tr>
          //         );
          //       })}
          //   </tbody>
          // </table>
        )}
          </>
        </div>
        <div>
          <p>draw</p>
          <>
          {productionDrawLocal.length !== 0 && (
            <Table columns={columnsDrawProd} data={productionDrawLocal.filter(elem => elem.count > 2 || elem.numAcca !==0)} initialState={initialState}/>
          // <table className="table">
          //   <tbody>
          //     {/* <th className="cell width10">Res</th> */}
          //     <th className="cell width15">Home Team</th>
          //     {/* <th className="cell width15">Pred Team</th> */}
          //     <th className="cell width15">Away Team</th>
          //     <th className="cell width10">Count</th>
          //     <th className="cell width10">Acc Count</th>
          //     <th className="cell width10">Result</th>
          //     <th className="cell width10">Draw Yes</th>
          //     {productionDrawLocal
          //       .sort((a, b) => {
          //         if (a.homeTeam < b.homeTeam) {
          //           return -1;
          //         }
          //         if (a.homeTeam > b.homeTeam) {
          //           return 1;
          //         }
          //         return 0;
          //       })
          //       .map((elem) => {
          //         return (
          //           <tr
          //             key={elem._id}
          //           >
          //             <td className="cell width15">{elem.homeTeam}</td>
          //             {/* <td className="cell width15">{elem.predTeam}</td> */}
          //             <td className="cell width15">{elem.awayTeam}</td>
          //             <td className="cell width10">{elem.count}</td>
          //             <td className="cell width10">{elem.numAcca}</td>
          //             <td className="cell width10">{elem.resultScore}</td>
          //             <td className="cell width10" style={{backgroundColor: elem.drawYes ? 'yellow'
          //                   : 'black' }}>{elem.drawYes}</td>
          //           </tr>
          //         );
          //       })}
          //   </tbody>
          // </table>
        )}
          </>
        </div>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <div className="prodButtonWrapper">
        {productionDrawLocal.length !==0 && <button class="button" onClick={handleCreateTodayStatArrDraw}>
        Create Today Stat Draw
        </button>}
        {todayStatDraw.length !==0 && <button class="button" onClick={handleSaveDailyStatToMongoDraw}>
        Save Today Stat Draw to Mongo
        </button>}
        </div>
        <div className="prodButtonWrapper">
        {productionWinLocal.length !==0 && <button class="button" onClick={handleCreateTodayStatArrWin}>
        Create Today Stat Win
        </button>}
        {todayStatWin.length !==0 && <button class="button" onClick={handleSaveDailyStatToMongoWin}>
        Save Today Stat Win to Mongo
        </button>}
        </div>
        <div className="prodButtonWrapper">
        {productionOverLocal.length !==0 && <button class="button" onClick={handleSaveTodayTotalOver}>
        Create Today Stat Over
        </button>}
        {todayStatOver.length !==0 && <button class="button" onClick={handleSaveDailyStatToMongoOver}>
        Save Today Stat Over to Mongo
        </button>}
        </div>
        <div className="prodButtonWrapper">
        {productionBttsLocal.length !==0 && <button class="button" onClick={handleSaveTodayTotalBtts}>
        Create Today Stat Btts
        </button>}
        {todayStatBtts.length !==0 && <button class="button" onClick={handleSaveDailyStatToMongoBtts}>
        Save Today Stat Btts to Mongo
        </button>}
        </div>
        <div className="prodButtonWrapper">
        {productionUnderLocal.length !==0 && <button class="button" onClick={handleSaveTodayTotalUnder}>
          Create Today Stat Under
        </button>}
        {todayStatUnder.length !==0 && <button class="button" onClick={handleSaveDailyStatToMongoUnder}>
        Save Today Stat Under to Mongo
        </button>}
        </div>

      </TabPanel>
      {/* <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default App;
