export const getResultsMongo = async (date) => {
    const bttsResults = await fetch(`http://localhost:8000/getResultsMongo/?date=${date}`);
    const bttsResultsJson = await bttsResults.json();
    console.log('bttsResultsJson', bttsResultsJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return bttsResultsJson;
  }