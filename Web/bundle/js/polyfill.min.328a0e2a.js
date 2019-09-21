Date.now||(Date.now=function(){return(new Date).getTime()}),String.prototype.padStart||(String.prototype.padStart=function(
targetLength,padString){return targetLength>>=0,padString=String(void 0!==padString?padString:" "),
this.length>=targetLength?String(this):((targetLength-=this.length)>padString.length&&(padString+=padString.repeat(
targetLength/padString.length)),padString.slice(0,targetLength)+String(this))}),String.prototype.includes||(
String.prototype.includes=function(search,start){return"number"!=typeof start&&(start=0),!(start+search.length>this.length
)&&-1!==this.indexOf(search,start)}),String.prototype.startsWith||(String.prototype.startsWith=function(search,pos){
return this.substring(!pos||pos<0?0:+pos,search.length)===search}),String.prototype.endsWith||(
String.prototype.endsWith=function(search,pos){return(void 0===pos||pos>this.length)&&(pos=this.length),this.substring(
pos-search.length,pos)===search}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(
/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),Array.isArray||(Array.isArray=function(arg){
return"[object Array]"===Object.prototype.toString.call(arg)}),Array.prototype.filter||(Array.prototype.filter=function(func,
thisArg){"use strict";if("Function"!=typeof func&&"function"!=typeof func||!this)throw new TypeError;var len=this.length>>>0,
res=new Array(len),t=this,c=0,i=-1;if(void 0===thisArg)for(;++i!=len;)i in this&&func(t[i],i,t)&&(res[c++]=t[i]);else for(
;++i!=len;)i in this&&func.call(thisArg,t[i],i,t)&&(res[c++]=t[i]);return res.length=c,res}),Array.prototype.forEach||(
Array.prototype.forEach=function(callback){var T,k;if(null==this)throw new TypeError("this is null or not defined")
;var O=Object(this),len=O.length>>>0;if("function"!=typeof callback)throw new TypeError(callback+" is not a function");for(
1<arguments.length&&(T=arguments[1]),k=0;k<len;){var kValue;k in O&&(kValue=O[k],callback.call(T,kValue,k,O)),k++}}),
Array.prototype.includes||(Array.prototype.includes=function(valueToFind,fromIndex){if(null==this)throw new TypeError(
'"this" is null or not defined');var o=Object(this),len=o.length>>>0;if(0==len)return!1;var x,y,n=0|fromIndex,k=Math.max(
0<=n?n:len-Math.abs(n),0);for(;k<len;){if((x=o[k])===(y=valueToFind)||"number"==typeof x&&"number"==typeof y&&isNaN(x)&&isNaN(y)
)return!0;k++}return!1}),Array.prototype.some||(Array.prototype.some=function(fun,thisArg){"use strict";if(null==this
)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof fun)throw new TypeError;for(
var t=Object(this),len=t.length>>>0,i=0;i<len;i++)if(i in t&&fun.call(thisArg,t[i],i,t))return!0;return!1}),
Array.prototype.find||(Array.prototype.find=function(predicate){if(null==this)throw new TypeError(
'"this" is null or not defined');var o=Object(this),len=o.length>>>0;if("function"!=typeof predicate)throw new TypeError(
"predicate must be a function");for(var thisArg=arguments[1],k=0;k<len;){var kValue=o[k];if(predicate.call(thisArg,kValue,k,o)
)return kValue;k++}}),Number.isNaN=Number.isNaN||function(value){return value!=value},window.JSON||(window.JSON={parse:function(
sJSON){return eval("("+sJSON+")")},stringify:function(){var toString=Object.prototype.toString,
hasOwnProperty=Object.prototype.hasOwnProperty,isArray=Array.isArray||function(a){return"[object Array]"===toString.call(a)},
escMap={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},escFunc=function(m){
return escMap[m]||"\\u"+(m.charCodeAt(0)+65536).toString(16).substr(1)},escRE=/[\\"\u0000-\u001F\u2028\u2029]/g
;return function stringify(value){if(null==value)return"null";if("number"==typeof value)return isFinite(value)?value.toString(
):"null";if("boolean"==typeof value)return value.toString();if("object"==typeof value){if("function"==typeof value.toJSON
)return stringify(value.toJSON());if(isArray(value)){for(var res="[",i=0;i<value.length;i++)res+=(i?", ":"")+stringify(value[i])
;return res+"]"}if("[object Object]"===toString.call(value)){var tmp=[];for(var k in value)hasOwnProperty.call(value,k
)&&tmp.push(stringify(k)+": "+stringify(value[k]));return"{"+tmp.join(", ")+"}"}}return'"'+value.toString().replace(escRE,
escFunc)+'"'}}()}),!window.navigator||"sendBeacon"in window.navigator||(window.navigator.sendBeacon=function(url,data){try{
var xhr="XMLHttpRequest"in window?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");xhr.open("POST",url,!0),
xhr.withCredentials=!0,xhr.setRequestHeader("Accept","*/*"),"string"==typeof data&&(xhr.setRequestHeader("Content-Type",
"text/plain;charset=UTF-8"),xhr.responseType="text/plain"),xhr.send(data)}catch(error){}return!0});