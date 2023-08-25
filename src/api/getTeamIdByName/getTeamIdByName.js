const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'afdaf280fcmshfd84dc3e92fe9a9p188716jsn24baff0f9e8e',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

fetch('https://api-football-v1.p.rapidapi.com/v3/teams?name=ADO%20Den%20Haag', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));