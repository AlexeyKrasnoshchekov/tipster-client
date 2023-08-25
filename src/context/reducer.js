/* eslint-disable default-case */
export const SET_BTTS = "SET_BTTS";
export const SET_RESULTS_TOTAL = "SET_RESULTS_TOTAL";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_BTTS:
        console.log('action.payload', action.payload);
      return {
        ...state,
        bttsArr: action.payload,
      };
    case SET_RESULTS_TOTAL:
      return {
        ...state,
        resultsTotalArr: action.payload,
      };
    
  }
};