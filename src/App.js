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
import { saveStatMongo } from './api/saveStatMongo';
import { saveTodayBetMongo } from './api/saveTodayBet';
import { saveBttsMongo } from './api/saveBttsMongo';
import { saveTodayBetArr } from './api/saveTodayBetArr';
import { getTodayBetMongo } from './api/getTodayBetMongo';
import { getTodayBetArrMongo } from './api/getTodayBetArrMongo';
import { getWinDataMongo } from './api/getWinDataMongo';
// import { getAccasMongo } from './api/getAccasMongo';
import { getUnder25Mongo } from './api/getUnder25';
import { saveAccaMongo } from './api/saveAccaMongo';
import { saveUnderMongo } from './api/saveUnderMongo';
import { saveWinMongo } from './api/saveWinMongo';

function App() {
  const { setBtts, setResultsTotal } = useContext(context);
  const [bttsLocal, setBttsLocal] = useState([]);
  // const [bttsWLLocal, setBttsWLLocal] = useState([]);
  // const [isInclude, setIsInclude] = useState(false);
  const [winDataLocal, setWinDataLocal] = useState([]);
  // const [accasDataLocal, setAccasDataLocal] = useState([]);
  const [under25DataLocal, setUnder25DataLocal] = useState([]);
  const [resultsLocal, setResultsLocal] = useState([]);
  // const [todayBet, setTodayBet] = useState(null);
  const [resultsTotalLocal, setResultsTotalLocal] = useState([]);
  const [resultsTotalLocalFil, setResultsTotalLocalFil] = useState([]);
  const [resHomeTeamsArr, setResHomeTeamsArr] = useState([]);
  const [todayBetPredsArr, setTodayBetPredsArr] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [bttsSourcesCount, setBttsSourcesCount] = useState({});
  const [bttsHomeTeamCount, setBttsHomeTeamCount] = useState({});
  const [winSourcesCount, setWinSourcesCount] = useState({});
  const [underSourcesCount, setUnderSourcesCount] = useState({});
  const [underHomeTeamCount, setUnderHomeTeamCount] = useState({});
  const [winPredTeamCount, setWinPredTeamCount] = useState({});
  const [clubStatLocal, setClubStatLocal] = useState(null);
  const [resultTotalSourcesCount, setResultTotalSourcesCount] = useState({});
  // const [todayBetLocal, setTodayBetLocal] = useState(null);
  // const [todayBetArrLocal, setTodayBetArrLocal] = useState([]);
  const [todayBetObj, setTodayBetObj] = useState({
    date: '',
    coef: 0,
    bets: [],
  });
  const [isNoFilVisible, setIsNoFilVisible] = useState(false);
  const [predType, setPredType] = useState('btts');
  const [isAcca, setIsAccaType] = useState('notAcca');
  const [predTypeAcca, setPredTypeAcca] = useState('btts');
  const [homeTeamTotalPred, setHomeTeamTotalPred] = useState('');
  const [homeTeamAccaPred, setHomeTeamAccaPred] = useState('');
  const [homeTeamWinPred, setHomeTeamWinPred] = useState('');
  const [predTeamWinPred, setPredTeamWinPred] = useState('');
  const [sourceTotalPred, setSourceTotalPred] = useState('betshoot');
  const [sourceAccaPred, setSourceAccaPred] = useState('betshoot');
  const [sourceWinPred, setSourceWinPred] = useState('footsuper');

  console.log('sourceAccaPred', sourceAccaPred);
  console.log('predTypeAcca', predTypeAcca);

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function LCSubStr(X, Y, m, n) {
    
    var LCStuff = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0));

    var result = 0;

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) LCStuff[i][j] = 0;
        else if (X[i - 1] === Y[j - 1]) {
          LCStuff[i][j] = LCStuff[i - 1][j - 1] + 1;
          result = Math.max(result, LCStuff[i][j]);
        } else LCStuff[i][j] = 0;
      }
    }
    return result;
  }

  const countByPropSorted = (arr, prop) => {
    let obj = arr.reduce(
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );

    let sorted = Object.entries(obj).sort((a,b) => b[1] - a[1]);
    let sortedByValues = Object.fromEntries(sorted);
    console.log('sortedByValues',sortedByValues);
    return sortedByValues;
  }

  const countByPropTeams = (arr, prop) => {

    console.log('arrLocal222',arr);
    let obj1 = {};

    // const hasAcca = arr.some(elem => elem.isAcca);

    let obj = arr.reduce(
      // (prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1),
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );

    Object.keys(obj).forEach(key => {
      obj1[key] = {count: obj[key], hasAcca: arr.some(elem => elem.homeTeam === key && elem.isAcca)}
    })

    console.log('obj1',obj1);

    return obj1;


  }
  const countByProp = (arr, prop) => {
    return arr.reduce(
      (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
      {}
    );
  }
    

  function onSelect(date) {
    const formattedDate = format(date, 'dd.MM.yyyy');
    setTodayDate(formattedDate);
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
    console.log('under25DataMongo',under25DataMongo);
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
    console.log('resultsData',resultsData);
    resultsLocal.length !== 0 && setResultsLocal([]);
    setResultsLocal(resultsData);
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
    under25DataMongo.length !== 0 && countByPropTeams(under25DataMongo, 'homeTeam');
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
  const handleTeamAggClick = async (homeTeam) => {
    const clubStat = await getClubStat(homeTeam);
    setClubStatLocal(clubStat);
  };
  const handleAddToTodayBet = async (homeTeam) => {
    let innerObj = {
      homeTeam: homeTeam,
      footyStat: clubStatLocal,
    };

    setTodayBetObj((prevState) => ({
      ...prevState,
      date: todayDate,
      bets: [...prevState.bets, innerObj],
    }));

    let htArr = bttsLocal.filter((elem) => elem.homeTeam === homeTeam);

    setTodayBetPredsArr((prevArray) => [...prevArray, ...htArr]);
  };
  // const saveTodayBet = async () => {
  //   await saveTodayBetMongo(todayBetObj);
  //   // await saveTodayBetArr(todayBetPredsArr);
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
      isAcca: true
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
  const radioChangeHandlerAcca = (e) => {
    setPredTypeAcca(e.target.value);
  };
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

  const formatPredictionDate = (elem) => {
    if (elem.source === 'fbp') {
      return elem.predictionDate.split(':')[0];
    }
    return elem.predictionDate;
  };

  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <DayPicker
          mode="single"
          required
          selected={todayDate}
          onSelect={onSelect}
        />
        <button type="submit">Submit</button>
      </form>
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
          <Tab label="Results Raw" {...a11yProps(1)} />
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
        <div className="wrapper">
          <h2>{`Prediction type: Btts & over25 (${bttsLocal.length})`}</h2>

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
              <button type="submit">Post</button>
            </form>
            {/* <button type="button" onClick={handleIncludeWL}>
              Include WL
            </button> */}
          </div>
          <ul className='sourcesAggs'>
            {Object.keys(bttsSourcesCount).length !== 0 &&
              Object.keys(bttsSourcesCount).map((source, i) => {
                return (
                  <li
                    key={i}
                    className='sourcesAggsElem'
                    
                  >
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
                          {bttsHomeTeamCount[homeTeam].count > 2 && (
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
                                    outline: bttsHomeTeamCount[homeTeam].hasAcca ? '2px dashed green' : 'none',
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

          
          <table className="table">
            <tbody>
              {/* <th className="cell width10">Res</th> */}
              <th className="cell width20">Home Team</th>
              {/* <th className="cell width20">Pred Team</th> */}
              <th className="cell width20">Away Team</th>
              <th className="cell width20">Source</th>
              <th className="cell width10">Action</th>
              <th className="cell width10">Date</th>
              {bttsLocal.length !== 0 && (
                <>
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
                            border: elem.isAcca ? '4px dashed black' : 'none',
                            opacity: (elem.source === 'nvtips' || elem.source === 'banker' || elem.source === 'soccertipz' || elem.source === 'venas' || elem.source === 'passion') ? 0.3 : 1,
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
                </>
              )}
            </tbody>
          </table>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>{`Count: (${resultsLocal.length})`}</h2>
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
        <ul className='sourcesAggs'>
            {Object.keys(underSourcesCount).length !== 0 &&
              Object.keys(underSourcesCount).map((source, i) => {
                return (
                  <li
                    key={i}
                    className='sourcesAggsElem'
                    
                  >
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
              <button type="submit">Post</button>
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
                                    outline: underHomeTeamCount[homeTeam].hasAcca ? '2px dashed green' : 'none',
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
        <h2>{`Count: Win (${winDataLocal.length})`}</h2>
        <ul className='sourcesAggs'>
            {Object.keys(winSourcesCount).length !== 0 &&
              Object.keys(winSourcesCount).map((source, i) => {
                return (
                  <li
                    key={i}
                    className='sourcesAggsElem'
                    
                  >
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
          <button type="submit">Post</button>
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
                                    outline: winPredTeamCount[homeTeam].hasAcca ? '2px dashed green' : 'none',
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
                            opacity: (elem.source === 'soccertipz' || elem.source === 'passion' || elem.source === 'prot' || elem.source === 'banker' || elem.source === 'fbp' || elem.source === 'footsuper') ? 0.3 : 1,
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
