import { useReducer } from 'react';
import { createContext } from 'react';
import reducer from './reducer';
import { SET_BTTS, SET_RESULTS_TOTAL } from './reducer';
export const context = createContext();

const State = (props) => {
  const initialState = {
    bttsArr: [],
    resultsTotalArr: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setBtts = (bttsArr) => {
    console.log('bttsArr', bttsArr);
    dispatch({ type: SET_BTTS, payload: bttsArr });
  };
  const setResultsTotal = (resultsArr) => {
    dispatch({ type: SET_RESULTS_TOTAL, payload: resultsArr });
  };


//   const clearSavedTracks = () => dispatch({ type: CLEAR_SAVED_TRACKS });

  return (
    <context.Provider
      value={{
        bttsArr: state.bttsArr,
        resultsArr: state.resultsArr,
        setBtts,
        setResultsTotal
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;