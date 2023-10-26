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
  // SET_COUNTER_MONGO_YEST,
  // CALC
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
    drawSources: {
      banker_draw: {
        exist: false
      },
      trustpredict_draw: {
        exist: false
      },
      fbp_draw: {
        exist: false
      },
      soccertipz_draw: {
        exist: false
      },
      hello_draw: {
        exist: false
      },
      mybets_draw: {
        exist: false
      },
      passion_draw: {
        exist: false
      },
      r2bet_draw: {
        exist: false
      },
      venas_draw: {
        exist: false
      },
      prot_draw: {
        exist: false
      },
      betimate_draw: {
        exist: false
      },
      vitibet_draw: {
        exist: false
      },
      fbpai_draw: {
        exist: false
      },
      footsuper_draw: {
        exist: false
      },
      mines_draw: {
        exist: false
      },
      bettingtips_draw: {
        exist: false
      },
      victorspredict_draw: {
        exist: false
      },
      soccerpunt_draw: {
        exist: false
      },
    },
    winSources: {
      passion_win: {
        exist: false
      },
      predutd_win: {
        exist: false
      },
      banker_win: {
        exist: false
      },
      soccertipz_win: {
        exist: false
      },
      kcpredict_win: {
        exist: false
      },
      trustpredict_win: {
        exist: false
      },
      footsuper_win: {
        exist: false
      },
      o25tip_win: {
        exist: false
      },
      vitibet_win: {
        exist: false
      },
      footy_win: {
        exist: false
      },
      prot_win: {
        exist: false
      },
      venas_win: {
        exist: false
      },
      r2bet_win: {
        exist: false
      },
      hello_win: {
        exist: false
      },
      betimate_win: {
        exist: false
      },
      mybets_win: {
        exist: false
      },
      mines_win: {
        exist: false
      },
      fbp_win: {
        exist: false
      },
      wincomparator_win: {
        exist: false
      },
      betclan_win: {
        exist: false
      },
      bettingtips_acc_win: {
        exist: false
      },
      bettingtips_win: {
        exist: false
      },
      bigfree_win: {
        exist: false
      },
      fbp365_win: {
        exist: false
      },
      kingspredict_win: {
        exist: false
      },
      victorspredict_win: {
        exist: false
      },
      soccerpunt_win: {
        exist: false
      },
      wininbets_win: {
        exist: false
      },
    },
    u25Sources: {
      goalsnow_u25: {
        exist: false
      },
      predutd_u25: {
        exist: false
      },
      venas_u25: {
        exist: false
      },
      soccertipz_u25: {
        exist: false
      },
      vitibet_u25: {
        exist: false
      },
      r2bet_u25: {
        exist: false
      },
      betprotips_u25: {
        exist: false
      },
      betimate_u25: {
        exist: false
      },
      mybets_u25: {
        exist: false
      },
      fbpai_u25: {
        exist: false
      },
      footsuper_u25: {
        exist: false
      },
      mines_u25: {
        exist: false
      },
      wincomparator_u25: {
        exist: false
      },
      betclan_u25: {
        exist: false
      },
      passion_u25: {
        exist: false
      },
      bettingtips_u25: {
        exist: false
      },
      fbp_acc_u25: {
        exist: false
      },
      fbp_u25: {
        exist: false
      },
      bigfree_u25: {
        exist: false
      },
      soccerpunt_u25: {
        exist: false
      },
      wininbets_u25: {
        exist: false
      },
    },
    o25Sources: {
      goalnow_o25: {
        exist: false
      },
      predutd_o25: {
        exist: false
      },
      prot_o25: {
        exist: false
      },
      fbp_acc_o25: {
        exist: false
      },
      r2bet_o25: {
        exist: false
      },
      hello_o25: {
        exist: false
      },
      o25tip: {
        exist: false
      },
      footsuper_o25: {
        exist: false
      },
      footsuper_acc_o25: {
        exist: false
      },
      banker_o25: {
        exist: false
      },
      vitibet_o25: {
        exist: false
      },
      venas_o25: {
        exist: false
      },
      footy_o25: {
        exist: false
      },
      betprotips_o25: {
        exist: false
      },
      kcpredict_o25: {
        exist: false
      },
      trustpredict_o25: {
        exist: false
      },
      betimate_o25: {
        exist: false
      },
      morph_o25: {
        exist: false
      },
      wdw_o25: {
        exist: false
      },
      accum_o25: {
        exist: false
      },
      mines_acc_o25: {
        exist: false
      },
      // betshoot_o25: {
      //   exist: false
      // },
      betclan_o25: {
        exist: false
      },
      wincomparator_o25: {
        exist: false
      },
      bettingtips_acc_o25: {
        exist: false
      },
      passion_o25: {
        exist: false
      },
      bettingtips_o25: {
        exist: false
      },
      fbp_o25: {
        exist: false
      },
      fst_o25: {
        exist: false
      },
      fbp365_o25: {
        exist: false
      },
      bigfree_o25: {
        exist: false
      },
      kingspredict_o25: {
        exist: false
      },
      kingspredict_acc_o25: {
        exist: false
      },
      victorspredict_o25: {
        exist: false
      },
      soccerpunt_o25: {
        exist: false
      },
      wininbets_o25: {
        exist: false
      },
    },
    bttsSources: {
      fbp_acc_btts: {
        exist: false
      },
      kingspredict_btts: {
        exist: false
      },
      footsuper_btts: {
        exist: false
      },
      footsuper_acc_btts: {
        exist: false
      },
      r2bet_btts: {
        exist: false
      },
      footy_btts: {
        exist: false
      },
      predutd_btts: {
        exist: false
      },
      mighty_btts: {
        exist: false
      },
      betimate_btts: {
        exist: false
      },
      kcpredict_btts: {
        exist: false
      },
      trustpredict_btts: {
        exist: false
      },
      accum_btts: {
        exist: false
      },
      banker_btts: {
        exist: false
      },
      venas_btts: {
        exist: false
      },
      goalsnow_btts: {
        exist: false
      },
      prot_btts: {
        exist: false
      },
      // betshoot_btts: {
      //   exist: false
      // },
      betclan_btts: {
        exist: false
      },
      wincomparator_btts: {
        exist: false
      },
      bettingtips_acc_btts: {
        exist: false
      },
      betprotips_btts: {
        exist: false
      },
      vitibet_btts: {
        exist: false
      },
      passion_btts: {
        exist: false
      },
      bettingtips_btts: {
        exist: false
      },
      fbp365_btts: {
        exist: false
      },
      bigfree_btts: {
        exist: false
      },
      fst_btts: {
        exist: false
      },
      hello_btts: {
        exist: false
      },
      victorspredict_btts: {
        exist: false
      },
      soccerpunt_btts: {
        exist: false
      },
      wininbets_btts: {
        exist: false
      },
      
    },
    zeroCounter: {
      // o25tip_win: {
      //   total: 0,
      //   matches: [],
      // },
      o25tip_high: {
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
      prot_btts: {
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
      // wincomparator_win: {
      //   total: 0,
      //   matches: [],
      // },
      // mybets_win: {
      //   total: 0,
      //   matches: [],
      // },
      // venasbet_win: {
      //   total: 0,
      //   matches: [],
      // },
      venas_o25: {
        total: 0,
        matches: [],
      },
      venas_btts: {
        total: 0,
        matches: [],
      },
      // prot_win: {
      //   total: 0,
      //   matches: [],
      // },
      // footy_win: {
      //   total: 0,
      //   matches: [],
      // },
      // betgenuine_win: {
      //   total: 0,
      //   matches: [],
      // },
      // vitibet_win: {
      //   total: 0,
      //   matches: [],
      // },
      vitibet_o25: {
        total: 0,
        matches: [],
      },
      // r2bet_win: {
      //   total: 0,
      //   matches: [],
      // },
      // mines_win: {
      //   total: 0,
      //   matches: [],
      // },
      // passion_win: {
      //   total: 0,
      //   matches: [],
      // },
      // fbp_win: {
      //   total: 0,
      //   matches: [],
      // },
      // footsuper_win: {
      //   total: 0,
      //   matches: [],
      // },
      // hello_win: {
      //   total: 0,
      //   matches: [],
      // },
      // bettingtips_win: {
      //   total: 0,
      //   matches: [],
      // },
      morph_o25: {
        total: 0,
        matches: [],
      },
      kcpredict_o25: {
        total: 0,
        matches: [],
      },
      kcpredict_btts: {
        total: 0,
        matches: [],
      },
      trustpredict_btts: {
        total: 0,
        matches: [],
      },
      trustpredict_o25: {
        total: 0,
        matches: [],
      },
      fbp_btts: {
        total: 0,
        matches: [],
      },
      fbp_acc_btts: {
        total: 0,
        matches: [],
      },
      fbp_acc_o25: {
        total: 0,
        matches: [],
      },
      mines_acc_o25: {
        total: 0,
        matches: [],
      },
      mines_o25: {
        total: 0,
        matches: [],
      },
      mines_btts: {
        total: 0,
        matches: [],
      },
      banker_btts: {
        total: 0,
        matches: [],
      },
      banker_o25: {
        total: 0,
        matches: [],
      },
      fbpai_btts: {
        total: 0,
        matches: [],
      },
      fbpai_o25: {
        total: 0,
        matches: [],
      },
      predutd_o25: {
        total: 0,
        matches: [],
      },
      footsuper_acc_btts: {
        total: 0,
        matches: [],
      },
      footsuper_acc_o25: {
        total: 0,
        matches: [],
      },
      soccertipz_o25: {
        total: 0,
        matches: [],
      },
      soccertipz_btts: {
        total: 0,
        matches: [],
      },
      wdw_acc_btts: {
        total: 0,
        matches: [],
      },
      wdw_acc_o25: {
        total: 0,
        matches: [],
      },
      mighty_btts: {
        total: 0,
        matches: [],
      },
      passion_o25: {
        total: 0,
        matches: [],
      },
      betimate: {
        total: 0,
        matches: [],
      },
      betprotips: {
        total: 0,
        matches: [],
      },
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
  // const calcTotal = () => {
  //   console.log('calcTotal');
  //   Object.keys(state.zeroCounter).forEach(key => {
  //     key !== '_id' && key !== 'date' && state.zeroCounter[key] && dispatch({ type: CALC, payload: key });
  //   })
    
  // };

  // const setCounterFromMongoYesterday = (ZeroCounter) => {
  //   console.log('ZeroCounter', ZeroCounter);
  //   dispatch({ type: SET_COUNTER_MONGO_YEST, payload: ZeroCounter });
  // };
  const setCounterFromMongo = (ZeroCounter) => {
    console.log('ZeroCounter', ZeroCounter);
    dispatch({ type: SET_COUNTER_MONGO, payload: ZeroCounter });
  };
  const setBtts = (bttsArr) => {
    console.log('bttsArr', bttsArr);
    dispatch({ type: SET_BTTS, payload: bttsArr });
  };
  const setBttsSources = (bttsSources) => {
    console.log('bttsSources', bttsSources);
    dispatch({ type: SET_BTTS, payload: bttsSources });
  };
  const setO25Sources = (o25Sources) => {
    console.log('o25Sources', o25Sources);
    dispatch({ type: SET_BTTS, payload: o25Sources });
  };
  const setResultsTotal = (resultsArr) => {
    dispatch({ type: SET_RESULTS_TOTAL, payload: resultsArr });
  };

  return (
    <context.Provider
      value={{
        bttsArr: state.bttsArr,
        resultsArr: state.resultsArr,
        // zeroCounterYesterday: state.zeroCounterYesterday,
        zeroCounter: state.zeroCounter,
        bttsSources: state.bttsSources,
        o25Sources: state.o25Sources,
        u25Sources: state.u25Sources,
        winSources: state.winSources,
        drawSources: state.drawSources,
        setBtts,
        // setZeroCounterDate,
        setResultsTotal,
        increment,
        pushMatches,
        setCounterFromMongo,
        setBttsSources,
        setO25Sources
        // setCounterFromMongoYesterday,
        // calcTotal
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
