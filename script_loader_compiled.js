var g=void 0,i=!0,k=null,l=!1,m=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b};Math.floor(2147483648*Math.random()).toString(36);
var ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},n=function(a,b,c){n=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return n.apply(k,arguments)},o=Date.now||function(){return+new Date},
p=function(a,b){var c=a.split("."),d=m;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&b!==g?d[e]=b:d=d[e]?d[e]:d[e]={}},q=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c};Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return n.apply(k,c)}return n(this,a)};var da=function(a,b,c,d){this.gl=a;this.setTimeoutFunction=b;this.getTimeFunction=c;this.callback=d;this.startTime=c();this.textureCounts=0;this.error=""},fa=function(a,b,c,d){b=new da(a,b,c,d);c=a.canvas;if(1024!=c.width||1024!=c.height)c.width=1024,c.height=1024,a.viewport(0,0,c.width,c.height);ea(b)},ga=function(a){a.counter=0;a.startTextureBenchmarkTime=a.getTimeFunction();if(a.gl){a.texture={};var b=a.gl,c=b.createShader(b.VERTEX_SHADER);b.shaderSource(c,"precision highp float;\nattribute vec3 position;\nattribute vec2 offsetCoord;\nuniform float increment;\nvarying vec2 offsetsTexCoord;\nvarying vec2 imageTexCoord;\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n  imageTexCoord = vec2((position.x + 1.0) / 2.0, (position.y - 1.0) / -2.0);\n  float offsetIndex = position.x * position.y * 32.;\n  offsetsTexCoord = vec2((offsetIndex + 0.5) / 8., 0.5);\n}\n");
b.compileShader(c);if(b.getShaderParameter(c,b.COMPILE_STATUS)){var d=b.createShader(b.FRAGMENT_SHADER);b.shaderSource(d,"precision highp float;\nvarying vec2 offsetsTexCoord;\nvarying vec2 imageTexCoord;\nuniform float increment;\nuniform sampler2D offsetsTex;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform sampler2D texture3;\nuniform sampler2D texture4;\nuniform sampler2D texture5;\nvec4 blurTexture(sampler2D tex, vec2 delta) {\n  vec4 color = vec4(0., 0., 0., 0.);\n  color += 0.5 * texture2D(tex, imageTexCoord - increment * delta);\n  color += 0.5 * texture2D(tex, imageTexCoord + increment * delta);\n  return color;\n}\nvoid main() {\n  vec2 ctr = 255. * texture2D(offsetsTex, offsetsTexCoord).xy;\n  vec4 color = vec4(0., 0., 0., 0.);\n  color.rgb += 0.2 + 0.1 * (ctr.x + ctr.y);\n  ctr *= 5.;\n  color += blurTexture(texture1, ctr + vec2(1, 0)) * 0.2;\n  color += blurTexture(texture2, ctr + vec2(0, 1)) * 0.2;\n  color += blurTexture(texture3, ctr + vec2(0, 0)) * 0.2;\n  color += blurTexture(texture4, ctr + vec2(1, 1)) * 0.2;\n  color += blurTexture(texture5, ctr + vec2(-1, 1)) * 0.2;\n  gl_FragColor = color;\n}\n");
b.compileShader(d);if(b.getShaderParameter(d,b.COMPILE_STATUS)){var e=b.createProgram();b.attachShader(e,c);b.attachShader(e,d);b.linkProgram(e);if(b.getProgramParameter(e,b.LINK_STATUS)){b.useProgram(e);a.texture.program=e;a.texture.textureSize=256;a.texture.incrementLocation=b.getUniformLocation(e,"increment");a.texture.positionLocation=b.getAttribLocation(e,"position");b.enableVertexAttribArray(a.texture.positionLocation);a.texture.numQuadsPerSide=64;for(var f=2/a.texture.numQuadsPerSide,h=[],
c=0;c<a.texture.numQuadsPerSide;++c)for(d=0;d<a.texture.numQuadsPerSide;++d){var j=[c*f-1,-d*f+1];h.push(j[0],j[1],0);for(var s=0;2>s;++s)h.push(j[0],j[1]-f,0),h.push(j[0]+f,j[1],0);h.push(j[0]+f,j[1]-f,0)}a.texture.positions=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,a.texture.positions);b.bufferData(b.ARRAY_BUFFER,new Float32Array(h),b.STATIC_DRAW);a.texture.positionCount=6*a.texture.numQuadsPerSide*a.texture.numQuadsPerSide;a.texture.positionSize=3;a.texture.textures=[];f=[];for(c=0;c<a.texture.textureSize;++c)for(d=
0;d<a.texture.textureSize;++d)f.push(0,155*(c/32%2^d/32%2),155,255);d=new Uint8Array(f);for(c=0;5>c;++c)f=b.createTexture(),b.bindTexture(b.TEXTURE_2D,f),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a.texture.textureSize,a.texture.textureSize,0,b.RGBA,b.UNSIGNED_BYTE,d),a.texture.textures.push({texture:f,unit:c,location:b.getUniformLocation(e,"texture"+c)});d=b.createTexture();b.bindTexture(b.TEXTURE_2D,
d);f=[1,1,0,0,2,1,0,0,2,2,0,0,1,2,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0];b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.REPEAT);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.REPEAT);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,f.length/4,1,0,b.RGBA,b.UNSIGNED_BYTE,new Uint8Array(f));a.texture.textures.push({texture:d,unit:c,location:b.getUniformLocation(e,"offsetsTex")});b.clearColor(0,
1,0,1);b.enable(b.DEPTH_TEST);a.continueTextureBenchmark=function(){var b=a.getTimeFunction();0==a.textureCounts&&(a.firstTextureFrameTime=b);b=a.gl;b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT);b.bindBuffer(b.ARRAY_BUFFER,a.texture.positions);b.vertexAttribPointer(a.texture.positionLocation,a.texture.positionSize,b.FLOAT,l,0,0);b.uniform1f(a.texture.incrementLocation,1/a.texture.textureSize);for(var c=0;c<a.texture.textures.length;++c){var d=a.texture.textures[c];b.activeTexture(b.TEXTURE0+d.unit);
b.bindTexture(b.TEXTURE_2D,d.texture);b.uniform1i(d.location,d.unit)}b.drawArrays(b.TRIANGLES,0,a.texture.positionCount);a.textureCounts++;500>a.getTimeFunction()-a.firstTextureFrameTime?a.setTimeoutFunction(a.continueTextureBenchmark,0):(a.finishTextureBenchmarkTime=a.getTimeFunction(),r(a))};a.continueTextureBenchmark()}else a.error="Error in program linking:"+b.getProgramInfoLog(e),r(a)}else a.error="Error compiling fshader: "+b.getShaderInfoLog(d),r(a)}else a.error="Error compiling vshader: "+
b.getShaderInfoLog(c),r(a)}else r(a)},ea=function(a){a.startGpuBenchmarkTime=a.getTimeFunction();if(a.gl){a.gpuRuns1=[];a.gpuRuns2=[];a.gpuIterations=1;a.gpuRate=0;a.gpu={};var b=a.gl,c=b.createShader(b.VERTEX_SHADER);b.shaderSource(c,"precision highp float;\nuniform float counter;\nattribute vec3 position;\nattribute vec2 uv_in;\nvarying vec2 uv;\nvoid main() {\n  uv = uv_in;\n  float angle = counter * 0.02;\n  float scale = 0.5 + counter * 0.02;\n  float cos_a = cos(angle) * scale;\n  float sin_a = sin(angle) * scale;\n  vec2 vx = vec2(cos_a, sin_a);\n  vec2 vy = vec2(-sin_a, cos_a);\n  gl_Position = vec4(vx * position.x + vy * position.y,\n                     0.0,\n                     1.0);\n}\n");
b.compileShader(c);if(b.getShaderParameter(c,b.COMPILE_STATUS)){var d=b.createShader(b.FRAGMENT_SHADER);b.shaderSource(d,"precision highp float;\nvarying vec2 uv;\nfloat MandelbrotIteration(vec2 uv) {\n  float iterations = 0.0;\n  vec2 c = uv;\n  vec2 z = vec2(0.0, 0.0);\n  for (int i = 0; i < 32; i++) {\n    if (dot(z, z) < 4.0) {\n      z = vec2(z.x * z.x - z.y * z.y + c.x,\n               z.x * z.y * 2.0 + c.y);\n      iterations += 1.0;\n    }\n  }\n  return iterations;\n}\nvoid main() {\n  float m = MandelbrotIteration(uv);\n  gl_FragColor = vec4(m / 32.0, m / 32.0, m / 32.0, 1.0);\n}\n");
b.compileShader(d);if(b.getShaderParameter(d,b.COMPILE_STATUS)){var e=b.createProgram();b.attachShader(e,c);b.attachShader(e,d);b.linkProgram(e);b.getProgramParameter(e,b.LINK_STATUS)?(b.useProgram(e),a.gpu.program=e,a.gpu.counterLocation=b.getUniformLocation(e,"counter"),a.gpu.vertices=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,a.gpu.vertices),b.bufferData(b.ARRAY_BUFFER,new Float32Array([-2,-2,0,-2.5,-2,2,-2,0,1.5,-2,-2,2,0,-2.5,2,2,2,0,1.5,2]),b.STATIC_DRAW),a.gpu.indices=b.createBuffer(),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
a.gpu.indices),b.bufferData(b.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),b.STATIC_DRAW),a.gpu.indexCount=6,a.gpu.positionLocation=b.getAttribLocation(e,"position"),b.enableVertexAttribArray(a.gpu.positionLocation),a.gpu.uvInLocation=b.getAttribLocation(e,"uv_in"),b.enableVertexAttribArray(a.gpu.uvInLocation),b.clearColor(0,0,0,1),b.clearDepth(1),b.enable(b.DEPTH_TEST),b.depthFunc(b.LEQUAL),a.continueGpuBenchmark=function(){ha(a)},a.setTimeoutFunction(a.continueGpuBenchmark,0)):(a.error="Error in program linking:"+
b.getProgramInfoLog(e),r(a))}else a.error="Error compiling fshader: "+b.getShaderInfoLog(d),r(a)}else a.error="Error compiling vshader: "+b.getShaderInfoLog(c),r(a)}else r(a)},ha=function(a){var b=a.getTimeFunction();if(1500>b-a.startGpuBenchmarkTime){var c=a.gl;c.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT);c.useProgram(a.gpu.program);c.uniform1f(a.gpu.counterLocation,50);c.bindBuffer(c.ARRAY_BUFFER,a.gpu.vertices);c.vertexAttribPointer(a.gpu.positionLocation,3,c.FLOAT,l,20,0);c.vertexAttribPointer(a.gpu.uvInLocation,
2,c.FLOAT,l,20,12);c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,a.gpu.indices);for(var d=a.getTimeFunction(),e=a.gpuIterations,f=0;f<e;f++)c.drawElements(c.TRIANGLES,a.gpu.indexCount,c.UNSIGNED_SHORT,0);c.finish();c=a.getTimeFunction()-d;d=0;0<c&&(d=Math.round(1E3*e/c));1E3>b-a.startGpuBenchmarkTime&&a.gpuRuns1.push(d);a.gpuRuns2.push(d);100>c&&(a.gpuIterations*=2);a.setTimeoutFunction(a.continueGpuBenchmark,0)}else b=function(a,b){return a-b},a.gpuRuns1.sort(b),a.gpuRate=a.gpuRuns1[a.gpuRuns1.length-1],a.gpuRuns2.sort(b),
a.gpuRate2=a.gpuRuns2[a.gpuRuns2.length-1],ga(a)},r=function(a){var b=0;a.finishTextureBenchmarkTime&&1<a.textureCounts&&(b=Math.round(1E3*a.textureCounts/(a.finishTextureBenchmarkTime-a.startTextureBenchmarkTime)));b={ub_ver:9,ub_gpu_rate:a.gpuRate,ub_gpu_rate2:a.gpuRate2,ub_texture_rate:b};a.error&&(b.ub_error=a.error);a.callback(b)};var ia=function(a,b){for(var c=1;c<arguments.length;c++)var d=(""+arguments[c]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,d);return a},t=function(a){if(!ja.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ka,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(la,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ma,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(na,"&quot;"));return a},ka=/&/g,la=/</g,ma=/>/g,na=/\"/g,ja=/[&<>\"]/;var u,v,w,y,z,A=function(){return m.navigator?m.navigator.userAgent:k};z=y=w=v=u=l;var D;if(D=A()){var oa=m.navigator;u=0==D.indexOf("Opera");v=!u&&-1!=D.indexOf("MSIE");y=(w=!u&&-1!=D.indexOf("WebKit"))&&-1!=D.indexOf("Mobile");z=!u&&!w&&"Gecko"==oa.product}var pa=u,E=v,qa=z,ra=w;var F;if(pa&&m.opera){var sa=m.opera.version;"function"==typeof sa&&sa()}else qa?F=/rv\:([^\);]+)(\)|;)/:E?F=/MSIE\s+([^\);]+)(\)|;)/:ra&&(F=/WebKit\/(\S+)/),F&&F.exec(A());var G,H;H=G=l;var I=A();I&&(-1!=I.indexOf("Firefox")||-1!=I.indexOf("Camino")||-1!=I.indexOf("iPhone")||-1!=I.indexOf("iPod")||-1!=I.indexOf("iPad")||(-1!=I.indexOf("Android")?G=i:-1!=I.indexOf("Chrome")||-1!=I.indexOf("Safari")&&(H=i)));var ta=G,ua=H;var J=function(a){this.bucket_=a?a.sort(this.sortNumber):va;this.analytics_=m._gaq},va=[100,500,1500,2500,5E3];J.prototype._getTimeDiff=function(){return this.stopTime_-this.startTime_};J.prototype.sortNumber=function(a,b){return a-b};J.prototype._recordStartTime=function(a){this.startTime_=a!=g?a:(new Date).getTime()};p("katamari.TimeTracker.prototype._recordStartTime",J.prototype._recordStartTime);J.prototype._recordEndTime=function(a){this.stopTime_=a!=g?a:(new Date).getTime()};
p("katamari.TimeTracker.prototype._recordEndTime",J.prototype._recordEndTime);J.prototype._push=function(a){if(window._gat){var b=window._gat._getTrackerByName();b[a[0]].apply(b,a.splice(1))}else this.analytics_&&this.analytics_.push(a)};p("katamari.TimeTracker.prototype._push",J.prototype._push);
J.prototype._track=function(a,b){if(a==g||0==a.length)a="KatamariTimeTracker";var c,d;for(c=0;c<this.bucket_.length;c++)if(this._getTimeDiff()<this.bucket_[c]){d=0==c?"0-"+this.bucket_[0]:this.bucket_[c-1]+"-"+(this.bucket_[c]-1);break}d||(d=this.bucket_[c-1]+"+");this._push(["_trackEvent",a,d,b,this._getTimeDiff(),i])};p("katamari.TimeTracker.prototype._track",J.prototype._track);J.prototype._setHistogramBuckets=function(a){this.bucket_=a.sort(this.sortNumber)};
J.prototype._stamp=function(a,b){this._recordEndTime();this._track(a,b);this._recordStartTime()};p("katamari.TimeTracker.prototype._stamp",J.prototype._stamp);var K=function(){this.relativeTimeStart_=o()},wa=new K;K.prototype.set=function(a){this.relativeTimeStart_=a};K.prototype.reset=function(){this.set(o())};K.prototype.get=function(){return this.relativeTimeStart_};var L=function(a){this.prefix_=a||"";this.startTimeProvider_=wa};L.prototype.showAbsoluteTime=i;L.prototype.showRelativeTime=i;L.prototype.showLoggerName=i;L.prototype.showExceptionText=l;L.prototype.showSeverityLevel=l;var M=function(a){return 10>a?"0"+a:""+a},xa=function(a,b){var c=(a.time_-b)/1E3,d=c.toFixed(3),e=0;if(1>c)e=2;else for(;100>c;)e++,c*=10;for(;0<e--;)d=" "+d;return d},ya=function(a){L.call(this,a)};q(ya,L);var N=function(a){this.stack=Error().stack||"";a&&(this.message=""+a)};q(N,Error);N.prototype.name="CustomError";var O=function(a,b){b.unshift(a);N.call(this,ia.apply(k,b));b.shift()};q(O,N);O.prototype.name="AssertionError";var za=function(a,b,c){if(!a){var d=Array.prototype.slice.call(arguments,2),e="Assertion failed";if(b)var e=e+(": "+b),f=d;throw new O(""+e,f||[]);}},Aa=function(a,b){throw new O("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ba=Array.prototype,Ca=Ba.indexOf?function(a,b,c){za(a.length!=k);return Ba.indexOf.call(a,b,c)}:function(a,b,c){c=c==k?0:0>c?Math.max(0,a.length+c):c;if("string"==typeof a)return"string"!=typeof b||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};var Ea=function(a){return Da(a||arguments.callee.caller,[])},Da=function(a,b){var c=[];if(0<=Ca(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(Fa(a)+"(");for(var d=a.arguments,e=0;e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=""+f;break;case "boolean":f=f?"true":"false";break;case "function":f=(f=Fa(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);
c.push(")\n");try{c.push(Da(a.caller,b))}catch(h){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")},Fa=function(a){if(P[a])return P[a];a=""+a;if(!P[a]){var b=/function ([^\(]+)/.exec(a);P[a]=b?b[1]:"[Anonymous]"}return P[a]},P={};var Q=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Q.prototype.exception_=k;Q.prototype.exceptionText_=k;var Ga=0;Q.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ga++;this.time_=d||o();this.level_=a;this.msg_=b;this.loggerName_=c;delete this.exception_;delete this.exceptionText_};Q.prototype.getLevel=function(){return this.level_};Q.prototype.setLevel=function(a){this.level_=a};var R=function(a){this.name_=a};R.prototype.parent_=k;R.prototype.level_=k;R.prototype.children_=k;R.prototype.handlers_=k;var S=function(a,b){this.name=a;this.value=b};S.prototype.toString=function(){return this.name};var Ha=new S("SHOUT",1200),Ia=new S("SEVERE",1E3),Ja=new S("WARNING",900),Ka=new S("INFO",800),La=new S("CONFIG",700);R.prototype.getParent=function(){return this.parent_};R.prototype.setLevel=function(a){this.level_=a};R.prototype.getLevel=function(){return this.level_};
var Ma=function(a){if(a.level_)return a.level_;if(a.parent_)return Ma(a.parent_);Aa("Root logger has no level set.");return k};R.prototype.log=function(a,b,c){if(a.value>=Ma(this).value){a=this.getLogRecord(a,b,c);b="log:"+a.msg_;m.console&&(m.console.timeStamp?m.console.timeStamp(b):m.console.markTimeline&&m.console.markTimeline(b));m.msWriteProfilerMark&&m.msWriteProfilerMark(b);for(b=this;b;){var c=b,d=a;if(c.handlers_)for(var e=0,f=g;f=c.handlers_[e];e++)f(d);b=b.getParent()}}};
R.prototype.getLogRecord=function(a,b,c){var d=new Q(a,""+b,this.name_);if(c){d.exception_=c;var e;var f=arguments.callee.caller;try{var h;var j;c:{for(var s=["window","location","href"],x=m,B;B=s.shift();)if(x[B]!=k)x=x[B];else{j=k;break c}j=x}if("string"==typeof c)h={message:c,name:"Unknown error",lineNumber:"Not available",fileName:j,stack:"Not available"};else{var C,Z,s=l;try{C=c.lineNumber||c.line||"Not available"}catch(kb){C="Not available",s=i}try{Z=c.fileName||c.filename||c.sourceURL||j}catch(lb){Z=
"Not available",s=i}h=s||!c.lineNumber||!c.fileName||!c.stack?{message:c.message,name:c.name,lineNumber:C,fileName:Z,stack:c.stack||"Not available"}:c}e="Message: "+t(h.message)+'\nUrl: <a href="view-source:'+h.fileName+'" target="_new">'+h.fileName+"</a>\nLine: "+h.lineNumber+"\n\nBrowser stack:\n"+t(h.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+t(Ea(f)+"-> ")}catch(db){e="Exception trying to expose exception! You win, we lose. "+db}d.exceptionText_=e}return d};
var T={},U=k,Na=function(){U||(U=new R(""),T[""]=U,U.setLevel(La))},Oa=function(a){Na();var b;if(!(b=T[a])){b=new R(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Oa(a.substr(0,c));c.children_||(c.children_={});c.children_[d]=b;b.parent_=c;T[a]=b}return b};var Pa=function(){this.publishHandler_=n(this.addLogRecord,this);this.formatter_=new ya;this.formatter_.showAbsoluteTime=l;this.isCapturing_=this.formatter_.showExceptionText=l;this.logBuffer_="";this.filteredLoggers_={}};
Pa.prototype.addLogRecord=function(a){if(!this.filteredLoggers_[a.loggerName_]){var b;b=this.formatter_;var c=[];c.push(b.prefix_," ");if(b.showAbsoluteTime){var d=new Date(a.time_);c.push("[",M(d.getFullYear()-2E3)+M(d.getMonth()+1)+M(d.getDate())+" "+M(d.getHours())+":"+M(d.getMinutes())+":"+M(d.getSeconds())+"."+M(Math.floor(d.getMilliseconds()/10)),"] ")}b.showRelativeTime&&c.push("[",xa(a,b.startTimeProvider_.get()),"s] ");b.showLoggerName&&c.push("[",a.loggerName_,"] ");b.showSeverityLevel&&
c.push("[",a.getLevel().name,"] ");c.push(a.msg_,"\n");b.showExceptionText&&a.exception_&&c.push(a.exceptionText_,"\n");b=c.join("");if(V&&V.firebug)switch(a.getLevel()){case Ha:V.info(b);break;case Ia:V.error(b);break;case Ja:V.warn(b);break;default:V.debug(b)}else V?V.log(b):window.opera?window.opera.postError(b):this.logBuffer_+=b}};var Qa=k,V=window.console;var W=function(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0};W.prototype.BYTES_PER_ELEMENT=4;W.prototype.set=function(a,b){for(var b=b||0,c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};W.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(W.BYTES_PER_ELEMENT=4,W.prototype.BYTES_PER_ELEMENT=W.prototype.BYTES_PER_ELEMENT,W.prototype.set=W.prototype.set,W.prototype.toString=W.prototype.toString,p("Float32Array",W));var X=function(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0};X.prototype.BYTES_PER_ELEMENT=8;X.prototype.set=function(a,b){for(var b=b||0,c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};X.prototype.toString=Array.prototype.join;"undefined"==typeof Float64Array&&(X.BYTES_PER_ELEMENT=8,X.prototype.BYTES_PER_ELEMENT=X.prototype.BYTES_PER_ELEMENT,X.prototype.set=X.prototype.set,X.prototype.toString=X.prototype.toString,p("Float64Array",X));new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);Qa||(Qa=new Pa);if(-1!=window.location.href.indexOf("Debug=true")){var Ra=Qa;if(i!=Ra.isCapturing_){Na();var Sa=U,Ta=Ra.publishHandler_;Sa.handlers_||(Sa.handlers_=[]);Sa.handlers_.push(Ta);Ra.isCapturing_=i}}Oa("katamari.Logger").setLevel(Ka);var Ua=function(a){window.viewerTimeTracker&&window.viewerTimeTracker._push&&window.viewerTimeTracker._push(a)};p("katamari.Tracker.trackAction",Ua);p("katamari.Tracker.stamp",function(a,b,c){window.viewerTimeTracker&&window.viewerTimeTracker._stamp&&window.viewerTimeTracker._stamp(b,c)});var Va=function(){var a,b=window.location.href;a="viewer".replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=RegExp("[#,]?"+a+"=([^,]*)").exec(b||window.location.href);return a==k?k:a[1]},Wa=function(a){document.body?a():m.setTimeout(function(){Wa(a)},10)},Ya=function(){var a=window.localStorage.nexus;if(a)try{var b=Xa(a);if(b)return b.viewer}catch(c){}return k};var Xa=function(a){a=""+a;if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},Za=function(){this.replacer_=g},ab=function(a,b,c){switch(typeof b){case "string":$a(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?
b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==k){c.push("null");break}if("array"==aa(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],ab(a,a.replacer_?a.replacer_.call(b,""+f,e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),$a(f,c),c.push(":"),ab(a,a.replacer_?a.replacer_.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;
default:throw Error("Unknown type: "+typeof b);}},bb={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},cb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,$a=function(a,b){b.push('"',a.replace(cb,function(a){if(a in bb)return bb[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return bb[a]=e+b.toString(16)}),'"')};var eb,gb=function(a){var b={version:9,result:-1};if(eb=document.getElementById("webgl-tryitnow")){var c=document.createElement("canvas");c.style.width="0px";c.style.height="0px";c.setAttribute("width","512");c.setAttribute("height","512");eb.appendChild(c);var d={antialias:l};try{var e=c.getContext("webgl",d)||c.getContext("experimental-webgl",d)||c.getContext("moz-webgl",d)||c.getContext("webkit-3d",d)}catch(f){}var d=e?i:l,h=fb();if(h){var j=h.result,s=h["webgl-enabled"];if(9==h.version&&d==s){a(0,
30,52,j);return}}if(d){b["webgl-enabled"]=i;var x=function(a,b){window.setTimeout(a,b)},B=function(){return o()},C=function(a,d,f){if(f.ub_error)b.result=-1;else{b.version=f.ub_ver;b.result=f.ub_texture_rate;if(a&&52>b.result){fa(e,x,B,n(C,k,l,d));return}a=window.localStorage;b?(f=[],ab(new Za,b,f),f=f.join("")):f=k;a.katamari=f}eb.removeChild(c);d(0,30,52,b.result)};fa(e,x,B,n(C,k,i,a));return}}a(0,30,52,b.result)},fb=function(){if(!window.localStorage.katamari)return k;var a;try{a=Xa(window.localStorage.katamari);
var b;if(b=a){var c=typeof a;b=("object"==c&&a!=k||"function"==c)&&"number"==typeof a.result&&"number"==typeof a.version}if(b)return a}catch(d){}return k};var Y=function(){},hb=function(a){a.timeTracker=new J;a.timeTracker._recordStartTime();window.viewerTimeTracker=a.timeTracker};Y.prototype.loadScript=function(a){hb(this);this.loadFunction(function(){ib("./prime_webgl_compiled.js",a)},function(){ib("./prime_swivel_compiled.js",a)},function(){ib("./prime_static_compiled.js",a)})};p("katamari.ScriptLoader.prototype.loadScript",Y.prototype.loadScript);Y.prototype.selectViewer=function(a,b,c){hb(this);this.loadFunction(a,b,c)};
p("katamari.ScriptLoader.prototype.selectViewer",Y.prototype.selectViewer);
Y.prototype.loadFunction=function(a,b,c){if(y||m.navigator.userAgent.match(/(CrOS)/)||ta)this.timeTracker._stamp("Benchmark Timer","Skipped Test - Mobile"),c();else{var d=fb();if(!E){var e=Va()||Ya();if("webgl"==e&&d){this.timeTracker._stamp("Benchmark Timer","Skipped Test - Set Webgl");a();return}if("swivel"==e){this.timeTracker._stamp("Benchmark Timer","Skipped Test - Set Swivel");b();return}if("static"==e){this.timeTracker._stamp("Benchmark Timer","Skipped Test - Set Static");c();return}}if(E||
ua||pa)this.timeTracker._stamp("Benchmark Timer","Skipped Test - Browser"),b();else if(d)this.timeTracker._stamp("Benchmark Timer","Skipped Test - Cached"),jb(0,30,d.result,a,b,c);else{var f=this;this.timeTracker._stamp("Benchmark Timer","Webgl Test - Pending");Wa(function(){f.timeTracker._stamp("Benchmark Timer","Webgl Test - Started");gb(n(f.benchmarkResultsCallback_,f,a,b,c))})}}};p("katamari.ScriptLoader.prototype.loadFunction",Y.prototype.loadFunction);
Y.prototype.benchmarkResultsCallback_=function(a,b,c,d,e,f,h){this.timeTracker._stamp("Benchmark Timer","Webgl Test - Results");jb(d,e,h,a,b,c)};var ib=function(a,b){window["goog.loadScriptCallback"]=b;var c=document.getElementsByTagName("head")[0],d=document.createElement("script");d.type="text/javascript";d.src=a;c.appendChild(d)},jb=function(a,b,c,d,e,f){Ua(["_trackEvent","Webgl Benchmark","Test","score",c]);c>b?d():c>a||-1==c?e():f()},$=new Y;p("goog.loadViewerScript",n($.loadScript,$));
p("goog.loadViewerFunction",n($.loadFunction,$));m.loadedScriptLoader&&m.loadedScriptLoader();