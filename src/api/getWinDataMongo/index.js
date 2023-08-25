export const getWinDataMongo = async (date) => {
    const winDataMongo = await fetch(`http://localhost:8000/getWinDataMongo/?date=${date}`);
    const winDataMongoJson = await winDataMongo.json();
    console.log('winDataMongoJson', winDataMongoJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return winDataMongoJson;
  }