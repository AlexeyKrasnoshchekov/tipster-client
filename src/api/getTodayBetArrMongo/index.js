export const getTodayBetArrMongo = async (date) => {
    const todayBetArrMongo = await fetch(`http://localhost:8000/getTodayBetArrMongo/?date=${date}`);
    const todayBetArrMongoJson = await todayBetArrMongo.json();
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return todayBetArrMongoJson;
  }