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
		console.log(method, url, args);
		return callbacks;
	};

	var callbacks = {
		stateChanged: function(callback) {
			callback(_state);
			return this;
		},
		success: function(callback) {
			callback(_response);
			return this;
		},
		error: function() {
			callback(_error);
			return this;
		}
	};

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
}