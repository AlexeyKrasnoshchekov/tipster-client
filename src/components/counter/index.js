import React, { useContext } from 'react';
import { context } from '../../context/context';

function Counter({
  title,
  total,
  increment,
  matches,
  setMatches,
  saveMatches,
}) {
  const { zeroCounterYesterday, zeroCounter } = useContext(context);

  return (
    <>
      {zeroCounterYesterday && zeroCounter && zeroCounterYesterday[title] && zeroCounter[title] &&
        <div className="counter">
          <span class="counter_title">{title}</span>
          <span class="counter_prev">{`Prev: ${zeroCounterYesterday[title].total}`}</span>

          <span class="counter_today">
            Today zero(s): {zeroCounter[title].total}
          </span>
          {/* <button onClick={decrement}> - </button>
            <button onClick={reset}> Reset </button> */}
          <button onClick={() => increment(title)}> + </button>
          <input
            type="text"
            // value={matches}
            placeholder="home team of 0 - 0"
            onChange={(e) => setMatches(e.target.value)}
            // style={{marginRight: '2%'}}
          />

          <button
            onClick={(e) => saveMatches(e, title)}
            class="button"
            type="button"
          >
            Save matches
          </button>

          <span class="counter_matchesList">
            {zeroCounter[title].matches &&
              zeroCounter[title].matches.length !== 0 && (
                <span>
                  {zeroCounter[title].matches.map((match) => {
                    return <span key={match}>{match}</span>;
                  })}
                </span>
              )}
          </span>
        </div>
      }
    </>
  );
}

export default Counter;
