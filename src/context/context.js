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
      fbp2_draw: {
        exist: false
      },
      betwizad_draw: {
        exist: false
      },
      predictz_draw: {
        exist: false
      },
      btfstats_draw: {
        exist: false
      },
      fcpredicts_draw: {
        exist: false
      },
      frog_draw: {
        exist: false
      },
      betgen_draw: {
        exist: false
      },
      eagle_draw: {
        exist: false
      },
      bettips1x2_draw: {
        exist: false
      },
      vitibet_draw: {
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
      fbp2_win: {
        exist: false
      },
      betwizad_win: {
        exist: false
      },
      predictz_win: {
        exist: false
      },
      btfstats_win: {
        exist: false
      },
      fcpredicts_win: {
        exist: false
      },
      frog_win: {
        exist: false
      },
      betgen_win: {
        exist: false
      },
      eagle_win: {
        exist: false
      },
      bettips1x2_win: {
        exist: false
      },
      vitibet_win: {
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
      fbp2_u25: {
        exist: false
      },
      betwizad_u25: {
        exist: false
      },
      predictz_u25: {
        exist: false
      },
      btfstats_u25: {
        exist: false
      },
      fcpredicts_u25: {
        exist: false
      },
      frog_u25: {
        exist: false
      },
      betgen_u25: {
        exist: false
      },
      eagle_u25: {
        exist: false
      },
      bettips1x2_u25: {
        exist: false
      },
      vitibet_u25: {
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
      fbp2_o25: {
        exist: false
      },
      betwizad_o25: {
        exist: false
      },
      predictz_o25: {
        exist: false
      },
      btfstats_o25: {
        exist: false
      },
      fcpredicts_o25: {
        exist: false
      },
      frog_o25: {
        exist: false
      },
      betgen_o25: {
        exist: false
      },
      eagle_o25: {
        exist: false
      },
      bettips1x2_o25: {
        exist: false
      },
      vitibet_o25: {
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
      fbp2_btts: {
        exist: false
      },
      betwizad_btts: {
        exist: false
      },
      predictz_btts: {
        exist: false
      },
      btfstats_btts: {
        exist: false
      },
      fcpredicts_btts: {
        exist: false
      },
      frog_btts: {
        exist: false
      },
      betgen_btts: {
        exist: false
      },
      eagle_btts: {
        exist: false
      },
      bettips1x2_btts: {
        exist: false
      },
      vitibet_btts: {
        exist: false
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
