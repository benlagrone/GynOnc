 // include angular loader, which allows the files to load in any order
    /*
     AngularJS v1.2.4
     (c) 2010-2014 Google, Inc. http://angularjs.org
     License: MIT
    */
    (function(){'use strict';function d(a){return function(){var c=arguments[0],b,c="["+(a?a+":":"")+c+"] http://errors.angularjs.org/1.2.4/"+(a?a+"/":"")+c;for(b=1;b<arguments.length;b++)c=c+(1==b?"?":"&")+"p"+(b-1)+"="+encodeURIComponent("function"==typeof arguments[b]?arguments[b].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[b]?"undefined":"string"!=typeof arguments[b]?JSON.stringify(arguments[b]):arguments[b]);return Error(c)}}(function(a){var c=d("$injector"),b=d("ng");a=a.angular||
    (a.angular={});a.$$minErr=a.$$minErr||d;return a.module||(a.module=function(){var a={};return function(e,d,f){if("hasOwnProperty"===e)throw b("badname","module");d&&a.hasOwnProperty(e)&&(a[e]=null);return a[e]||(a[e]=function(){function a(c,d,e){return function(){b[e||"push"]([c,d,arguments]);return g}}if(!d)throw c("nomod",e);var b=[],h=[],k=a("$injector","invoke"),g={_invokeQueue:b,_runBlocks:h,requires:d,name:e,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide",
    "service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:k,run:function(a){h.push(a);return this}};f&&k(f);return g}())}}())})(window)})(window);


    // include a third-party async loader library
    /*!
     * $script.js v1.3
     * https://github.com/ded/script.js
     * Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011
     * Follow our software http://twitter.com/dedfat
     * License: MIT
     */
    !function(a,b,c){function t(a,c){var e=b.createElement("script"),f=j;e.onload=e.onerror=e[o]=function(){e[m]&&!/^c|loade/.test(e[m])||f||(e.onload=e[o]=null,f=1,c())},e.async=1,e.src=a,d.insertBefore(e,d.firstChild)}function q(a,b){p(a,function(a){return!b(a)})}var d=b.getElementsByTagName("head")[0],e={},f={},g={},h={},i="string",j=!1,k="push",l="DOMContentLoaded",m="readyState",n="addEventListener",o="onreadystatechange",p=function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1};!b[m]&&b[n]&&(b[n](l,function r(){b.removeEventListener(l,r,j),b[m]="complete"},j),b[m]="loading");var s=function(a,b,d){function o(){if(!--m){e[l]=1,j&&j();for(var a in g)p(a.split("|"),n)&&!q(g[a],n)&&(g[a]=[])}}function n(a){return a.call?a():e[a]}a=a[k]?a:[a];var i=b&&b.call,j=i?b:d,l=i?a.join(""):b,m=a.length;c(function(){q(a,function(a){h[a]?(l&&(f[l]=1),o()):(h[a]=1,l&&(f[l]=1),t(s.path?s.path+a+".js":a,o))})},0);return s};s.get=t,s.ready=function(a,b,c){a=a[k]?a:[a];var d=[];!q(a,function(a){e[a]||d[k](a)})&&p(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][k](b),c&&c(d)}(a.join("|"));return s};var u=a.$script;s.noConflict=function(){a.$script=u;return this},typeof module!="undefined"&&module.exports?module.exports=s:a.$script=s}(this,document,setTimeout)

    // load all of the dependencies asynchronously.
 $script([
     //'vendor/angular/angular.min.js',
     'bower_components/angular/angular.js',
     'vendor/angular/angular-route.js',
     'vendor/angular/angular-sanitize.js',
     'vendor/angular/ui-bootstrap-tpls-0.10.0.min.js',
     'bower_components/angularjs-geolocation/dist/angularjs-geolocation.min.js',
     'bower_components/angular-ui-utils/ui-utils.min.js',
     'bower_components/angular-scroll/angular-scroll.min.js',
     'js/app.js',
     'js/services.js',
     'js/controllers.js',
     'js/filters.js',
     'js/directives.js',
     'js/config.js',
     'vendor/ui/holder.js',
     'vendor/ui/icon-font-ie7.js',
     'vendor/ui/google-code-prettify/prettify.js'

 ], function () {
     // when all is done, execute bootstrap angular application
     //angular.bootstrap(document, ['MDAndersonMobile'],['ui.bootstrap', 'ngSanitize']);
     angular.bootstrap(document, ['MDAndersonMobile'], ['ui.bootstrap', 'ngSanitize','duScroll']);

 });
