export const saveTodayBetMongo = async (data) => {
  const resp = await fetch(`http://localhost:8000/saveTodayBetMongo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('fstBttsJson', fstBttsJson);
  // console.log('accumBttsJson', accumBttsJson);

  if (resp.status === 200) {
    alert('Ставка сохранена');
  } else {
    alert('Ошибка при сохранении ставки');
  }
  
};
