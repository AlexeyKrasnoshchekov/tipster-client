export const getDraw = async (date) => {
  const draws = await fetch(
    // `https://tipster-server.vercel.app/under/get/?date=${date}`
    `http://localhost:8000/draw/get/?date=${date}`
  );
  const drawsMongoJson = await draws.json();
  return drawsMongoJson;
};

export const loadDraw = async () => {
  // const res = await fetch(`https://tipster-server.vercel.app/under/load`);
  const res = await fetch(`http://localhost:8000/draw/load`);
  const text = await res.text();
  return text;
};
export const loadDrawWithVpn = async () => {
  // const res = await fetch(`https://tipster-server.vercel.app/under/load`);
  const res = await fetch(`http://localhost:8000/draw/loadWithVpn`);
  const text = await res.text();
  return text;
};

export const saveDraw = async (data) => {
  // const resp = await fetch(`https://tipster-server.vercel.app/under/save`, {
  const resp = await fetch(`http://localhost:8000/draw/save`, {
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

export const deleteDraw = async (date) => {
  // const res = await fetch(`https://tipster-server.vercel.app/under/delete/?date=${date}`);
  const res = await fetch(`http://localhost:8000/draw/delete/?date=${date}`);
  const text = await res.text();
  return text;
};
