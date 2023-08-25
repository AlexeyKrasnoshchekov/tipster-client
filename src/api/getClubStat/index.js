export const getClubStat = async (club) => {
  console.log('club', club);
    const clubStat = await fetch(`http://localhost:8000/getFootyClubStat/?club=${club}`);
    const clubStatJson = await clubStat.json();
    console.log('clubStatJson', clubStatJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return clubStatJson;
  }