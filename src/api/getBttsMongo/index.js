export const getBttsMongo = async (date) => {
    const bttsAllMongo = await fetch(`http://localhost:8000/getBttsMongo/?date=${date}`);
    const bttsAllMongoJson = await bttsAllMongo.json();
    console.log('bttsAllMongoJson', bttsAllMongoJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return bttsAllMongoJson;
  }