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

	exports.default = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref2) {
					var city = _ref2.city,
					    language = _ref2.language,
					    top = _ref2.top,
					    username = _ref2.username,
					    password = _ref2.password;
					return regeneratorRuntime.wrap(function _callee3$(_context3) {
							while (1) {
									switch (_context3.prev = _context3.next) {
											case 0:
													_context3.prev = 0;
													return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
															var gh, devs, rockStars;
															return regeneratorRuntime.wrap(function _callee2$(_context2) {
																	while (1) {
																			switch (_context2.prev = _context2.next) {
																					case 0:
																							gh = new _github2.default();


																							if (username && password) {
																									gh.authenticate(username, password);
																							}

																							// get all Developers in city
																							_context2.next = 4;
																							return gh.getDevs(city, language);

																					case 4:
																							devs = _context2.sent;

																							if (!(devs && devs.length)) {
																									_context2.next = 10;
																									break;
																							}

																							_context2.next = 8;
																							return Promise.all(devs.map(function () {
																									var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dev) {
																											var repos, stars;
																											return regeneratorRuntime.wrap(function _callee$(_context) {
																													while (1) {
																															switch (_context.prev = _context.next) {
																																	case 0:
																																			_context.next = 2;
																																			return gh.getRepos(dev);

																																	case 2:
																																			repos = _context.sent;


																																			if (repos && repos.length) {
																																					stars = repos.reduce(function (counter, _ref4) {
																																							var lang = _ref4.language,
																																							    stars = _ref4.stargazers_count;
																																							return lang && (0, _utils.isEqual)(lang, language) ? counter += stars : counter;
																																					}, 0);


																																					dev.stars = stars;
																																			}

																																	case 4:
																																	case 'end':
																																			return _context.stop();
																															}
																													}
																											}, _callee, undefined);
																									}));

																									return function (_x2) {
																											return _ref3.apply(this, arguments);
																									};
																							}()));

																					case 8:
																							rockStars = devs.sort(function (a, b) {
																									return b.stars - a.stars;
																							}).slice(0, top);


																							rockStars.forEach(function (_ref5) {
																									var login = _ref5.login,
																									    stars = _ref5.stars;
																									return console.log('Login: ' + login + ', stars: ' + stars);
																							});

																					case 10:
																					case 'end':
																							return _context2.stop();
																			}
																	}
															}, _callee2, undefined);
													})(), 't0', 2);

											case 2:
													_context3.next = 8;
													break;

											case 4:
													_context3.prev = 4;
													_context3.t1 = _context3['catch'](0);


													if (_context3.t1.type === 'auth') {
															console.error('Seems like, request limit exceeded. please provide your username and password');
													} else {
															console.error(_context3.t1.stack);
													}

													process.exit(1);

											case 8:
											case 'end':
													return _context3.stop();
									}
							}
					}, _callee3, undefined, [[0, 4]]);
			}));

			return function (_x) {
					return _ref.apply(this, arguments);
			};
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeFetch = __webpack_require__(2);

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Github = function () {
		function Github() {
			_classCallCheck(this, Github);

			this._base = 'https://api.github.com';
		}

		_createClass(Github, [{
			key: 'authenticate',
			value: function authenticate(username, password) {
				this._auth = (0, _utils.btoa)(username + ':' + password);
			}
		}, {
			key: 'getDevs',
			value: function getDevs(city, language) {
				return this.getData(this._base + '/search/users?q=type:user+language:' + (0, _utils.lower)(language) + '+location:' + (0, _utils.lower)(city)).then(function (data) {
					return data.items;
				});
			}
		}, {
			key: 'getData',
			value: function getData(url) {
				var headers = new _nodeFetch.Headers();
				if (this._auth) {
					headers.append('Authorization', 'Basic ' + this._auth);
				}
				return (0, _nodeFetch2.default)(url, { headers: headers }).then(function (res) {
					if (res.status === 200) return res.json();
					if (res.status === 401 || res.status === 403) {
						throw { type: 'auth' };
					} else {
						throw new Error('Unable to fetch data. res:' + res.status + ', ' + res.statusText);
					}
				});
			}
		}, {
			key: 'getRepos',
			value: function getRepos(dev) {
				return this.getData(dev.repos_url);
			}
		}]);

		return Github;
	}();

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