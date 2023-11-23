
//UNDER

export const getUnderDailyTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/dailyTotals/getUnderDailyStat/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Under Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveUnderDailyTotal = async (data) => {
  console.log('data333', data);
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/dailyTotals/saveUnderDailyStat`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

export const updateUnderDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/updateUnderProd`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

//BTTS

export const getBttsDailyTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/dailyTotals/getBttsDailyStat/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Btts Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveBttsDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/dailyTotals/saveBttsDailyStat`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

export const updateBttsDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/updateBttsProd`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

//OVER

export const getOverDailyTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/dailyTotals/getOverDailyStat/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Over Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveOverDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/dailyTotals/saveOverDailyStat`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

export const updateOverDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/updateOverProd`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

//WIN

export const getWinDailyTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/dailyTotals/getWinDailyStat/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Win Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveWinDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/dailyTotals/saveWinDailyStat`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

export const updateWinDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/updateWinProd`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};
//DRAW

export const getDrawDailyTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/dailyTotals/getDrawDailyStat/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Draw Daily Total',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveDrawDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/dailyTotals/saveDrawDailyStat`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};

export const updateDrawDailyTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/updateDrawProd`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status === 200) {
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
};


