/***********************************************

  "http.js"

  Created by Michael Cheng on 06/03/2015 20:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

import { cache } from './../cache/cache';

/**
 * A library to simplify AJAX calls. The most basic request syntax is as follows
 *
 * $http(your_url_here).get|post|put|delete(params)
 *
 * To use the result of the request, add a callback to the beginning of the request
 *
 * .stateChanged(stateChangedCallback)
 * This is called when the request state changes. The stateChangedCallback will receive a parameter with the current state
 *
 * .success(successCallback)
 * This is called when the request succeeds. The successCallback will receive a parameter with the JSON response (if applicable) or the plain text response
 *
 * .error(errorCallback)
 * This is called when the request successfully transfers but failed to receive correct data. The errorCallback will receive an HTTP status code parameter
 *
 *
 * @param  {String} url The URL to get asynchronous data from
 * @return      Should return nothing
 */
export const http = (() => {
	const httpCache = new cache.Cache(30);

	function request(url) {
		const Method = {
			GET: 'get',
			POST: 'post',
			PUT: 'put',
			DELETE: 'delete'
		};

		const Status = {
			OK: 200
		};

		/**
		 * Stores the user defined callbacks
		 * @type {Object}
		 */
		const _callbacks = {};

		/**
		 * Stores the config for this request
		 * @type {Object}
		 */
		const _config = {};

		function request(method, url, args) {
			/** The request client; kill IE support. */
			const client = new XMLHttpRequest();

			/** The data to send with the request; only used when not GET. */
			let data;

			// If the method is 'get', the parameters are sent as a part of the URL. There should be no other data to send with the request
			if(method === Method.GET) {
				// Encode the url with the parameters
				url = (function encode(url, args) {
					if(!args) return url;

					let out = url + '?';
					let arg_cnt = 0;
					for(const key in args) {
						if(args.hasOwnProperty(key)) {
							if(arg_cnt++) {
								out += '&';
							}
							out += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
						}
					}
					return out;
				})(url, args);
				data = null;
			} else {
				if(args) {
					// Append the parameters as part of FormData
					data = new FormData();
					Object.keys(args).forEach(function(arg) {
						data.append(arg, args[arg]);
					});
				}
			}

			// Check for cached version first
			if(method === Method.GET) {
				const _cache = httpCache.get(url);
				if(_cache != null) {
					if(typeof _callbacks.onLoad === 'function') {
						return _callbacks.onLoad(_cache);
					} else {
						return Promise.resolve(_cache);
					}
				}
			}

			// The request has just been sent.
			// The readyState will be passed to the callback.
			if(typeof _callbacks.onLoadStart === 'function') {
				client.onloadstart = function() {
					_callbacks.onLoadStart(this.readyState);
				};
			}

			// The request is in progress. Used in file uploads or similar.
			// The ProgressEvent will be passed to the callback.
			if(typeof _callbacks.onProgress === 'function') {
				client.upload.onprogress = function(e) {
					_callbacks.onProgress(e);
				};
			}

			return new Promise((resolve, reject) => {
				// The request encountered an error.
				// The HTTP status will be passed to the callback.
				if(typeof _callbacks.onError === 'function') {
					client.onerror = function() {
						_callbacks.onError(this.status);
						reject(this.status);
					};
				}

				// The request has finished.
				// If the HTTP status is OK, the response will be passed to the callback.
				// Otherwise, the HTTP status will be passed to the callback.
				client.onload = function() {
					if(_config.cache && method === Method.GET) {
						httpCache.add(url, this.response);
					}

					// Handle the callbacks.
					// Note that if the return status is NOT 200, an error will result.
					if(typeof _callbacks.onLoad === 'function') {
						if(this.status === Status.OK) {
							_callbacks.onLoad(this.response);
						} else {
							if(typeof _callbacks.onError === 'function') {
								_callbacks.onError(this.status);
							}
						}
					}

					// Handle the promise
					if(this.status === Status.OK) {
						resolve(this.response);
					} else {
						reject(this.status);
					}
				};

				client.open(method, url, true);
				client.send(data);
			});
		}

		return {
			/**
			 * Optional. Cache GET requests
			 * @return {Object} The $http object
			 */
			cache() {
				_config.cache = true;
				return this;
			},

			/**
			 * Called when the request just begins
			 * @param {Function} callback The function to call when the request begins
			 * @return {Object} The $http object
			 */
			begin(callback) {
				_callbacks.onLoadStart = callback;
				return this;
			},

			/**
			 * The request is in progress. Used in file uploads.
			 * @param {Function} callback The function to call when the request is in progress.
			 * @return {Object} The $http object
			 */
			progress(callback) {
				_callbacks.onProgress = callback;
				return this;
			},

			/**
			 * Called when the request succeeds with a status of 200.
			 * @param {Function} callback The function to call when the request succeeds
			 * @return {Object} The $http object
			 */
			success(callback) {
				_callbacks.onLoad = callback;
				return this;
			},

			/**
			 * Called when the request is sent but doesn't receive 200 status
			 * @param {Function} callback The function to call when the request fails
			 * @return {Object} The $http object
			 */
			error(callback) {
				_callbacks.onError = callback;
				return this;
			},

			// HTTP methods
			'get': args => request(Method.GET, url, args),
			'post': args => request(Method.POST, url, args),
			'put': args => request(Method.PUT, url, args),
			'delete': args => request(Method.DELETE, url, args)
		};
	}

	return { request };
})();

// And for legacy support...
if(!window.$http) {
	window.$http = http.request;
}