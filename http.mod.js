"use strict";window.require=function t(n,r,o){function e(i,c){if(!r[i]){if(!n[i]){var f="function"==typeof require&&require;if(!c&&f)return f(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var s=r[i]={exports:{}};n[i][0].call(s.exports,function(t){var r=n[i][1][t];return e(r?r:t)},s,s.exports,t,n,r,o)}return r[i].exports}for(var u="function"==typeof require&&require,i=0;i<o.length;i++)e(o[i]);return e}({"iqwerty-http":[function(t,n,r){function o(t){function n(t,n,c){var f,a=new XMLHttpRequest;if(t===r.GET?(n=function(t,n){if(!n)return t;var r=t+"?",o=0;for(var e in n)n.hasOwnProperty(e)&&(o++&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(n[e]));return r}(n,c),f=null):(f=new FormData,Object.keys(c).forEach(function(t){f.append(t,c[t])})),t===r.GET){var s=e.http.Cache().getCache(n);if(null!=s)return"function"==typeof u.onLoad?u.onLoad(s):void 0}"function"==typeof u.onLoadStart&&(a.onloadstart=function(){u.onLoadStart(this.readyState)}),"function"==typeof u.onProgress&&(a.upload.onprogress=function(t){u.onProgress(t)}),"function"==typeof u.onError&&(a.onerror=function(){u.onError(this.status)}),a.onload=function(){i.cache&&t===r.GET&&e.http.Cache().setCache(n,this.response),"function"==typeof u.onLoad&&(this.status===o.OK?u.onLoad(this.response):"function"==typeof u.onError&&u.onError(this.status)),a=null,f=null,u=null},a.open(t,n,!0),a.send(f)}var r={GET:"get",POST:"post",PUT:"put",DELETE:"delete"},o={OK:200},u={},i={};return{cache:function(){return i.cache=!0,this},begin:function(t){return u.onLoadStart=t,this},progress:function(t){return u.onProgress=t,this},success:function(t){return u.onLoad=t,this},error:function(t){return u.onError=t,this},get:function(o){return n(r.GET,t,o)},post:function(o){return n(r.POST,t,o)},put:function(o){return n(r.PUT,t,o)},delete:function(o){return n(r.DELETE,t,o)}}}var e=e||{};e.http=function(){function t(){var n={},r=t.prototype.cached;return n.getCache=function(t){return r[t]},n.setCache=function(t,o){null==n.getCache(t)&&(r[t]=o)},n}return t.prototype.cached={},{Request:o,Cache:t}}(),"undefined"!=typeof n&&(n.exports=e.http)},{}]},{},["iqwerty-http"]);