export const getUnder25Mongo = async (date) => {
    const under25AllMongo = await fetch(`http://localhost:8000/getUnder25Mongo/?date=${date}`);
    const under25AllMongoJson = await under25AllMongo.json();
    // console.log('bttsAllMongoJson', bttsAllMongoJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return under25AllMongoJson;
  }