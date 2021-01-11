export default class HttpClient {
	get(options){
		const {url, success, failure} = options;
		return fetch(url)
			.then(response => response.json())
			.then( data => { 
				success(data);
			})
			.catch( err => {
				failure(err);
			});
	}
}