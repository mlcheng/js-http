/***********************************************

  "http.js"

  Created by Michael Cheng on 06/03/2015 20:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

"use strict";

function $http(url) {
	function ajax(method, url, args) {
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
			callbacks.stateChanged($http.prototype.client.readyState)


			if($http.prototype.client.readyState == 4) {
				if($http.prototype.client.status == 200) {
					var response;
					try {
						response = JSON.parse($http.prototype.client.responseText);
					} catch(e) {
						response = $http.prototype.client.responseText;
					}
					callbacks.success(response);
				} else {
					callbacks.error($http.prototype.client.status);
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

	

	var userCallbacks = {
		stateChanged: function(callback) {
			callbacks.stateChanged = callback;
			return this;
		},
		success: function(callback) {
			callbacks.success = callback;
			return this;
		},
		error: function(callback) {
			callbacks.error = callback;
			return this;
		}
	};

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

$http.prototype.client = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;