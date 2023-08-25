export const getResultsTotalMongo = async (date) => {
    const resultsTotal = await fetch(`http://localhost:8000/getResultsTotalMongo/?date=${date}`);
    const resultsTotalJson = await resultsTotal.json();
    // console.log('bttsAll', bttsAll);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return resultsTotalJson;
  }