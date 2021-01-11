export default class APIs {
	static #BASE_URL = "/api";

	static concreteSearchResultsUrl(query){
		return this.#BASE_URL + '?search=' + query;
	}
}
