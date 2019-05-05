import config from './config.js';

const apiKey = config.apiKey;
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`;

const URLCountries = 'https://restcountries.eu/rest/v2/all';

/*export default function getArtists(country) {
	const url = URL.replace(":country", country);

	return fetch(url).then(function(resp) {
		return resp.json();
		
	}).then(function(json) {
		return json.topartists.artist;
	})
}*/

function getArtists(country) {
	const url = URL.replace(":country", country);

	return fetch(url).then(function(resp) {
		return resp.json();
		
	}).then(function(json) {
		return json.topartists.artist;
	})
}

function getCountries() {
	return fetch(URLCountries).then(function(resp){
		return resp.json();
	}).then(function(json){
		return json;
	})
}

export {
	getArtists,
	getCountries
}