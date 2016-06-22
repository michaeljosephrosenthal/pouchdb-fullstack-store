require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var createSuperAdmin = function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref3) {
	        var uri = _ref3.uri;
	        var name = _ref3.name;
	        var password = _ref3.password;
	
	        var resp, _resp;
	
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        _context.prev = 0;
	                        _context.next = 3;
	                        return _requisition2.default // TODO: this doesn't actually throw an error on 401
	                        .put(uri + '/_config/admins/' + name).send('"' + password + '"');
	
	                    case 3:
	                        resp = _context.sent;
	
	                        console.log('Server admin created');
	                        _context.next = 10;
	                        break;
	
	                    case 7:
	                        _context.prev = 7;
	                        _context.t0 = _context['catch'](0);
	
	                        if (_context.t0.status != 409) {
	                            catchAndTrace('error creating superadmin', _context.t0);
	                        } else {
	                            console.log('Server admin already exists');
	                        }
	
	                    case 10:
	                        _context.prev = 10;
	                        _context.next = 13;
	                        return this.login(name, password);
	
	                    case 13:
	                        _resp = _context.sent;
	
	                        console.log('Server admin logged in');
	                        return _context.abrupt('return', _resp);
	
	                    case 18:
	                        _context.prev = 18;
	                        _context.t1 = _context['catch'](10);
	
	                        catchAndTrace('error logging in superadmin', _context.t1);
	
	                    case 21:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this, [[0, 7], [10, 18]]);
	    }));
	
	    return function createSuperAdmin(_x) {
	        return ref.apply(this, arguments);
	    };
	}();
	
	var initUser = function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref4) {
	        var name = _ref4.name;
	        var password = _ref4.password;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	                switch (_context2.prev = _context2.next) {
	                    case 0:
	                        _context2.prev = 0;
	                        _context2.next = 3;
	                        return this.signup(name, password);
	
	                    case 3:
	                        _context2.next = 8;
	                        break;
	
	                    case 5:
	                        _context2.prev = 5;
	                        _context2.t0 = _context2['catch'](0);
	
	                        if (_context2.t0.status != 409) {
	                            catchAndTrace('error creating superadmin', _context2.t0);
	                        } else {
	                            console.log('user ' + name + ' already exists');
	                        }
	
	                    case 8:
	                    case 'end':
	                        return _context2.stop();
	                }
	            }
	        }, _callee2, this, [[0, 5]]);
	    }));
	
	    return function initUser(_x2) {
	        return ref.apply(this, arguments);
	    };
	}();
	
	var initDbUsers = function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref5) {
	        var uri = _ref5.uri;
	        var _ref5$credentials = _ref5.credentials;
	        var admin = _ref5$credentials.admin;
	        var users = _ref5$credentials.users;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	            while (1) {
	                switch (_context3.prev = _context3.next) {
	                    case 0:
	                        _context3.prev = 0;
	                        _context3.next = 3;
	                        return createSuperAdmin.bind(this)(_extends({ uri: uri }, admin));
	
	                    case 3:
	                        _context3.next = 8;
	                        break;
	
	                    case 5:
	                        _context3.prev = 5;
	                        _context3.t0 = _context3['catch'](0);
	
	                        catchAndTrace('error in initDbUsers', _context3.t0);
	
	                    case 8:
	                        users.forEach(initUser.bind(this));
	
	                    case 9:
	                    case 'end':
	                        return _context3.stop();
	                }
	            }
	        }, _callee3, this, [[0, 5]]);
	    }));
	
	    return function initDbUsers(_x3) {
	        return ref.apply(this, arguments);
	    };
	}();
	
	exports.ensureRemoteExistence = ensureRemoteExistence;
	
	var _requisition = __webpack_require__(18);
	
	var _requisition2 = _interopRequireDefault(_requisition);
	
	var _db = __webpack_require__(2);
	
	var _db2 = _interopRequireDefault(_db);
	
	var _child_process = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function catchAndTrace(message, err) {
	    console.log(message, err);
	    console.trace(err);
	}
	
	function injectCredentials(_ref) {
	    var uri = _ref.uri;
	    var _ref$protocols = _ref.protocols;
	    var protocols = _ref$protocols === undefined ? ['http', 'https'] : _ref$protocols;
	    var _ref$admin = _ref.admin;
	    var name = _ref$admin.name;
	    var password = _ref$admin.password;
	
	    var p = protocols.filter(function (p) {
	        return uri.startsWith(p + '://');
	    })[0] + '://';
	    return uri.replace(p, '' + p + name + ':' + password + '@');
	}
	
	function safeExec(command) {
	    try {
	        (0, _child_process.execSync)(command);
	    } catch (err) {
	        console.log('command "' + command + '" failed with with error ' + err);
	    }
	}
	
	function ensureRemoteExistence(_ref2) {
	    var uri = _ref2.uri;
	    var name = _ref2.name;
	    var _ref2$credentials = _ref2.credentials;
	    _ref2$credentials = _ref2$credentials === undefined ? {} : _ref2$credentials;
	    var admin = _ref2$credentials.admin;
	
	    if (admin) {
	        safeExec('curl -silent -X PUT -d \'' + admin.password + '\' ' + uri + '/_config/admins/' + admin.name);
	    }
	    var endpoint = admin ? injectCredentials({ uri: uri + '/' + name, admin: admin }) : uri + '/' + name;
	    safeExec('curl -silent -X PUT ' + endpoint);
	}
	
	exports.default = function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref6) {
	        var _ref6$settings$db = _ref6.settings.db;
	        var uri = _ref6$settings$db.uri;
	        var credentials = _ref6$settings$db.credentials;
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	            while (1) {
	                switch (_context4.prev = _context4.next) {
	                    case 0:
	                        if (credentials) initDbUsers.bind(this)({ uri: uri, credentials: credentials });
	
	                    case 1:
	                    case 'end':
	                        return _context4.stop();
	                }
	            }
	        }, _callee4, this);
	    }));
	
	    function configure(_x4) {
	        return ref.apply(this, arguments);
	    }
	
	    return configure;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.default = db;
	
	var _pouchdb = __webpack_require__(15);
	
	var _pouchdb2 = _interopRequireDefault(_pouchdb);
	
	var _pouchdbAuthentication = __webpack_require__(16);
	
	var _pouchdbAuthentication2 = _interopRequireDefault(_pouchdbAuthentication);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_pouchdb2.default.plugin(_pouchdbAuthentication2.default);
	
	function fullUri(_ref) {
	   var name = _ref.name;
	   var uri = _ref.uri;
	
	   return uri + '/' + name;
	}
	
	function db(settings) {
	   return new _pouchdb2.default(fullUri(settings), { skipSetup: true });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defaultDataFlows = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.requireAuthWithPersister = requireAuthWithPersister;
	exports.requireAuthFromRoute = requireAuthFromRoute;
	exports.provideAuthFromRoute = provideAuthFromRoute;
	exports.authenticateRoutes = authenticateRoutes;
	exports.provideInjectionForDomainRouteHandlers = provideInjectionForDomainRouteHandlers;
	exports.requireInjection = requireInjection;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _dataFlows = __webpack_require__(5);
	
	var _dataFlows2 = _interopRequireDefault(_dataFlows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.defaultDataFlows = _dataFlows2.default;
	function requireAuthWithPersister(_ref) {
	    var path = _ref.path;
	    var persister = _ref.persister;
	
	    return function requireAuth(nextState, replace, callback) {
	        var redirect = function redirect(_) {
	            replace({ nextPathname: nextState.location.pathname }, path);
	            callback();
	        };
	        (persister || this.db).getSession(function (err, response) {
	            if (err) {
	                console.log(err);
	                redirect();
	            } else if (!response.userCtx.name) {
	                redirect();
	            } else {
	                callback();
	            }
	        });
	    };
	}
	
	function requireAuthFromRoute(path) {
	    return {
	        requiresAuthentication: true,
	        path: path
	    };
	}
	
	function provideAuthFromRoute(component) {
	    var placeholder = function placeholder(_) {
	        return _;
	    };
	    Object.assign(placeholder, {
	        providesAuthentication: true,
	        component: component
	    });
	    return placeholder;
	}
	
	function authenticateRouteBasedOnOnEnter(_ref2) {
	    var route = _ref2.route;
	    var persister = _ref2.persister;
	
	    return route.props.onEnter && route.props.onEnter.requiresAuthentication ? {
	        onEnter: requireAuthWithPersister({ path: route.props.onEnter.path, persister: persister })
	    } : {};
	}
	
	function authenticateFromRouteBasedOnComponent(_ref3) {
	    var route = _ref3.route;
	    var persister = _ref3.persister;
	
	    return route.props.component && route.props.component.providesAuthentication ? {
	        component: function component(props) {
	            return _react2.default.createElement(route.props.component.component, _extends({ auth: persister }, props));
	        }
	    } : {};
	}
	
	function applyToChildren(_ref4) {
	    var children = _ref4.children;
	    var block = _ref4.block;
	
	    if (children) {
	        return Array.isArray(children) ? children.map(block) : block(children);
	    } else {
	        return children;
	    }
	}
	
	function authenticateRoutes(route, persister) {
	    persister = persister || this.db;
	    return _react2.default.cloneElement(route, _extends({}, authenticateRouteBasedOnOnEnter({ route: route, persister: persister }), authenticateFromRouteBasedOnComponent({ route: route, persister: persister }), {
	        key: route.props.path
	    }), applyToChildren({
	        children: route.props.children,
	        block: function block(route) {
	            return authenticateRoutes(route, persister);
	        }
	    }));
	}
	
	function provideInjection(dependentFunction, persister) {
	    var _this = this;
	
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return dependentFunction.apply(undefined, [persister || _this.db].concat(args));
	    };
	}
	
	function provideInjectionToHandlers(route, persister) {
	    route.handlers = route.handlers.map(function (handler) {
	        return handler.requiresPersister ? provideInjection(handler.dependentFunction, persister) : handler;
	    });
	    return route;
	}
	
	function expandPersisterBackedDomain(domain, persister) {
	    var routes = domain.get('routes');
	    Object.keys(domain.get('routes')).map(function (route) {
	        return domain.register('routes', route, provideInjectionToHandlers(routes[route], persister));
	    });
	    return domain;
	}
	
	function provideInjectionForDomainRouteHandlers(domains, persister) {
	    persister = persister || this.db;
	    return Object.keys(domains).reduce(function (newDomains, k) {
	        newDomains[k] = expandPersisterBackedDomain(domains[k], persister);
	        return newDomains;
	    }, {});
	}
	
	function requireInjection(dependentFunction) {
	    return {
	        requiresPersister: true,
	        dependentFunction: dependentFunction
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	    INSERT: function INSERT(state, payload) {
	        return [payload].concat(_toConsumableArray(state));
	    },
	    UPDATE: function UPDATE(state, payload) {
	        return state.map(function (doc) {
	            return doc._id == payload._id ? payload : doc;
	        });
	    },
	    REMOVE: function REMOVE(state, _ref) {
	        var _id = _ref._id;
	
	        return state.filter(function (doc) {
	            return doc._id != _id;
	        });
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strictduckDomainDrivenFullstack = __webpack_require__(19);
	
	var _domainMiddlewareGenerator = __webpack_require__(7);
	
	var _domainMiddlewareGenerator2 = _interopRequireDefault(_domainMiddlewareGenerator);
	
	var _db = __webpack_require__(2);
	
	var _db2 = _interopRequireDefault(_db);
	
	var _utils = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var provide = ( true ? __webpack_require__(1) : require('./domainMiddlewareGenerator')).default;
	var putDb =  true ? __webpack_require__(1).ensureRemoteExistence : function (_) {
	    return _;
	};
	
	exports.default = _strictduckDomainDrivenFullstack.storePersistencePlugin.implement({
	    name: 'DomainDrivenPouchPersistencePlugin',
	    constructor: function constructor(_ref) {
	        var db = _ref.Domains.settings.db;
	
	        putDb(db);
	        return [{
	            db: (0, _db2.default)(db),
	            middlewareGenerator: _domainMiddlewareGenerator2.default,
	            authenticateRoutes: _utils.authenticateRoutes,
	            provideAuthFromRoute: _utils.provideAuthFromRoute,
	            provideInjectionForDomainRouteHandlers: _utils.provideInjectionForDomainRouteHandlers
	        }];
	    },
	    provider: function provider() {
	        return provide.bind(this.db).apply(undefined, arguments);
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = domainDrivenReduxMiddleware;
	
	var _redux = __webpack_require__(4);
	
	var _reduxMiddleware = __webpack_require__(9);
	
	var _reduxMiddleware2 = _interopRequireDefault(_reduxMiddleware);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function invert(obj) {
	    return Object.keys(obj).reduce(function (inversion, key) {
	        inversion[obj[key]] = key;
	        return inversion;
	    }, {});
	}
	
	var defaultActionMap = { insert: 'insert', update: 'update', remove: 'remove' };
	function dbActions(_ref) {
	    var _ref$domain = _ref.domain;
	    var _ref$domain$actions = _ref$domain.actions;
	    var actions = _ref$domain$actions === undefined ? {} : _ref$domain$actions;
	    var _ref$domain$pouchActi = _ref$domain.pouchActionMap;
	    var actionMap = _ref$domain$pouchActi === undefined ? defaultActionMap : _ref$domain$pouchActi;
	
	    var invertedActionMap = invert(actionMap);
	    var acts = Object.keys(actions).filter(function (a) {
	        return [actionMap.update, actionMap.insert, actionMap.remove].indexOf(a) >= 0;
	    }).reduce(function (dbActs, a) {
	        dbActs[invertedActionMap[a]] = function (doc) {
	            try {
	                return actions[a](doc);
	            } catch (e) {
	                if (e instanceof TypeError) {
	                    return;
	                } else {
	                    throw e;
	                }
	            }
	        };
	        return dbActs;
	    }, {});
	    return Object.keys(acts).length ? acts : false;
	}
	
	function domainDrivenReduxMiddleware(_ref2) {
	    var db = _ref2.db;
	    var domains = _ref2.domains;
	
	    if (false) {
	        return (0, _reduxMiddleware2.default)(Object.values(domains).filter(function (domain) {
	            return dbActions({ domain: domain });
	        }).map(function (domain) {
	            return {
	                path: '/' + domain.prefix,
	                prefix: '' + (domain.dbPrefix || ''),
	                db: db,
	                actions: dbActions({ domain: domain })
	            };
	        }));
	    } else {
	        return function (_) {
	            return function (next) {
	                return function (action) {
	                    return next(action);
	                };
	            };
	        };
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.utils = exports.default = undefined;
	
	var _utils = __webpack_require__(3);
	
	Object.keys(_utils).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _utils[key];
	    }
	  });
	});
	
	var _domainDrivenPouchPersistencePlugin = __webpack_require__(6);
	
	var _domainDrivenPouchPersistencePlugin2 = _interopRequireDefault(_domainDrivenPouchPersistencePlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _domainDrivenPouchPersistencePlugin2.default;
	var utils = exports.utils =  true ? __webpack_require__(1) : {};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reduxMiddleware;
	
	var _jsonPath = __webpack_require__(14);
	
	var _jsonPath2 = _interopRequireDefault(_jsonPath);
	
	var _asyncFunctionQueue = __webpack_require__(10);
	
	var _asyncFunctionQueue2 = _interopRequireDefault(_asyncFunctionQueue);
	
	var _deepEqual = __webpack_require__(13);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _clone = __webpack_require__(12);
	
	var _clone2 = _interopRequireDefault(_clone);
	
	var _redux = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function warn(what) {
	    var fn = console.warn || console.log;
	    if (fn) {
	        fn.call(console, what);
	    }
	}
	
	function plain(obj) {
	    return JSON.parse(JSON.stringify(obj));
	}
	
	function plainClone(obj) {
	    return plain((0, _clone2.default)(obj));
	}
	
	function defaultAction(action) {
	    return function () {
	        throw new Error('no action provided for ' + action);
	    };
	}
	
	var defaultActions = {
	    remove: defaultAction('remove'),
	    update: defaultAction('update'),
	    insert: defaultAction('insert')
	};
	
	function _initFromDb(path) {
	    if (!path.lifecycleState) {
	        path.lifecycleState = 'INITIALIZING';
	        return path.db.allDocs(_extends({
	            include_docs: true
	        }, path.prefix ? {
	            startkey: path.prefix,
	            endkey: path.prefix + '￿'
	        } : {})).then(function (result) {
	            result.rows.forEach(function (row) {
	                return onDbChange(path, row);
	            });
	            path.lifecycleState = 'INITIALIZED';
	            listen(path);
	        });
	    }
	}
	
	function listen(path) {
	    var changes = path.db.changes(_extends({
	        live: true, since: 'now', include_docs: true
	    }, path.prefix ? {
	        filter: function filter(_ref) {
	            var _id = _ref._id;
	            return _id.split('/')[0] == path.prefix;
	        }
	    } : {}));
	    changes.on('change', function (change) {
	        return onDbChange(path, change);
	    });
	}
	
	function processNewStateForPath(path, state) {
	    var docsContainer = _jsonPath2.default.resolve(state, path.path);
	
	    /* istanbul ignore else */
	    if (docsContainer && docsContainer.length && path.lifecycleState == 'INITIALIZED') {
	        docsContainer.forEach(function (docs) {
	            var _differences = differences(path.docs, docs);
	
	            var updated = _differences.updated;
	            var deleted = _differences.deleted;
	            var inserted = _differences.inserted;
	
	            inserted.concat(updated).forEach(function (doc) {
	                return path.insert(doc);
	            });
	            deleted.forEach(function (doc) {
	                return path.remove(doc);
	            });
	        });
	    }
	}
	
	var Path = function () {
	    function Path(_ref2) {
	        var _ref2$path = _ref2.path;
	        var path = _ref2$path === undefined ? '.' : _ref2$path;
	        var _ref2$prefix = _ref2.prefix;
	        var prefix = _ref2$prefix === undefined ? '' : _ref2$prefix;
	        var db = _ref2.db;
	        var actions = _ref2.actions;
	
	        _classCallCheck(this, Path);
	
	        if (!db) {
	            throw new Error('path ' + path.path + ' needs a db');
	        }
	
	        this.queue = (0, _asyncFunctionQueue2.default)(1);
	        this.docs = {};
	
	        this.db = db;
	        this.path = path;
	        this.prefix = prefix;
	        this.actions = Object.assign({}, defaultActions, actions);
	    }
	
	    _createClass(Path, [{
	        key: 'insert',
	        value: function insert(doc) {
	            this.docs[doc._id] = plainClone(doc);
	            var db = this.db;
	            this.queue.push(function (cb) {
	                db.put(doc, cb);
	            });
	        }
	    }, {
	        key: 'remove',
	        value: function remove(doc) {
	            var _this = this;
	
	            var db = this.db;
	            this.queue.push(function (cb) {
	                db.remove(doc, cb);
	                delete _this.docs[doc._id];
	            });
	        }
	    }, {
	        key: 'wrapActionCreators',
	        value: function wrapActionCreators(dispatch) {
	            var _this2 = this;
	
	            this.propagations = Object.keys(this.actions).reduce(function (propagations, act) {
	                propagations[act] = function (doc) {
	                    var action = _this2.actions[act](doc);
	                    if (action) dispatch(action);
	                };
	                return propagations;
	            }, {});
	        }
	    }, {
	        key: 'initFromDb',
	        value: function initFromDb() {
	            var _this3 = this;
	
	            _initFromDb(this).catch(function (err) {
	                if (err.status == 401) {
	                    _this3.lifecycleState = false;
	                    _this3.db.once('login', function (_) {
	                        return _initFromDb(_this3);
	                    });
	                } else {
	                    throw err;
	                }
	            });
	        }
	    }]);
	
	    return Path;
	}();
	
	function differences(oldDocs, newDocs) {
	    var inserted = [],
	        updated = [],
	        deleted = Object.keys(oldDocs).map(function (oldDocId) {
	        return oldDocs[oldDocId];
	    });
	
	    newDocs.map(plainClone).forEach(function (newDoc) {
	        if (!newDoc._id) warn('doc with no id');
	
	        deleted = deleted.filter(function (doc) {
	            return doc._id !== newDoc._id;
	        });
	
	        var oldDoc = oldDocs[newDoc._id];
	        if (!oldDoc) {
	            inserted.push(newDoc);
	        } else if (!(0, _deepEqual2.default)(oldDoc, newDoc)) {
	            updated.push(newDoc);
	        }
	    });
	    return { inserted: inserted, updated: updated, deleted: deleted };
	}
	
	function onDbChange(path, _ref3) {
	    var changeDoc = _ref3.doc;
	
	    var change = _objectWithoutProperties(_ref3, ['doc']);
	
	    if (changeDoc._deleted) {
	        if (path.docs[changeDoc._id]) {
	            delete path.docs[changeDoc._id];
	            path.propagations.remove(changeDoc);
	        }
	    } else {
	        var oldDoc = path.docs[changeDoc._id];
	        path.docs[changeDoc._id] = plainClone(changeDoc);
	        if (oldDoc) {
	            path.propagations.update(changeDoc);
	        } else {
	            path.propagations.insert(changeDoc);
	        }
	    }
	}
	
	function reduxMiddleware() {
	    var paths = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    if (!Array.isArray(paths)) paths = [paths];
	
	    if (!paths.length) warn('PouchMiddleware: no paths');
	
	    paths = paths.map(function (options) {
	        return new Path(options);
	    });
	
	    return function (_ref4) {
	        var dispatch = _ref4.dispatch;
	        var getState = _ref4.getState;
	
	        paths.forEach(function (path) {
	            path.wrapActionCreators(dispatch);
	            path.initFromDb();
	        });
	        return function (next) {
	            return function (action) {
	                var nextAction = next(action);
	                paths.forEach(function (path) {
	                    return processNewStateForPath(path, getState());
	                });
	                return nextAction;
	            };
	        };
	    };
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("async-function-queue");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("clone");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("deep-equal");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("json-path");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("pouchdb");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("pouchdb-authentication");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("requisition");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("strictduck-domain-driven-fullstack");

/***/ }
/******/ ]);
//# sourceMappingURL=node_development.js.map