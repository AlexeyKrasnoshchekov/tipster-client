export const getAccasMongo = async (date) => {
    const bttsAccas = await fetch(`http://localhost:8000/getAccasMongo/?date=${date}`);
    const bttsAccasJson = await bttsAccas.json();
    console.log('bttsAccasJson', bttsAccasJson);
    // console.log('fstBttsJson', fstBttsJson);
    // console.log('accumBttsJson', accumBttsJson);
    return bttsAccasJson;
  }