
//UNDER

export const getUnderStatTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/statTotals/getUnderStatTotal/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Under Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveUnderStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/saveUnderStatTotal`, {
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

export const updateUnderStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/updateUnderStatTotal`, {
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

export const getBttStatTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/statTotals/getBttsStatTotal/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Btts Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveBttsStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/saveBttsStatTotal`, {
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

export const updateBttsStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/updateBttsStatTotal`, {
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

export const getOverStatTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/statTotals/getOverStatTotal/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Over Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveOverStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/saveOverStatTotal`, {
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

export const updateOverStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/updateOverProd`, {
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

export const getWinStatTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/statTotals/getWinStatTotal/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Win Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveWinStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/saveWinStatTotal`, {
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

export const updateWinStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/updateWinStatTotal`, {
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

export const getDrawStatTotal = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/statTotals/getDrawStatTotal/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('Draw Daily Total',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveDrawStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/saveDrawStatTotal`, {
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

export const updateDrawStatTotal = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/statTotals/updateDrawStatTotal`, {
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


