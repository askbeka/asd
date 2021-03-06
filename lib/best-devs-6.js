module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	var _github = __webpack_require__(1);

	var _github2 = _interopRequireDefault(_github);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	exports.default = (() => {
			var _ref = _asyncToGenerator(function* ({ city, language, top, username, password }) {

					try {

							let gh = new _github2.default();

							if (username && password) {
									gh.authenticate(username, password);
							}

							// get all Developers in city
							const devs = yield gh.getDevs(city, language);

							if (devs && devs.length) {

									yield Promise.all(devs.map((() => {
											var _ref2 = _asyncToGenerator(function* (dev) {

													const repos = yield gh.getRepos(dev);

													if (repos && repos.length) {

															const stars = repos.reduce(function (counter, { language: lang, stargazers_count: stars }) {
																	return lang && (0, _utils.isEqual)(lang, language) ? counter += stars : counter;
															}, 0);

															dev.stars = stars;
													}
											});

											return function (_x2) {
													return _ref2.apply(this, arguments);
											};
									})()));

									const rockStars = devs.sort(function (a, b) {
											return b.stars - a.stars;
									}).slice(0, top);

									rockStars.forEach(function ({ login, stars }) {
											return console.log(`Login: ${ login }, stars: ${ stars }`);
									});
							}
					} catch (err) {

							if (err.type === 'auth') {
									console.error('Seems like, request limit exceeded. please provide your username and password');
							} else {
									console.error(err.stack);
							}

							process.exit(1);
					}
			});

			return function (_x) {
					return _ref.apply(this, arguments);
			};
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _nodeFetch = __webpack_require__(2);

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	class Github {

		constructor() {
			this._base = 'https://api.github.com';
		}

		authenticate(username, password) {
			this._auth = (0, _utils.btoa)(`${ username }:${ password }`);
		}

		getDevs(city, language) {
			return this.getData(`${ this._base }/search/users?q=type:user+language:${ (0, _utils.lower)(language) }+location:${ (0, _utils.lower)(city) }`).then(data => data.items);
		}

		getData(url) {
			const headers = new _nodeFetch.Headers();
			if (this._auth) {
				headers.append('Authorization', `Basic ${ this._auth }`);
			}
			return (0, _nodeFetch2.default)(url, { headers }).then(res => {
				if (res.status === 200) return res.json();
				if (res.status === 401 || res.status === 403) {
					throw { type: 'auth' };
				} else {
					throw new Error(`Unable to fetch data. res:${ res.status }, ${ res.statusText }`);
				}
			});
		}

		getRepos(dev) {
			return this.getData(dev.repos_url);
		}

	}
	exports.default = Github;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("node-fetch");

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.isEqual = isEqual;
	exports.lower = lower;
	exports.btoa = btoa;
	function isEqual(a, b) {
		return lower(a) === lower(b);
	}

	function lower(text) {
		return text.toLowerCase();
	}

	function btoa(text) {
		return new Buffer(text).toString('base64');
	}

/***/ }
/******/ ]);