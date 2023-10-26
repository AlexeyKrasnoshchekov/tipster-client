
//UNDER

export const getUnderProd = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/prod/getUnderProd/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  console.log('Under Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveUnderProd = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/saveUnderProd`, {
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

export const updateUnderProd = async (data) => {
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

export const getBttsProd = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/prod/getBttsProd/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  console.log('Btts Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveBttsProd = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/saveBttsProd`, {
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

export const updateBttsProd = async (data) => {
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

export const getOverProd = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/prod/getOverProd/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  console.log('Over Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveOverProd = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/saveOverProd`, {
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

export const updateOverProd = async (data) => {
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

export const getWinProd = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/prod/getWinProd/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  console.log('Win Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveWinProd = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/saveWinProd`, {
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

export const updateWinProd = async (data) => {
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

export const getDrawProd = async (date) => {
  const bttsAllMongo = await fetch(
    // `https://tipster-server.vercel.app/btts/get/?date=${date}`
    `http://localhost:8000/prod/getDrawProd/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  console.log('Draw Prod',bttsAllMongoJson)
  return bttsAllMongoJson;
};

export const saveDrawProd = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/prod/saveDrawProd`, {
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

export const updateDrawProd = async (data) => {
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


