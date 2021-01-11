import HttpClient from './../services/HttpClient.js';
import APIs from './../services/config';


class Searcher extends HttpClient {
	getSearchResult(query){
		return new Promise((resolve, reject) => {
			this.get({
				url : APIs.concreteSearchResultsUrl(query),
				success : data =>{
					resolve(data);
				},
				failure : err => {
					reject(err);
				}
			})
		})
		
	}
}

export default Searcher;