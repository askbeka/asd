import fetch, {Headers} from 'node-fetch';
import {btoa, lower} from './utils';

export default class Github {
	
	constructor() {
		this._base = 'https://api.github.com';
	}

	authenticate(username, password) {
		this._auth = btoa(`${username}:${password}`);
	}

	getDevs(city, language) {
		return this.getData(`${this._base}/search/users?q=type:user+language:${lower(language)}+location:${lower(city)}`).then(data => data.items);
	}

	getData(url) {
		const headers = new Headers();
		if (this._auth) {
			headers.append('Authorization', `Basic ${this._auth}`);
		}
		return fetch(url, {headers}).then(res => {
			if (res.status === 200) return res.json();
			if (res.status === 401 || res.status === 403) {
				throw {type: 'auth'};
			} else {
				throw new Error(`Unable to fetch data. res:${res.status}, ${res.statusText}`)
			}
		})	
	}

	getRepos(dev) {
		return this.getData(dev.repos_url)
	}

}