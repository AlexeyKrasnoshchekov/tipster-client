export const getResult = async (date) => {
  const bttsResults = await fetch(
    `http://localhost:8000/result/get/?date=${date}`
  );
  const bttsResultsJson = await bttsResults.json();
  return bttsResultsJson;
};
export const getZeroCounter = async (date) => {
  const bttsResults = await fetch(
    `http://localhost:8000/result/getZeroCounter/?date=${date}`
  );
  const zeroCounterJson = await bttsResults.json();
  return zeroCounterJson;
};
export const loadResult = async (date) => {
    const res = await fetch(`http://localhost:8000/result/load`);
    const text = await res.text();
    return text;
};
export const deleteResult = async (date) => {
    const res = await fetch(`http://localhost:8000/result/delete`);
    const text = await res.text();
    return text;
};

export const saveZeroCounter = async (data) => {
    console.log('dataPred111', data);
  const resp = await fetch(`http://localhost:8000/result/saveZeroCounter`, {
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

export const getResultTotal = async (date) => {
  const resultsTotal = await fetch(
    `http://localhost:8000/total/get/?date=${date}`
  );
  const resultsTotalJson = await resultsTotal.json();
  return resultsTotalJson;
};
export const saveResultTotal = async (date) => {
    const res = await fetch(`http://localhost:8000/total/save`);
    const text = await res.text();
    return text;
};