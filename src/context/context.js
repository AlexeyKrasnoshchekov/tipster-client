import { format } from 'date-fns';
import { useReducer } from 'react';
import { createContext } from 'react';
import reducer from './reducer';
import {
  SET_BTTS,
  SET_RESULTS_TOTAL,
  INCREMENT,
  PUSH_MATCHES,
  SET_COUNTER_MONGO,
  SET_COUNTER_MONGO_YEST,
} from './reducer';
export const context = createContext();

const State = (props) => {
  const today = new Date();
  const formattedToday = format(today, 'dd.MM.yyyy');
  const todayString = formattedToday.toString();

  console.log('todayString', todayString);

  const initialState = {
    bttsArr: [],
    resultsTotalArr: [],
    zeroCounterYesterday: {
      o25tip_win: {
        total: 0,
        matches: [],
      },
      bettingtips_o25: {
        total: 0,
        matches: [],
      },
      wincomparator_o25: {
        total: 0,
        matches: [],
      },
      accum_btts: {
        total: 0,
        matches: [],
      },
      fst_btts: {
        total: 0,
        matches: [],
      },
      r2bet_o25: {
        total: 0,
        matches: [],
      },
      hello_o25: {
        total: 0,
        matches: [],
      },
      fbp_o25: {
        total: 0,
        matches: [],
      },
      fst_o25: {
        total: 0,
        matches: [],
      },
      footsuper_o25: {
        total: 0,
        matches: [],
      },
      footsuper_btts: {
        total: 0,
        matches: [],
      },
      bettingtips_btts: {
        total: 0,
        matches: [],
      },
      prot_o25: {
        total: 0,
        matches: [],
      },
      r2bet_btts: {
        total: 0,
        matches: [],
      },
      goalnow_o25: {
        total: 0,
        matches: [],
      },
      accum_o25: {
        total: 0,
        matches: [],
      },
      wincomparator_btts: {
        total: 0,
        matches: [],
      },
      wincomparator_win: {
        total: 0,
        matches: [],
      },
      mybets_win: {
        total: 0,
        matches: [],
      },
      venasbet_win: {
        total: 0,
        matches: [],
      },
      prot_win: {
        total: 0,
        matches: [],
      },
      footy_win: {
        total: 0,
        matches: [],
      },
      betgenuine_win: {
        total: 0,
        matches: [],
      },
      vitibet_win: {
        total: 0,
        matches: [],
      },
      r2bet_win: {
        total: 0,
        matches: [],
      },
      mines_win: {
        total: 0,
        matches: [],
      },
      passion_win: {
        total: 0,
        matches: [],
      },
      fbp_win: {
        total: 0,
        matches: [],
      },
      footsuper_win: {
        total: 0,
        matches: [],
      },
      hello_win: {
        total: 0,
        matches: [],
      },
      bettingtips_win: {
        total: 0,
        matches: [],
      },
      date: todayString,
    },
    zeroCounter: {
      o25tip_win: {
        total: 1,
        matches: [],
      },
      bettingtips_o25: {
        total: 0,
        matches: [],
      },
      wincomparator_o25: {
        total: 0,
        matches: [],
      },
      accum_btts: {
        total: 0,
        matches: [],
      },
      fst_btts: {
        total: 0,
        matches: [],
      },
      r2bet_o25: {
        total: 0,
        matches: [],
      },
      hello_o25: {
        total: 0,
        matches: [],
      },
      fbp_o25: {
        total: 0,
        matches: [],
      },
      fst_o25: {
        total: 0,
        matches: [],
      },
      footsuper_o25: {
        total: 0,
        matches: [],
      },
      footsuper_btts: {
        total: 0,
        matches: [],
      },
      bettingtips_btts: {
        total: 0,
        matches: [],
      },
      prot_o25: {
        total: 0,
        matches: [],
      },
      r2bet_btts: {
        total: 0,
        matches: [],
      },
      goalnow_o25: {
        total: 0,
        matches: [],
      },
      accum_o25: {
        total: 0,
        matches: [],
      },
      wincomparator_btts: {
        total: 0,
        matches: [],
      },
      wincomparator_win: {
        total: 0,
        matches: [],
      },
      mybets_win: {
        total: 0,
        matches: [],
      },
      venasbet_win: {
        total: 0,
        matches: [],
      },
      prot_win: {
        total: 0,
        matches: [],
      },
      footy_win: {
        total: 0,
        matches: [],
      },
      betgenuine_win: {
        total: 0,
        matches: [],
      },
      vitibet_win: {
        total: 0,
        matches: [],
      },
      r2bet_win: {
        total: 0,
        matches: [],
      },
      mines_win: {
        total: 0,
        matches: [],
      },
      passion_win: {
        total: 0,
        matches: [],
      },
      fbp_win: {
        total: 0,
        matches: [],
      },
      footsuper_win: {
        total: 0,
        matches: [],
      },
      hello_win: {
        total: 0,
        matches: [],
      },
      bettingtips_win: {
        total: 0,
        matches: [],
      },
      date: todayString,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const pushMatches = (teams, source) => {
    console.log('teams', teams);
    dispatch({
      type: PUSH_MATCHES,
      payload: { teams: teams.split(','), source: source },
    });
  };
  const increment = (source) => {
    console.log('incrementO25');
    dispatch({ type: INCREMENT, payload: source });
  };

  const setCounterFromMongoYesterday = (ZeroCounter) => {
    console.log('ZeroCounter', ZeroCounter);
    dispatch({ type: SET_COUNTER_MONGO_YEST, payload: ZeroCounter });
  };
  const setCounterFromMongo = (ZeroCounter) => {
    console.log('ZeroCounter', ZeroCounter);
    dispatch({ type: SET_COUNTER_MONGO, payload: ZeroCounter });
  };
  const setBtts = (bttsArr) => {
    console.log('bttsArr', bttsArr);
    dispatch({ type: SET_BTTS, payload: bttsArr });
  };
  const setResultsTotal = (resultsArr) => {
    dispatch({ type: SET_RESULTS_TOTAL, payload: resultsArr });
  };

  return (
    <context.Provider
      value={{
        bttsArr: state.bttsArr,
        resultsArr: state.resultsArr,
        zeroCounterYesterday: state.zeroCounterYesterday,
        zeroCounter: state.zeroCounter,
        setBtts,
        // setZeroCounterDate,
        setResultsTotal,
        increment,
        pushMatches,
        setCounterFromMongo,
        setCounterFromMongoYesterday,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
