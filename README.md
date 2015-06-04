# js-http

This is a library to simplify asynchronous calls for data. Obviously, doing an `XMLHttpRequest` is rather trivial, but sometimes it's convenient to be able to do an AJAX call in only a few seconds. Obviously, something like angular already has this, but if you only need a light-weight library for AJAX, this is right for you.

A demo is available on my [playground](http://www.michaelcheng.us/playground/lib-js/http/).

## Usage
Usage is extremely simple. To do an asynchronous call, just write

	$http("data.php")
		.get("param=value")
		.success(function(response) {
			console.log(response);
		});

`data.php` is your data source. The `get()` parameters specify what parameters to send with the request. `.post()`, `.put()`, and `.delete()` may also be used.

The `.success()` callback delivers a `response` parameter to your callback. This is called when the request succeeds and the status is OK. The `response` will be parsed as JSON if possible, otherwise plain text will be delivered to your callback.

## Advanced usage
In addition to the `.success()` callback, you may also set the following callbacks

### `stateChanged`
The AJAX request has several `readyState`s (from `1`-`4`). A `readyState` of `4` means that the response is ready to be returned. When the state changes, you can set a callback to be executed.

	$http("data.php")
		.get()
		.stateChanged(function(state) {
			if(state != 4) {
				console.log("Still loading...");
			} else {
				console.log("Finished loading!");
			}
		});

The `stateChanged` callback will receive a parameter that specifies the current state of the request.

### `error`
If the request is sent out but fails to get information, an error is called. Basically, if the HTTP status code isn't 200, your error callback will be executed.

	$http("data.php")
		.get()
		.success(callbacks.success)
		.error(callbacks.error);

Where `callbacks` is an object containing your callbacks

	var callbacks = {
		success: function(response) {
			console.log("Response is " + response);
		},
		
		error: function(error) {
			console.log("Error has occurred. Status " + error);
		}
	};
