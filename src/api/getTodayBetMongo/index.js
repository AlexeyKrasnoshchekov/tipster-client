export const getTodayBetMongo = async (date) => {
    const todayBetMongo = await fetch(`http://localhost:8000/getTodayBetMongo/?date=${date}`);
    const todayBetMongoJson = await todayBetMongo.json();
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return todayBetMongoJson;
  }