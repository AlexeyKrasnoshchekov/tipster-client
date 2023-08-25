export const deleteResultsTotalMongo = async (homeTeam) => {
    const res = await fetch(`http://localhost:8000/deleteResultsTotalMongo/?homeTeam=${homeTeam}`);
    if(res.ok) {
      return res.json()
    }
    return res.text().then(text => {throw new Error(text)})
  }