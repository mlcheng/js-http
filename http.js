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
 * To use the result of the request, add a callback to the request
 *
 * .stateChanged(stateChangedCallback) // This is called when the request state changes. The stateChangedCallback will receive a parameter with the current state
 *
 * .success(successCallback) // This is called when the request succeeds. The successCallback will receive a parameter with the JSON response (if applicable) or the plain text response
 *
 * .error(errorCallback) // This is called when the request successfully transfers but failed to receive correct data. The errorCallback will receive an HTTP status code parameter
 *
 * 
 * @param  {String} url The URL to get asynchronous data from
 * @return {Object}     The userCallbacks object, used to chain callback methods for the request status
 */
function $http(url) {
	function ajax(method, url, args) {
		// encode the url with the parameters
		var uri = (function encode(url, args) {
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


		$http.prototype.client.open(method, uri, true);
		$http.prototype.client.send();
		$http.prototype.client.onreadystatechange = function() {
			if(typeof callbacks.stateChanged === "function") {
				// State has changed, call stateChanged callback
				callbacks.stateChanged($http.prototype.client.readyState);
			}


			if($http.prototype.client.readyState == 4) {
				if($http.prototype.client.status == 200) {
					var response;
					try {
						// Parse the response as JSON data if possible
						response = JSON.parse($http.prototype.client.responseText);
					} catch(e) {
						response = $http.prototype.client.responseText;
					}

					if(typeof callbacks.success === "function") {
						callbacks.success(response);
					}
				} else {
					// Status wasn't OK, so call error callback
					if(typeof callbacks.error === "function") {
						callbacks.error($http.prototype.client.status);
					}
				}

				// destroy everything
				response = null;
				url = null;
				this.userCallbacks = null;
				this.callbacks = null;
			}
		};

		return userCallbacks;
	};

	
	/**
	 * An object containing the callbacks that can be assigned to the request
	 * @type {Object}
	 */
	var userCallbacks = {
		/**
		 * Called when the request state changes. The state will be 4 when the request succeeds
		 * @param  {Function} callback The function to call when the state changes
		 * @return {[Object]}          The userCallbacks object for chaining
		 */
		stateChanged: function(callback) {
			callbacks.stateChanged = callback;
			return this;
		},

		/**
		 * Called when the request succeeds with a status of 200
		 * @param  {Function} callback The function to call when the request succeeds
		 * @return {Object}            The userCallbacks object
		 */
		success: function(callback) {
			callbacks.success = callback;
			return this;
		},

		/**
		 * Called when the request is sent but doesn't receive 200 status
		 * @param  {Function} callback The function to call when the request fails
		 * @return {Object}            The userCallbacks object
		 */
		error: function(callback) {
			callbacks.error = callback;
			return this;
		}
	};

	/**
	 * Stores the user defined callbacks
	 * @type {Object}
	 */
	var callbacks = {};

	return {
		'get': function(args) {
			return ajax('get', url, args);
		},
		'post': function() {
			return ajax('post', url, args);
		},
		'put': function() {
			return ajax('put', url, args);
		},
		'delete': function() {
			return ajax('delete', url, args);
		}
	};
};

/**
 * Initialize the http request client
 * @type {Object}
 */
$http.prototype.client = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;