export const getWinData = async (date) => {
  const winDataMongo = await fetch(
    `https://tipster-server.vercel.app/win/get/?date=${date}`
  );
  const winDataMongoJson = await winDataMongo.json();
  return winDataMongoJson;
};

export const saveWinData = async (data) => {
  const resp = await fetch(`https://tipster-server.vercel.app/win/save`, {
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

export const loadWin = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/win/load`);
  const text = await res.text();
  return text;
};

export const deleteWin = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/win/delete`);
  const text = await res.text();
  return text;
};
