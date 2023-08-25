export const saveBttsMongo = async (data) => {
  console.log('data888', data);

  const resp = await fetch(`http://localhost:8000/saveBttsMongo`, {
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
    return 'success';
  } else {
    return 'error';
    // alert('Ошибка при сохранении Pred');
  }
  
};
