require("source-map-support").install(),module.exports=function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(6)},function(e,r){e.exports=require("redux")},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(i,o){try{var u=r[i](o),a=u.value}catch(c){return void t(c)}return u.done?void e(a):Promise.resolve(a).then(function(e){return n("next",e)},function(e){return n("throw",e)})}return n("next")})}}function o(e,r){console.log(e,r),console.trace(r)}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a=function(){var e=i(regeneratorRuntime.mark(function r(e){var t,n,i=e.uri,u=e.name,a=e.password;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d["default"].put(i+"/_config/admins/"+u).send('"'+a+'"');case 3:t=e.sent,console.log("Server admin created"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),409!=e.t0.status?o("error creating superadmin",e.t0):console.log("Server admin already exists");case 10:return e.prev=10,e.next=13,this.login(u,a);case 13:return n=e.sent,console.log("Server admin logged in"),e.abrupt("return",n);case 18:e.prev=18,e.t1=e["catch"](10),o("error logging in superadmin",e.t1);case 21:case"end":return e.stop()}},r,this,[[0,7],[10,18]])}));return function(r){return e.apply(this,arguments)}}(),c=function(){var e=i(regeneratorRuntime.mark(function r(e){var t=e.name,n=e.password;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.signup(t,n);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),409!=e.t0.status?o("error creating superadmin",e.t0):console.log("user "+t+" already exists");case 8:case"end":return e.stop()}},r,this,[[0,5]])}));return function(r){return e.apply(this,arguments)}}(),s=function(){var e=i(regeneratorRuntime.mark(function r(e){var t=e.credentials,n=t.admin,i=t.users;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a(u({uri:uri},n));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),o("error in initDbUsers",e.t0);case 8:i.forEach(c);case 9:case"end":return e.stop()}},r,this,[[0,5]])}));return function(r){return e.apply(this,arguments)}}(),f=t(13),d=n(f);r["default"]=function(){function e(e){return r.apply(this,arguments)}var r=i(regeneratorRuntime.mark(function t(e){var r=e.settings.db,n=(r.uri,r.credentials);return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n&&s({credentials:n});case 1:case"end":return e.stop()}},t,this)}));return e}()},function(e,r){"use strict";function t(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]={INSERT:function(e,r){return[r].concat(t(e))},UPDATE:function(e,r){return e.map(function(e){return e._id==r._id?r:e})},REMOVE:function(e,r){var t=r._id;return e.filter(function(e){return e._id!=t})}}},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e){var r=e.name,t=e.uri;return t+"/"+r}Object.defineProperty(r,"__esModule",{value:!0});var o=t(14),u=t(11),a=n(u),c=t(12),s=n(c),f=t(5),d=n(f);a["default"].plugin(s["default"]);var l=t(2)["default"];r["default"]=o.storePersistencePlugin.implement({name:"DomainDrivenPouchPersistencePlugin",constructor:function(e){var r=e.Domains.settings.db;return[{db:new a["default"](i(r),{skipSetup:!0}),middlewareGenerator:d["default"]}]},provider:function(){return l.bind(this.db).apply(void 0,arguments)}})},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e){return Object.keys(e).reduce(function(r,t){return r[e[t]]=t,r},{})}function o(e){var r=e.domain,t=r.actions,n=void 0===t?{}:t,o=r.pouchActionMap,u=void 0===o?{insert:"insert",update:"update",remove:"remove"}:o,a=i(u),c=Object.keys(n).filter(function(e){return[u.update,u.insert,u.remove].indexOf(e)>=0}).reduce(function(e,r){return e[a[r]]=function(e){try{return n[r](e)}catch(t){if(t instanceof TypeError)return;throw t}},e},{});return Object.keys(c).length?c:!1}function u(e){var r=e.db,t=e.domains;return(0,c["default"])(Object.values(t).filter(function(e){return o({domain:e})}).map(function(e){return e}).map(function(e){return{path:"/"+e.prefix,prefix:""+(e.dbPrefix||""),db:r,actions:o({domain:e})}}))}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=u;var a=(t(1),t(7)),c=n(a)},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0}),r.defaultDataFlows=r["default"]=void 0;var i=t(4),o=n(i),u=t(3),a=n(u);r["default"]=o["default"],r.defaultDataFlows=a["default"]},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,r){var t={};for(var n in e)r.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function o(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function u(e){var r=console.warn||console.log;r&&r.call(console,e)}function a(e){return function(){throw new Error("no action provided for "+e)}}function c(e){e.lifecycleState||(e.lifecycleState="INITIALIZING",e.db.allDocs(h({include_docs:!0},e.prefix?{startkey:e.prefix,endkey:e.prefix+"￿"}:{})).then(function(r){r.rows.forEach(function(r){return l(e,r)}),e.lifecycleState="INITIALIZED",s(e)})["catch"](function(e){return console.log(e)}))}function s(e){var r=e.db.changes(h({live:!0,since:"now",include_docs:!0},e.prefix?{filter:function(r){var t=r._id;return t.split("/")[0]==e.prefix}}:{}));r.on("change",function(r){return l(e,r)})}function f(e,r){var t=g["default"].resolve(r,e.path);t&&t.length&&"INITIALIZED"==e.lifecycleState&&t.forEach(function(r){var t=d(e.docs,r),n=t.updated,i=t.deleted,o=t.inserted;o.concat(n).forEach(function(r){return e.insert(r)}),i.forEach(function(r){return e.remove(r)})})}function d(e,r){var t=[],n=[],i=Object.keys(e).map(function(r){return e[r]});return r.forEach(function(r){r._id||u("doc with no id"),i=i.filter(function(e){return e._id!==r._id});var o=e[r._id];o?(0,_["default"])(o,r)||n.push(r):t.push(r)}),{inserted:t,updated:n,deleted:i}}function l(e,r){var t=r.doc;i(r,["doc"]);if(t._deleted)e.docs[t._id]&&(delete e.docs[t._id],e.propagations.remove(t));else{var n=e.docs[t._id];e.docs[t._id]=t,n?e.propagations.update(t):e.propagations.insert(t)}}function p(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];if(Array.isArray(e)||(e=[e]),!e.length)throw new Error("PouchMiddleware: no paths");return e=e.map(function(e){return new O(e)}),function(r){var t=r.dispatch,n=r.getState;return e.forEach(function(e){e.wrapActionCreators(t),e.initFromDb()}),function(r){return function(t){var i=r(t);return e.forEach(function(e){return f(e,n())}),i}}}}Object.defineProperty(r,"__esModule",{value:!0});var v=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),h=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};r["default"]=p;var m=t(10),g=n(m),y=t(8),b=n(y),x=t(9),_=n(x),w=(t(1),{remove:a("remove"),update:a("update"),insert:a("insert")}),O=function(){function e(r){var t=r.path,n=void 0===t?".":t,i=r.prefix,u=void 0===i?"":i,a=r.db,c=r.actions;if(o(this,e),!a)throw new Error("path "+n.path+" needs a db");this.queue=(0,b["default"])(1),this.docs={},this.db=a,this.path=n,this.prefix=u,this.actions=Object.assign({},w,c)}return v(e,[{key:"insert",value:function(e){this.docs[e._id]=e;var r=this.db;this.queue.push(function(t){r.put(e,t)})}},{key:"remove",value:function(e){var r=this,t=this.db;this.queue.push(function(n){t.remove(e,n),delete r.docs[e._id]})}},{key:"wrapActionCreators",value:function(e){var r=this;this.propagations=Object.keys(this.actions).reduce(function(t,n){return t[n]=function(t){var i=r.actions[n](t);i&&e(i)},t},{})}},{key:"initFromDb",value:function(){c(this)}}]),e}()},function(e,r){e.exports=require("async-function-queue")},function(e,r){e.exports=require("deep-equal")},function(e,r){e.exports=require("json-path")},function(e,r){e.exports=require("pouchdb")},function(e,r){e.exports=require("pouchdb-authentication")},function(e,r){e.exports=require("requisition")},function(e,r){e.exports=require("strictduck-domain-driven-fullstack")}]);
//# sourceMappingURL=node.js.map