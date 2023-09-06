export const getBtts = async (date) => {
  const bttsAllMongo = await fetch(
    `https://tipster-server.vercel.app/btts/get/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  return bttsAllMongoJson;
};
export const loadBtts = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/btts/load`);
  const text = await res.text();
  return text;
};

export const saveBtts = async (data) => {
    console.log('dataPred111', data);
  const resp = await fetch(`https://tipster-server.vercel.app/btts/save`, {
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

export const deleteBtts = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/btts/delete`);
  const text = await res.text();
  return text;
};

