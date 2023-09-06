export const getUnder = async (date) => {
  const under25AllMongo = await fetch(
    `http://localhost:8000/under/get/?date=${date}`
  );
  const under25AllMongoJson = await under25AllMongo.json();
  return under25AllMongoJson;
};

export const loadUnder = async (date) => {
  const res = await fetch(`http://localhost:8000/under/load`);
  const text = await res.text();
  return text;
};

export const saveUnder = async (data) => {
  const resp = await fetch(`http://localhost:8000/under/save`, {
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

export const deleteUnder = async (date) => {
  const res = await fetch(`http://localhost:8000/under/delete`);
  const text = await res.text();
  return text;
};