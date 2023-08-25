export const saveStatMongo = async (data) => {
  await fetch(`http://localhost:8000/saveStatMongo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // const bttsAllMongoJson = await bttsAllMongo.json();
  // console.log('bttsAllMongoJson', bttsAllMongoJson);
  // console.log('fstBttsJson', fstBttsJson);
  // console.log('accumBttsJson', accumBttsJson);
  // return bttsAllMongoJson;
};
