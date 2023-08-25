export const saveTodayBetArr = async (data) => {
  console.log('ffggg', data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({ title: 'Fetch POST Request Example' }),
    body: JSON.stringify({data: data})
  };
  await fetch('http://localhost:8000/saveTodayBetArrMongo', requestOptions);

};
