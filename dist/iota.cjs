var e=require("struct"),r=require("iota.lib.js/lib/crypto/bundle/bundle.js"),t=require("iota.lib.js/lib/utils/utils.js"),n=require("bip32-path"),i=require("semver"),a=require("joi");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=s(e),o=s(r),d=s(n),c=s(i),f=s(a);function l(){return(l=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var h=f.default.number().integer(),v=h.min(1).max(3),p=h.min(0).max(4294967295),m=h.min(0).max(0x9dff7d32d5dc1),g=h.min(1).max(0x9dff7d32d5dc1),_=f.default.string().regex(/^[A-Z9]+$/),y=_.allow("").max(27),w=f.default.alternatives().try(_.length(81),_.length(90)),b=f.default.array().items(f.default.object({address:w.required(),tag:y.required(),value:m.required()}).unknown()).min(1),x=f.default.array().items(f.default.object({address:w.required(),balance:g.required(),keyIndex:p.required()}).unknown()).min(1),P=f.default.object({address:w.required(),keyIndex:p.required()}).unknown();function I(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function S(e,r,t){if(!e.s){if(t instanceof j){if(!t.s)return void(t.o=S.bind(null,e,r));1&r&&(r=t.s),t=t.v}if(t&&t.then)return void t.then(S.bind(null,e,r),S.bind(null,e,2));e.s=r,e.v=t;var n=e.o;n&&n(e)}}var j=function(){function e(){}return e.prototype.then=function(r,t){var n=new e,i=this.s;if(i){var a=1&i?r:t;if(a){try{S(n,1,a(this.v))}catch(e){S(n,2,e)}return n}return this}return this.o=function(e){try{var i=e.v;1&e.s?S(n,1,r?r(i):i):t?S(n,1,t(i)):S(n,2,i)}catch(e){S(n,2,e)}},n},e}();function A(e){return e instanceof j&&1&e.s}function C(e,r,t){for(var n;;){var i=e();if(A(i)&&(i=i.v),!i)return a;if(i.then){n=0;break}var a=t();if(a&&a.then){if(!A(a)){n=1;break}a=a.s}if(r){var s=r();if(s&&s.then&&!A(s)){n=2;break}}}var u=new j,o=S.bind(null,u,2);return(0===n?i.then(c):1===n?a.then(d):s.then(f)).then(void 0,o),u;function d(n){a=n;do{if(r&&(s=r())&&s.then&&!A(s))return void s.then(f).then(void 0,o);if(!(i=e())||A(i)&&!i.v)return void S(u,1,a);if(i.then)return void i.then(c).then(void 0,o);A(a=t())&&(a=a.v)}while(!a||!a.then);a.then(d).then(void 0,o)}function c(e){e?(a=t())&&a.then?a.then(d).then(void 0,o):d(a):S(u,1,a)}function f(){(i=e())?i.then?i.then(c).then(void 0,o):c(i):S(u,1,a)}}var E="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator",k="9".repeat(27);module.exports=function(){function e(e){e.decorateAppAPIMethods(this,["setActiveSeed","getAddress","prepareTransfers","getAppVersion","getAppMaxBundleSize","signBundle"],"IOT"),this.transport=e,this.config=void 0,this.security=0,this.pathArray=void 0}var r=e.prototype;return r.setActiveSeed=function(r,t){void 0===t&&(t=2);try{var n=this,i=function(e){n.config=e;var r=c.default.satisfies(n.config.app_version,"<0.5")?(n._createPubkeyInput=n._createPubkeyInputLegacy,n._createTxInput=n._createTxInputLegacy,Promise.resolve(n._setSeed()).then(function(){})):Promise.resolve(n._reset(!0)).then(function(){});if(r&&r.then)return r.then(function(){})};return f.default.assert(r,f.default.string().required()),f.default.assert(t,v.required()),n.pathArray=e._validatePath(r),n.security=t,Promise.resolve(n.config?i(n.config):Promise.resolve(n._getAppConfig()).then(i))}catch(e){return Promise.reject(e)}},r.getAddress=function(e,r){void 0===r&&(r={});try{this._assertInitialized(),f.default.assert(e,p.required());var n=r.checksum||!1;return Promise.resolve(this._publicKey(e,r.display||!1)).then(function(e){return n?t.addChecksum(e):e})}catch(e){return Promise.reject(e)}},r.prepareTransfers=function(r,t,n,i){void 0===i&&(i=function(){return Date.now()});try{var a=this;if(a._assertInitialized(),f.default.assert(r,b.required()),f.default.assert(t,x.required()),f.default.assert(n,P.optional()),f.default.assert(i,f.default.func().arity(0).required()),1!=r.length)throw new Error("unsupported number of transfers");return n=e._validateRemainder(r,t,n),Promise.resolve(a._prepareTransfers(r,t,n,i)).then(function(e){return Promise.resolve(a._reset(!0)).then(function(){return e})})}catch(e){return Promise.reject(e)}},r.signBundle=function(e,r){try{var n=this,i=function(r){var n=[];return e.bundle.forEach(function(e){return n.push(t.transactionTrytes(e))}),n.reverse()};e.finalize(),e.bundle.filter(function(e){return e.value<0}).forEach(function(e){if(!(e.address in r))throw new Error('"addressKeyIndices" invalid: missing '+e.address)});var a=I(function(){return Promise.resolve(n._signBundle(e,r)).then(function(){})},function(e){throw console.error(e),new Error(e)});return Promise.resolve(a&&a.then?a.then(i):i())}catch(e){return Promise.reject(e)}},r.getAppVersion=function(){try{var e=this;return Promise.resolve(e._getAppConfig()).then(function(r){return e.config=r,r.app_version})}catch(e){return Promise.reject(e)}},r.getAppMaxBundleSize=function(){try{var e=this;return Promise.resolve(e._getAppConfig()).then(function(r){return e.config=r,r.app_max_bundle_size?r.app_max_bundle_size:8})}catch(e){return Promise.reject(e)}},e._validatePath=function(e){var r;try{r=d.default.fromString(e).toPathArray()}catch(e){throw new Error('"path" invalid: '+e.message)}if(!r||r.length<2||r.length>5)throw new Error('"path" invalid: Invalid path length');return r},r._assertInitialized=function(){if(!this.security)throw new Error("seed not yet initialized")},r._addSeedFields=function(e){return e.word8("security").word32Ule("pathLength").array("pathArray",this.pathArray.length,"word32Ule")},r._initSeedFields=function(e){var r=e.fields;r.security=this.security,r.pathLength=this.pathArray.length,r.pathArray=this.pathArray},r._setSeed=function(){try{var e=this,r=new u.default;return e._addSeedFields(r),r.allocate(),e._initSeedFields(r),Promise.resolve(e._sendCommand(1,0,0,r.buffer(),1e4)).then(function(){})}catch(e){return Promise.reject(e)}},r._createPubkeyInputLegacy=function(e){var r=new u.default;return(r=r.word32Ule("index")).allocate(),r.fields.index=e,r},r._createPubkeyInput=function(e){var r=new u.default;return this._addSeedFields(r),(r=r.word32Ule("index")).allocate(),this._initSeedFields(r),r.fields.index=e,r},r._publicKey=function(e,r){try{var t=this._createPubkeyInput(e);return Promise.resolve(this._sendCommand(2,r?1:0,0,t.buffer(),1e4)).then(function(e){var r=(new u.default).chars("address",81);return r.setBuffer(e),r.fields.address})}catch(e){return Promise.reject(e)}},e._validateRemainder=function(e,r,t){var n=r.reduce(function(e,r){return e+r.balance},0),i=e.reduce(function(e,r){return e+r.value},0);if(n<i)throw new Error("insufficient balance");if(n>i){if(!t)throw new Error('"remainder" is required');return{address:t.address,value:n-i,keyIndex:t.keyIndex}}},r._sign=function(e,r){try{var t=(new u.default).word32Ule("index");return t.allocate(),t.fields.index=e,Promise.resolve(this._sendCommand(4,0,0,t.buffer(),1e4)).then(function(e){var t=(new u.default).chars("signature",r).word8Sle("fragmentsRemaining");return t.setBuffer(e),{signature:t.fields.signature,fragmentsRemaining:t.fields.fragmentsRemaining}})}catch(e){return Promise.reject(e)}},r._createTxInputLegacy=function(e,r,t,n,i,a,s){var o=new u.default;(o=o.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time")).allocate();var d=o.fields;return d.address=e,d.address_idx=r,d.value=t,d.tag=n,d.tx_idx=i,d.tx_len=a,d.time=s,o},r._createTxInput=function(e,r,t,n,i,a,s){var o=new u.default;0==i&&this._addSeedFields(o),(o=o.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time")).allocate(),0==i&&this._initSeedFields(o);var d=o.fields;return d.address=e,d.address_idx=r,d.value=t,d.tag=n,d.tx_idx=i,d.tx_len=a,d.time=s,o},r._transaction=function(e,r,t,n,i,a,s){try{var o=this._createTxInput(e,r,t,n,i,a,s),d=1e4;return i==a&&(d=15e4),Promise.resolve(this._sendCommand(3,0==i?0:128,0,o.buffer(),d)).then(function(e){var r=(new u.default).word8("finalized").chars("bundleHash",81);return r.setBuffer(e),{finalized:r.fields.finalized,bundleHash:r.fields.bundleHash}})}catch(e){return Promise.reject(e)}},r._getSignatureFragments=function(e,r){try{var t=this,n=function(e){return a.match(/.{2187}/g)},i=2187*t.security/r,a="",s=1,u=C(function(){return s<=i},function(){return s++},function(){return Promise.resolve(t._sign(e,r)).then(function(e){if(a+=e.signature,s===i!=(0===e.fragmentsRemaining))throw new Error("wrong signture length")})});return Promise.resolve(u&&u.then?u.then(n):n())}catch(e){return Promise.reject(e)}},r._addSignatureFragmentsToBundle=function(e){try{var r,t=this,n=0;return Promise.resolve(C(function(){return!r&&n<e.bundle.length},function(){return n++},function(){var i=e.bundle[n];if(!(i.value>=0))return Promise.resolve(t._getSignatureFragments(n,243)).then(function(a){i.signatureMessageFragment=a.shift();for(var s=i.address,u=1;u<t.security;u++){if(++n>=e.bundle.length)return void(r=1);var o=e.bundle[n];o.address===s&&0===o.value&&(o.signatureMessageFragment=a.shift())}})}))}catch(e){return Promise.reject(e)}},r._signBundle=function(e,r){try{var t=this,n=function(){if(!i)throw new Error("bundle not finalized");if(a!==e.bundle[0].bundle)throw new Error("wrong bundle hash");return Promise.resolve(t._addSignatureFragmentsToBundle(e)).then(function(){})},i=!1,a="",s=function(e,r,t){if("function"==typeof e[E]){var n,i,a,s=e[E]();if(function e(t){try{for(;!(n=s.next()).done;)if((t=r(n.value))&&t.then){if(!A(t))return void t.then(e,a||(a=S.bind(null,i=new j,2)));t=t.v}i?S(i,1,t):i=t}catch(e){S(i||(i=new j),2,e)}}(),s.return){var u=function(e){try{n.done||s.return()}catch(e){}return e};if(i&&i.then)return i.then(u,function(e){throw u(e)});u()}return i}if(!("length"in e))throw new TypeError("Object is not iterable");for(var o=[],d=0;d<e.length;d++)o.push(e[d]);return function(e,r,t){var n,i,a=-1;return function t(s){try{for(;++a<e.length;)if((s=r(a))&&s.then){if(!A(s))return void s.then(t,i||(i=S.bind(null,n=new j,2)));s=s.v}n?S(n,1,s):n=s}catch(e){S(n||(n=new j),2,e)}}(),n}(o,function(e){return r(o[e])})}(e.bundle,function(e){return Promise.resolve(t._transaction(e.address,r[e.address]?r[e.address]:0,e.value,e.obsoleteTag,e.currentIndex,e.lastIndex,e.timestamp)).then(function(e){i=e.finalized,a=e.bundleHash})});return Promise.resolve(s&&s.then?s.then(n):n())}catch(e){return Promise.reject(e)}},r._hasDuplicateAddresses=function(e,r,t){var n=new Set;return e.forEach(function(e){return n.add(e.address)}),r.forEach(function(e){return n.add(e.address)}),!(!t||!n.has(t.address))||n.length===e.length+r.length},r._prepareTransfers=function(e,r,n,i){try{var a=this;if(e=e.map(function(e){return l({},e,{address:t.noChecksum(e.address),tag:e.tag?e.tag.padEnd(27,"9"):k})}),r=r.map(function(e){return l({},e,{address:t.noChecksum(e.address),security:a.security})}),n&&(n=l({},n,{address:t.noChecksum(n.address)})),a._hasDuplicateAddresses(e,r,n))throw new Error("transaction must not contain duplicate addresses");var s=Math.floor(i()/1e3),u=new o.default;e.forEach(function(e){return u.addEntry(1,e.address,e.value,e.tag,s,-1)}),r.forEach(function(e){return u.addEntry(e.security,e.address,-e.balance,k,s,e.keyIndex)}),n&&u.addEntry(1,n.address,n.value,k,s,n.keyIndex),u.addTrytes([]),u.finalize();var d={};return r.forEach(function(e){return d[e.address]=e.keyIndex}),n&&(d[n.address]=n.keyIndex),Promise.resolve(a._signBundle(u,d)).then(function(){var e=[];return u.bundle.forEach(function(r){return e.push(t.transactionTrytes(r))}),e.reverse()})}catch(e){return Promise.reject(e)}},r._createAppConfigOutputLegacy=function(){return(new u.default).word8("app_flags").word8("app_version_major").word8("app_version_minor").word8("app_version_patch")},r._createAppConfigOutput=function(){return(new u.default).word8("app_version_major").word8("app_version_minor").word8("app_version_patch").word8("app_max_bundle_size").word8("app_flags")},r._getAppConfig=function(){try{var e=this;return Promise.resolve(e._sendCommand(16,0,0,void 0,1e4)).then(function(r){var t=e._createAppConfigOutput();r.length<t.length()+2&&(t=e._createAppConfigOutputLegacy()),t.setBuffer(r);var n=t.fields;return{app_max_bundle_size:n.app_max_bundle_size,app_flags:n.app_flags,app_version:n.app_version_major+"."+n.app_version_minor+"."+n.app_version_patch}})}catch(e){return Promise.reject(e)}},r._reset=function(e){void 0===e&&(e=!1);try{return Promise.resolve(this._sendCommand(255,e?1:0,0,void 0,1e4)).then(function(){})}catch(e){return Promise.reject(e)}},r._sendCommand=function(e,r,t,n,i){try{var a=this.transport;return Promise.resolve(I(function(){return a.setExchangeTimeout(i),Promise.resolve(a.send(122,e,r,t,n))},function(e){throw e.statusCode&&(e.message=function(e){var r=function(e){switch(e){case 36864:return"Success";case 26368:return"Incorrect input length";case 27264:return"Incorrect data";case 27392:return"Incorrect command parameter";case 27648:return"Incorrect length specified in header";case 27904:return"Invalid INS command";case 28160:return"Incorrect CLA (Wrong application opened)";case 26880:return"Command not allowed (Command out of order)";case 27010:return"Security not satisfied (Device locked)";case 27013:return"Condition of use not satisfied (Denied by the user)";case 25601:return"Security not satisfied (Timeout exceeded)";case 27041:return"Bundle error (Insecure hash)";case 27042:return"Bundle error (Non zero balance)";case 27043:return"Bundle error (Invalid meta transaction)";case 27044:return"Bundle error (Invalid input address/index pair(s))";case 27045:return"Bundle error (Address reused)";case 27012:return"Invalid input data";case 27014:return"App has not been initialized by user";case 27025:return"Invalid transaction index";case 27026:return"Invalid transaction order (Output, Inputs, Change)";case 27027:return"Invalid meta transaction";case 27028:return"Invalid output transaction (Output must come first)"}if(28416<=e&&e<=28671)return"Internal error, please report"}(e);if(r)return"Ledger device: "+r+" (0x"+e.toString(16)+")"}(e.statusCode)||e.message),e}))}catch(e){return Promise.reject(e)}},e}();
//# sourceMappingURL=iota.cjs.map
