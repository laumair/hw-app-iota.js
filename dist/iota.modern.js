import e from"struct";import t from"iota.lib.js/lib/crypto/bundle/bundle.js";import{addChecksum as r,noChecksum as a,transactionTrytes as s}from"iota.lib.js/lib/utils/utils.js";import n from"bip32-path";import i from"semver";import d from"joi";function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}const u=d.number().integer(),c=u.min(1).max(3),l=u.min(0).max(4294967295),p=u.min(0).max(0x9dff7d32d5dc1),h=u.min(1).max(0x9dff7d32d5dc1),g=d.string().regex(/^[A-Z9]+$/),f=g.allow("").max(27),_=d.alternatives().try(g.length(81),g.length(90)),m=d.array().items(d.object({address:_.required(),tag:f.required(),value:p.required()}).unknown()).min(1),w=d.array().items(d.object({address:_.required(),balance:h.required(),keyIndex:l.required(),tags:d.array().items(f).optional()}).unknown()).min(1),y=d.object({address:_.required(),keyIndex:l.required(),tag:f.optional()}).unknown(),x="9".repeat(27);class b{constructor(e){e.decorateAppAPIMethods(this,["setActiveSeed","getAddress","prepareTransfers","getAppVersion","getAppMaxBundleSize"],"IOT"),this.transport=e,this.config=void 0,this.security=0,this.pathArray=void 0}async setActiveSeed(e,t=2){d.assert(e,d.string().required()),d.assert(t,c.required()),this.pathArray=b._validatePath(e),this.security=t,this.config=this.config?this.config:await this._getAppConfig(),i.satisfies(this.config.app_version,"<0.5")?(this._createPubkeyInput=this._createPubkeyInputLegacy,this._createTxInput=this._createTxInputLegacy,await this._setSeed()):await this._reset(!0)}async getAddress(e,t={}){this._assertInitialized(),d.assert(e,l.required());const a=t.checksum||!1,s=t.display||!1,n=await this._publicKey(e,s);return a?r(n):n}async prepareTransfers(e,t,r,a=(()=>Date.now())){if(this._assertInitialized(),d.assert(e,m.required()),d.assert(t,w.required()),d.assert(r,y.optional()),d.assert(a,d.func().arity(0).required()),1!=e.length)throw new Error("unsupported number of transfers");r=b._validateRemainder(e,t,r);const s=await this._prepareTransfers(e,t,r,a);return await this._reset(!0),s}async getAppVersion(){const e=await this._getAppConfig();return this.config=e,e.app_version}async getAppMaxBundleSize(){const e=await this._getAppConfig();return this.config=e,e.app_max_bundle_size?e.app_max_bundle_size:8}static _validatePath(e){let t;try{t=n.fromString(e).toPathArray()}catch(e){throw new Error('"path" invalid: '+e.message)}if(!t||t.length<2||t.length>5)throw new Error('"path" invalid: Invalid path length');return t}_assertInitialized(){if(!this.security)throw new Error("seed not yet initialized")}_addSeedFields(e){return e.word8("security").word32Ule("pathLength").array("pathArray",this.pathArray.length,"word32Ule")}_initSeedFields(e){const t=e.fields;t.security=this.security,t.pathLength=this.pathArray.length,t.pathArray=this.pathArray}async _setSeed(){const t=new e;this._addSeedFields(t),t.allocate(),this._initSeedFields(t),await this._sendCommand(1,0,0,t.buffer(),1e4)}_createPubkeyInputLegacy(t){let r=new e;return r=r.word32Ule("index"),r.allocate(),r.fields.index=t,r}_createPubkeyInput(t){let r=new e;return this._addSeedFields(r),r=r.word32Ule("index"),r.allocate(),this._initSeedFields(r),r.fields.index=t,r}async _publicKey(t,r){const a=this._createPubkeyInput(t),s=await this._sendCommand(2,r?1:0,0,a.buffer(),1e4),n=(new e).chars("address",81);return n.setBuffer(s),n.fields.address}static _validateRemainder(e,t,r){const a=t.reduce((e,t)=>e+t.balance,0),s=e.reduce((e,t)=>e+t.value,0);if(a<s)throw new Error("insufficient balance");if(a>s){if(!r)throw new Error('"remainder" is required');return{address:r.address,value:a-s,keyIndex:r.keyIndex}}}async _sign(t,r){const a=(new e).word32Ule("index");a.allocate(),a.fields.index=t;const s=await this._sendCommand(4,0,0,a.buffer(),1e4),n=(new e).chars("signature",r).word8Sle("fragmentsRemaining");return n.setBuffer(s),{signature:n.fields.signature,fragmentsRemaining:n.fields.fragmentsRemaining}}_createTxInputLegacy(t,r,a,s,n,i,d){let o=new e;o=o.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time"),o.allocate();const u=o.fields;return u.address=t,u.address_idx=r,u.value=a,u.tag=s,u.tx_idx=n,u.tx_len=i,u.time=d,o}_createTxInput(t,r,a,s,n,i,d){let o=new e;0==n&&this._addSeedFields(o),o=o.chars("address",81).word32Ule("address_idx").word64Sle("value").chars("tag",27).word32Ule("tx_idx").word32Ule("tx_len").word32Ule("time"),o.allocate(),0==n&&this._initSeedFields(o);const u=o.fields;return u.address=t,u.address_idx=r,u.value=a,u.tag=s,u.tx_idx=n,u.tx_len=i,u.time=d,o}async _transaction(t,r,a,s,n,i,d){const o=this._createTxInput(t,r,a,s,n,i,d);let u=1e4;n==i&&(u=15e4);const c=await this._sendCommand(3,0==n?0:128,0,o.buffer(),u),l=(new e).word8("finalized").chars("bundleHash",81);return l.setBuffer(c),{finalized:l.fields.finalized,bundleHash:l.fields.bundleHash}}async _getSignatureFragments(e,t){const r=2187*this.security/t;let a="";for(let s=1;s<=r;s++){const n=await this._sign(e,t);if(a+=n.signature,s===r!=(0===n.fragmentsRemaining))throw new Error("wrong signture length")}return a.match(/.{2187}/g)}async _addSignatureFragmentsToBundle(e){for(let t=0;t<e.bundle.length;t++){const r=e.bundle[t];if(r.value>=0)continue;const a=await this._getSignatureFragments(t,243);r.signatureMessageFragment=a.shift();const s=r.address;for(let r=1;r<this.security;r++){if(++t>=e.bundle.length)return;const r=e.bundle[t];r.address===s&&0===r.value&&(r.signatureMessageFragment=a.shift())}}}async _signBundle(e,t){let r=!1,a="";for(const s of e.bundle){const e=t[s.address]?t[s.address]:0,n=await this._transaction(s.address,e,s.value,s.obsoleteTag,s.currentIndex,s.lastIndex,s.timestamp);r=n.finalized,a=n.bundleHash}if(!r)throw new Error("bundle not finalized");if(a!==e.bundle[0].bundle)throw new Error("wrong bundle hash");await this._addSignatureFragmentsToBundle(e)}_hasDuplicateAddresses(e,t,r){const a=new Set;return e.forEach(e=>a.add(e.address)),t.forEach(e=>a.add(e.address)),!(!r||!a.has(r.address))||a.length===e.length+t.length}async _prepareTransfers(e,r,n,i){if(e=e.map(e=>o({},e,{address:a(e.address),tag:e.tag?e.tag.padEnd(27,"9"):x})),r=r.map(e=>o({},e,{address:a(e.address),tags:e.tags?e.tags.map(e=>e.padEnd(27,"9")):null})),n&&(n=o({},n,{address:a(n.address),tag:n.tag?n.tag.padEnd(27,"9"):x})),this._hasDuplicateAddresses(e,r,n))throw new Error("transaction must not contain duplicate addresses");const d=Math.floor(i()/1e3);let u=new t;e.forEach(e=>u.addEntry(1,e.address,e.value,e.tag,d,-1)),r.forEach(e=>{for(let t=0;t<this.security;t++)u.addEntry(1,e.address,0==t?-e.balance:0,e.tags?e.tags[t]:x,d,e.keyIndex)}),n&&u.addEntry(1,n.address,n.value,n.tag,d,n.keyIndex),u.addTrytes([]),u.finalize();const c={};r.forEach(e=>c[e.address]=e.keyIndex),n&&(c[n.address]=n.keyIndex),await this._signBundle(u,c);const l=[];return u.bundle.forEach(e=>l.push(s(e))),l.reverse()}_createAppConfigOutputLegacy(){return(new e).word8("app_flags").word8("app_version_major").word8("app_version_minor").word8("app_version_patch")}_createAppConfigOutput(){return(new e).word8("app_version_major").word8("app_version_minor").word8("app_version_patch").word8("app_max_bundle_size").word8("app_flags")}async _getAppConfig(){const e=await this._sendCommand(16,0,0,void 0,1e4);let t=this._createAppConfigOutput();e.length<t.length()+2&&(t=this._createAppConfigOutputLegacy()),t.setBuffer(e);const r=t.fields;return{app_max_bundle_size:r.app_max_bundle_size,app_flags:r.app_flags,app_version:r.app_version_major+"."+r.app_version_minor+"."+r.app_version_patch}}async _reset(e=!1){await this._sendCommand(255,e?1:0,0,void 0,1e4)}async _sendCommand(e,t,r,a,s){const n=this.transport;try{return n.setExchangeTimeout(s),await n.send(122,e,t,r,a)}catch(e){throw e.statusCode&&(e.message=function(e){const t=function(e){switch(e){case 36864:return"Success";case 26368:return"Incorrect input length";case 27264:return"Incorrect data";case 27392:return"Incorrect command parameter";case 27648:return"Incorrect length specified in header";case 27904:return"Invalid INS command";case 28160:return"Incorrect CLA (Wrong application opened)";case 26880:return"Command not allowed (Command out of order)";case 27010:return"Security not satisfied (Device locked)";case 27013:return"Condition of use not satisfied (Denied by the user)";case 25601:return"Security not satisfied (Timeout exceeded)";case 27041:return"Bundle error (Insecure hash)";case 27042:return"Bundle error (Non zero balance)";case 27043:return"Bundle error (Invalid meta transaction)";case 27044:return"Bundle error (Invalid input address/index pair(s))";case 27045:return"Bundle error (Address reused)";case 27012:return"Invalid input data";case 27014:return"App has not been initialized by user";case 27025:return"Invalid transaction index";case 27026:return"Invalid transaction order (Output, Inputs, Change)";case 27027:return"Invalid meta transaction";case 27028:return"Invalid output transaction (Output must come first)"}if(28416<=e&&e<=28671)return"Internal error, please report"}(e);if(t)return`Ledger device: ${t} (0x${e.toString(16)})`}(e.statusCode)||e.message),e}}}export default b;
//# sourceMappingURL=iota.modern.js.map
