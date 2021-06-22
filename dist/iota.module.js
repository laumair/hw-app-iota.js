import e from"struct";import r from"iota.lib.js/lib/crypto/bundle/bundle.js";import{addChecksum as n,transactionTrytes as t,noChecksum as i}from"iota.lib.js/lib/utils/utils.js";import a from"bip32-path";import s from"semver";import o from"joi";function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}var d=o.number().integer(),c=d.min(1).max(3),f=d.min(0).max(4294967295),l=d.min(0).max(0x9dff7d32d5dc1),h=d.min(1).max(0x9dff7d32d5dc1),v=o.string().regex(/^[A-Z9]+$/),p=v.allow("").max(27),m=o.alternatives().try(v.length(81),v.length(90)),g=o.array().items(o.object({address:m.required(),tag:p.required(),value:l.required()}).unknown()).min(1),_=o.array().items(o.object({address:m.required(),balance:h.required(),keyIndex:f.required()}).unknown()).min(1),y=o.object({address:m.required(),keyIndex:f.required()}).unknown();function w(e,r,n){if(!e.s){if(n instanceof b){if(!n.s)return void(n.o=w.bind(null,e,r));1&r&&(r=n.s),n=n.v}if(n&&n.then)return void n.then(w.bind(null,e,r),w.bind(null,e,2));e.s=r,e.v=n;var t=e.o;t&&t(e)}}var b=function(){function e(){}return e.prototype.then=function(r,n){var t=new e,i=this.s;if(i){var a=1&i?r:n;if(a){try{w(t,1,a(this.v))}catch(e){w(t,2,e)}return t}return this}return this.o=function(e){try{var i=e.v;1&e.s?w(t,1,r?r(i):i):n?w(t,1,n(i)):w(t,2,i)}catch(e){w(t,2,e)}},t},e}();function x(e){return e instanceof b&&1&e.s}function P(e,r,n){for(var t;;){var i=e();if(x(i)&&(i=i.v),!i)return a;if(i.then){t=0;break}var a=n();if(a&&a.then){if(!x(a)){t=1;break}a=a.s}if(r){var s=r();if(s&&s.then&&!x(s)){t=2;break}}}var o=new b,u=w.bind(null,o,2);return(0===t?i.then(c):1===t?a.then(d):s.then(f)).then(void 0,u),o;function d(t){a=t;do{if(r&&(s=r())&&s.then&&!x(s))return void s.then(f).then(void 0,u);if(!(i=e())||x(i)&&!i.v)return void w(o,1,a);if(i.then)return void i.then(c).then(void 0,u);x(a=n())&&(a=a.v)}while(!a||!a.then);a.then(d).then(void 0,u)}function c(e){e?(a=n())&&a.then?a.then(d).then(void 0,u):d(a):w(o,1,a)}function f(){(i=e())?i.then?i.then(c).then(void 0,u):c(i):w(o,1,a)}}var I="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator",S="9".repeat(27),A=function(){function d(e){e.decorateAppAPIMethods(this,["setActiveSeed","getAddress","prepareTransfers","getAppVersion","getAppMaxBundleSize","signBundle"],"IOT"),this.transport=e,this.config=void 0,this.security=0,this.pathArray=void 0}var l=d.prototype;return l.setActiveSeed=function(e,r){void 0===r&&(r=2);try{var n=this,t=function(e){n.config=e;var r=s.satisfies(n.config.app_version,"<0.5")?(n._createPubkeyInput=n._createPubkeyInputLegacy,n._createTxInput=n._createTxInputLegacy,Promise.resolve(n._setSeed()).then(function(){})):Promise.resolve(n._reset(!0)).then(function(){});if(r&&r.then)return r.then(function(){})};return o.assert(e,o.string().required()),o.assert(r,c.required()),n.pathArray=d._validatePath(e),n.security=r,Promise.resolve(n.config?t(n.config):Promise.resolve(n._getAppConfig()).then(t))}catch(e){return Promise.reject(e)}},l.getAddress=function(e,r){void 0===r&&(r={});try{this._assertInitialized(),o.assert(e,f.required());var t=r.checksum||!1;return Promise.resolve(this._publicKey(e,r.display||!1)).then(function(e){return t?n(e):e})}catch(e){return Promise.reject(e)}},l.prepareTransfers=function(e,r,n,t){void 0===t&&(t=function(){return Date.now()});try{var i=this;if(i._assertInitialized(),o.assert(e,g.required()),o.assert(r,_.required()),o.assert(n,y.optional()),o.assert(t,o.func().arity(0).required()),1!=e.length)throw new Error("unsupported number of transfers");return n=d._validateRemainder(e,r,n),Promise.resolve(i._prepareTransfers(e,r,n,t)).then(function(e){return Promise.resolve(i._reset(!0)).then(function(){return e})})}catch(e){return Promise.reject(e)}},l.signBundle=function(e,r){try{return e.finalize(),e.bundle.filter(function(e){return e.value<0}).forEach(function(e){if(!(e.address in r))throw new Error('"addressKeyIndices" invalid: missing '+e.address)}),Promise.resolve(this._signBundle(e,r)).then(function(){var r=[];return e.bundle.forEach(function(e){return r.push(t(e))}),r.reverse()})}catch(e){return Promise.reject(e)}},l.getAppVersion=function(){try{var e=this;return Promise.resolve(e._getAppConfig()).then(function(r){return e.config=r,r.app_version})}catch(e){return Promise.reject(e)}},l.getAppMaxBundleSize=function(){try{var e=this;return Promise.resolve(e._getAppConfig()).then(function(r){return e.config=r,r.app_max_bundle_size?r.app_max_bundle_size:8})}catch(e){return Promise.reject(e)}},d._validatePath=function(e){var r;try{r=a.fromString(e).toPathArray()}catch(e){throw new Error('"path" invalid: '+e.message)}if(!r||r.length<2||r.length>5)throw new Error('"path" invalid: Invalid path length');return r},l._assertInitialized=function(){if(!this.security)throw new Error("seed not yet initialized")},l._addSeedFields=function(e){return e.word8("security").word32Ule("pathLength").array("pathArray",this.pathArray.length,"word32Ule")},l._initSeedFields=function(e){var r=e.fields;r.security=this.security,r.pathLength=this.pathArray.length,r.pathArray=this.pathArray},l._setSeed=function(){try{var r=this,n=new e;return r._addSeedFields(n),n.allocate(),r._initSeedFields(n),Promise.resolve(r._sendCommand(1,0,0,n.buffer(),1e4)).then(function(){})}catch(e){return Promise.reject(e)}},l._createPubkeyInputLegacy=function(r){var n=new e;return(n=n.word32Ule("index")).allocate(),n.fields.index=r,n},l._createPubkeyInput=function(r){var n=new e;return this._addSeedFields(n),(n=n.word32Ule("index")).allocate(),this._initSeedFields(n),n.fields.index=r,n},l._publicKey=function(r,n){try{var t=this._createPubkeyInput(r);return Promise.resolve(this._sendCommand(2,n?1:0,0,t.buffer(),1e4)).then(function(r){var n=(new e).chars("address",81);return n.setBuffer(r),n.fields.address})}catch(e){return Promise.reject(e)}},d._validateRemainder=function(e,r,n){var t=r.reduce(function(e,r){return e+r.balance},0),i=e.reduce(function(e,r){return e+r.value},0);if(t<i)throw new Error("insufficient balance");if(t>i){if(!n)throw new Error('"remainder" is required');return{address:n.address,value:t-i,keyIndex:n.keyIndex}}},l._sign=function(r,n){try{var t=(new e).word32Ule("index");return t.allocate(),t.fields.index=r,Promise.resolve(this._sendCommand(4,0,0,t.buffer(),1e4)).then(function(r){var t=(new e).chars("signature",n).word8Sle("fragmentsRemaining");return t.setBuffer(r),{signature:t.fields.signature,fragmentsRemaining:t.fields.fragmentsRemaining}})}catch(e){return Promise.reject(e)}},l._createTxInputLegacy=function(r,n,t,i,a,s,o){var u=new e;(u=u.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time")).allocate();var d=u.fields;return d.address=r,d.address_idx=n,d.value=t,d.tag=i,d.tx_idx=a,d.tx_len=s,d.time=o,u},l._createTxInput=function(r,n,t,i,a,s,o){var u=new e;0==a&&this._addSeedFields(u),(u=u.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time")).allocate(),0==a&&this._initSeedFields(u);var d=u.fields;return d.address=r,d.address_idx=n,d.value=t,d.tag=i,d.tx_idx=a,d.tx_len=s,d.time=o,u},l._transaction=function(r,n,t,i,a,s,o){try{var u=this._createTxInput(r,n,t,i,a,s,o),d=1e4;return a==s&&(d=15e4),Promise.resolve(this._sendCommand(3,0==a?0:128,0,u.buffer(),d)).then(function(r){var n=(new e).word8("finalized").chars("bundleHash",81);return n.setBuffer(r),{finalized:n.fields.finalized,bundleHash:n.fields.bundleHash}})}catch(e){return Promise.reject(e)}},l._getSignatureFragments=function(e,r){try{var n=this,t=function(e){return a.match(/.{2187}/g)},i=2187*n.security/r,a="",s=1,o=P(function(){return s<=i},function(){return s++},function(){return Promise.resolve(n._sign(e,r)).then(function(e){if(a+=e.signature,s===i!=(0===e.fragmentsRemaining))throw new Error("wrong signture length")})});return Promise.resolve(o&&o.then?o.then(t):t())}catch(e){return Promise.reject(e)}},l._addSignatureFragmentsToBundle=function(e){try{var r,n=this,t=0;return Promise.resolve(P(function(){return!r&&t<e.bundle.length},function(){return t++},function(){var i=e.bundle[t];if(!(i.value>=0))return Promise.resolve(n._getSignatureFragments(t,243)).then(function(a){i.signatureMessageFragment=a.shift();for(var s=i.address,o=1;o<n.security;o++){if(++t>=e.bundle.length)return void(r=1);var u=e.bundle[t];u.address===s&&0===u.value&&(u.signatureMessageFragment=a.shift())}})}))}catch(e){return Promise.reject(e)}},l._signBundle=function(e,r){try{var n=this,t=function(){if(!i)throw new Error("bundle not finalized");if(a!==e.bundle[0].bundle)throw new Error("wrong bundle hash");return Promise.resolve(n._addSignatureFragmentsToBundle(e)).then(function(){})},i=!1,a="",s=function(e,r,n){if("function"==typeof e[I]){var t,i,a,s=e[I]();if(function e(n){try{for(;!(t=s.next()).done;)if((n=r(t.value))&&n.then){if(!x(n))return void n.then(e,a||(a=w.bind(null,i=new b,2)));n=n.v}i?w(i,1,n):i=n}catch(e){w(i||(i=new b),2,e)}}(),s.return){var o=function(e){try{t.done||s.return()}catch(e){}return e};if(i&&i.then)return i.then(o,function(e){throw o(e)});o()}return i}if(!("length"in e))throw new TypeError("Object is not iterable");for(var u=[],d=0;d<e.length;d++)u.push(e[d]);return function(e,r,n){var t,i,a=-1;return function n(s){try{for(;++a<e.length;)if((s=r(a))&&s.then){if(!x(s))return void s.then(n,i||(i=w.bind(null,t=new b,2)));s=s.v}t?w(t,1,s):t=s}catch(e){w(t||(t=new b),2,e)}}(),t}(u,function(e){return r(u[e])})}(e.bundle,function(e){return Promise.resolve(n._transaction(e.address,r[e.address]?r[e.address]:0,e.value,e.obsoleteTag,e.currentIndex,e.lastIndex,e.timestamp)).then(function(e){i=e.finalized,a=e.bundleHash})});return Promise.resolve(s&&s.then?s.then(t):t())}catch(e){return Promise.reject(e)}},l._hasDuplicateAddresses=function(e,r,n){var t=new Set;return e.forEach(function(e){return t.add(e.address)}),r.forEach(function(e){return t.add(e.address)}),!(!n||!t.has(n.address))||t.length===e.length+r.length},l._prepareTransfers=function(e,n,a,s){try{var o=this;if(e=e.map(function(e){return u({},e,{address:i(e.address),tag:e.tag?e.tag.padEnd(27,"9"):S})}),n=n.map(function(e){return u({},e,{address:i(e.address),security:o.security})}),a&&(a=u({},a,{address:i(a.address)})),o._hasDuplicateAddresses(e,n,a))throw new Error("transaction must not contain duplicate addresses");var d=Math.floor(s()/1e3),c=new r;e.forEach(function(e){return c.addEntry(1,e.address,e.value,e.tag,d,-1)}),n.forEach(function(e){return c.addEntry(e.security,e.address,-e.balance,S,d,e.keyIndex)}),a&&c.addEntry(1,a.address,a.value,S,d,a.keyIndex),c.addTrytes([]),c.finalize();var f={};return n.forEach(function(e){return f[e.address]=e.keyIndex}),a&&(f[a.address]=a.keyIndex),Promise.resolve(o._signBundle(c,f)).then(function(){var e=[];return c.bundle.forEach(function(r){return e.push(t(r))}),e.reverse()})}catch(e){return Promise.reject(e)}},l._createAppConfigOutputLegacy=function(){return(new e).word8("app_flags").word8("app_version_major").word8("app_version_minor").word8("app_version_patch")},l._createAppConfigOutput=function(){return(new e).word8("app_version_major").word8("app_version_minor").word8("app_version_patch").word8("app_max_bundle_size").word8("app_flags")},l._getAppConfig=function(){try{var e=this;return Promise.resolve(e._sendCommand(16,0,0,void 0,1e4)).then(function(r){var n=e._createAppConfigOutput();r.length<n.length()+2&&(n=e._createAppConfigOutputLegacy()),n.setBuffer(r);var t=n.fields;return{app_max_bundle_size:t.app_max_bundle_size,app_flags:t.app_flags,app_version:t.app_version_major+"."+t.app_version_minor+"."+t.app_version_patch}})}catch(e){return Promise.reject(e)}},l._reset=function(e){void 0===e&&(e=!1);try{return Promise.resolve(this._sendCommand(255,e?1:0,0,void 0,1e4)).then(function(){})}catch(e){return Promise.reject(e)}},l._sendCommand=function(e,r,n,t,i){try{var a=this.transport;return Promise.resolve(function(s,o){try{var u=(a.setExchangeTimeout(i),Promise.resolve(a.send(122,e,r,n,t)))}catch(e){return o(e)}return u&&u.then?u.then(void 0,o):u}(0,function(e){throw e.statusCode&&(e.message=function(e){var r=function(e){switch(e){case 36864:return"Success";case 26368:return"Incorrect input length";case 27264:return"Incorrect data";case 27392:return"Incorrect command parameter";case 27648:return"Incorrect length specified in header";case 27904:return"Invalid INS command";case 28160:return"Incorrect CLA (Wrong application opened)";case 26880:return"Command not allowed (Command out of order)";case 27010:return"Security not satisfied (Device locked)";case 27013:return"Condition of use not satisfied (Denied by the user)";case 25601:return"Security not satisfied (Timeout exceeded)";case 27041:return"Bundle error (Insecure hash)";case 27042:return"Bundle error (Non zero balance)";case 27043:return"Bundle error (Invalid meta transaction)";case 27044:return"Bundle error (Invalid input address/index pair(s))";case 27045:return"Bundle error (Address reused)";case 27012:return"Invalid input data";case 27014:return"App has not been initialized by user";case 27025:return"Invalid transaction index";case 27026:return"Invalid transaction order (Output, Inputs, Change)";case 27027:return"Invalid meta transaction";case 27028:return"Invalid output transaction (Output must come first)"}if(28416<=e&&e<=28671)return"Internal error, please report"}(e);if(r)return"Ledger device: "+r+" (0x"+e.toString(16)+")"}(e.statusCode)||e.message),e}))}catch(e){return Promise.reject(e)}},d}();export default A;
//# sourceMappingURL=iota.module.js.map
