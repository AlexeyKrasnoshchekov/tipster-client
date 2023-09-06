export const getBtts = async (date) => {
  const bttsAllMongo = await fetch(
    `http://localhost:8000/btts/get/?date=${date}`
  );
  const bttsAllMongoJson = await bttsAllMongo.json();
  return bttsAllMongoJson;
};
export const loadBtts = async (date) => {
  const res = await fetch(`http://localhost:8000/btts/load`);
  const text = await res.text();
  return text;
};

export const saveBtts = async (data) => {
    console.log('dataPred111', data);
  const resp = await fetch(`http://localhost:8000/btts/save`, {
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
  const res = await fetch(`http://localhost:8000/btts/delete`);
  const text = await res.text();
  return text;
};

