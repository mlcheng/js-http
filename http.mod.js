"use strict";window.require=function t(n,r,e){function o(i,s){if(!r[i]){if(!n[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var f=r[i]={exports:{}};n[i][0].call(f.exports,function(t){var r=n[i][1][t];return o(r?r:t)},f,f.exports,t,n,r,e)}return r[i].exports}for(var u="function"==typeof require&&require,i=0;i<e.length;i++)o(e[i]);return o}({"iqwerty-http":[function(t,n,r){function e(t){function n(t,n,s){var c,a=new XMLHttpRequest;if(t===r.GET?(n=function(t,n){if(!n)return t;var r=t+"?",e=0;for(var o in n)n.hasOwnProperty(o)&&(e++&&(r+="&"),r+=encodeURIComponent(o)+"="+encodeURIComponent(n[o]));return r}(n,s),c=null):(c=new FormData,Object.keys(s).forEach(function(t){c.append(t,s[t])})),t===r.GET){var f=o.http.Cache().getCache(n);if(null!=f)return"function"==typeof u.onLoad?u.onLoad(f):Promise.resolve(f)}return"function"==typeof u.onLoadStart&&(a.onloadstart=function(){u.onLoadStart(this.readyState)}),"function"==typeof u.onProgress&&(a.upload.onprogress=function(t){u.onProgress(t)}),new Promise(function(s,f){"function"==typeof u.onError&&(a.onerror=function(){u.onError(this.status),f(this.status)}),a.onload=function(){i.cache&&t===r.GET&&o.http.Cache().setCache(n,this.response),"function"==typeof u.onLoad&&(this.status===e.OK?u.onLoad(this.response):"function"==typeof u.onError&&u.onError(this.status)),this.status===e.OK?s(this.response):f(this.status)},a.open(t,n,!0),a.send(c)})}var r={GET:"get",POST:"post",PUT:"put",DELETE:"delete"},e={OK:200},u={},i={};return{cache:function(){return i.cache=!0,this},begin:function(t){return u.onLoadStart=t,this},progress:function(t){return u.onProgress=t,this},success:function(t){return u.onLoad=t,this},error:function(t){return u.onError=t,this},get:function(e){return n(r.GET,t,e)},post:function(e){return n(r.POST,t,e)},put:function(e){return n(r.PUT,t,e)},delete:function(e){return n(r.DELETE,t,e)}}}var o=o||{};o.http=function(){function t(){var n={},r=t.prototype.cached;return n.getCache=function(t){return r[t]},n.setCache=function(t,e){null==n.getCache(t)&&(r[t]=e)},n}return t.prototype.cached={},{Request:e,Cache:t}}(),"undefined"!=typeof n&&(n.exports=o.http)},{}]},{},["iqwerty-http"]);