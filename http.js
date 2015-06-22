/***********************************************

  "http.js"

  Created by Michael Cheng on 06/03/2015 20:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

"use strict";
/**
 * A library to simplify AJAX calls. The most basic request syntax is as follows
 *
 * $http(your_url_here).get|post|put|delete(params)
 *
 * To use the result of the request, add a callback to the beginning of the request
 *
 * .stateChanged(stateChangedCallback) // This is called when the request state changes. The stateChangedCallback will receive a parameter with the current state
 *
 * .success(successCallback) // This is called when the request succeeds. The successCallback will receive a parameter with the JSON response (if applicable) or the plain text response
 *
 * .error(errorCallback) // This is called when the request successfully transfers but failed to receive correct data. The errorCallback will receive an HTTP status code parameter
 *
 * 
 * @param  {String} url The URL to get asynchronous data from
 * @return      Should return nothing
 */
function $http(url) {
	function request(method, url, args) {
		var STATUS_OK = 200; // the HTML status code for an OK request

		var client = new XMLHttpRequest(); // the request client; kill IE support

		var data; // the data to send with the request; only used when not GET



		/**
		 * If the method is "get", the parameters are sent as a part of the URL.
		 * There should be no other data to send with the request
		 */
		if(method == "get") {
			// encode the url with the parameters
			url = (function encode(url, args) {
				var out = url + "?";
				var arg_cnt = 0;
				for(var key in args) {
					if(args.hasOwnProperty(key)) {
						if(arg_cnt++) {
							out += "&";
						} 
						out += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
					}
				}
				return out;
			})(url, args);
			data = null;
		} else {
			// append the parameters as part of FormData
			data = new FormData();
			Object.keys(args).forEach(function(value, index, array) {
				data.append(value, args[value]);
			});
		}
		
		



		/**
		 * Event callbacks are here
		 */
		
		if(typeof callbacks.onLoadStart === "function") {
			/**
			 * The request has just been sent.
			 * The readyState will be passed to the callback
			 */
			client.onloadstart = function(e) {
				callbacks.onLoadStart(this.readyState);
			};
		}
		if(typeof callbacks.onProgress === "function") {
			/**
			 * The request is in progress. Used in file uploads or similar
			 * The ProgressEvent will be passed to the callback
			 */
			client.upload.onprogress = function(e) {
				callbacks.onProgress(e);
			};
		}
		if(typeof callbacks.onError === "function") {
			/**
			 * The request encountered an error
			 * The HTTP status will be passed to the callback
			 */
			client.onerror = function(e) {
				callbacks.onError(this.status);
			};
		}

		/**
		 * The request has finished.
		 * If the HTTP status is OK, the response will be passed to the callback
		 * Otherwise, the HTTP status will be passed to the callback
		 */
		client.onload = function(e) {
			if(typeof callbacks.onLoad === "function") {
				if(this.status == STATUS_OK) {
					callbacks.onLoad(this.response);
				} else {
					callbacks.onError(this.status);
				}
			}

			client = null;
			data = null;
			callbacks = null;
		};

		client.open(method, url, true);
		client.send(data);
	};


	/**
	 * Stores the user defined callbacks
	 * @type {Object}
	 */
	var callbacks = {};


	return {
		/**
		 * Called when the request just begins
		 * @param  {Function} callback The function to call when the request begins
		 * @return {Object}            The $http object
		 */
		"begin": function(callback) {
			callbacks.onLoadStart = callback;
			return this;
		},

		/**
		 * The request is in progress
		 * @param  {Function} callback The function to call when the request is in progress.
		 * Used in file uploads
		 * @return {Object}            The $http object
		 */
		"progress": function(callback) {
			callbacks.onProgress = callback;
			return this;
		},

		/**
		 * Called when the request succeeds with a status of 200
		 * @param  {Function} callback The function to call when the request succeeds
		 * @return {Object}            The $http object
		 */
		"success": function(callback) {
			callbacks.onLoad = callback;
			return this;
		},

		/**
		 * Called when the request is sent but doesn't receive 200 status
		 * @param  {Function} callback The function to call when the request fails
		 * @return {Object}            The $http object
		 */
		"error": function(callback) {
			callbacks.onError = callback;
			return this;
		},


		"get": function(args) {
			return request('get', url, args);
		},
		"post": function(args) {
			return request('post', url, args);
		},
		"put": function(args) {
			return request('put', url, args);
		},
		"delete": function(args) {
			return request('delete', url, args);
		}
	};
};