import { useContext, useEffect, useState } from 'react';
import { getBttsMongo } from './api/getBttsMongo';
import { context } from './context/context';
import './App.css';
import { getResultsTotalMongo } from './api/getResultsTotalMongo';
import { getResultsMongo } from './api/getResultsMongo';
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
// import { saveStatMongo } from './api/saveStatMongo';
// import { saveTodayBetMongo } from './api/saveTodayBet';
import { saveBttsMongo } from './api/saveBttsMongo';
import { getWinDataMongo } from './api/getWinDataMongo';
// import { getTodayBetArrMongo } from './api/getTodayBetArrMongo';
// import { getAccasMongo } from './api/getAccasMongo';
import { getUnder25Mongo } from './api/getUnder25';
// import { saveAccaMongo } from './api/saveAccaMongo';
import { saveUnderMongo } from './api/saveUnderMongo';
import { saveWinMongo } from './api/saveWinMongo';

function App() {
  const { setBtts, setResultsTotal } = useContext(context);
  const [bttsLocal, setBttsLocal] = useState([]);
  const [allRes, setAllRes] = useState([]);
  // const [bttsWLLocal, setBttsWLLocal] = useState([]);
  // const [isInclude, setIsInclude] = useState(false);
  const [winDataLocal, setWinDataLocal] = useState([]);
  // const [accasDataLocal, setAccasDataLocal] = useState([]);
  const [under25DataLocal, setUnder25DataLocal] = useState([]);
  const [resultsLocal, setResultsLocal] = useState([]);
  // const [todayBet, setTodayBet] = useState(null);
  const [resultsTotalLocal, setResultsTotalLocal] = useState([]);
  const [resultsTotalLocalFil, setResultsTotalLocalFil] = useState([]);
  // const [resHomeTeamsArr, setResHomeTeamsArr] = useState([]);
  const [todayBetPredsArr, setTodayBetPredsArr] = useState([]);
  const [todayDate, setDate] = useState('');
  const [showZero, setShowZero] = useState(false);
  const [addWin, setAddWinToBtts] = useState(false);
  const [bttsSourcesCount, setBttsSourcesCount] = useState({});
  const [bttsHomeTeamCount, setBttsHomeTeamCount] = useState({});
  const [winSourcesCount, setWinSourcesCount] = useState({});
  const [underSourcesCount, setUnderSourcesCount] = useState({});
  const [underHomeTeamCount, setUnderHomeTeamCount] = useState({});
  const [winPredTeamCount, setWinPredTeamCount] = useState({});
  const [clubStatLocal, setClubStatLocal] = useState(null);
  const [resultTotalSourcesCount, setResultTotalSourcesCount] = useState({});

  const [loader, setLoader] = useState(false);
  const [totalLoader, setTotalLoader] = useState(false);

  //for buttons
  const [winDataExist, setWinDataExist] = useState(false);
  const [bttsDataExist, setBttsDataExist] = useState(false);
  const [overDataExist, setOverDataExist] = useState(false);
  const [crawlDataExist, setCrawlDataExist] = useState(false);
  const [resultDataExist, setResultDataExist] = useState(false);
  const [totalDataExist, setTotalDataExist] = useState(false);
  const [underDataExist, setUnderDataExist] = useState(false);
  // const [today, setToday] = useState('');
  // const [todayBetLocal, setTodayBetLocal] = useState(null);
  // const [todayBetArrLocal, setTodayBetArrLocal] = useState([]);

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

  // console.log('sourceAccaPred', sourceAccaPred);
  // console.log('predTypeAcca', predTypeAcca);

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  function toggleZero() {
    console.log('toggleZero');
    setShowZero((current) => !current);
  }
  function toggleAddWin() {
    console.log('toggleAddWin');
    setAddWinToBtts((current) => !current);
  }
  async function handleLoadBtts() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/btts/save`);
    const text = await res.text();
    text === 'btts loaded' && setBttsDataExist(true);
    setLoader(false);
  }
  async function handleLoadUnder() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/under/save`);
    const text = await res.text();
    text === 'under loaded' && setUnderDataExist(true);
    setLoader(false);
  }
  async function handleLoadTotal() {
    setTotalLoader(true);
    const res = await fetch(`http://localhost:8000/total/save`);
    const text = await res.text();
    text === 'total loaded' && setTotalDataExist(true);
    setTotalLoader(false);
  }
  async function handleLoadOver() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/over/save`);
    const text = await res.text();
    text === 'over loaded' && setOverDataExist(true);
    setLoader(false);
  }
  async function handleLoadCrawl() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/crawl/save`);
    const text = await res.text();
    text === 'crawl loaded' && setCrawlDataExist(true);
    setLoader(false);
  }
  async function handleDeleteBtts() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/btts/delete`);
    const text = await res.text();
    text === 'btts deleted' && setBttsDataExist(false);
    setLoader(false);
  }
  async function handleDeleteOver() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/over/delete`);
    const text = await res.text();
    text === 'over deleted' && setOverDataExist(false);
    setLoader(false);
  }
  async function handleDeleteUnder() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/under/delete`);
    const text = await res.text();
    text === 'under deleted' && setUnderDataExist(false);
    setLoader(false);
  }
  async function handleLoadWin() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/win/save`);
    const text = await res.text();
    text === 'win loaded' && setWinDataExist(true);
    setLoader(false);
  }
  async function handleDeleteWin() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/win/delete`);
    const text = await res.text();
    text === 'win deleted' && setWinDataExist(false);
    setLoader(false);
  }
  async function handleLoadResult() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/result/save`);
    const text = await res.text();
    text === 'result loaded' && setResultDataExist(true);
    setLoader(false);
  }
  async function handleDeleteResult() {
    setLoader(true);
    const res = await fetch(`http://localhost:8000/result/delete`);
    const text = await res.text();
    text === 'result deleted' && setResultDataExist(false);
    setLoader(false);
  }
  // async function handleGetBtts() {
  //   await fetch(`http://localhost:8000/btts/get`);

  //   const bttsDataMongo = await getBttsMongo(todayDate);

  //   bttsLocal.length !== 0 && setBttsLocal([]);
  //   setBttsLocal(bttsDataMongo);
  // }

  useEffect(() => {
    async function fetchData() {
      const bttsDataMongo = await getBttsMongo(todayDate);
      console.log('bttsDataMongo', bttsDataMongo);
      bttsDataMongo.length !== 0 &&
        bttsDataMongo.some((elem) => elem.action === 'btts') &&
        setBttsDataExist(true);
      bttsDataMongo.length !== 0 &&
        bttsDataMongo.some((elem) => elem.action === 'over25') &&
        setOverDataExist(true);

      const winDataMongo = await getWinDataMongo(todayDate);
      winDataMongo.length !== 0 && setWinDataExist(true);

      const under25DataMongo = await getUnder25Mongo(todayDate);
      under25DataMongo.length !== 0 && setUnderDataExist(true);

      ((winDataMongo.length !== 0 &&
        (winDataMongo.some((elem) => elem.source === 'bettingtips') ||
          winDataMongo.some((elem) => elem.source === 'wincomparator'))) ||
        (bttsDataMongo.length !== 0 &&
          (bttsDataMongo.some((elem) => elem.source === 'bettingtips') ||
            bttsDataMongo.some((elem) => elem.source === 'wincomparator')))) &&
        setCrawlDataExist(true);
    }

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
    console.log('arrLocal222', arr);
    let obj1 = {};

    // const hasAcca = arr.some(elem => elem.isAcca);

    let obj = arr.reduce(
      // (prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1),
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );

    Object.keys(obj).forEach((key) => {
      obj1[key] = {
        count: obj[key],
        hasAcca: arr.some((elem) => elem.homeTeam === key && elem.isAcca),
      };
    });

    console.log('obj1', obj1);

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

    const resultsData = await getResultsMongo(formattedDate);
    resultsData.length !== 0 && setResultDataExist(true);
    addWin && setAddWinToBtts(false);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const bttsDataMongo = await getBttsMongo(todayDate);

    bttsLocal.length !== 0 && setBttsLocal([]);
    setBttsLocal(bttsDataMongo);
    // await setBtts(bttsDataMongo);
    const winDataMongo = await getWinDataMongo(todayDate);
    // const accasDataMongo = await getAccasMongo(todayDate);

    winDataLocal.length !== 0 && setWinDataLocal([]);
    setWinDataLocal(winDataMongo);

    // accasDataLocal.length !== 0 && setAccasDataLocal([]);
    // setAccasDataLocal(accasDataMongo);

    const under25DataMongo = await getUnder25Mongo(todayDate);
    console.log('under25DataMongo', under25DataMongo);
    let sortedUnder25 = under25DataMongo.sort((a, b) => {
      if (a.homeTeam < b.homeTeam) {
        return -1;
      }
      if (a.homeTeam > b.homeTeam) {
        return 1;
      }
      return 0;
    });
    under25DataLocal.length !== 0 && setUnder25DataLocal([]);
    setUnder25DataLocal(sortedUnder25);

    const resultsTotalData = await getResultsTotalMongo(todayDate);
    const resultsData = await getResultsMongo(todayDate);
    console.log('resultsData', resultsData);
    resultsLocal.length !== 0 && setResultsLocal([]);
    setResultsLocal(resultsData);
    setAllRes(resultsData);
    setResultsTotalLocal(resultsTotalData);
    setResultsTotalLocalFil(resultsTotalData);

    const countedObjBtts =
      bttsDataMongo.length !== 0 && countByProp(bttsDataMongo, 'source');
    const countedHomeTeamBtts =
      bttsDataMongo.length !== 0 && countByPropTeams(bttsDataMongo, 'homeTeam');
    // console.log('countedHomeTeam', countedHomeTeam);
    // console.log('countedObjBtts', countedObjBtts);
    countedObjBtts && setBttsSourcesCount(countedObjBtts);
    countedHomeTeamBtts && setBttsHomeTeamCount(countedHomeTeamBtts);

    const countedObjWin =
      winDataMongo.length !== 0 && countByProp(winDataMongo, 'source');
    const countedPredTeam =
      winDataMongo.length !== 0 && countByPropTeams(winDataMongo, 'homeTeam');

    countedObjWin && setWinSourcesCount(countedObjWin);
    countedPredTeam && setWinPredTeamCount(countedPredTeam);

    const countedObjUnder =
      under25DataMongo.length !== 0 && countByProp(under25DataMongo, 'source');
    const countedHomeTeamUnder =
      under25DataMongo.length !== 0 &&
      countByPropTeams(under25DataMongo, 'homeTeam');
    // console.log('countedHomeTeam', countedHomeTeam);
    // console.log('countedObj', countedObj);
    countedObjUnder && setUnderSourcesCount(countedObjUnder);
    countedHomeTeamUnder && setUnderHomeTeamCount(countedHomeTeamUnder);

    // const countedObj2 =
    //   resultsTotalData.length !== 0 && countByProp(bttsDataMongo, 'source');
    // countedObj2 && setResultTotalSourcesCount(countedObj2);
    // resultsData.length !== 0 &&
    //   resultsData.forEach((elem) => {
    //     setResHomeTeamsArr((oldArray) => [...oldArray, elem.homeTeam]);
    //   });

    await setResultsTotal(resultsTotalData);

    //Form submission happens here
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
    e.preventDefault();
    const htArr = homeTeamTotalPred.split(',');

    let result = await saveBttsMongo({
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

    let result = await saveUnderMongo({
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
    let result = await saveWinMongo({
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
              <button class="button" type="submit">
                Get Data
              </button>
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
                    </div>
                  )}
                {todayDate &&
                  todayDate !== format(new Date(), 'dd.MM.yyyy') && (
                    <div class="buttons">
                      {!resultDataExist ? (
                        <button
                          class="button"
                          type="button"
                          onClick={() => handleLoadResult()}
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
          {/* <Tab label="ACCAS" {...a11yProps(5)} /> */}
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
              <option value="accum">accum</option>
              <option value="fbp">fbp</option>
              <option value="fst">fst</option>
              <option value="footsuper">footsuper</option>
              <option value="redscores">redscores</option>
              <option value="bettingtips">bettingtips</option>
              <option value="betshoot">betshoot</option>
              <option value="wdw">wdw</option>
              <option value="nvtips">nvtips</option>
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
        <ul className="sourcesAggs">
          {Object.keys(bttsSourcesCount).length !== 0 &&
            Object.keys(bttsSourcesCount).map((source, i) => {
              return (
                <li key={i} className="sourcesAggsElem">
                  <div style={{ fontWeight: '700', marginRight: '10px' }}>
                    {source}
                  </div>
                  <div>{bttsSourcesCount[source]}</div>
                </li>
              );
            })}
        </ul>

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
                {Object.keys(bttsHomeTeamCount).length !== 0 &&
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
                                  outline: bttsHomeTeamCount[homeTeam].hasAcca
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
                  })}
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
                            : 'transparent' && elem.source === 'footy'
                            ? '#CCF5AC'
                            : 'transparent' && elem.source === 'morph'
                            ? '#006EAF'
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
                            : 'transparent' && elem.source === 'footsuper'
                            ? '#fee440'
                            : 'transparent' && elem.source === 'nerdy'
                            ? '#006EAF'
                            : 'transparent' && elem.source === 'hello'
                            ? 'lightpink'
                            : 'transparent' && elem.source === 'mines'
                            ? 'green'
                            : 'transparent' && elem.source === 'redscores'
                            ? '#f72585'
                            : 'transparent' && elem.source === 'betshoot'
                            ? '#fdf0d5'
                            : 'transparent' && elem.source === 'bettingtips'
                            ? '#ffd8be'
                            : 'transparent' && elem.source === 'banker'
                            ? '#007ea7'
                            : 'transparent' && elem.source === 'soccertipz'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'wdw'
                            ? '#fb5607'
                            : 'transparent',
                        // border: elem.isAcca ? '4px dashed black' : 'none',
                        opacity:
                          (elem.source === 'fbp' && elem.action === 'over25') ||
                          (elem.source === 'fst' && elem.action === 'over25') ||
                          elem.source === 'footsuper' ||
                          (elem.source === 'prot' &&
                            elem.action === 'over25') ||
                            (elem.source === 'accum' &&
                            elem.action === 'over25') ||
                          (elem.source === 'r2bet' && elem.action === 'btts') ||
                          (elem.source === 'r2bet' && elem.action === 'win') ||
                          (elem.source === 'mines' && elem.action === 'win') ||
                          (elem.source === 'bettingtips' && elem.action === 'win') ||
                          (elem.source === 'betgenuine' &&
                            elem.action === 'win') ||
                          (elem.source === 'fst' && elem.action === 'win') ||
                          (elem.source === 'fbp' && elem.action === 'win') ||
                          (elem.source === 'footsuper' &&
                            elem.action === 'win') ||
                          (elem.source === 'hello' && elem.action === 'XWin') ||
                          (elem.source === 'gnowAcc' &&
                            elem.action === 'over25')
                            ? 0.3
                            : 1,
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

        {resultDataExist && resultsLocal.length !== 0 && (
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
        <ul className="sourcesAggs">
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
        </ul>

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
              <option value="nvtips">nvtips</option>
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
                                  outline: underHomeTeamCount[homeTeam].hasAcca
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
        <ul className="sourcesAggs">
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
        </ul>
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
                                  outline: winPredTeamCount[homeTeam].hasAcca
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
                            : 'transparent' && elem.source === 'soccertipz'
                            ? '#70a288'
                            : 'transparent' && elem.source === 'wdw'
                            ? '#fb5607'
                            : 'transparent',
                        border: elem.isAcca ? '4px dashed black' : 'none',
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
      {/* <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
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
