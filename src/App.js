import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from './context/context';
import './App.css';
// import { getResultsMongo } from './api/getResultsMongo';
import { format, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import React from 'react';

import { AppBar } from '@mui/material';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { deleteResultsTotalMongo } from './api/deleteResultsTotalMongo';
import { getClubStat } from './api/getClubStat';
import { v4 as uuidv4 } from 'uuid';

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
} from './api/result';
import {
  deleteOverData,
  loadCrawlData,
  loadOverData,
  loadOverDataWithVpn,
} from './api/over';
import {
  getHomeTeamName,
  sortData,
  getDatesBetween
} from './utils';
import { deleteDraw, getDraw, loadDraw, loadDrawWithVpn } from './api/draw';
import Table from './components/table';
import {
  getAllOverProd,
  getBttsProd,
  getBttsProdZeros,
  getDrawProd,
  getFullTable,
  getFullTableZeros,
  getOverProd,
  getOverProdZeros,
  getUnder45Prods,
  getUnderProd,
  getWinProd,
  getWinProdZeros,
  saveBttsProd,
  saveDrawProd,
  saveFullTable,
  saveOverProd,
  saveUnderProd,
  saveWinProd,
  updateBttsProd,
  updateDrawProd,
  updateFullTable,
  updateOverProd,
  updateUnderProd,
  updateWinProd,
} from './api/prod';
import {
  getBttsDailyTotal,
  getDrawDailyTotal,
  getOverDailyTotal,
  getUnderDailyTotal,
  getWinDailyTotal,
  saveBttsDailyTotal,
  saveDrawDailyTotal,
  saveOverDailyTotal,
  saveUnderDailyTotal,
  saveWinDailyTotal,
} from './api/dailyTotals';
import {
  columnsBttsAdm,
  columnsBttsDailyStat,
  columnsBttsProd,
  columnsBttsTotalStat,
  columnsDrawDailyStat,
  columnsDrawProd,
  columnsDrawTotalStat,
  columnsFullTable,
  columnsOverDailyStat,
  columnsOverProd,
  columnsOverTotalStat,
  columnsUnderDailyStat,
  columnsUnderProd,
  columnsUnderTotalStat,
  columnsWinDailyStat,
  columnsWinProd,
  columnsWinTotalStat,
} from './components/table/columns';
import { getBttStatTotal, getDrawStatTotal, getOverStatTotal, getUnderStatTotal, getWinStatTotal, saveBttsStatTotal, saveDrawStatTotal, saveOverStatTotal, saveUnderStatTotal, saveWinStatTotal } from './api/statTotals';

function App() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = format(yesterday, 'dd.MM.yyyy');
  const yesterdayString = formattedYesterday.toString();

  const formattedToday = format(today, 'dd.MM.yyyy');
  const todayString = formattedToday.toString();

  const {
    setResultsTotal,
    bttsSources,
    o25Sources,
    u25Sources,
    winSources,
    drawSources,
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

  const [fullTableLocal, setFullTableLocal] = useState([]);

  //stat totals
  const [todayStatDraw, setTodayStatDraw] = useState([]);
  const [todayStatBtts, setTodayStatBtts] = useState([]);
  const [todayStatOver, setTodayStatOver] = useState([]);
  const [todayStatUnder, setTodayStatUnder] = useState([]);
  const [todayStatWin, setTodayStatWin] = useState([]);

  //total totals
  const [totalDraw, setTotalDraw] = useState([]);
  const [totalBtts, setTotalBtts] = useState([]);
  const [totalOver, setTotalOver] = useState([]);
  const [totalUnder, setTotalUnder] = useState([]);
  const [totalWin, setTotalWin] = useState([]);

  //stat totals from mongo
  const [todayStatDrawMongo, setTodayStatDrawMongo] = useState([]);
  const [todayStatBttsMongo, setTodayStatBttsMongo] = useState([]);
  const [todayStatOverMongo, setTodayStatOverMongo] = useState([]);
  const [todayStatUnderMongo, setTodayStatUnderMongo] = useState([]);
  const [todayStatWinMongo, setTodayStatWinMongo] = useState([]);

  //o25 tops
  const [topOver25FromO25, setTopOver25FromO25] = useState([]);
  const [topOver15FromO25, setTopOver15FromO25] = useState([]);
  const [topOver05FromO25, setTopOver05FromO25] = useState([]);

   //u25 tops
  const [topUnder35, setTopUnder35] = useState([]);
  const [topUnder45, setTopUnder45] = useState([]);
   //win tops
  const [topOver15FromWin, setTopOver15FromWin] = useState([]);
  const [topOver05FromWin, setTopOver05FromWin] = useState([]);
   //btts tops
  const [topOver15FromBtts, setTopOver15FromBtts] = useState([]);
  const [topOver05FromBtts, setTopOver05FromBtts] = useState([]);
  // const [todayStatBttsMongo, setTodayStatBttsMongo] = useState([]);
  // const [todayStatOverMongo, setTodayStatOverMongo] = useState([]);
  // const [todayStatUnderMongo, setTodayStatUnderMongo] = useState([]);
  // const [todayStatWinMongo, setTodayStatWinMongo] = useState([]);

  //zeros
  const [fullTableZeros, setFullTableZeros] = useState([]);
  const [bttsZerosLocal, setBttsZeros] = useState([]);
  const [overZerosLocal, setOverZeros] = useState([]);
  const [winZerosLocal, setWinZeros] = useState([]);
  const [under45ProdsLocal, setUnder45Prods] = useState([]);
  //all prods
  const [allOverProdLocal, setAllOverProd] = useState([]);
  //everage objects
  const [bttsObjEv, setBttsObjEv] = useState({});
  const [overObjEv, setOverObjEv] = useState({});
  const [winObjEv, setWinObjEv] = useState({});
  const [underObjEv, setUnderObjEv] = useState({});
  const [fullTableObjEv, setFullTableObjEv] = useState({});

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

  const pastMonth = new Date();
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setDateRange] = useState(defaultSelected);

  const handleGetTopsProd = () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
  }
  const handleGetFullTableZeros = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
    const zeros = await getFullTableZeros(datesArr);
    
    let zerosFil = zeros.filter(elem => elem.hasOwnProperty('allCount'));
    let zerosSort = zerosFil.sort((a,b) => b.date - a.date);
    console.log('zerosSort111',zerosSort)
    // zerosSort.length !==0 && setFullTableZeros(zerosSort);

    if (zerosSort.length !==0) {
      setFullTableZeros(zerosSort);

      let fullTableObjEv = {};
      let allCount = 0;
      let allEv15 = 0;

      let winCount = 0;
      let winAccaCount = 0;

      let overCount = 0;
      let overAccaCount = 0;

      let bttsCount = 0;
      let bttsAccaCount = 0;

      let totalUnder25CountEv = 0;
      // let totalUnder35EffEv = 0;
      // let totalUnder45EffEv = 0;

      if (zerosSort.length !==0) {
        zerosSort.forEach(item => {
          allCount += item.allCount; 
          allEv15 += item.allEv15; 
          totalUnder25CountEv += item.totalUnder25CountEv;
          winCount += item.winCount;
          winAccaCount += item.winAccaCount;
          overCount += item.overCount;
          overAccaCount += item.overAccaCount;
          bttsCount += item.bttsCount;
          bttsAccaCount += item.bttsAccaCount;
        });

        fullTableObjEv.allCount = Math.round(allCount / zerosSort.length);
        fullTableObjEv.allEv15 = Math.round(allEv15 / zerosSort.length);
        fullTableObjEv.winCount = Math.round(winCount / zerosSort.length);
        fullTableObjEv.winAccaCount = Math.round(winAccaCount / zerosSort.length);
        fullTableObjEv.overCount = Math.round(overCount / zerosSort.length);
        fullTableObjEv.overAccaCount = Math.round(overAccaCount / zerosSort.length);
        fullTableObjEv.bttsCount = Math.round(bttsCount / zerosSort.length);
        fullTableObjEv.bttsAccaCount = Math.round(bttsAccaCount / zerosSort.length);
        fullTableObjEv.totalUnder25CountEv = Math.round(totalUnder25CountEv / zerosSort.length);
      }

      setFullTableObjEv(fullTableObjEv);
    };
  }
  const handleGetBttsZeros = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
    const bttsZeros = await getBttsProdZeros(datesArr);
    console.log('bttsZeros',bttsZeros)
    if (bttsZeros.length !==0) {
      let bttsZerosEvArr = bttsZeros.filter(elem => elem.hasOwnProperty('everageOver15YesEffB'));
      setBttsZeros(bttsZerosEvArr);

      
      let bttsObjEv = {};
      let totalCount = 0;
      let totalAccaCount = 0;
      let totalBttsYes = 0;
      // let totalBttsNo = 0;
      let totalBttsYesEffEv = 0;
      let totalOver05EffEv = 0;
      let totalOver15EffEv = 0;
      let totalUnder25Count = 0;

      if (bttsZerosEvArr.length !==0) {
        bttsZerosEvArr.forEach(item => {
          totalCount += item.count; 
          totalAccaCount += item.numAcca; 
          totalBttsYes += item.bttsYesNum; 
          // totalBttsNo += item.bttsNoNum;
          totalBttsYesEffEv += item.everageBttsYesEffB;
          totalOver05EffEv += item.everageOver05YesEffB;
          totalOver15EffEv += item.everageOver15YesEffB;
          totalUnder25Count += item.under25Count;
        });

        bttsObjEv.totalCountEv = Math.round(totalCount / bttsZerosEvArr.length);
        bttsObjEv.totalAccaCountEv = Math.round(totalAccaCount / bttsZerosEvArr.length);
        bttsObjEv.totalBttsYesEv = Math.round(totalBttsYes / bttsZerosEvArr.length);
        // bttsObjEv.totalBttsNoEv = Math.round(totalBttsNo / bttsZerosEvArr.length);
        bttsObjEv.totalBttsYesEffEv = Math.round(totalBttsYesEffEv / bttsZerosEvArr.length);
        bttsObjEv.totalOver05EffEv = Math.round(totalOver05EffEv / bttsZerosEvArr.length);
        bttsObjEv.totalOver15EffEv = Math.round(totalOver15EffEv / bttsZerosEvArr.length);
        bttsObjEv.totalUnder25Count = Math.round(totalUnder25Count / bttsZerosEvArr.length);
      }

      setBttsObjEv(bttsObjEv);
    };
  }
  const handleGetOverZeros = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
    const overZeros = await getOverProdZeros(datesArr);
    console.log('overZeros',overZeros)
    // overZeros.length !==0 && setOverZeros(overZeros);

    if (overZeros.length !==0) {
      let overZerosEvArr = overZeros.filter(elem => elem.hasOwnProperty('everageOver15EffO'));
      setOverZeros(overZerosEvArr);

      
      let overObjEv = {};
      let totalCount = 0;
      let totalAccaCount = 0;

      let totalOver05EffEv = 0;
      let totalOver15EffEv = 0;
      let totalOver25EffEv = 0;
      let totalUnder25Count = 0;

      if (overZerosEvArr.length !==0) {
        overZerosEvArr.forEach(item => {
          totalCount += item.count; 
          totalAccaCount += item.numAcca; 
          totalOver05EffEv += item.everageOver05EffO;
          totalOver15EffEv += item.everageOver15EffO;
          totalOver25EffEv += item.everageOver25EffO;
          totalUnder25Count += item.under25Count;
        });

        overObjEv.totalCountEv = Math.round(totalCount / overZerosEvArr.length);
        overObjEv.totalAccaCountEv = Math.round(totalAccaCount / overZerosEvArr.length);
        overObjEv.totalOver05EffEv = Math.round(totalOver05EffEv / overZerosEvArr.length);
        overObjEv.totalOver15EffEv = Math.round(totalOver15EffEv / overZerosEvArr.length);
        overObjEv.totalOver25EffEv = Math.round(totalOver25EffEv / overZerosEvArr.length);
        overObjEv.totalUnder25Count = Math.round(totalUnder25Count / overZerosEvArr.length);
      }

      setOverObjEv(overObjEv);
    };
  }
  const handleGetWinZeros = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
    const winZeros = await getWinProdZeros(datesArr);
    console.log('winZeros',winZeros)
    // winZeros.length !==0 && setWinZeros(winZeros);

    if (winZeros.length !==0) {
      let winZerosEvArr = winZeros.filter(elem => elem.hasOwnProperty('everageOver15EffW'));
      setWinZeros(winZerosEvArr);

      
      let winObjEv = {};
      let totalCount = 0;
      let totalWinCount = 0;
      let totalAccaCount = 0;

      let totalWinYesEffEv = 0;
      let totalOver05EffEv = 0;
      let totalOver15EffEv = 0;
      let totalUnder25Count = 0;

      if (winZerosEvArr.length !==0) {
        winZerosEvArr.forEach(item => {
          totalCount += item.count; 
          totalAccaCount += item.numAcca; 
          totalWinCount += item.winNum; 
          totalOver05EffEv += item.everageOver05EffW;
          totalOver15EffEv += item.everageOver15EffW;
          totalWinYesEffEv += item.everageWinYesEffW;
          totalUnder25Count += item.under25Count;
        });

        winObjEv.totalCountEv = Math.round(totalCount / winZerosEvArr.length);
        winObjEv.totalAccaCountEv = Math.round(totalAccaCount / winZerosEvArr.length);
        winObjEv.totalOver05EffEv = Math.round(totalOver05EffEv / winZerosEvArr.length);
        winObjEv.totalOver15EffEv = Math.round(totalOver15EffEv / winZerosEvArr.length);
        winObjEv.totalWinYesEffEv = Math.round(totalWinYesEffEv / winZerosEvArr.length);
        winObjEv.totalWinCountEv = Math.round(totalWinCount / winZerosEvArr.length);
        winObjEv.totalUnder25Count = Math.round(totalUnder25Count / winZerosEvArr.length);
      }

      setWinObjEv(winObjEv);
      console.log('winZerosLocal',winZerosLocal)
    };
  }
  const handleUnder45Prods = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr)
    const under45Prods = await getUnder45Prods(datesArr);
    console.log('under45Prods',under45Prods)
    // under45Prods.length !==0 && setUnder45Prods(under45Prods);

    if (under45Prods.length !==0) {
      let under45ProdsEvArr = under45Prods.filter(elem => elem.hasOwnProperty('everageUnder35EffU'));
      setUnder45Prods(under45ProdsEvArr);

      
      let underObjEv = {};
      let totalCount = 0;
      let totalAccaCount = 0;

      let totalUnder25EffEv = 0;
      let totalUnder35EffEv = 0;
      let totalUnder45EffEv = 0;

      if (under45ProdsEvArr.length !==0) {
        under45ProdsEvArr.forEach(item => {
          totalCount += item.count; 
          totalAccaCount += item.numAcca; 
          totalUnder25EffEv += item.everageUnder25EffU;
          totalUnder35EffEv += item.everageUnder35EffU;
          totalUnder45EffEv += item.everageUnder45EffU;
        });

        underObjEv.totalCountEv = Math.round(totalCount / under45ProdsEvArr.length);
        underObjEv.totalAccaCountEv = Math.round(totalAccaCount / under45ProdsEvArr.length);
        underObjEv.totalUnder25EffEv = Math.round(totalUnder25EffEv / under45ProdsEvArr.length);
        underObjEv.totalUnder35EffEv = Math.round(totalUnder35EffEv / under45ProdsEvArr.length);
        underObjEv.totalUnder45EffEv = Math.round(totalUnder45EffEv / under45ProdsEvArr.length);
      }

      setUnderObjEv(underObjEv);
    };
  }
  const handleGetAllOverProd = async () => {
    // const datesArr = getDatesBetween(range.from, range.to);
    const datesArr = getDatesBetween(range.from, range.to);
    console.log('datesArr',datesArr);
    const allOverProd = await getAllOverProd(datesArr);
    console.log('allOverProd',allOverProd);
    allOverProd.length !==0 && setAllOverProd(allOverProd);
  }

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'dd.MM.yyyy')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'dd.MM.yyyy')}–{format(range.to, 'dd.MM.yyyy')}
        </p>
      );
    }
  }

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
  const initialState3 = {
    sortBy: [
      {
        id: 'source',
        desc: false,
      },
    ],
  };
  const initialState4 = {
    sortBy: [
      {
        id: 'allCount',
        desc: true,
      },
    ],
  };

  let dt = todayDate.split('.')[0];
    console.log('dt',parseInt(dt) - 1);

    let yesDt = todayDate.replace(dt, `${parseInt(dt) - 1}`);
    if ((parseInt(dt) - 1) < 10) {
      yesDt = `0${yesDt}`
    }
    // let yesDt = '31.10.2023';

  // console.log('sourceAccaPred', sourceAccaPred);
  // console.log('predTypeAcca', predTypeAcca);

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  // function handleShowRating() {
  //   console.log('111', productionOverLocal);
  //   console.log('222', topOver05FromO25);
  //   console.log('333', topOver15FromO25);
  //   console.log('topOver25FromO25', topOver25FromO25);

  //   productionOverLocal.forEach(elem => {
  //     elem.countTop25 = 0;
  //     elem.countTop15 = 0;
  //     elem.countTop05 = 0;
  //     topOver25FromO25.forEach(item => {
  //       if (elem.sources.includes(item.source)) {
  //         elem.countTop25++;
  //       }
  //     })
  //     topOver15FromO25.forEach(item => {
  //       if (elem.sources.includes(item.source)) {
  //         elem.countTop15++;
  //       }
  //     })
  //     topOver05FromO25.forEach(item => {
  //       if (elem.sources.includes(item.source)) {
  //         elem.countTop05++;
  //       }
  //     })
  //   })

  //   console.log('444', productionOverLocal);

  // }
  async function handleLoadResProd() {
    for (let i = 0; i < resultsLocal.length; i++) {
      for (let j = 0; j < bttsAndOverArr.length; j++) {
        if (
          resultsLocal[i].homeTeam === bttsAndOverArr[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45

          bttsAndOverArr[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(bttsAndOverArr[j].homeTeam) ||
          resultsLocal[i].homeTeam ===
            getHomeTeamName(bttsAndOverArr[j].homeTeam)
        ) {
          bttsAndOverArr[j].resultScore = resultsLocal[i].score;
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
            parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          ) {
            bttsAndOverArr[j].over05 = 'true';
          } else {
            bttsAndOverArr[j].over05 = 'false';
          }
        }
      }
      for (let j = 0; j < fullTableLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === fullTableLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45

          fullTableLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(fullTableLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam ===
            getHomeTeamName(fullTableLocal[j].homeTeam)
        ) {
          fullTableLocal[j].resultScore = resultsLocal[i].score;
          // if (
          //   parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
          //   parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          // ) {
          //   bttsAndOverArr[j].over05 = 'true';
          // } else {
          //   bttsAndOverArr[j].over05 = 'false';
          // }
        }
      }
      for (let j = 0; j < productionBttsLocal.length; j++) {
        if (
          resultsLocal[i].homeTeam === productionBttsLocal[j].homeTeam ||
          // sortedResults[i].homeTeam.length === sortedBtts[j].homeTeam.length && sortedBtts[j].homeTeam.length === utils.LCSubStr(sortedResults[i].homeTeam,sortedBtts[j].homeTeam, sortedResults[i].homeTeam.length ,sortedBtts[j].homeTeam.length ) ||
          // (longestSubstring / sortedResults[i].homeTeam.length)*100 >= 45

          productionBttsLocal[j].homeTeam.includes(resultsLocal[i].homeTeam) ||
          // resultsLocal[i].homeTeam.includes(productionBttsLocal[j].homeTeam) ||
          resultsLocal[i].homeTeam ===
            getHomeTeamName(productionBttsLocal[j].homeTeam)
        ) {
          productionBttsLocal[j].resultScore = resultsLocal[i].score;
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 &&
            parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          ) {
            productionBttsLocal[j].bttsRes = 'true';
          } else {
            productionBttsLocal[j].bttsRes = 'false';
          }
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
            parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          ) {
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
          resultsLocal[i].homeTeam ===
            getHomeTeamName(productionOverLocal[j].homeTeam)
        ) {
          productionOverLocal[j].resultScore = resultsLocal[i].score;
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) +
              parseInt(resultsLocal[i].score.split(' - ')[1]) >
            2
          ) {
            productionOverLocal[j].overYes = 'true';
          } else {
            productionOverLocal[j].overYes = 'false';
          }

          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
            parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          ) {
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
          resultsLocal[i].homeTeam ===
            getHomeTeamName(productionUnderLocal[j].homeTeam)
        ) {
          productionUnderLocal[j].resultScore = resultsLocal[i].score;
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) +
              parseInt(resultsLocal[i].score.split(' - ')[1]) <
            3
          ) {
            productionUnderLocal[j].underYes = 'true';
          } else {
            productionUnderLocal[j].underYes = 'false';
          }
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) +
              parseInt(resultsLocal[i].score.split(' - ')[1]) <
            5
          ) {
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
          resultsLocal[i].homeTeam ===
            getHomeTeamName(productionWinLocal[j].homeTeam)
        ) {
          productionWinLocal[j].resultScore = resultsLocal[i].score;
          let win1 =
            parseInt(resultsLocal[i].score.split(' - ')[0]) >
            parseInt(resultsLocal[i].score.split(' - ')[1]);
          let win2 =
            parseInt(resultsLocal[i].score.split(' - ')[0]) <
            parseInt(resultsLocal[i].score.split(' - ')[1]);
          if (
            (win1 &&
              productionWinLocal[j].homeTeam ===
                productionWinLocal[j].prediction) ||
            (win2 &&
              productionWinLocal[j].awayTeam ===
                productionWinLocal[j].prediction)
          ) {
            productionWinLocal[j].winRes = 'true';
          } else {
            productionWinLocal[j].winRes = 'false';
          }

          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) > 0 ||
            parseInt(resultsLocal[i].score.split(' - ')[1]) > 0
          ) {
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
          resultsLocal[i].homeTeam ===
            getHomeTeamName(productionDrawLocal[j].homeTeam)
        ) {
          productionDrawLocal[j].resultScore = resultsLocal[i].score;
          if (
            parseInt(resultsLocal[i].score.split(' - ')[0]) ===
            parseInt(resultsLocal[i].score.split(' - ')[1])
          ) {
            productionDrawLocal[j].drawYes = 'true';
          } else {
            productionDrawLocal[j].drawYes = 'false';
          }
        }
      }
    }
    console.log('productionBttsLocal333', productionBttsLocal);
  }
  function handleAddEff() {
    
    if (bttsAndOverArr.length !==0) {
      bttsAndOverArr.forEach(elem => {
        let sourcesArr = elem.sources.map(elem => elem.source);
        // let sourcesArr = elem.sources;
        let sourcesKolvo = sourcesArr.length;
        let totalOver05Eff = 0;

        let sourcesBtts = sourcesArr.filter(elem => elem.includes('btts'));
        let sourcesO25 = sourcesArr.filter(elem => elem.includes('_o25'));
        // console.log('sourcesBtts333', sourcesBtts);

        sourcesBtts.forEach(item => {
          let over05Eff = totalBtts.filter(it => it.source === item)[0].over05Eff;
          totalOver05Eff += over05Eff;
        })
        sourcesO25.forEach(item => {
          let over05Eff = totalOver.filter(it => it.source === item)[0].over05Eff;
          totalOver05Eff += over05Eff;
        })

        elem.everageOver05Eff = Math.round(totalOver05Eff / sourcesKolvo);
      })
    }
    console.log('bttsAndOverArr333', bttsAndOverArr);
    console.log('productionBttsLocal333', productionBttsLocal);


    //btts add eff
    if (productionBttsLocal.length !==0) {
      productionBttsLocal.forEach(elem => {
        let sourcesArr = elem.sources.map(elem => elem.source);
        // let sourcesArr = elem.sources;
        let sourcesKolvo = sourcesArr.length;
        let totalBttsYesEff = 0;
        let totalOver05Eff = 0;
        let totalOver15Eff = 0;
        let highBttsYesEff = 0;
        let lowBttsYesEff = 100;
        let highOver05Eff = 0;
        let lowOver05Eff = 100;
        let highOver15Eff = 0;
        let lowOver15Eff = 100;

        elem.countTopO15B = 0;
        elem.countTopO05B = 0;

        topOver15FromBtts.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO15B++;
          }
        })
        topOver05FromBtts.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO05B++;
          }
        })

        sourcesArr.forEach(item => {
          let bttsEff = totalBtts.filter(it => it.source === item)[0] ? totalBtts.filter(it => it.source === item)[0].bttsYesEff : 0;
          let over05Eff = totalBtts.filter(it => it.source === item)[0] ? totalBtts.filter(it => it.source === item)[0].over05Eff : 0;
          let over15Eff = totalBtts.filter(it => it.source === item)[0] ? totalBtts.filter(it => it.source === item)[0].over15Eff : 0;

          if (highBttsYesEff < bttsEff) {
            highBttsYesEff = bttsEff;
          }
          if (lowBttsYesEff > bttsEff) {
            lowBttsYesEff = bttsEff;
          }
          if (highOver05Eff < over05Eff) {
            highOver05Eff = over05Eff;
          }
          if (lowOver05Eff > over05Eff) {
            lowOver05Eff = over05Eff;
          }
          if (highOver15Eff < over15Eff) {
            highOver15Eff = over15Eff;
          }
          if (lowOver15Eff > over15Eff) {
            lowOver15Eff = over15Eff;
          }

          totalBttsYesEff += bttsEff;
          totalOver05Eff += over05Eff;
          totalOver15Eff += over15Eff;
        })
        elem.everageBttsYesEffB = Math.round(totalBttsYesEff / sourcesKolvo);
        elem.everageOver05YesEffB = Math.round(totalOver05Eff / sourcesKolvo);
        elem.everageOver15YesEffB = Math.round(totalOver15Eff / sourcesKolvo);
        elem.highBttsYesEff = highBttsYesEff;
        elem.highOver05YesEff = highOver05Eff;
        elem.highOver15YesEff = highOver15Eff;
        elem.lowBttsYesEff = lowBttsYesEff;
        elem.lowOver05Eff = lowOver05Eff;
        elem.lowOver15Eff = lowOver15Eff;

        elem.sources = sourcesArr;
      })
    }
    console.log('productionBttsLocal444', productionBttsLocal);
    console.log('topOver25FromO25', topOver25FromO25);

    //over add eff

    console.log('productionOverLocal333', productionOverLocal);
    // console.log('productionBttsLocal333', productionBttsLocal);
    console.log('topOver25FromO25333', topOver25FromO25);
    console.log('topOver15FromO25333', topOver15FromO25);
    console.log('topOver05FromO25333', topOver05FromO25);
    console.log('totalOver333', totalOver);

    if (productionOverLocal.length !==0) {
      productionOverLocal.forEach(elem => {

        let sourceType = typeof elem.sources[0];
        let sourcesArr;

        if (sourceType === String) {
          sourcesArr = elem.sources;
          
        } else {
          sourcesArr = elem.sources.map(elem => elem.source);
        }
        sourcesArr = sourcesArr.filter(item => item !== 'mines_acc_o25')

      
        // let sourcesArr = elem.sources;
        // console.log('elem111',elem);
        console.log('sourcesArr',sourcesArr);

        // if (elem.homeTeam === 'St Pauli') {
        //   console.log('sourcesArr',sourcesArr);
        //   // console.log('topOver05FromO25',topOver05FromO25);
        //   let topSources = [];
          // topOver05FromO25.forEach(item => {
          //   if (sourcesArr.includes(item.source)) {
          //     elem.countTopO05O++;
          //     topSources.push(item.source);
          //   }
          // })
        //   console.log('elem222',elem);
        //   console.log('topSources222',topSources);
        // }


        let sourcesKolvo = sourcesArr.length;
        let totalOver05Eff = 0;
        let totalOver15Eff = 0;
        let totalOver25Eff = 0;
        let highOver05Eff = 0;
        let lowOver05Eff = 100;
        let highOver15Eff = 0;
        let lowOver15Eff = 100;
        let highOver25Eff = 0;
        let lowOver25Eff = 100;

        elem.countTopO25O = 0;
        elem.countTopO15O = 0;
        elem.countTopO05O = 0;
        topOver25FromO25.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO25O++;
          }
        })
        topOver15FromO25.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO15O++;
          }
        })
        
        topOver05FromO25.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO05O++;
            // topSources.push(item.source);
          }
        })
        
        sourcesArr.forEach(item => {
          console.log('item111',item);
          // let over05Eff = totalOver.filter(it => it.source === item)[0] ? totalOver.filter(it => it.source === item)[0].over05Eff : 0;
          // let over15Eff = totalOver.filter(it => it.source === item)[0] ? totalOver.filter(it => it.source === item)[0].over15Eff : 0;
          // let over25Eff = totalOver.filter(it => it.source === item)[0] ? totalOver.filter(it => it.source === item)[0].over25Eff : 0;
          let over05Eff = totalOver.filter(it => it.source === item)[0].over05Eff;
          let over15Eff = totalOver.filter(it => it.source === item)[0].over15Eff;
          let over25Eff = totalOver.filter(it => it.source === item)[0].over25Eff;

          // let over05Eff;
          // let over15Eff;
          // let over25Eff;

          // if (over05Elem.hasOwnProperty('over05Eff')) {
          //   over05Eff = over05Elem.over05Eff;
          // } else {
          //   over05Eff = 0;
          // }
          // if (over15Elem.hasOwnProperty('over15Eff')) {
          //   over15Eff = over15Elem.over15Eff;
          // } else {
          //   over15Eff = 0;
          // }
          // if (over25Elem.hasOwnProperty('over25Eff')) {
          //   over25Eff = over25Elem.over25Eff;
          // } else {
          //   over25Eff = 0;
          // }

          if (highOver05Eff < over05Eff) {
            highOver05Eff = over05Eff;
          }
          if (lowOver05Eff > over05Eff) {
            lowOver05Eff = over05Eff;
          }
          if (highOver15Eff < over15Eff) {
            highOver15Eff = over15Eff;
          }
          if (lowOver15Eff > over15Eff) {
            lowOver15Eff = over15Eff;
          }
          if (highOver25Eff < over25Eff) {
            highOver25Eff = over25Eff;
          }
          if (lowOver25Eff > over25Eff) {
            lowOver25Eff = over25Eff;
          }

          totalOver05Eff += over05Eff;
          totalOver15Eff += over15Eff;
          totalOver25Eff += over25Eff;
        })

        elem.everageOver05EffO = Math.round(totalOver05Eff / sourcesKolvo);
        elem.everageOver15EffO = Math.round(totalOver15Eff / sourcesKolvo);
        elem.everageOver25EffO = Math.round(totalOver25Eff / sourcesKolvo);

        elem.highOver05Eff = highOver05Eff;
        elem.lowOver05Eff = lowOver05Eff;
        elem.highOver15Eff = highOver15Eff;
        elem.lowOver15Eff = lowOver15Eff;
        elem.highOver25Eff = highOver25Eff;
        elem.lowOver25Eff = lowOver25Eff;

        elem.sources = sourcesArr;
      })
    }
    console.log('productionOverLocal444', productionOverLocal);
    console.log('topUnder35444', topUnder35);
    // console.log('productionOverLocal444', productionOverLocal);

    //under add eff
    if (productionUnderLocal.length !==0) {
      productionUnderLocal.forEach(elem => {
        let sourcesArr = elem.sources.map(elem => elem.source);
        // let sourcesArr = elem.sources;
        let sourcesKolvo = sourcesArr.length;
        let totalUnder25Eff = 0;
        let totalUnder35Eff = 0;
        let totalUnder45Eff = 0;
        let highUnder25Eff = 0;
        let lowUnder25Eff = 100;
        let highUnder35Eff = 0;
        let lowUnder35Eff = 100;
        let highUnder45Eff = 0;
        let lowUnder45Eff = 100;


        elem.countTopU45 = 0;
        elem.countTopU35 = 0;

        topUnder35.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopU35++;
          }
        })
        topUnder45.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopU45++;
          }
        })


        sourcesArr.forEach(item => {
          let under25Eff = totalUnder.filter(it => it.source === item)[0].under25Eff;
          let under35Eff = totalUnder.filter(it => it.source === item)[0].under35Eff;
          let under45Eff = totalUnder.filter(it => it.source === item)[0].under45Eff;

          if (highUnder25Eff < under25Eff) {
            highUnder25Eff = under25Eff;
          }
          if (lowUnder25Eff > under25Eff) {
            lowUnder25Eff = under25Eff;
          }
          if (highUnder35Eff < under35Eff) {
            highUnder35Eff = under35Eff;
          }
          if (lowUnder35Eff > under35Eff) {
            lowUnder35Eff = under35Eff;
          }
          if (highUnder45Eff < under45Eff) {
            highUnder45Eff = under45Eff;
          }
          if (lowUnder45Eff > under45Eff) {
            lowUnder45Eff = under45Eff;
          }

          totalUnder25Eff += under25Eff;
          totalUnder35Eff += under35Eff;
          totalUnder45Eff += under45Eff;
        })

        elem.everageUnder25EffU = Math.round(totalUnder25Eff / sourcesKolvo);
        elem.everageUnder35EffU = Math.round(totalUnder35Eff / sourcesKolvo);
        elem.everageUnder45EffU = Math.round(totalUnder45Eff / sourcesKolvo);

        elem.highUnder25Eff = highUnder25Eff;
        elem.lowUnder25Eff = lowUnder25Eff;
        elem.highUnder35Eff = highUnder35Eff;
        elem.lowUnder35Eff = lowUnder35Eff;
        elem.highUnder45Eff = highUnder45Eff;
        elem.lowUnder45Eff = lowUnder45Eff;

        elem.sources = sourcesArr;
      })
    }
    console.log('productionUnderLocal444', productionUnderLocal);

    //win add eff
    if (productionWinLocal.length !==0) {
      productionWinLocal.forEach(elem => {
        let sourcesArr = elem.sources.map(elem => elem.source);
        // let sourcesArr = elem.sources;
        let sourcesKolvo = sourcesArr.length;
        let totalWinYesEff = 0;
        let totalOver05Eff = 0;
        let totalOver15Eff = 0;

        let highWinYesEff = 0;
        let lowWinYesEff = 100;
        let highOver05Eff = 0;
        let lowOver05Eff = 100;
        let highOver15Eff = 0;
        let lowOver15Eff = 100;

        elem.countTopO15W = 0;
        elem.countTopO05W = 0;

        topOver15FromWin.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO15W++;
          }
        })
        topOver05FromWin.forEach(item => {
          if (sourcesArr.includes(item.source)) {
            elem.countTopO05W++;
          }
        })


        sourcesArr.forEach(item => {
          let winYesEff = totalWin.filter(it => it.source === item)[0].winYesEff;
          let over05Eff = totalWin.filter(it => it.source === item)[0] ? totalWin.filter(it => it.source === item)[0].over05Eff : 0;
          let over15Eff = totalWin.filter(it => it.source === item)[0] ? totalWin.filter(it => it.source === item)[0].over15Eff : 0;

          if (highWinYesEff < winYesEff) {
            highWinYesEff = winYesEff;
          }
          if (lowWinYesEff > winYesEff) {
            lowWinYesEff = winYesEff;
          }
          if (highOver05Eff < over05Eff) {
            highOver05Eff = over05Eff;
          }
          if (lowOver05Eff > over05Eff) {
            lowOver05Eff = over05Eff;
          }
          if (highOver15Eff < over15Eff) {
            highOver15Eff = over15Eff;
          }
          if (lowOver15Eff > over15Eff) {
            lowOver15Eff = over15Eff;
          }

          totalWinYesEff += winYesEff;
          totalOver05Eff += over05Eff;
          totalOver15Eff += over15Eff;
        })
        elem.everageWinYesEffW = Math.round(totalWinYesEff / sourcesKolvo);
        elem.everageOver05EffW = Math.round(totalOver05Eff / sourcesKolvo);
        elem.everageOver15EffW = Math.round(totalOver15Eff / sourcesKolvo);
        elem.highWinYesEff = highWinYesEff;
        elem.lowWinYesEff = lowWinYesEff;
        elem.highOver05Eff = highOver05Eff;
        elem.lowOver05Eff = lowOver05Eff;
        elem.highOver15Eff = highOver15Eff;
        elem.lowOver15Eff = lowOver15Eff;

        elem.sources = sourcesArr;
      })
    }
    console.log('productionWinLocal444', productionWinLocal);

    //draw add eff
    if (productionDrawLocal.length !==0) {
      productionDrawLocal.forEach(elem => {
        let sourcesArr = elem.sources.map(elem => elem.source);
        // let sourcesArr = elem.sources;
        let sourcesKolvo = sourcesArr.length;
        let totalDrawYesEff = 0;

        let highDrawYesEff = 0;
        let lowDrawYesEff = 100;
        sourcesArr.forEach(item => {
          let drawYesEff = totalDraw.filter(it => it.source === item)[0].drawYesEff;

          if (highDrawYesEff < drawYesEff) {
            highDrawYesEff = drawYesEff;
          }
          if (lowDrawYesEff > drawYesEff) {
            lowDrawYesEff = drawYesEff;
          }

          totalDrawYesEff += drawYesEff;
        })
        elem.everageDrawYesEffD = Math.round(totalDrawYesEff / sourcesKolvo);
        elem.highDrawYesEff = highDrawYesEff;
        elem.lowDrawYesEff = lowDrawYesEff;

        elem.sources = sourcesArr;
      })
    }
    console.log('productionDrawLocal444', productionDrawLocal);

    
  }
  function toggleZero() {
    console.log('toggleZero');
    setShowZero((current) => !current);
  }
  function toggleAddWin() {
    console.log('toggleAddWin');
    setAddWinToBtts((current) => !current);
  }

  function handleSaveFullTable() {
    if (fullTableLocal.length !== 0) {
      const fullTableLocalFil = fullTableLocal.filter(
        (elem) => elem.overCount > 0 && elem.bttsCount > 0 && elem.winCount
      );

      fullTableLocalFil.forEach(elem => {
        if (elem.resultScore.includes('0 - 0')) {
          elem.isZero = true;
        }
      })

      // console.log('fullTableLocalFil',fullTableLocalFil)
      saveFullTable(fullTableLocalFil);
      // updateFullTable(fullTableLocalFil);
    }
  }
  function handleUpdFullTable() {
    // updateUnderProd();
    if (fullTableLocal.length !== 0) {
      const fullTableLocalFil = fullTableLocal.filter(
        (elem) => elem.overCount > 0 && elem.bttsCount > 0 && elem.winCount
      );

      fullTableLocalFil.forEach(elem => {
        if (elem.resultScore.includes('0 - 0')) {
          elem.isZero = true;
        }
      })

      // console.log('fullTableLocalFil',fullTableLocalFil)
      updateFullTable(fullTableLocalFil);
    }
  }
  function handleSaveUnderProd() {
    if (productionUnderLocal.length !== 0) {
      const over2Sources = productionUnderLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      saveUnderProd(over2Sources);
    }
  }
  function handleUpdUnderProd() {
    // updateUnderProd();
    if (productionUnderLocal.length !== 0) {
      const over2Sources = productionUnderLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      updateUnderProd(over2Sources);
    }
  }
  function handleSaveBttsProd() {
    
    if (productionBttsLocal.length !== 0) {
      const over2Sources = productionBttsLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      saveBttsProd(over2Sources);
    }
  }
  function handleUpdBttsProd() {
    // updateUnderProd();
    if (productionBttsLocal.length !== 0) {
      const over2Sources = productionBttsLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      updateBttsProd(over2Sources);
    }
  }
  function handleSaveOverProd() {
    // console.log('productionOverLocal',productionOverLocal);
    // console.log('totalOver',totalOver);

    // if (totalOver.length !== 0 ) {
    //   let sortByOver05Eff = totalOver.sort((a,b) => b.over05Eff - a.over05Eff);
    //     console.log('sortByOver05Eff',sortByOver05Eff);
    //     let topO05FilBy98 = sortByOver05Eff.filter(elem => elem.over05Eff >= 98);
    //     console.log('topO05FilBy98',topO05FilBy98);
    //     // let top20proc = Math.round(statTotalOver.length*0.2)
    //   }

    if (productionOverLocal.length !== 0) {
      const over2Sources = productionOverLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      saveOverProd(over2Sources);
    }
  }
  function handleUpdOverProd() {
    // updateUnderProd();
    if (productionOverLocal.length !== 0) {
      const over2Sources = productionOverLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      updateOverProd(over2Sources);
    }
  }
  function handleSaveWinProd() {
    if (productionWinLocal.length !== 0) {
      const over2Sources = productionWinLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      saveWinProd(over2Sources);
    }
  }
  function handleUpdWinProd() {
    // updateUnderProd();
    if (productionWinLocal.length !== 0) {
      const over2Sources = productionWinLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      updateWinProd(over2Sources);
    }
  }
  function handleSaveDrawProd() {
    if (productionDrawLocal.length !== 0) {
      const over2Sources = productionDrawLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      saveDrawProd(over2Sources);
    }
  }
  function handleUpdDrawProd() {
    // updateUnderProd();
    if (productionDrawLocal.length !== 0) {
      const over2Sources = productionDrawLocal.filter(
        (elem) => elem.count > 2 || elem.numAcca !== 0
      );
      updateDrawProd(over2Sources);
    }
  }

  //SAVING TODAY TOTAL PRODS
  function handleSaveTodayTotalUnder() {
    let sortedTodayUnderStatTotalArr = [];

    if (productionUnderLocal.length !== 0) {
      const prodUnderFil = productionUnderLocal.filter(
        (elem) => (elem.count > 2 || elem.numAcca !== 0) && elem.resultScore !== ''
      );
      // console.log('prodOverFil',prodOverFil);
      prodUnderFil.forEach((elem) => {
        elem.sources.forEach((item) => {

          let under25 = '';
          let under35 = '';
          let under45 = '';

          if (
            parseInt(elem.resultScore.split(' - ')[0]) +
              parseInt(elem.resultScore.split(' - ')[1]) <
            3
          ) {
            under25 = 'true';
          } else {
            under25 = 'false';
          }
          if (
            parseInt(elem.resultScore.split(' - ')[0]) +
              parseInt(elem.resultScore.split(' - ')[1]) <
            4
          ) {
            under35 = 'true';
          } else {
            under35 = 'false';
          }
          if (
            parseInt(elem.resultScore.split(' - ')[0]) +
              parseInt(elem.resultScore.split(' - ')[1]) <
            5
          ) {
            under45 = 'true';
          } else {
            under45 = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            source: item,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            under25,
            under35,
            under45,
          };

          todayUnderStatArr.push(obj);
        });
      });

      //удаление дублей
      let start = 0;
      let next = 1;

      sortedTodayUnderStatTotalArr = todayUnderStatArr.sort((a, b) => {
        if (a.homeTeam < b.homeTeam) {
          return -1;
        }
        if (a.homeTeam > b.homeTeam) {
          return 1;
        }
        return 0;
      });
      
      while (next < sortedTodayUnderStatTotalArr.length) {
        if (
          sortedTodayUnderStatTotalArr[start].homeTeam.trim() === sortedTodayUnderStatTotalArr[next].homeTeam.trim()
        ) {
          if (
            sortedTodayUnderStatTotalArr[start].action === sortedTodayUnderStatTotalArr[next].action &&
            sortedTodayUnderStatTotalArr[start].source === sortedTodayUnderStatTotalArr[next].source
          ) {
            sortedTodayUnderStatTotalArr.splice(next, 1);
          }
        }

        start++;
        next++;
      }

      console.log('sortedTodayUnderStatTotalArr', sortedTodayUnderStatTotalArr);
    }
    if (sortedTodayUnderStatTotalArr.length !== 0) {
      let sourcesArr = sortedTodayUnderStatTotalArr.map((elem) => elem.source);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach((elem) => {
        let obj = {
          source: elem,
          action: 'under25',
          totalPreds: sortedTodayUnderStatTotalArr.filter(
            (item) => item.source === elem
          ).length,
          under25Count: sortedTodayUnderStatTotalArr.filter(
            (item) => item.source === elem && item.under25 === 'true'
          ).length,
          under35Count: sortedTodayUnderStatTotalArr.filter(
            (item) => item.source === elem && item.under35 === 'true'
          ).length,
          under45Count: sortedTodayUnderStatTotalArr.filter(
            (item) => item.source === elem && item.under45 === 'true'
          ).length,
          date: todayDate,
        };
        todayUnderStatTotalArr.push(obj);
      });

      console.log('todayUnderStatTotalArr', todayUnderStatTotalArr);
      todayUnderStatTotalArr.length !== 0 &&
        setTodayStatUnder(todayUnderStatTotalArr);
    }
  }
  function handleSaveTodayTotalOver() {
    let sortedTodayOverStatTotalArr = [];

    if (productionOverLocal.length !== 0) {
      const prodOverFil = productionOverLocal.filter(
        (elem) => (elem.count > 2 || elem.numAcca !== 0) && elem.resultScore !== ''
      );
      // console.log('prodOverFil',prodOverFil);
      prodOverFil.forEach((elem) => {
        elem.sources.forEach((item) => {

          let over05 = '';
          let over15 = '';
          let over25 = '';

          if (
            parseInt(elem.resultScore.split(' - ')[0]) +
              parseInt(elem.resultScore.split(' - ')[1]) >
            2
          ) {
            over25 = 'true';
          } else {
            over25 = 'false';
          }
          if (
            parseInt(elem.resultScore.split(' - ')[0]) +
              parseInt(elem.resultScore.split(' - ')[1]) >
            1
          ) {
            over15 = 'true';
          } else {
            over15 = 'false';
          }

          if (
            parseInt(elem.resultScore.split(' - ')[0]) > 0 ||
            parseInt(elem.resultScore.split(' - ')[1]) > 0
          ) {
            over05 = 'true';
          } else {
            over05 = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            source: item,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            over05,
            over15,
            over25,
          };

          todayOverStatArr.push(obj);
        });
      });

       //удаление дублей
      let start = 0;
      let next = 1;
      sortedTodayOverStatTotalArr = todayOverStatArr.sort((a, b) => {
        if (a.homeTeam < b.homeTeam) {
          return -1;
        }
        if (a.homeTeam > b.homeTeam) {
          return 1;
        }
        return 0;
      });

      
      while (next < sortedTodayOverStatTotalArr.length) {
        if (
          sortedTodayOverStatTotalArr[start].homeTeam.trim() === sortedTodayOverStatTotalArr[next].homeTeam.trim()
        ) {
          if (
            sortedTodayOverStatTotalArr[start].action === sortedTodayOverStatTotalArr[next].action &&
            sortedTodayOverStatTotalArr[start].source === sortedTodayOverStatTotalArr[next].source
          ) {
            sortedTodayOverStatTotalArr.splice(next, 1);
          }
        }

        start++;
        next++;
      }

      console.log('sortedTodayOverStatTotalArr', sortedTodayOverStatTotalArr);
    }
    if (sortedTodayOverStatTotalArr.length !== 0) {
      let sourcesArr = sortedTodayOverStatTotalArr.map((elem) => elem.source);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach((elem) => {
        let obj = {
          source: elem,
          action: 'over25',
          totalPreds: sortedTodayOverStatTotalArr.filter(
            (item) => item.source === elem
          ).length,
          over05Count: sortedTodayOverStatTotalArr.filter(
            (item) => item.source === elem && item.over05 === 'true'
          ).length,
          over15Count: sortedTodayOverStatTotalArr.filter(
            (item) => item.source === elem && item.over15 === 'true'
          ).length,
          over25Count: sortedTodayOverStatTotalArr.filter(
            (item) => item.source === elem && item.over25 === 'true'
          ).length,
          date: todayDate,
        };
        todayOverStatTotalArr.push(obj);
      });

      console.log('todayOverStatTotalArr', todayOverStatTotalArr);

     

      todayOverStatTotalArr.length !== 0 &&
        setTodayStatOver(todayOverStatTotalArr);
    }
  }
  function handleSaveTodayTotalBtts() {
    let sortedTodayBttsStatTotalArr = [];
    let prodBttsFil = [];

    if (productionBttsLocal.length !== 0) {
      prodBttsFil = productionBttsLocal.filter(
        (elem) => (elem.count > 2 || elem.numAcca !== 0) && elem.resultScore !== ''
      );
      console.log('prodBttsFil',prodBttsFil);
      console.log('bttsLocal',bttsOnlyLocal);
      prodBttsFil.forEach((elem) => {
        elem.sources.forEach((item) => {

          let over05 = '';
          let over15 = '';
          let bttsYes = '';

          if (
            parseInt(elem.resultScore.split(' - ')[0]) > 0 ||
            parseInt(elem.resultScore.split(' - ')[1]) > 0
          ) {
            over05 = 'true';
          } else {
            over05 = 'false';
          }

          if (
            (parseInt(elem.resultScore.split(' - ')[0]) +
            parseInt(elem.resultScore.split(' - ')[1])) > 1
          ) {
            over15 = 'true';
          } else {
            over15 = 'false';
          }

          if (
            parseInt(elem.resultScore.split(' - ')[0]) > 0 &&
            parseInt(elem.resultScore.split(' - ')[1]) > 0
          ) {
            bttsYes = 'true';
          } else {
            bttsYes = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          // console.log('111222',bttsLocal.filter(it => it.source === item && it.homeTeam === elem.homeTeam))

          let fff = bttsLocal.filter(it => it.source === item && it.homeTeam === elem.homeTeam);

          // if (fff.length !==0) {
          //   console.log('fff', fff)
          // }

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            source: item,
            action: fff.length !==0 && fff[0].action,
            resScore: elem.resultScore,
            date: todayDate,
            over05,
            over15,
            bttsYes
          };

          todayBttsStatArr.push(obj);
        });
      });

      //удаление дублей
      let start = 0;
      let next = 1;
      sortedTodayBttsStatTotalArr = todayBttsStatArr.sort((a, b) => {
        if (a.homeTeam < b.homeTeam) {
          return -1;
        }
        if (a.homeTeam > b.homeTeam) {
          return 1;
        }
        return 0;
      });

      
      while (next < sortedTodayBttsStatTotalArr.length) {
        if (
          sortedTodayBttsStatTotalArr[start].homeTeam.trim() === sortedTodayBttsStatTotalArr[next].homeTeam.trim()
        ) {
          if (
            sortedTodayBttsStatTotalArr[start].action === sortedTodayBttsStatTotalArr[next].action &&
            sortedTodayBttsStatTotalArr[start].source === sortedTodayBttsStatTotalArr[next].source
          ) {
            sortedTodayBttsStatTotalArr.splice(next, 1);
          }
        }

        start++;
        next++;
      }

      console.log('sortedTodayBttsStatTotalArr', sortedTodayBttsStatTotalArr);
    }
    if (sortedTodayBttsStatTotalArr.length !== 0) {
      let sourcesArr = sortedTodayBttsStatTotalArr.map((elem) => elem.source);
      let uniqSources = [...new Set(sourcesArr)];

      
      uniqSources.forEach((elem) => {

          let obj = {
            source: elem,
            action: 'btts',
            // totalPreds: prodBttsFil.filter(
            //   (item) => item.sourceselem && !item.action.includes('btts no')
            // ).bttsYesNum,
            totalPreds: sortedTodayBttsStatTotalArr.filter((item) => item.source === elem).length,
            totalPredsYes: sortedTodayBttsStatTotalArr.filter((item) => item.source === elem && item.action === 'btts').length,
            totalPredsNo: sortedTodayBttsStatTotalArr.filter((item) => item.source === elem && item.action === 'btts no').length,
            // totalPredsYes: sortedTodayBttsStatTotalArr.filter((item) => item.source === elem && !item.action.includes('btts no'))
            // .length,
            // totalPredsYes: bttsLocal.filter(
            //   (item) => item.source === elem && !item.action.includes('btts no')
            // ).length,
            // totalPredsNo: bttsLocal.filter(
            //   (item) => item.source === elem && item.action.includes('btts no')
            // ).length,
            bttsYesCount: sortedTodayBttsStatTotalArr.filter(
              (item) => item.source === elem && item.bttsYes === 'true'
            ).length,
            bttsNoCount: sortedTodayBttsStatTotalArr.filter(
              (item) => item.source === elem && item.bttsYes === 'false'
            ).length,
            over05Count: sortedTodayBttsStatTotalArr.filter(
              (item) => item.source === elem && item.over05 === 'true'
            ).length,
            over15Count: sortedTodayBttsStatTotalArr.filter(
              (item) => item.source === elem && item.over15 === 'true'
            ).length,
            date: todayDate,
          };

          if (obj) {
            todayBttsStatTotalArr.push(obj);
          }
        
      });

      console.log('todayBttsYesStatTotalArr', todayBttsStatTotalArr);

      

      todayBttsStatTotalArr.length !== 0 &&
        setTodayStatBtts(todayBttsStatTotalArr);

        console.log('todayStatBtts', todayStatBtts);
    }
  }
  function handleCreateTodayStatArrWin() {
    let sortedTodayWinStatTotalArr = [];

    if (productionWinLocal.length !== 0) {
      const prodWinFil = productionWinLocal.filter(
        (elem) => (elem.count > 2 || elem.numAcca !== 0) && elem.resultScore !== ''
      );
      // console.log('prodWinFil',prodWinFil);
      prodWinFil.forEach((elem) => {
        elem.sources.forEach((item) => {

          let xwinRes = '';
          let over05 = '';
          let over15 = '';

          if (
            parseInt(elem.resultScore.split(' - ')[0]) > 0 ||
            parseInt(elem.resultScore.split(' - ')[1]) > 0
          ) {
            over05 = 'true';
          } else {
            over05 = 'false';
          }

          if (
            (parseInt(elem.resultScore.split(' - ')[0]) +
            parseInt(elem.resultScore.split(' - ')[1])) > 1
          ) {
            over15 = 'true';
          } else {
            over15 = 'false';
          }

          let win1 =
            parseInt(elem.resultScore.split(' - ')[0]) >
            parseInt(elem.resultScore.split(' - ')[1]);
          let win2 =
            parseInt(elem.resultScore.split(' - ')[0]) <
            parseInt(elem.resultScore.split(' - ')[1]);
          let draw =
            parseInt(elem.resultScore.split(' - ')[0]) ===
            parseInt(elem.resultScore.split(' - ')[1]);
          if (
            ((win1 || draw) && elem.homeTeam === elem.prediction) ||
            ((win2 || draw) && elem.awayTeam === elem.prediction)
          ) {
            xwinRes = 'true';
          } else {
            xwinRes = 'false';
          }

          // const withItem = prodWinFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            source: item,
            action: 'xwin',
            resScore: elem.resultScore,
            date: todayDate,
            prediction: elem.prediction,
            xwinRes,
            over05,
            over15,
          };

          todayWinStatArr.push(obj);
        });
      });

      //удаление дублей
      let start = 0;
      let next = 1;
      sortedTodayWinStatTotalArr = todayWinStatArr.sort((a, b) => {
        if (a.homeTeam < b.homeTeam) {
          return -1;
        }
        if (a.homeTeam > b.homeTeam) {
          return 1;
        }
        return 0;
      });

      
      while (next < sortedTodayWinStatTotalArr.length) {
        if (
          sortedTodayWinStatTotalArr[start].homeTeam.trim() === sortedTodayWinStatTotalArr[next].homeTeam.trim()
        ) {
          if (
            sortedTodayWinStatTotalArr[start].action === sortedTodayWinStatTotalArr[next].action &&
            sortedTodayWinStatTotalArr[start].source === sortedTodayWinStatTotalArr[next].source
          ) {
            sortedTodayWinStatTotalArr.splice(next, 1);
          }
        }

        start++;
        next++;
      }

      console.log('sortedTodayWinStatTotalArr', sortedTodayWinStatTotalArr);
    }
    if (sortedTodayWinStatTotalArr.length !== 0) {
      let sourcesArr = sortedTodayWinStatTotalArr.map((elem) => elem.source);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach((elem) => {
        let obj = {
          source: elem,
          action: 'xwin',
          totalPreds: sortedTodayWinStatTotalArr.filter((item) => item.source === elem)
            .length,
          winYesCount: sortedTodayWinStatTotalArr.filter(
            (item) => item.source === elem && item.xwinRes === 'true'
          ).length,
          over05Count: sortedTodayWinStatTotalArr.filter(
            (item) => item.source === elem && item.over05 === 'true'
          ).length,
          over15Count: sortedTodayWinStatTotalArr.filter(
            (item) => item.source === elem && item.over15 === 'true'
          ).length,
          date: todayDate,
        };
        todayWinStatTotalArr.push(obj);
      });

      console.log('todayWinStatTotalArr', todayWinStatTotalArr);


      todayWinStatTotalArr.length !== 0 &&
        setTodayStatWin(todayWinStatTotalArr);
    }
  }
  function handleCreateTodayStatArrDraw() {
    let sortedTodayDrawStatTotalArr = [];
    console.log('productionDrawLocal555',productionDrawLocal);
    if (productionDrawLocal.length !== 0) {
      const prodDrawFil = productionDrawLocal.filter(
        (elem) => (elem.count > 2 || elem.numAcca !== 0) && elem.resultScore !== ''
      );
      console.log('prodDrawFil',prodDrawFil);
      prodDrawFil.forEach((elem) => {
        elem.sources.forEach((item) => {
          let drawYes = '';

          if (
            parseInt(elem.resultScore.split(' - ')[0]) ===
            parseInt(elem.resultScore.split(' - ')[1])
          ) {
            drawYes = 'true';
          } else {
            drawYes = 'false';
          }

          // const withItem = prodDrawFil.filter(elem => elem.sources.includes(item));

          let obj = {
            homeTeam: elem.homeTeam,
            awayTeam: elem.awayTeam,
            source: item,
            action: elem.action,
            resScore: elem.resultScore,
            date: todayDate,
            drawYes,
          };

          todayDrawStatArr.push(obj);
        });
      });

      //удаление дублей
      let start = 0;
      let next = 1;
      sortedTodayDrawStatTotalArr = todayDrawStatArr.sort((a, b) => {
        if (a.homeTeam < b.homeTeam) {
          return -1;
        }
        if (a.homeTeam > b.homeTeam) {
          return 1;
        }
        return 0;
      });

      
      while (next < sortedTodayDrawStatTotalArr.length) {
        if (
          sortedTodayDrawStatTotalArr[start].homeTeam.trim() === sortedTodayDrawStatTotalArr[next].homeTeam.trim()
        ) {
          if (
            sortedTodayDrawStatTotalArr[start].action === sortedTodayDrawStatTotalArr[next].action &&
            sortedTodayDrawStatTotalArr[start].source === sortedTodayDrawStatTotalArr[next].source
          ) {
            sortedTodayDrawStatTotalArr.splice(next, 1);
          }
        }

        start++;
        next++;
      }
      console.log('sortedTodayDrawStatTotalArr', sortedTodayDrawStatTotalArr);
    }
    if (sortedTodayDrawStatTotalArr.length !== 0) {
      let sourcesArr = sortedTodayDrawStatTotalArr.map((elem) => elem.source);
      let uniqSources = [...new Set(sourcesArr)];

      uniqSources.forEach((elem) => {
        let obj = {
          source: elem,
          action: 'draw',
          totalPreds: sortedTodayDrawStatTotalArr.filter(
            (item) => item.source === elem
          ).length,
          drawYesCount: sortedTodayDrawStatTotalArr.filter(
            (item) => item.source === elem && item.drawYes === 'true'
          ).length,
          date: todayDate,
        };
        todayDrawStatTotalArr.push(obj);
      });

      
      
      console.log('todayDrawStatTotalArr', todayDrawStatTotalArr);
      todayDrawStatTotalArr.length !== 0 &&
        setTodayStatDraw(todayDrawStatTotalArr);
    }
  }

  function handleSaveDailyStatToMongoDraw() {
    saveDrawDailyTotal(todayStatDraw);
  }
  function handleSaveDailyStatToMongoWin() {
    saveWinDailyTotal(todayStatWin);
  }
  function handleSaveDailyStatToMongoBtts() {
    saveBttsDailyTotal(todayStatBtts);

    // save initial stat total
    // let arr = [];

    // Object.keys(bttsSources).forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'btts';
    //   obj.date = todayDate;
    //   obj.totalPreds = 0;
    //   obj.bttsYesCount = 0;
    //   obj.bttsYesEff = 0;
    //   obj.over05Count = 0;
    //   obj.over05Eff = 0;
    //   obj.over15Count = 0;
    //   obj.over15Eff = 0;
    //   obj._id = uuidv4();

    //   arr.push(obj);
    // })
    
    // // // console.log('arr555',arr);
    // saveBttsStatTotal(arr);
  }
  function handleSaveDailyStatToMongoOver() {
    // let ddd = todayStatOver;
    // let obj = {
    //   action:"over25",
    //   date:"07.11.2023",
    //   over05Count:0,
    //   over15Count:0,
    //   over25Count:0,
    //   source:"wininbets_o25",
    //   totalPreds:0
    // }
    // ddd.push(obj);
    // console.log('ddd',ddd);
    saveOverDailyTotal(todayStatOver);
  }
  function handleSaveDailyStatToMongoUnder() {
    console.log('todayStatUnder',todayStatUnder);
    saveUnderDailyTotal(todayStatUnder);
  }
  
  async function handleGetTodayTotal() {
    let underTotals = await getUnderDailyTotal(todayDate);
    let bttsTotals = await getBttsDailyTotal(todayDate);
    let drawTotals = await getDrawDailyTotal(todayDate);
    let winTotals = await getWinDailyTotal(todayDate);
    let overTotals = await getOverDailyTotal(todayDate);

    console.log('drawTotals111', drawTotals);
    console.log('underTotals111', underTotals);
    console.log('bttsTotals111', bttsTotals);
    console.log('winTotals111', winTotals);
    console.log('overTotals111', overTotals);

    drawTotals.length !== 0 && setTodayStatDrawMongo(drawTotals);
    underTotals.length !== 0 && setTodayStatUnderMongo(underTotals);
    bttsTotals.length !== 0 && setTodayStatBttsMongo(bttsTotals);
    winTotals.length !== 0 && setTodayStatWinMongo(winTotals);
    overTotals.length !== 0 && setTodayStatOverMongo(overTotals);
  }
  async function handleGetStatTotals() {
    if (todayDate === todayString) {
      // let statTotalDraw = await getDrawStatTotal(yesDt);
      let statTotalDraw = await getDrawStatTotal(yesDt);
      // let statTotalDrawF = statTotalDraw.filter(elem => elem.totalPreds > 0);

      let statTotalWin = await getWinStatTotal(yesDt);
      // let statTotalWinF = statTotalWin.filter(elem => elem.totalPreds > 0);

      let statTotalBtts = await getBttStatTotal(yesDt);
      // let statTotalBttsF = statTotalBtts.filter(elem => elem.totalPreds > 0);

      let statTotalOver = await getOverStatTotal(yesDt);
      // let statTotalOverF = statTotalOver.filter(elem => elem.totalPreds > 0);

      let statTotalUnder = await getUnderStatTotal(yesDt);
      // let statTotalUnderF = statTotalUnder.filter(elem => elem.totalPreds > 0);

      statTotalDraw.length !== 0 && setTotalDraw(statTotalDraw);
      // statTotalWin.length !== 0 && setTotalWin(statTotalWin);
      // statTotalBtts.length !== 0 && setTotalBtts(statTotalBtts);
      // statTotalOver.length !== 0 && setTotalOver(statTotalOver);
      // statTotalUnder.length !== 0 && setTotalUnder(statTotalUnder);

      if (statTotalBtts.length !== 0 ) {

        let sortByOver15Eff = statTotalBtts.sort((a,b) => b.over15Eff - a.over15Eff);
        let topO15FilBy85 = sortByOver15Eff.filter(elem => elem.over15Eff >= 84);
        // console.log('topO15FilBy85', topO15FilBy85);
        setTopOver15FromBtts(topO15FilBy85);

        let sortByOver05Eff = statTotalBtts.sort((a,b) => b.over05Eff - a.over05Eff);
        let topO05FilBy98 = sortByOver05Eff.filter(elem => elem.over05Eff >= 94);
        // console.log('topO05FilBy98', topO05FilBy98);
        setTopOver05FromBtts(topO05FilBy98);

        
        setTotalBtts(statTotalBtts);
      }
      if (statTotalWin.length !== 0 ) {

        let sortByOver15Eff = statTotalWin.sort((a,b) => b.over15Eff - a.over15Eff);
        let topO15FilBy85 = sortByOver15Eff.filter(elem => elem.over15Eff >= 84);
        // console.log('topO15FilBy85', topO15FilBy85);
        setTopOver15FromWin(topO15FilBy85);

        let sortByOver05Eff = statTotalWin.sort((a,b) => b.over05Eff - a.over05Eff);
        let topO05FilBy98 = sortByOver05Eff.filter(elem => elem.over05Eff >= 98);
        // console.log('topO05FilBy98', topO05FilBy98);
        setTopOver05FromWin(topO05FilBy98);

        
        setTotalWin(statTotalWin);
      }
      if (statTotalOver.length !== 0 ) {
        let sortByOver25Eff = statTotalOver.sort((a,b) => b.over25Eff - a.over25Eff);
        let topO25FilBy70 = sortByOver25Eff.filter(elem => elem.over25Eff >= 70);
        setTopOver25FromO25(topO25FilBy70);

        let sortByOver15Eff = statTotalOver.sort((a,b) => b.over15Eff - a.over15Eff);
        let topO15FilBy85 = sortByOver15Eff.filter(elem => elem.over15Eff >= 85);
        // console.log('topO15FilBy85', topO15FilBy85);
        setTopOver15FromO25(topO15FilBy85);

        let sortByOver05Eff = statTotalOver.sort((a,b) => b.over05Eff - a.over05Eff);
        let topO05FilBy98 = sortByOver05Eff.filter(elem => elem.over05Eff >= 97);
        // console.log('topO05FilBy98', topO05FilBy98);
        setTopOver05FromO25(topO05FilBy98);

        
        setTotalOver(statTotalOver);
      }
      if (statTotalUnder.length !== 0 ) {
        let sortByUnder35Eff = statTotalUnder.sort((a,b) => b.under35Eff - a.under35Eff);
        let topU35FilBy80 = sortByUnder35Eff.filter(elem => elem.under35Eff > 82);
        // console.log('statTotalUnder888',topU35FilBy80)
        setTopUnder35(topU35FilBy80);

        let sortByUnder45Eff = statTotalUnder.sort((a,b) => b.under45Eff - a.under45Eff);
        let topU45FilBy93 = sortByUnder45Eff.filter(elem => elem.under45Eff >= 93);
        setTopUnder45(topU45FilBy93);

        
        setTotalUnder(statTotalUnder)
      }
      
    } else {
      let statTotalDraw = await getDrawStatTotal(todayDate);
      // let statTotalDrawF = statTotalDraw.filter(elem => elem.totalPreds > 0);

      let statTotalWin = await getWinStatTotal(todayDate);
      // let statTotalWinF = statTotalWin.filter(elem => elem.totalPreds > 0);

      let statTotalBtts = await getBttStatTotal(todayDate);
      // let statTotalBttsF = statTotalBtts.filter(elem => elem.totalPreds > 0);

      let statTotalOver = await getOverStatTotal(todayDate);
      // let statTotalOverF = statTotalOver.filter(elem => elem.totalPreds > 0);

      let statTotalUnder = await getUnderStatTotal(todayDate);
      // let statTotalUnderF = statTotalUnder.filter(elem => elem.totalPreds > 0);

      statTotalDraw.length !== 0 && setTotalDraw(statTotalDraw);
      statTotalWin.length !== 0 && setTotalWin(statTotalWin);
      statTotalBtts.length !== 0 && setTotalBtts(statTotalBtts);
      // statTotalOverF.length !== 0 && setTotalOver(statTotalOverF);
      // statTotalUnderF.length !== 0 && setTotalUnder(statTotalUnderF);

      if (statTotalOver.length !== 0 ) {
        let sortByOver25Eff = statTotalOver.sort((a,b) => b.over25Eff - a.over25Eff);
        let topO25FilBy70 = sortByOver25Eff.filter(elem => elem.over25Eff >= 70);
        setTopOver25FromO25(topO25FilBy70);

        let sortByOver15Eff = statTotalOver.sort((a,b) => b.over15Eff - a.over15Eff);
        let topO15FilBy85 = sortByOver15Eff.filter(elem => elem.over15Eff >= 85);
        // console.log('topO15FilBy85', topO15FilBy85);
        setTopOver15FromO25(topO15FilBy85);

        let sortByOver05Eff = statTotalOver.sort((a,b) => b.over05Eff - a.over05Eff);
        let topO05FilBy98 = sortByOver05Eff.filter(elem => elem.over05Eff >= 98);
        console.log('topO05FilBy98', topO05FilBy98);
        setTopOver05FromO25(topO05FilBy98);

        
        setTotalOver(statTotalOver);
      }
      if (statTotalUnder.length !== 0 ) {
        let sortByUnder35Eff = statTotalUnder.sort((a,b) => b.under35Eff - a.under35Eff);
        let topU35FilBy80 = sortByUnder35Eff.filter(elem => elem.over35Eff > 80);
        setTopUnder35(topU35FilBy80);

        let sortByUnder45Eff = statTotalUnder.sort((a,b) => b.under45Eff - a.under45Eff);
        let topU45FilBy93 = sortByUnder45Eff.filter(elem => elem.under45Eff >= 93);
        setTopUnder45(topU45FilBy93);
        
        setTotalUnder(statTotalUnder)
      }
    }
    
    
  }

  async function handleSaveStatTotalDraw() {
    console.log('todayStatDrawMongo',todayStatDrawMongo);
    
    let yesStatDrawMongo = await getDrawStatTotal(yesDt);

    console.log('yesStatUnderMongo222',yesStatDrawMongo);

    if(todayStatDrawMongo.length !==0) {
      if(yesStatDrawMongo.length !==0) {
        
        yesStatDrawMongo.forEach(yElem => {
          todayStatDrawMongo.forEach(tElem => {
            // let obj = {};
              if (tElem.source === yElem.source) {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.action = 'draws';
                yElem.totalPreds = yElem.totalPreds + tElem.totalPreds;
                yElem.drawYesCount = yElem.drawYesCount + tElem.drawYesCount;
                yElem.drawYesEff = Math.round((yElem.drawYesCount / yElem.totalPreds)*100);
              } else {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.action = 'draws';
              }
          })
        })

      } 
    }

    // let drawSourcesNames = Object.keys(drawSources);
    // let initStatTotalDraw = [];

    // drawSourcesNames.forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'xwin';
    //   obj.date = todayDate;
    //   obj.totalPreds = 0;
    //   obj.drawYesCount = 0;
    //   obj.drawYesEff = 0;

    //   initStatTotalDraw.push(obj);

    // })

    // let bettips1x2_draw = {
    //   _id: uuidv4(),
    //   action: 'draws',
    //   date: todayDate,
    //   totalPreds: 0,
    //   drawYesCount: 0,
    //   drawYesEff: 0,
    //   source: 'bettips1x2_draw'
    // }
    // yesStatDrawMongo.push(bettips1x2_draw);
    console.log('initStatTotal222',yesStatDrawMongo);

    await saveDrawStatTotal(yesStatDrawMongo);
  }
  async function handleSaveStatTotalWin() {
    console.log('todayStatWinMongo',todayStatWinMongo);

    let yesStatWinMongo = await getWinStatTotal(yesDt);

    // yesStatWinMongo.forEach(elem => {
    //   elem.over05Count = 0;
    //   elem.over15Count = 0;
    //   elem.winYesCount = 0;
    //   elem.totalPreds = 0;
    // })

    console.log('yesStatUnderMongo222',yesStatWinMongo);

    if(todayStatWinMongo.length !==0) {
      if(yesStatWinMongo.length !==0) {
        
        yesStatWinMongo.forEach(yElem => {
          todayStatWinMongo.forEach(tElem => {
            // let obj = {};
              if (tElem.source === yElem.source) {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.totalPreds = yElem.totalPreds + tElem.totalPreds;
                yElem.winYesCount = yElem.winYesCount + tElem.winYesCount;
                yElem.winYesEff = Math.round((yElem.winYesCount / yElem.totalPreds)*100);
                yElem.over15Count = yElem.over15Count + tElem.over15Count;
                yElem.over15Eff = Math.round((yElem.over15Count / yElem.totalPreds)*100);
                yElem.over05Count = yElem.over05Count + tElem.over05Count;
                yElem.over05Eff = Math.round((yElem.over05Count / yElem.totalPreds)*100);
              } else {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
              }
          })
        })

      } 
    }

    // let winSourcesNames = Object.keys(winSources);
    // let initStatTotalWin = [];

    // winSourcesNames.forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'xwin';
    //   obj.date = todayDate;
    //   obj.totalPreds = 0;
    //   obj.winYesCount = 0;
    //   obj.winYesEff = 0;

    //   initStatTotalWin.push(obj);

    // })

    // let bettips1x2_draw = {
    //   _id: uuidv4(),
    //   action: 'xwin',
    //   date: todayDate,
    //   totalPreds: 0,
    //   winYesCount: 0,
    //   winYesEff: 0,
    //   source: 'bettips1x2_win'
    // }
    // yesStatWinMongo.push(bettips1x2_draw);

    console.log('initStatTotal222',yesStatWinMongo);

    await saveWinStatTotal(yesStatWinMongo);
  }
  async function handleSaveStatTotalBtts() {
    console.log('todayStatBttsMongo',todayStatBttsMongo);

    let yesStatBttsMongo = await getBttStatTotal(yesDt);

    // yesStatBttsMongo.forEach(elem => {
    //   elem.over05Count = 0;
    //   elem.over15Count = 0;
    //   elem.bttsYesCount = 0;
    //   elem.totalPreds = 0;
    //   elem.totalPredsYes = 0;
    // })

    console.log('yesStatUnderMongo222',yesStatBttsMongo);

    if(todayStatBttsMongo.length !==0) {
      if(yesStatBttsMongo.length !==0) {
        
        yesStatBttsMongo.forEach(yElem => {
          todayStatBttsMongo.forEach(tElem => {
            // let obj = {};
              if (tElem.source === yElem.source) {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.totalPreds = yElem.totalPreds + tElem.totalPreds;
                yElem.totalPredsYes = yElem.totalPredsYes + tElem.totalPredsYes;
                yElem.over05Count = yElem.over05Count + tElem.over05Count;
                yElem.bttsYesCount = yElem.bttsYesCount + tElem.bttsYesCount;
                yElem.bttsYesEff = Math.round((yElem.bttsYesCount / yElem.totalPreds)*100);
                yElem.over15Count = yElem.over15Count + tElem.over15Count;
                yElem.over15Eff = Math.round((yElem.over15Count / yElem.totalPreds)*100);
                yElem.over05Eff = Math.round((yElem.over05Count / yElem.totalPreds)*100);
              } else {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
              }
          })
        })

      } 
    }

    // let bttsSourcesNames = Object.keys(bttsSources);
    // let initStatTotalBtts = [];

    // bttsSourcesNames.forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'btts';
    //   obj.date = todayDate;
    //   obj.totalPreds = 0;
    //   obj.bttsYesCount = 0;
    //   obj.bttsYesEff = 0;
    //   obj.over05Count = 0;
    //   obj.over05Eff = 0;

    //   initStatTotalBtts.push(obj);

    // })

    // let bettips1x2_btts = {
    //   _id: uuidv4(),
    //   action: 'btts',
    //   date: todayDate,
    //   totalPreds: 0,
    //   bttsYesCount: 0,
    //   bttsYesEff: 0,
    //   over05Count: 0,
    //   over05Eff: 0,
    //   source: 'bettips1x2_btts'
    // }
    // yesStatBttsMongo.push(bettips1x2_btts);

    console.log('initStatTotal222',yesStatBttsMongo);

    await saveBttsStatTotal(yesStatBttsMongo);
  }
  async function handleSaveStatTotalOver() {
    console.log('todayStatOverMongo',todayStatOverMongo);

    let yesStatOverMongo = await getOverStatTotal(yesDt);

    //удаление дублей
    let start = 0;
    let next = 1;

    let sortedYesStatOverMongo = yesStatOverMongo.sort((a, b) => {
      if (a.source < b.source) {
        return -1;
      }
      if (a.source > b.source) {
        return 1;
      }
      return 0;
    });
    
    while (next < sortedYesStatOverMongo.length) {
 
        if (
          sortedYesStatOverMongo[start].source === sortedYesStatOverMongo[next].source
        ) {
          sortedYesStatOverMongo.splice(next, 1);
        }

      start++;
      next++;
    }

    // console.log('yesStatUnderMongo222',yesStatOverMongo);
    // console.log('sortedYesStatOverMongo222',sortedYesStatOverMongo);

    if(todayStatOverMongo.length !==0) {
      if(yesStatOverMongo.length !==0) {
        
        yesStatOverMongo.forEach(yElem => {
          todayStatOverMongo.forEach(tElem => {
            // let obj = {};
              if (tElem.source === yElem.source) {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.totalPreds = yElem.totalPreds + tElem.totalPreds;
                yElem.over05Count = yElem.over05Count + tElem.over05Count;
                yElem.over15Count = yElem.over15Count + tElem.over15Count;
                yElem.over25Count = yElem.over25Count + tElem.over25Count;
                yElem.over05Eff = Math.round((yElem.over05Count / yElem.totalPreds)*100);
                yElem.over15Eff = Math.round((yElem.over15Count / yElem.totalPreds)*100);
                yElem.over25Eff = Math.round((yElem.over25Count / yElem.totalPreds)*100);
              } else {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
              }
          })
        })

      } 
    }


    // let o25SourcesNames = Object.keys(o25Sources);
    // let initStatTotalOver = [];

    // o25SourcesNames.forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'over25';
    //   obj.date = todayDate;
    //   obj.totalPreds =0;
    //   obj.over05Count = 0;
    //   obj.over15Count = 0;
    //   obj.over25Count = 0;
    //   obj.over05Eff = 0;
    //   obj.over15Eff = 0;
    //   obj.over25Eff = 0;

    //   initStatTotalOver.push(obj);

    // })

    // let bettips1x2_btts = {
    //   _id: uuidv4(),
    //   action: 'over25',
    //   date: todayDate,
    //   totalPreds: 0,
    //   over05Count: 0,
    //   over05Eff: 0,
    //   over15Count: 0,
    //   over15Eff: 0,
    //   over25Count: 0,
    //   over25Eff: 0,
    //   source: 'bettips1x2_o25'
    // }
    // yesStatOverMongo.push(bettips1x2_btts);

    console.log('initStatTotal222',yesStatOverMongo);

    await saveOverStatTotal(yesStatOverMongo);

  }
  async function handleSaveStatTotalUnder() {
    console.log('todayStatUnderMongo',todayStatUnderMongo);   

    console.log('yesStr111',yesDt);

    let yesStatUnderMongo = await getUnderStatTotal(yesDt);

    console.log('yesStatUnderMongo222',yesStatUnderMongo);

    if(todayStatUnderMongo.length !==0) {
      if(yesStatUnderMongo.length !==0) {
        
        yesStatUnderMongo.forEach(yElem => {
          todayStatUnderMongo.forEach(tElem => {
            // let obj = {};
              if (tElem.source === yElem.source) {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
                yElem.totalPreds = yElem.totalPreds + tElem.totalPreds;
                yElem.under25Count = yElem.under25Count + tElem.under25Count;
                yElem.under35Count = yElem.under35Count + tElem.under35Count;
                yElem.under45Count = yElem.under45Count + tElem.under45Count;
                yElem.under25Eff = Math.round((yElem.under25Count / yElem.totalPreds)*100);
                yElem.under35Eff = Math.round((yElem.under35Count / yElem.totalPreds)*100);
                yElem.under45Eff = Math.round((yElem.under45Count / yElem.totalPreds)*100);
              } else {
                yElem._id = uuidv4();
                yElem.date = tElem.date;
              }
          })
        })

      } 
    }

    // todayStatUnderMongo.forEach(elem => {
    //   elem.under25Eff = (elem.under25Count / elem.totalPreds)*100;
    //   elem.under35Eff = (elem.under35Count / elem.totalPreds)*100;
    //   elem.under45Eff = (elem.under45Count / elem.totalPreds)*100;
    // })

    

    

    // let u25SourcesNames = Object.keys(u25Sources);
    // let initStatTotalUnder = [];

    // u25SourcesNames.forEach(elem => {
    //   let obj = {};

    //   obj.source = elem;
    //   obj.action = 'under25';
    //   obj.date = todayDate;
    //   obj.totalPreds =0;
    //   obj.under25Count = 0;
    //   obj.under35Count = 0;
    //   obj.under45Count = 0;
    //   obj.under25Eff = 0;
    //   obj.under35Eff = 0;
    //   obj.under45Eff = 0;

    //   initStatTotalUnder.push(obj);

    // })

    // let bettips1x2_btts = {
    //   _id: uuidv4(),
    //   action: 'under25',
    //   date: todayDate,
    //   totalPreds: 0,
    //   under25Count: 0,
    //   under25Eff: 0,
    //   under35Count: 0,
    //   under35Eff: 0,
    //   under45Count: 0,
    //   under45Eff: 0,
    //   source: 'bettips1x2_u25'
    // }
    // yesStatUnderMongo.push(bettips1x2_btts);

    console.log('yesStatUnderMongo333',yesStatUnderMongo);

    await saveUnderStatTotal(yesStatUnderMongo);

    // let yesterdayStatTotalUnder = getUnderStatTotal(yesDt);

    // if (yesterdayStatTotalUnder) {

    // } else {
    //   saveUnderStatTotal(todayStatUnderMongo);
    // }
    
  }

  async function handleGetStatTotalUnder() {
    if (todayDate === todayString) {
      let statTotalUnder = await getUnderStatTotal(yesDt);

      statTotalUnder.length !== 0 && setTotalUnder(statTotalUnder);
    } else {
      let statTotalUnder = await getUnderStatTotal(todayDate);

      statTotalUnder.length !== 0 && setTotalUnder(statTotalUnder);
    }
    
    console.log('totalUnder111', totalUnder);
  }
  async function handleGetStatTotalOver() {
    if (todayDate === todayString) {
      let statTotalOver = await getOverStatTotal(yesDt);

    statTotalOver.length !== 0 && setTotalOver(statTotalOver);
    } else {
      let statTotalOver = await getOverStatTotal(todayDate);

    statTotalOver.length !== 0 && setTotalOver(statTotalOver);
    }
    

    
    console.log('totalOver111', totalOver);
  }
  async function handleGetStatTotalBtts() {
    if (todayDate === todayString) {
      let statTotalBtts = await getBttStatTotal(yesDt);

    statTotalBtts.length !== 0 && setTotalBtts(statTotalBtts);
    } else {
      let statTotalBtts = await getBttStatTotal(todayDate);

    statTotalBtts.length !== 0 && setTotalBtts(statTotalBtts);
    }

    
    console.log('totalBtts111', totalBtts);
  }
  async function handleGetStatTotalDraw() {
    if (todayDate === todayString) {
      let statTotalDraw = await getDrawStatTotal(yesDt);

    statTotalDraw.length !== 0 && setTotalDraw(statTotalDraw);
    } else {
      let statTotalDraw = await getDrawStatTotal(todayDate);

    statTotalDraw.length !== 0 && setTotalDraw(statTotalDraw);
    }

    
    console.log('totalDraw111', totalDraw);
  }
  async function handleGetStatTotalWin() {
    if (todayDate === todayString) {
      let statTotalWin = await getWinStatTotal(yesDt);

    statTotalWin.length !== 0 && setTotalWin(statTotalWin);
    } else {
      let statTotalWin = await getWinStatTotal(todayDate);

    statTotalWin.length !== 0 && setTotalWin(statTotalWin);
    }

    
    console.log('totalWin111', totalWin);
  }
  

  async function handleUpdateStatTotal() {
    let bttsTotalYesterday = await getBttsDailyTotal(yesterdayString);
    console.log('bttsTotalYesterday222', bttsTotalYesterday);
    // if (todayStatBttsMongo.length !== 0 && bttsTotalYesterday.length !== 0) {
    //   console.log('todayStatBttsMongo222', todayStatBttsMongo);
    //   console.log('bttsTotalYesterday222', bttsTotalYesterday);
    // }
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
    console.log('22233', res);
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
    console.log('22233', res);
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
        let fff = arr.filter(
          (elem) =>
            elem.homeTeam === key && elem.awayTeam && elem.awayTeam !== ''
        )[0];
        obj1[key] = {
          homeTeam: key,
          awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
          count: obj[key],
          sources: arr
            .filter(
              (elem) =>
                elem.homeTeam === key && elem.source && elem.source !== ''
            ),
          numAcca: arr.filter((elem) => elem.homeTeam === key && elem.isAcca)
            .length,
          bttsYesNum: arr.filter(
            (elem) => elem.homeTeam === key && !elem.action.includes('btts no')
          ).length,
          bttsNoNum: arr.filter(
            (elem) => elem.homeTeam === key && elem.action.includes('btts no')
          ).length,
          resultScore: '',
          bttsRes: '',
          date: todayDate,
          totalSources: bttsSourcesLength,
          totalItems: bttsOnlyLocal.length,
        };
        // if (i === 0) {
        //   obj1[key].totalSources = bttsSourcesLength;
        //   obj1[key].totalItems = bttsItemsLength;
        // }
      });
    } else if (arr.some((elem) => elem.action.includes('xwin'))) {
      Object.keys(obj).forEach((key, i) => {
        let elems = arr.filter((elem) => elem.homeTeam === key);
        // console.log('elems', elems);

        let homeWinArr = elems.filter(
          (elem) => elem.homeTeam === elem.prediction
        );
        // console.log('homeWinArr', homeWinArr);

        let awayWinArr = elems.filter(
          (elem) => elem.awayTeam === elem.prediction
        );
        // console.log('awayWinArr', awayWinArr);

        homeWinArr.length !== 0 &&
          homeWinArr.forEach((elem) => {
            obj1[`${key}`] = {
              homeTeam: elem.homeTeam,
              awayTeam:
                elem && elem.hasOwnProperty('awayTeam') && elem.awayTeam,
              prediction:
                elem && elem.hasOwnProperty('prediction') && elem.prediction,
              count: homeWinArr.length,
              sources: homeWinArr
                .filter(
                  (elem) =>
                    elem.homeTeam === key && elem.source && elem.source !== ''
                ),
              numAcca: homeWinArr.filter(
                (elem) => elem.homeTeam === key && elem.isAcca
              ).length,
              winNum: homeWinArr.filter(
                (elem) =>
                  elem.homeTeam === key &&
                  (elem.action === 'win' ||
                    elem.action.includes('win ') ||
                    elem.action.includes('2win') ||
                    elem.action.includes('win 1') ||
                    elem.action.includes('win 2'))
              ).length,
              xwinNum: homeWinArr.filter(
                (elem) => elem.homeTeam === key && elem.action.includes('xwin')
              ).length,
              resultScore: '',
              winRes: '',
              date: todayDate,
              totalSources: winSourcesLength,
              totalItems: over25OnlyLocal.length,
            };
            // if (i === 0) {
            //   obj1[key].totalSources = Object.keys(winSourcesCount).length;
            //   obj1[key].totalItems = winDataLocal.lenght;
            // }
          });
        awayWinArr.length !== 0 &&
          awayWinArr.forEach((elem) => {
            obj1[`${key} 2`] = {
              homeTeam: elem.homeTeam,
              awayTeam:
                elem && elem.hasOwnProperty('awayTeam') && elem.awayTeam,
              prediction:
                elem && elem.hasOwnProperty('prediction') && elem.prediction,
              count: awayWinArr.length,
              sources: awayWinArr
                .filter(
                  (elem) =>
                    elem.homeTeam === key && elem.source && elem.source !== ''
                ),
              numAcca: awayWinArr.filter(
                (elem) => elem.homeTeam === key && elem.isAcca
              ).length,
              winNum: awayWinArr.filter(
                (elem) =>
                  elem.homeTeam === key &&
                  (elem.action === 'win' ||
                    elem.action.includes('win ') ||
                    elem.action.includes('2win') ||
                    elem.action.includes('win 1') ||
                    elem.action.includes('win 2'))
              ).length,
              xwinNum: awayWinArr.filter(
                (elem) => elem.homeTeam === key && elem.action.includes('xwin')
              ).length,
              resultScore: '',
              winRes: '',
              date: todayDate,
              totalSources: winSourcesLength,
              totalItems: winDataLocal.length,
            };
            // if (i === 0) {
            //   obj1[key].totalSources = Object.keys(winSourcesCount).length;
            //   obj1[key].totalItems = winDataLocal.lenght;
            // }
          });

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
        let fff = arr.filter(
          (elem) =>
            elem.homeTeam === key && elem.awayTeam && elem.awayTeam !== ''
        )[0];
        let action = '';

        if (arr.length !== 0) {
          // if (arr[0].action.includes('under25')) {
          if (arr.some((elem) => elem.action.includes('under25'))) {
            action = 'under25';

            obj1[key] = {
              homeTeam: key,
              awayTeam: fff && fff.hasOwnProperty('awayTeam') && fff.awayTeam,
              count: obj[key],
              sources: arr
                .filter(
                  (elem) =>
                    elem.homeTeam === key && elem.source && elem.source !== ''
                ),
              numAcca: arr.filter(
                (elem) => elem.homeTeam === key && elem.isAcca
              ).length,
              action: action,
              resultScore: '',
              underYes: '',
              date: todayDate,
              totalSources: underSourcesLength,
              totalItems: under25DataLocal.length,
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
              sources: arr
                .filter(
                  (elem) =>
                    elem.homeTeam === key && elem.source && elem.source !== ''
                ),
              numAcca: arr.filter(
                (elem) => elem.homeTeam === key && elem.isAcca
              ).length,
              action: action,
              resultScore: '',
              overYes: '',
              date: todayDate,
              totalSources: overSourcesLength,
              totalItems: over25OnlyLocal.length,
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
              sources: arr
                .filter(
                  (elem) =>
                    elem.homeTeam === key && elem.source && elem.source !== ''
                ),
              numAcca: arr.filter(
                (elem) => elem.homeTeam === key && elem.isAcca
              ).length,
              action: action,
              resultScore: '',
              drawYes: '',
              date: todayDate,
              totalSources: drawSourcesLength,
              totalItems: drawDataLocal.length,
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

    bttsDataMongo = bttsDataMongo
      .filter((item) => item.homeTeam !== 'BTTS/GG')
      .map((elem) => {
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
      (elem) =>
        elem.action === 'over25' ||
        elem.action === 'high score' ||
        elem.action.includes('over25')
    );

    bttsOnlyLocal.length !== 0 && setBttsOnlyLocal([]);
    over25OnlyLocal.length !== 0 && setOver25OnlyLocal([]);
    setBttsOnlyLocal(bttsDataOnly);
    setOver25OnlyLocal(overDataOnly);

    console.log('bttsDataOnly.length', bttsDataOnly);
    console.log('overDataOnly.length', overDataOnly);

    let countedObjBtts =
      bttsDataOnly.length !== 0 && countByProp(bttsDataOnly, 'source');
    countedObjBtts && setBttsSourcesLength(Object.keys(countedObjBtts).length);

    let countedObjOver =
      overDataOnly.length !== 0 && countByProp(overDataOnly, 'source');
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

    let countedObjWin =
      winDataMongo.length !== 0 && countByProp(winDataMongo, 'source');
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

    let countedObjDraw =
      drawDataMongo.length !== 0 && countByProp(drawDataMongo, 'source');
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

    let countedObjUnder =
      under25DataMongo.length !== 0 && countByProp(under25DataMongo, 'source');
    countedObjUnder &&
      setUnderSourcesLength(Object.keys(countedObjUnder).length);

    //GET RESULT AND TOTAL
    const resultsTotalData = await getResultTotal(todayDate);

    //GET RESULT
    let resultsData = await getResult(todayDate);
    resultsData = resultsData.map((elem) => {
      let obj = { ...elem };
      let homeTeam = elem.homeTeam
        .replace('SSC ', '')
        .replace('SC ', '')
        .replace('US ', '')
        .replace('NK ', '')
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
    
    resultsData.push({
      homeTeam: 'Cray Valley',
      awayTeam: 'Charlton Athletic',
      date: '15.11.2023',
      score: '1 - 6',
      _id: uuidv4()
    }, 
    {
      homeTeam: 'NK Smartno',
      awayTeam: 'Videm',
      date: '15.11.2023',
      score: '3 - 1',
      _id: uuidv4()
    })
    console.log('resultsData222',resultsData)
    resultsLocal.length !== 0 && setResultsLocal([]);
    setResultsLocal(resultsData);

    setAllRes(resultsData);
    setResultsTotalLocal(resultsTotalData);
    setResultsTotalLocalFil(resultsTotalData);

    console.log('winDataMongo444', winDataMongo);

    let countedHomeTeamAdmBtts =
      bttsDataMongo.length !== 0 && countByPropTeams(bttsDataMongo, 'homeTeam');

    Object.keys(countedHomeTeamAdmBtts).forEach((elem) => {
      if (countedHomeTeamAdmBtts[elem].count < 2) {
        delete countedHomeTeamAdmBtts[elem];
      }
    });

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
  };
  
  const handleGetFullTableMongo = async () => {
    let mongoFullTable = await getFullTable(todayDate);

    console.log('mongoFullTable444', mongoFullTable);

    mongoFullTable.length !== 0 && setFullTableLocal(mongoFullTable);

    // console.log('productionOver444', productionOverLocal);
  }
  const handleGetProdMongo = async () => {
    let mongoProdUnder = await getUnderProd(todayDate);
    let mongoProdOver = await getOverProd(todayDate);
    let mongoProdBtts = await getBttsProd(todayDate);
    let mongoProdWin = await getWinProd(todayDate);
    let mongoProdDraw = await getDrawProd(todayDate);

    mongoProdBtts.length !== 0 && setProductionBtts(mongoProdBtts);
    mongoProdOver.length !== 0 && setProductionOver(mongoProdOver);
    mongoProdUnder.length !== 0 && setProductionUnder(mongoProdUnder);
    mongoProdWin.length !== 0 && setProductionWin(mongoProdWin);
    mongoProdDraw.length !== 0 && setProductionDraw(mongoProdDraw);

    // console.log('productionOver444', productionOver);
  }
  const handleCreateFullTable = () => {
    let fullTableArr = [];

    let countedHomeTeamAdmBtts =
      bttsLocal.length !== 0 && countByPropTeams(bttsLocal, 'homeTeam');

    Object.keys(countedHomeTeamAdmBtts).forEach((elem) => {
      if (countedHomeTeamAdmBtts[elem].count < 2) {
        delete countedHomeTeamAdmBtts[elem];
      }
    });

    let homeTeamsArr = Object.keys(countedHomeTeamAdmBtts);
    console.log('homeTeamsArr',homeTeamsArr);
    console.log('productionBttsLocal777',productionBttsLocal);

    if (homeTeamsArr.length !==0) {
      homeTeamsArr.forEach(elem => {
        let obj = {};
        obj.homeTeam = elem;
        obj.date = todayDate;

        let overElem = productionOverLocal.filter(item => item.homeTeam === elem)[0];
        let bttsElem = productionBttsLocal.filter(item => item.homeTeam === elem)[0];
        let underElems = under25DataLocal.filter(item => item.homeTeam === elem);
        let winElem = productionWinLocal.filter(item => item.homeTeam === elem)[0];

        if (overElem && bttsElem && winElem) {
          obj.allCount = overElem.count + bttsElem.bttsYesNum + winElem.count;
          obj.allEv15 = Math.round((overElem.everageOver15EffO + bttsElem.everageOver15YesEffB + winElem.everageOver15EffW) / 3);
        }

        if (overElem) {
          obj.awayTeam = overElem.awayTeam;
          obj.overCount = overElem.count;
          obj.overAccaCount = overElem.numAcca;
          obj.everageOver15EffO = overElem.everageOver15EffO;
          obj.countTopO15O = overElem.countTopO15O;
          obj.resultScore = overElem.resultScore;
        } else {
          obj.overCount = 0;
          obj.overAccaCount = 0;
          obj.everageOver15Eff = 0;
          obj.countTopO15 = 0;
          obj.resultScore = 0;
        }

        if (bttsElem) {
          obj.bttsCount = bttsElem.count;
          obj.bttsAccaCount = bttsElem.numAcca;
          obj.bttsYesNum = bttsElem.bttsYesNum;
          obj.bttsNoNum = bttsElem.bttsNoNum;
          obj.everageOver15EffB = bttsElem.everageOver15YesEffB;
          obj.countTopO15B = bttsElem.countTopO15B;

          if(obj.resultScore === 0) {
            obj.resultScore = bttsElem.resultScore; 
          }

        } else {
          obj.bttsCount = 0;
          obj.bttsAccaCount = 0;
          obj.bttsYesNum = 0;
          obj.bttsNoNum = 0;
        }
        if (underElems.length !== 0) {
          obj.underCount = underElems.length;
          obj.underAccaCount = underElems.filter(it => it.isAcca === true).length;

          // if(obj.resultScore === 0) {
          //   obj.resultScore = underElem.resultScore; 
          // }

        } else {
          obj.underCount = 0;
          obj.underAccaCount = 0;
        }
        if (winElem) {
          obj.winCount = winElem.count;
          obj.winAccaCount = winElem.numAcca;
          obj.everageOver15EffW = winElem.everageOver15EffW;
          obj.countTopO15W = winElem.countTopO15W;

          if(obj.resultScore === 0) {
            obj.resultScore = winElem.resultScore; 
          }
          
        } else {
          obj.winCount = 0;
          obj.winAccaCount = 0;
        }

        fullTableArr.push(obj);
      })
    }

    fullTableArr = fullTableArr.filter(item => item.overCount !==0 || item.bttsCount !==0 || item.winCount !==0 || item.underCount !==0)
    console.log('fullTableArr',fullTableArr);
    fullTableArr.length !==0 && setFullTableLocal(fullTableArr);
  }
  const handleCreateProd = async () => {
    //PRODUCTION OBJECTS
    // console.log('bttsDataOnly444', bttsOnlyLocal);
    // console.log('winDataLocal444', winDataLocal.length !== 0 && winDataLocal);

    console.log('bttsHomeTeamCount444', bttsHomeTeamCount);

    let productionBtts =
      bttsOnlyLocal.length !== 0 && countByPropTeams(bttsOnlyLocal, 'homeTeam');
    let productionOver =
      over25OnlyLocal.length !== 0 &&
      countByPropTeams(over25OnlyLocal, 'homeTeam');
    let productionWin =
      winDataLocal.length !== 0 && countByPropTeams(winDataLocal, 'homeTeam');

    console.log('productionOver222', productionOver);
    let productionUnder =
      under25DataLocal.length !== 0 &&
      countByPropTeams(under25DataLocal, 'homeTeam');
    console.log('productionUnder222', productionUnder);

    let productionDraw =
      drawDataLocal.length !== 0 &&
      countByPropTeams(drawDataLocal.length !== 0 && drawDataLocal, 'homeTeam');

    if (bttsHomeTeamCount) {
      console.log('bttsHomeTeamCount222', bttsHomeTeamCount);
      Object.keys(bttsHomeTeamCount).forEach((elem) => {
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
          bttsHomeTeamCount[elem].underAccaCount =
            productionUnder[elem].numAcca;
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
      });

      let countedAdmBttsAndOver =
        bttsHomeTeamCount && Object.values(bttsHomeTeamCount);
      console.log('countedAdmBttsAndOver222', countedAdmBttsAndOver);
      countedAdmBttsAndOver.length !== 0 &&
        setBttsAndOverArr(countedAdmBttsAndOver);
    }

    Object.keys(productionBtts).forEach((elem) => {
      if (productionBtts[elem].count < 2) {
        delete productionBtts[elem];
      }
    });
    Object.keys(productionOver).forEach((elem) => {
      if (productionOver[elem].count < 2) {
        delete productionOver[elem];
      }
    });
    Object.keys(productionUnder).forEach((elem) => {
      if (productionUnder[elem].count < 2) {
        delete productionUnder[elem];
      }
    });
    Object.keys(productionWin).forEach((elem) => {
      if (productionWin[elem].count < 2) {
        delete productionWin[elem];
      }
    });
    Object.keys(productionDraw).forEach((elem) => {
      if (productionDraw[elem].count < 2) {
        delete productionDraw[elem];
      }
    });

    console.log('productionBtts444', productionBtts);
    productionBtts = Object.values(productionBtts);

    if (productionBtts.length !== 0 ) {
      productionBtts.forEach(elem => {
        elem.under25Count = under25DataLocal.filter(item => item.homeTeam === elem.homeTeam).length
      })
    }
    console.log('productionBtts555', productionBtts);
    productionBtts.length !== 0 && setProductionBtts(productionBtts);
    

    console.log('productionOver444', productionOver);
    productionOver = Object.values(productionOver);
    if (productionOver.length !== 0 ) {
      productionOver.forEach(elem => {
        elem.under25Count = under25DataLocal.filter(item => item.homeTeam === elem.homeTeam).length
      })
    }
    console.log('productionOver555', productionOver);
    productionOver.length !== 0 && setProductionOver(productionOver);
    

    console.log('productionUnder444', productionUnder);
    productionUnder = Object.values(productionUnder);
    productionUnder.length !== 0 && setProductionUnder(productionUnder);
    console.log('productionUnder555', productionUnder);

    console.log('productionWin444', productionWin);
    productionWin = Object.values(productionWin);
    if (productionWin.length !== 0 ) {
      productionWin.forEach(elem => {
        elem.under25Count = under25DataLocal.filter(item => item.homeTeam === elem.homeTeam).length
      })
    }
    productionWin.length !== 0 && setProductionWin(productionWin);
    console.log('productionWin555', productionWin);

    console.log('productionDraw444', productionDraw);
    productionDraw = Object.values(productionDraw);
    productionDraw.length !== 0 && setProductionDraw(productionDraw);
    console.log('productionDraw555', productionDraw);
  };
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
                        <button
                            class="button"
                            onClick={() => handleLoadOver()}
                            type="button"
                          >
                            load over
                          </button>
                          <button
                            class="button active"
                            onClick={() => handleDeleteOver()}
                            type="button"
                          >
                            delete over
                          </button>
                        {/* {!overDataExist ? (
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
                        )} */}
                      </div>
                      <div class="buttons">
                        <button
                            class="button"
                            onClick={() => handleLoadUnder()}
                            type="button"
                          >
                            load under
                          </button>
                          <button
                            class="button active"
                            onClick={() => handleDeleteUnder()}
                            type="button"
                          >
                            delete under
                          </button>
                        {/* {!underDataExist ? (
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
                        )} */}
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
          <Tab label="Load Mon" {...a11yProps(6)} />
          <Tab label="Prod" {...a11yProps(7)} />
          <Tab label="D Stat" {...a11yProps(8)} />
          <Tab label="T Stat" {...a11yProps(9)} />
          <Tab label="A / B" {...a11yProps(10)} />
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
              <option value="betclan_btts">betclan_btts</option>
              <option value="betclan_o25">betclan_o25</option>
              <option value="fbp365_o25">fbp365_o25</option>
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
                <Table
                  columns={columnsBttsAdm}
                  data={bttsAndOverArr}
                  initialState={initialState}
                />
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
                                  outline:
                                    underHomeTeamCount[homeTeam].numAcca > 0
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
                                  outline:
                                    winPredTeamCount[homeTeam].numAcca > 0
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
                                  outline:
                                    teamDrawCount[homeTeam].numAcca > 0
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
      <TabPanel value={value} index={7}>
        {bttsLocal.length ===0 && <p>загрузи данные...</p>}
        <button class="button" onClick={handleGetProdMongo}>
          Get Prod From Mongo
        </button>
        
        {todayDate !== todayString && <button class="button" onClick={handleGetProdMongo}>
          Get Prod From Mongo
        </button>}
        
        {bttsLocal.length !==0 && <>
        {todayDate === todayString && <button class="button" onClick={handleCreateProd}>
          Create Prod
        </button>}
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
        </>}
        {bttsLocal.length !==0 && <div className="prodButtonWrapper">
        <button class="button" onClick={handleCreateFullTable}>
          Create Full Table
        </button>
        {todayDate === todayString && <button class="button" onClick={handleCreateFullTable}>
          Create Full Table
        </button>}
        {todayDate !== todayString && <button class="button" onClick={handleGetFullTableMongo}>
          Get FullTable From Mongo
        </button>}
          {fullTableLocal.length !==0 && <button class="button" onClick={handleSaveFullTable}>
          Save Full Table to Mongo
        </button>}
        {todayDate !== todayString && <button class="button" onClick={handleUpdFullTable}>
            Upd Full Table to Mongo
          </button>}
        </div>}
        {/* <button
          className="button"
          type="button"
          onClick={() => handleShowRating()}
        >
          show rating
        </button> */}
        {
        totalUnder.length !==0 && 
        totalOver.length !==0 && 
        totalWin.length !==0 && 
        totalDraw.length !==0 && 
        // totalBtts.length !==0 && 
        // productionBttsLocal.length !==0 && 
        productionOverLocal.length !==0 && 
        productionWinLocal.length !==0 && 
        productionDrawLocal.length !==0 && 
        productionUnderLocal.length !==0 && 
        <button
          className="button"
          type="button"
          onClick={() => handleAddEff()}
        >
          Add Eff
        </button>}
        {productionBttsLocal.length ===0 && 
        productionOverLocal.length ===0 && 
        productionWinLocal.length ===0 && 
        productionDrawLocal.length ===0 && 
        productionUnderLocal.length ===0 && <p>нужно Create Prod</p>}
        <div className="prodButtonWrapper">
          <button class="button" onClick={handleSaveUnderProd}>
            Save Under Prod to Mongo
          </button>
          <button class="button" onClick={handleUpdUnderProd}>
            Upd Under Prod to Mongo
          </button>
          <button
            class="button"
            onClick={() => {
              getUnderProd(todayDate);
            }}
          >
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
          <button
            class="button"
            onClick={() => {
              getBttsProd(todayDate);
            }}
          >
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
          <button
            class="button"
            onClick={() => {
              getOverProd(todayDate);
            }}
          >
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
          <button
            class="button"
            onClick={() => {
              getWinProd(todayDate);
            }}
          >
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
          <button
            class="button"
            onClick={() => {
              getDrawProd(todayDate);
            }}
          >
            Get Draw Prod from Mongo
          </button>
        </div>
        <div>
          <p>full table</p>
          <>
            {fullTableLocal.length !== 0 && (
              <Table
                columns={columnsFullTable}
                data={fullTableLocal}
                initialState={initialState4}
                to15O25={topOver15FromO25.length}
                to15W={topOver15FromWin.length}
                to15B={topOver15FromBtts.length}
              />
            )}
          </>
          <p>btts</p>
          <>
            {productionBttsLocal.length !== 0 && (
              <Table
                columns={columnsBttsProd}
                data={productionBttsLocal.filter(
                  (elem) => elem.count > 2 || elem.numAcca !== 0
                )}
                initialState={initialState}
                bttsEv={bttsObjEv}
              />
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
              <Table
                columns={columnsOverProd}
                data={productionOverLocal.filter(
                  (elem) => elem.count > 2 || elem.numAcca !== 0
                )}
                initialState={initialState}
                overEv={overObjEv}
              />
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
              <Table
                columns={columnsUnderProd}
                data={productionUnderLocal.filter(
                  (elem) => elem.count > 2 || elem.numAcca !== 0
                )}
                initialState={initialState}
              />
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
              <Table
                columns={columnsWinProd}
                data={productionWinLocal.filter(
                  (elem) => elem.count > 2 || elem.numAcca !== 0
                )}
                initialState={initialState}
                winEv={winObjEv}
              />
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
              <Table
                columns={columnsDrawProd}
                data={productionDrawLocal.filter(
                  (elem) => elem.count > 2 || elem.numAcca !== 0
                )}
                initialState={initialState}
              />
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
      <TabPanel value={value} index={8}>
        {bttsLocal.length === 0 && <p>нужно загрузить данные...</p>}
        <div>
          {/* {bttsLocal.length !==0 && bttsLocal[0].date === todayString && ( */}
          <div>
            <div className="prodButtonWrapper">
              {productionDrawLocal.length !== 0 &&
                productionDrawLocal.some((elem) => elem.resultScore !== '') && (
                  <button class="button" onClick={handleCreateTodayStatArrDraw}>
                    Create Today Stat Draw
                  </button>
                )}
                
              {todayStatDraw.length !== 0 && (
                <button class="button" onClick={handleSaveDailyStatToMongoDraw}>
                Save Today Stat Draw to Mongo
              </button>
              )}
            </div>
            <div className="prodButtonWrapper">
              {productionWinLocal.length !== 0 &&
                productionWinLocal.some((elem) => elem.resultScore !== '') && (
                  <button class="button" onClick={handleCreateTodayStatArrWin}>
                    Create Today Stat Win
                  </button>
                )}
                
              {todayStatWin.length !== 0 && (
                <button class="button" onClick={handleSaveDailyStatToMongoWin}>
                Save Today Stat Win to Mongo
              </button>
              )}
            </div>
            <div className="prodButtonWrapper">
              {productionOverLocal.length !== 0 &&
                productionOverLocal.some((elem) => elem.resultScore !== '') && (
                  <button class="button" onClick={handleSaveTodayTotalOver}>
                    Create Today Stat Over
                  </button>
                )}
                
              {todayStatOver.length !== 0 && (
                <button class="button" onClick={handleSaveDailyStatToMongoOver}>
                Save Today Stat Over to Mongo
              </button>
              )}
            </div>
            <div className="prodButtonWrapper">
              {productionBttsLocal.length !== 0 &&
                productionBttsLocal.some((elem) => elem.resultScore !== '') && (
                  <button class="button" onClick={handleSaveTodayTotalBtts}>
                    Create Today Stat Btts
                  </button>
                )}
                
              {todayStatBtts.length !== 0 && (
                <button class="button" onClick={handleSaveDailyStatToMongoBtts}>
                Save Today Stat Btts to Mongo
              </button>
              )}
            </div>
            <div className="prodButtonWrapper">
              {productionUnderLocal.length !== 0 &&
                productionUnderLocal.some(
                  (elem) => elem.resultScore !== ''
                ) && (
                  <button class="button" onClick={handleSaveTodayTotalUnder}>
                    Create Today Stat Under
                  </button>
                )}
                
              {todayStatUnder.length !== 0 && (
                <button
                class="button"
                onClick={handleSaveDailyStatToMongoUnder}
              >
                Save Today Stat Under to Mongo
              </button>
              )}
            </div>
          </div>
        </div>

        {/* <p>{bttsLocal[0].date}</p>
        <p>{todayDate}</p> */}

        {bttsLocal.length !== 0 && bttsLocal[0].date !== todayString && (
          <div className="prodButtonWrapper">
            <button class="button" onClick={handleGetTodayTotal}>
              Get Today Total
            </button>
          </div>
          
        )}
        {/* <div className="prodButtonWrapper">
            <button class="button" onClick={handleUpdateStatTotal}>
              Update Stat Total
            </button>
          </div> */}
        

        <p>btts</p>
        <>
          {todayStatBttsMongo.length !== 0 && <Table
            columns={columnsBttsDailyStat}
            data={todayStatBttsMongo}
            initialState={initialState3}
          ></Table>}
        </>
        <p>over</p>
        <>
          {todayStatOverMongo.length !== 0 && <Table
            columns={columnsOverDailyStat}
            data={todayStatOverMongo}
            initialState={initialState3}
          ></Table>}
        </>
        <p>under</p>
        <>
          {todayStatUnderMongo.length !== 0 && <Table
            columns={columnsUnderDailyStat}
            data={todayStatUnderMongo}
            initialState={initialState3}
          ></Table>}
        </>
        <p>win</p>
        <>
          {todayStatWinMongo.length !== 0 && <Table
            columns={columnsWinDailyStat}
            data={todayStatWinMongo}
            initialState={initialState3}
          ></Table>}
        </>
        <p>draw</p>
        <>
          {todayStatDrawMongo.length !== 0 && <Table
            columns={columnsDrawDailyStat}
            data={todayStatDrawMongo}
            initialState={initialState3}
          ></Table>}
        </>

      </TabPanel>
      <TabPanel value={value} index={9}>
      <div className="prodButtonWrapper">
            {todayStatDrawMongo.length !== 0 && <button class="button" onClick={handleSaveStatTotalDraw}>
              Save Stat Total to Mongo Draw
            </button>}
            {/* <button class="button" onClick={handleSaveStatTotalDraw}>
              Save Stat Total to Mongo Draw
            </button> */}
            <button class="button" onClick={handleGetStatTotalDraw}>
              Get Stat Total Draw
            </button>
          </div>
        <div className="prodButtonWrapper">
            {todayStatWinMongo.length !== 0 && <button class="button" onClick={handleSaveStatTotalWin}>
              Save Stat Total to Mongo Win
            </button>}
            {/* <button class="button" onClick={handleSaveStatTotalWin}>
              Save Stat Total to Mongo Win
            </button> */}
            <button class="button" onClick={handleGetStatTotalWin}>
              Get Stat Total Win
            </button>
          </div>
        <div className="prodButtonWrapper">
            {todayStatBttsMongo.length !== 0 && <button class="button" onClick={handleSaveStatTotalBtts}>
              Save Stat Total to Mongo Btts
            </button>}
            {/* <button class="button" onClick={handleSaveStatTotalBtts}>
              Save Stat Total to Mongo Btts
            </button> */}
            <button class="button" onClick={handleGetStatTotalBtts}>
              Get Stat Total Btts
            </button>
          </div>
        <div className="prodButtonWrapper">
            {todayStatOverMongo.length !== 0 && <button class="button" onClick={handleSaveStatTotalOver}>
              Save Stat Total to Mongo Over
            </button>}
            {/* <button class="button" onClick={handleSaveStatTotalOver}>
              Save Stat Total to Mongo Over
            </button> */}
            <button class="button" onClick={handleGetStatTotalOver}>
              Get Stat Total Over
            </button>
          </div>
        <div className="prodButtonWrapper">
            {todayStatUnderMongo.length !== 0 && <button class="button" onClick={handleSaveStatTotalUnder}>
              Save Stat Total to Mongo Under
            </button>}
            {/* <button class="button" onClick={handleSaveStatTotalUnder}>
              Save Stat Total to Mongo Under
            </button> */}
            <button class="button" onClick={handleGetStatTotalUnder}>
              Get Stat Total Under
            </button>
          </div>

          <div className="prodButtonWrapper">
            {todayDate !== '' && <button class="button" onClick={handleGetStatTotals}>
              Get Stat Totals
            </button>}
          </div>

          <p>btts</p>
        <>
          {totalBtts.length !== 0 && <Table
            columns={columnsBttsTotalStat}
            data={totalBtts}
            initialState={initialState3}
          ></Table>}
        </>
          <p>over</p>
        <>
          {totalOver.length !== 0 && <Table
            columns={columnsOverTotalStat}
            data={totalOver}
            initialState={initialState3}
          ></Table>}
        </>
          <p>under</p>
        <>
          {totalUnder.length !== 0 && <Table
            columns={columnsUnderTotalStat}
            data={totalUnder}
            initialState={initialState3}
          ></Table>}
        </>
          <p>win</p>
        <>
          {totalWin.length !== 0 && <Table
            columns={columnsWinTotalStat}
            data={totalWin}
            initialState={initialState3}
          ></Table>}
        </>
          <p>draw</p>
        <>
          {totalDraw.length !== 0 && <Table
            columns={columnsDrawTotalStat}
            data={totalDraw}
            initialState={initialState3}
          ></Table>}
        </>
      </TabPanel>
      <TabPanel value={value} index={10}>        
        <DayPicker
          id="test"
          mode="range"
          // defaultMonth={pastMonth}
          selected={range}
          footer={footer}
          onSelect={setDateRange}
        />
        <div className="prodButtonWrapper">
        <button
          className="button"
          type="button"
          onClick={handleGetTopsProd}
        >
          Get Prod Tops
        </button>
        </div>

        <p>zeros & under45</p>
        <div className="prodButtonWrapper">
        <button
          className="button"
          type="button"
          onClick={handleGetFullTableZeros}
        >
          Get Full Table Zeros
        </button>
        <button
          className="button"
          type="button"
          onClick={handleGetBttsZeros}
        >
          Get Btts Zeros
        </button>
        <button
          className="button"
          type="button"
          onClick={handleGetOverZeros}
        >
          Get Over Zeros
        </button>
        <button
          className="button"
          type="button"
          onClick={handleGetWinZeros}
        >
          Get Win Zeros
        </button>
        <button
          className="button"
          type="button"
          onClick={handleUnder45Prods}
        >
          Get Under45 Prods
        </button>
        </div>

        <p>alls</p>
        
        <div className="prodButtonWrapper">
        <button
          className="button"
          type="button"
          onClick={handleGetAllOverProd}
        >
          Get All Over
        </button>
        </div>

        
        <>
          {fullTableZeros.length !== 0 && 
          <>
          <p>full table zeros</p>
          <>{fullTableObjEv && <div><span>{`Колво: ${fullTableObjEv.allCount}  `}</span><span>{`Over15Ev: ${fullTableObjEv.allEv15}  `}</span><span>{`winCount: ${fullTableObjEv.winCount}  `}</span><span>{`winAccaCount: ${fullTableObjEv.winAccaCount}  `}</span><span>{`overCountEv: ${fullTableObjEv.overCount}  `}</span><span>{`overAccaCountEv: ${fullTableObjEv.overAccaCount}  `}</span><span>{`bttsCountEv: ${fullTableObjEv.bttsCount}  `}</span><span>{`bttsAccaCountEv: ${fullTableObjEv.bttsAccaCount}  `}</span><span>{`Under25Ev: ${fullTableObjEv.totalUnder25CountEv}  `}</span></div>}</>
          <button className="button"
          type="button"
          onClick={() => {setFullTableZeros([])}}>clear</button>
          <Table
            columns={columnsFullTable}
            data={fullTableZeros}
            initialState={initialState4}
          ></Table></>
          }
        </>
        <>
          {bttsZerosLocal.length !== 0 && 
          <>
          <p>btts zeros</p>
          <>{bttsObjEv && <div><span>{`Колво: ${bttsObjEv.totalCountEv}  `}</span><span>{`Акка: ${bttsObjEv.totalAccaCountEv}  `}</span><span>{`BttsYes: ${bttsObjEv.totalBttsYesEv}  `}</span><span>{`BttsYesEff: ${bttsObjEv.totalBttsYesEffEv}  `}</span><span>{`Over05Eff: ${bttsObjEv.totalOver05EffEv}  `}</span><span>{`Over15Eff: ${bttsObjEv.totalOver15EffEv}  `}</span><span>{`Under25Ev: ${bttsObjEv.totalUnder25Count}  `}</span></div>}</>
          <button className="button"
          type="button"
          onClick={() => {setBttsZeros([])}}>clear</button>
          <Table
            columns={columnsBttsProd}
            data={bttsZerosLocal}
            initialState={initialState}
            bttsEv={bttsObjEv}
          ></Table></>
          }
        </>
        <>
          {overZerosLocal.length !== 0 && 
          <>
          <p>over zeros</p>
          <>{overObjEv && <div><span>{`Колво: ${overObjEv.totalCountEv}  `}</span><span>{`Акка: ${overObjEv.totalAccaCountEv}  `}</span><span>{`Over05Eff: ${overObjEv.totalOver05EffEv}  `}</span><span>{`Over15Eff: ${overObjEv.totalOver15EffEv}  `}</span><span>{`Over25Eff: ${overObjEv.totalOver25EffEv}  `}</span><span>{`Under25Ev: ${overObjEv.totalUnder25Count}  `}</span></div>}</>
          <button className="button"
          type="button"
          onClick={() => {setOverZeros([])}}>clear</button>
          <Table
            columns={columnsOverProd}
            data={overZerosLocal}
            initialState={initialState}
            overEv={overObjEv}
          ></Table></>
          }
        </>
        <>
          {winZerosLocal.length !== 0 && 
          <>
          <p>win zeros</p>
          <>{winObjEv && <div><span>{`Колво: ${winObjEv.totalCountEv}  `}</span><span>{`Акка: ${winObjEv.totalAccaCountEv}  `}</span><span>{`WinCountEv: ${winObjEv.totalWinCountEv}  `}</span><span>{`WinYesEvEff: ${winObjEv.totalWinYesEffEv}  `}</span><span>{`Over05Eff: ${winObjEv.totalOver05EffEv}  `}</span><span>{`Over15Eff: ${winObjEv.totalOver15EffEv}  `}</span><span>{`Under25Ev: ${winObjEv.totalUnder25Count}  `}</span></div>}</>
          <button className="button"
          type="button"
          onClick={() => {setWinZeros([])}}>clear</button>
          <Table
            columns={columnsWinProd}
            data={winZerosLocal}
            initialState={initialState}
            winEv={winObjEv}
          ></Table></>
          }
        </>
        <>
          {under45ProdsLocal.length !== 0 && 
          <>
          <p>under45 false prods</p>
          <>{underObjEv && <div><span>{`Колво: ${underObjEv.totalCountEv}  `}</span><span>{`Акка: ${underObjEv.totalAccaCountEv}  `}</span><span>{`Under25Eff: ${underObjEv.totalUnder25EffEv}  `}</span><span>{`Under35Eff: ${underObjEv.totalUnder35EffEv}  `}</span><span>{`Under45Eff: ${underObjEv.totalUnder45EffEv}  `}</span></div>}</>
          <button className="button"
          type="button"
          onClick={() => {setUnder45Prods([])}}>clear</button>
          <Table
            columns={columnsUnderProd}
            data={under45ProdsLocal}
            initialState={initialState}
          ></Table></>
          }
        </>
        <>
          {allOverProdLocal.length !== 0 && 
          <>
          <p>all over prods</p>
          <button className="button"
          type="button"
          onClick={() => {setAllOverProd([])}}>clear</button>
          <Table
            columns={columnsOverProd}
            data={allOverProdLocal}
            initialState={initialState}
          ></Table></>
          }
        </>

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
