/* eslint-disable default-case */
export const SET_BTTS = "SET_BTTS";
export const SET_RESULTS_TOTAL = "SET_RESULTS_TOTAL";
export const INCREMENT = "INCREMENT";
export const PUSH_MATCHES = "PUSH_MATCHES";
export const SET_COUNTER_MONGO = "SET_COUNTER_MONGO";
export const SET_BTTS_SOURCES = "SET_BTTS_SOURCES";
export const SET_O25_SOURCES = "SET_O25_SOURCES";
// export const SET_COUNTER_MONGO_YEST = "SET_COUNTER_MONGO_YEST";
// export const CALC = "CALC";
// export const SET_DATE = "SET_DATE";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_BTTS:
        console.log('action.payload', action.payload);
      return {
        ...state,
        bttsArr: action.payload,
      };
    case SET_BTTS_SOURCES:
        console.log('action.payload', action.payload);
      return {
        ...state,
        bttsSources: action.payload,
      };
    case SET_O25_SOURCES:
        console.log('action.payload', action.payload);
      return {
        ...state,
        o25Sources: action.payload,
      };
    case SET_RESULTS_TOTAL:
      return {
        ...state,
        resultsTotalArr: action.payload,
      };
    case SET_COUNTER_MONGO:
      return {
        ...state,
        zeroCounter: action.payload,
      };
    // case SET_COUNTER_MONGO_YEST:
    //   return {
    //     ...state,
    //     zeroCounterYesterday: action.payload,
    //   };
    // case SET_DATE:
    //   return {
    //     ...state,
    //     zeroCounter: {
    //       ...state.zeroCounter,
    //       date: action.payload,
    //     },
    //   };
    case INCREMENT:
      return {
        ...state,
        zeroCounter: {
          ...state.zeroCounter,
          [action.payload]: {
            ...state.zeroCounter[action.payload],
            total: state.zeroCounter[action.payload].total + 1
          },
        },
      };
    // case CALC:
    //   console.log('action.payload',action.payload)
    //   return {
    //     ...state,
    //     zeroCounter: {
    //       ...state.zeroCounter,
    //       [action.payload]: {
    //         ...state.zeroCounter[action.payload],
    //         total: state.zeroCounterYesterday[action.payload].total + state.zeroCounter[action.payload].total
    //       },
    //     },
    //   };

      
    case PUSH_MATCHES:
      console.log('action.payload',action.payload)
      return {
        ...state,
        zeroCounter: {
          ...state.zeroCounter,
          [action.payload.source]: {
            ...state.zeroCounter[action.payload.source],
            matches: [...state.zeroCounter[action.payload.source].matches, ...action.payload.teams]
            // matches: state.zeroCounter.o25tip.matches.length !==0 ? [...state.zeroCounter.o25tip.matches, ...action.payload] : [...action.payload]
          },
        },
      };
    
  }
};
