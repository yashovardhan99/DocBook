(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";module.exports={init:init,loadAd:loadAd};var _config,Package={Ads:{Layout:require("./layout")},Config:require("../config"),Debug:require("../debug"),Intersection:require("../intersection")},_lazyLoadUnits=[],_prebid={},_log={timer:0,ads:[],event:{pageview:"pageview",load:"load",impression:"impression"}};function init(){Package.Debug.trace("DDC.Ads.Display.init"),(_config=Package.Config.get(["ads","display"]))&&_config.units&&_config.units.length&&(_config.gptLazyLoad=Package.Config.get(["ads","gptLazyLoad"]),run(),logPageView())}function run(){Package.Debug.trace("DDC.Ads.Display.run"),initGoogleTag()&&(_config.units=Package.Ads.Layout.process(_config.units),Package.Config.storeData("displayAdsRenderCount",_config.units.length),Package.Intersection.hasSupport()&&!_config.gptLazyLoad&&(_lazyLoadUnits=_config.units.filter(function(e){return e.lazy}),_config.units=_config.units.filter(function(e){return!e.lazy}),_lazyLoadUnits.forEach(function(e){return Package.Intersection.observe("#"+e.code,2,handleLazyLoad)})),setup(_config.targeting),loadAds(_config.units))}function setup(e){window.googletag.cmd.push(function(){for(var o in e)e.hasOwnProperty(o)&&window.googletag.pubads().setTargeting(o,e[o]);window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().enableAsyncRendering(),_config.gptLazyLoad?window.googletag.pubads().enableLazyLoad(_config.gptLazyLoad):window.googletag.pubads().disableInitialLoad(),window.googletag.pubads().addEventListener("slotRenderEnded",logAdLoad),window.googletag.pubads().addEventListener("impressionViewable",logAdImpression),window.googletag.enableServices()})}function handleLazyLoad(e){Package.Debug.trace("DDC.Ads.Display.handleLazyLoad",e.id),loadAd(_lazyLoadUnits.find(function(o){return o.code===e.id}))}function loadAd(e){Package.Debug.trace("DDC.Ads.Display.loadAd",e.code),loadAds([e])}function loadAds(e){Package.Debug.trace("DDC.Ads.Display.loadAds",e.length),initGoogleTag()&&window.googletag.cmd.push(function(){var o=[],a=[];e.forEach(function(e){e.slot=defineAdSlot(e.section,e.sizes,e.code,e.targeting),e.prebid?o.push(e.slot):a.push(e.slot),window.googletag.display(e.code)}),o.length&&loadPrebidAds(o),a.length&&!_config.gptLazyLoad&&window.googletag.pubads().refresh(a)})}function defineAdSlot(e,o,a,n){Package.Debug.trace("DDC.Ads.Display.defineAdSlot",e,o,a,n);var t=window.googletag.defineSlot(e,o,a);if(!t)return Package.Debug.trace("DDC.Ads.Display.defineAdSlot:failed",e,o,a,{level:"error"}),null;for(var i in t.addService(window.googletag.pubads()),n)n.hasOwnProperty(i)&&t.setTargeting(i,n[i]);return t}function loadPrebidAds(e){Package.Debug.trace("DDC.Ads.Display.loadPrebidAds",e.length);var o=e[0].code;_prebid[o]={startTime:Date.now(),responseHandled:0},window.pbjs.rp.requestBids({callback:function(e){handlePrebidResponse(e,o,"success")},gptSlotObjects:e,data:{}}),window.setTimeout(function(){return handlePrebidResponse(e,o,"timeout")},_config.timeout+250)}function handlePrebidResponse(e,o,a){if(!_prebid[o].responseHandled++){var n=Date.now()-_prebid[o].startTime;Package.Debug.trace("DDC.Ads.Display.handlePrebidResponse",e.length,o,a,n),window.googletag.cmd.push(function(){return window.googletag.pubads().refresh(e)})}}function initGoogleTag(){Package.Debug.trace("DDC.Ads.Display.initGoogleTag");try{return window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],window.pbjs=window.pbjs||{},window.pbjs.rp=window.pbjs.rp||{},"function"==typeof window.googletag.cmd.push}catch(e){return!1}}function logPageView(){Package.Debug.trace("DDC.Ads.Display.logPageView"),addLogEvent({event:_log.event.pageview})}function logAdLoad(e){Package.Debug.trace("DDC.Ads.Display.logAdLoad"),addLogEvent({event:_log.event.load,lineItemId:e.sourceAgnosticLineItemId,creativeId:e.sourceAgnosticCreativeId,slotId:e.slot.getSlotElementId(),adUnit:e.slot.getAdUnitPath().replace("/7146/",""),size:e.size,isEmpty:e.isEmpty})}function logAdImpression(e){Package.Debug.trace("DDC.Ads.Display.logAdImpression"),addLogEvent({event:_log.event.impression,slotId:e.slot.getSlotElementId(),adUnit:e.slot.getAdUnitPath().replace("/7146/","")})}function addLogEvent(e){Package.Debug.trace("DDC.Ads.Display.addLogEvent",e.slotId),_log.ads.push(e),window.clearTimeout(_log.timer),_log.timer=window.setTimeout(sendLog,1e3)}function sendLog(){Package.Debug.trace("DDC.Ads.Display.sendLog",_log.ads.length);var e=Package.Debug.getData();if(e.ads=_log.ads.slice(),window.fetch){var o={method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};window.fetch(_config.logUrl,o)}else if(window.jQuery){var a={method:"POST",contentType:"application/json",data:JSON.stringify(e)};$.ajax(_config.logUrl,a)}_log.ads=[]}

},{"../config":3,"../debug":4,"../intersection":5,"./layout":2}],2:[function(require,module,exports){
(function (process){
"use strict";module.exports={process:process};var Package={Debug:require("../debug")};function process(e){return Package.Debug.trace("DDC.Ads.Layout.process"),e=checkSidebar300Ads(e=checkSidebar160Ads(e=checkLeaderboard970Ads(e=checkAdElementExists(e))))}function checkAdElementExists(e){return Package.Debug.trace("DDC.Ads.Layout.checkAdElementExists",e.length),e.filter(function(e){return!!document.getElementById(e.code)})}function checkLeaderboard970Ads(e){return Package.Debug.trace("DDC.Ads.Layout.checkLeaderboard970Ads",e.length),e.forEach(function(e){e.sizes=e.sizes.filter(function(e){return e[0]<970||e[0]<window.innerWidth-30&&window.innerHeight>1e3})}),e}function checkSidebar160Ads(e){return Package.Debug.trace("DDC.Ads.Layout.checkSidebar160Ads",e.length),e.filter(function(e){if(e.layout&&e.layout.requiredFixedPosition){var t=getAncestorByClassName(e.code,e.layout.wrappingClass);if(t&&"fixed"!==getCssValue(t,"position")&&(removeSiblingsFloat(t),removeElement(t)))return!1}return!0})}function checkSidebar300Ads(e){Package.Debug.trace("DDC.Ads.Layout.checkSidebar300Ads",e.length);for(var t=e.length-1;t>=0;t--){if(isLayoutInvalid(e[t]))removeElement(getAncestorByClassName(e[t].code,e[t].layout.wrappingClass))&&e.splice(t,1)}return e}function isLayoutInvalid(e){return Package.Debug.trace("DDC.Ads.Layout.isLayoutInvalid",e.code),!!e.layout&&(!!(e.layout.requiresContentHeight&&getHeight("sidebar")>getHeight("content"))||(!(!e.layout.requiresSidebarFloat||!isTabletPortrait())||!!(e.layout.percentageCutoff&&getOffsetTopPercentage(e)>e.layout.percentageCutoff)))}function getOffsetTopPercentage(e){Package.Debug.trace("DDC.Ads.Layout.getOffsetTopPercentage",e.code);var t=document.getElementById(e.code),n=t?t.getBoundingClientRect():null;return n&&n.top?(n.top+(window.pageYOffset||0))/document.body.clientHeight*100:0}function getAncestorByClassName(e,t){Package.Debug.trace("DDC.Ads.Layout.getAncestorByClassName",e,t);var n=document.getElementById(e);if(!n)return null;for(;n=n.parentElement;)if(n&&n.classList&&n.classList.contains(t))return n;return null}function getCssValue(e,t){return Package.Debug.trace("DDC.Ads.Layout.getCssValue",t),e?window.getComputedStyle(e).getPropertyValue(t):null}function getHeight(e){Package.Debug.trace("DDC.Ads.Layout.getHeight",e);var t=document.getElementById(e);return t?t.clientHeight:null}function removeElement(e){return Package.Debug.trace("DDC.Ads.Layout.removeElement"),e?e.parentNode.removeChild(e):null}function removeSiblingsFloat(e){if(Package.Debug.trace("DDC.Ads.Layout.removeSiblingsFloat"),e.parentNode&&e.parentNode.childNodes&&e.parentNode.childNodes.length)for(var t=0;t<e.parentNode.childNodes.length;t++){var n=e.parentNode.childNodes[t];n.classList&&n.classList.contains("sideBoxFloatLeft")&&n.classList.remove("sideBoxFloatLeft")}}function isTabletPortrait(){var e=window.devicePixelRatio||1;return window.innerHeight>window.innerWidth&&window.innerWidth/e<=1024}

}).call(this,require('_process'))
},{"../debug":4,"_process":6}],3:[function(require,module,exports){
"use strict";module.exports={site:site,get:get,retrieveData:retrieveData,storeData:storeData};var Package={Debug:require("./debug")};function site(){return window.SITECONFIG||{}}function get(t){if(!Array.isArray(t))throw"Config.get() parameter 'keys' must be an array";for(var e=site(),a=0;a<t.length;a++){if(void 0===e[t[a]])return null;e=e[t[a]]}return e}function retrieveData(t){Package.Debug.trace("DDC.Config.retrieveData",t);var e=site();return e.dataStore=e.dataStore||{},void 0!==e.dataStore[t]?e.dataStore[t]:null}function storeData(t,e){Package.Debug.trace("DDC.Config.storeData",t);var a=site();a.dataStore=a.dataStore||{},a.dataStore[t]=e}

},{"./debug":4}],4:[function(require,module,exports){
"use strict";function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}var _options,_guid;module.exports={init:init,get:get,set:set,add:add,dir:dir,history:history,trace:trace,getData:getData,getUrlHistory:getUrlHistory,getStackTrace:getStackTrace,isDev:isDev};var _limit={stackTrace:100,urlHistory:10},_colors={0:"EEE",1:"AAA",2:"222",3:"00F",error:"C00",label:"C0C"},_isDev=window.location.hostname&&!window.location.hostname.match(/www\.drugs\.com/);function init(){_options=loadFromCache(),window.SITEVARS=window.SITEVARS||{},window.SITEVARS.stackTrace=window.SITEVARS.stackTrace||[],window.SITEVARS.urlHistory=window.SITEVARS.urlHistory||[],isEnabled()?(log("DDC.Debug.init","label"),setupDefaults(),get()):_isDev&&window.console&&window.console.log("For debugging options, refer to JS project README.")}function get(o){var t=[];if(isEnabled())return o&&"hide"!==o||t.push("hide: "+JSON.stringify(_options.hide)),o&&"show"!==o||t.push("show: "+JSON.stringify(_options.show)),o&&"mark"!==o||t.push("mark: "+JSON.stringify(_options.mark)),log("{"+t.join(", ")+"}","label"),_options}function set(o){return setupDefaults(),o.hide&&(_options.hide=o.hide),o.show&&(_options.show=o.show),o.mark&&(_options.mark=o.mark),saveToCache(_options),_options}function add(o){return setupDefaults(),o.hide&&(o.hide=_options.hide.concat(o.hide)),o.show&&(o.show=_options.show.concat(o.show)),o.mark&&(o.mark=_options.mark.concat(o.mark)),set(o)}function getData(){_guid=_guid||Date.now();var o=window.location.pathname.split("/"),t=window.SITECONFIG&&window.SITECONFIG.user?window.SITECONFIG.user:{userid:0,ipAddress:""};return{guid:_guid,request:{section:o.length>2?o[1]:"misc",url:window.location.href||null,hash:window.location.hash||null},user:{userId:t.userid,ipAddress:t.ipAddress},navigator:{platform:window.navigator.platform||null,userAgent:window.navigator.userAgent||null,cookieEnabled:window.navigator.cookieEnabled||null,doNotTrack:window.navigator.doNotTrack||null,languages:window.navigator.languages||null}}}function log(o,t){if(t&&window.console){var n="color: #"+_colors[t];window.console.log("%c%s",n,o)}}function dir(o,t){isEnabled()&&(t&&log("Object: "+t,"label"),window.console.log("%o",o))}function history(o){window.SITEVARS.urlHistory.push(o),window.SITEVARS.urlHistory.length>_limit.urlHistory&&window.SITEVARS.urlHistory.shift()}function getUrlHistory(o){if(!window.SITEVARS||!window.SITEVARS.urlHistory||!window.SITEVARS.urlHistory.length)return[];var t=window.SITEVARS.urlHistory;return o=o||_limit.urlHistory,t.slice(Math.max(t.length-o,0))}function trace(){var o=Array.prototype.slice.call(arguments);if(addStackTrace(o.join(" : ")),isEnabled()){var t=translateLevel(o[0]);log(stringifyArguments(o),t)}}function translateLevel(o){var t;if(_options&&_options.mark)for(t=0;t<_options.mark.length;t++)if(0===o.lastIndexOf(_options.mark[t],0))return 3;if(_options&&_options.show)for(t=0;t<_options.show.length;t++)if(0===o.lastIndexOf(_options.show[t],0))return 1;return 0}function stringifyArguments(o){for(var t=0;t<o.length;t++)if("object"===_typeof(o[t]))try{o[t]=JSON.stringify(o[t]).replace(/"/g,"")}catch(o){}return o.join(" : ")}function addStackTrace(o){window.SITEVARS.stackTrace.push(o),window.SITEVARS.stackTrace.length>_limit.stackTrace&&window.SITEVARS.stackTrace.shift()}function getStackTrace(o){if(!window.SITEVARS||!window.SITEVARS.stackTrace||!window.SITEVARS.stackTrace.length)return[];var t="",n=[];window.SITEVARS.stackTrace.forEach(function(o){t===o?n[n.length-1].count++:(n.push({label:o,count:1}),t=o)}),o=o||_limit.stackTrace,n=n.slice(Math.max(n.length-o,0));var i=[];return n.forEach(function(o){o.count>1?i.push(o.label+" (x"+o.count+")"):i.push(o.label)}),i}function isDev(){return _isDev}function isEnabled(){return _options&&"object"===_typeof(_options)}function setupDefaults(){(_options=_options||{}).hide=_options.hide||[],_options.show=_options.show||[],_options.mark=_options.mark||[]}function loadFromCache(){try{var o=window.localStorage.getItem("DDC.Debug.options");return JSON.parse(o)}catch(o){return""}}function saveToCache(o){var t=JSON.stringify(o);return window.localStorage.setItem("DDC.Debug.options",t)}

},{}],5:[function(require,module,exports){
"use strict";module.exports={observe:observe,hasSupport:hasSupport};var Package={Debug:require("./debug")};function observe(e,t,r){Package.Debug.trace("DDC.Intersection.observe",e,t);var n={rootMargin:100*t+"% 0%",threshold:0};attach(e,new window.IntersectionObserver(function(e,t){e.forEach(function(e){e.isIntersecting&&(r(e.target),t.unobserve(e.target))})},n))}function attach(e,t){Package.Debug.trace("DDC.Intersection.attach",e),[].slice.call(document.querySelectorAll(e)).forEach(function(e){return t.observe(e)})}function hasSupport(){return"IntersectionObserver"in window}

},{"./debug":4}],6:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(require,module,exports){
"use strict";var Package={Ads:{Display:require("ddc-ads/display")},Debug:require("ddc-debug")};window.DDC=window.DDC||{},window.DDC.Ads=window.DDC.Ads||{},window.DDC.Ads.Display=Package.Ads.Display,Package.Debug.init(),Package.Ads.Display.init();

},{"ddc-ads/display":1,"ddc-debug":4}]},{},[7]);
