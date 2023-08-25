// import nc from 'next-connect';
// import Btts from '../../../schema/Btts';
// import db from '../../../utils/db';

// const handler = nc();

// let bttsArr = [];

// export const getRestaurants = async () => {
//   const response = await fetch(`${API_ENDPOINT}/restaurants`);
//   const restaurants = await response.json();

//   return restaurants;
// };

export const getBtts = async () => {
  // let fbpBtts = await fetch('http://localhost:8000/getFbpBtts');
  // let fstBtts = await fetch('http://localhost:8000/getFstBtts');
  // let accumBtts = await fetch('http://localhost:8000/getAccumBtts');
  // const fbpBttsJson = await fbpBtts.json();
  // const fstBttsJson = await fstBtts.json();
  // const accumBttsJson = await accumBtts.json();
  // let fstBtts = await fetch('http://localhost:8000/getFstBtts');
  // let accumBtts = await fetch('http://localhost:8000/getAccumBtts');

  // const bttsAll = [...fbpBttsJson, ...fstBttsJson, ...accumBttsJson];

  try {
    const bttsAll = await fetch('http://localhost:8000/getBtts');
    
    const allBttsJson = await bttsAll.json();
    console.log('allBttsJson', allBttsJson);
    return allBttsJson;
  } catch (error) {
    // TypeError: Failed to fetch
    console.log('There was an error', error);
  }
  
  
  // console.log('bttsAll', bttsAll);
  // console.log('fstBttsJson', fstBttsJson);
  // console.log('accumBttsJson', accumBttsJson);
  
}

// handler.get(async (req, res) => {
//   let bttsArr = await getBtts();
  
//   await db.connect();
//   await Btts.insertMany(bttsArr);
//   await db.disconnect();
//   res.send(bttsArr);
// });

// export default handler;
