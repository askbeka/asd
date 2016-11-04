import Github from './github';
import {isEqual} from './utils';

export default async ({city, language, top, username, password}) => {
  
  try {
	
		let gh = new Github(); 

		if (username && password) {
			gh.authenticate(username, password);
		}

		// get all Developers in city
		const devs = await gh.getDevs(city, language);

		if (devs && devs.length) {
	  	
		  await Promise.all(devs.map(async (dev) => {
		  
		    const repos = await gh.getRepos(dev);
		    
		    if (repos && repos.length) {

			    const stars = repos.reduce((counter, {language: lang, stargazers_count : stars}) => (

			    	lang && isEqual(lang, language) ? counter += stars : counter
			    
			  	), 0);

				  dev.stars = stars || 0;
				}

			}));

			const rockStars = devs.sort((a, b) => b.stars - a.stars).slice(0, top);

			rockStars.forEach(({login, stars}) => console.log(`Login: ${login}, stars: ${stars}`));
			
		} else {
			console.log(`No ${language} devs in ${city}.`);
		}

  } catch (err) {
  	
  	if (err.type === 'auth') {
  		console.error('Seems like, request limit exceeded. please provide your username and password');	
  	} else {
    	console.error(err.stack);
  	}

    process.exit(1);

  }
}