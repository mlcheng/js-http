# js-http

This is a library to simplify asynchronous calls for data. Doing an `XMLHttpRequest` is rather trivial, but sometimes it's convenient to be able to do an AJAX call in only a few seconds. Obviously, something like angular already has this, but if you only need a light-weight library for AJAX, this is right for you.

A demo is available on my [playground](http://www.michaelcheng.us/playground/lib-js/http/).

## Usage
Usage is extremely simple. To do an asynchronous call, just write

```javascript
$http("data.php")
	.success(function(response) {
		console.log(response);
	})
	.get({"param": "value"});
```

`data.php` is your data source. The `.success()` callback delivers a `response` parameter to your callback. This is called when the request succeeds and the status is OK. The `response` will be parsed as JSON if possible, otherwise plain text will be delivered to your callback.

The `get()` parameters specify what parameters to send with the request. `.post()`, `.put()`, and `.delete()` HTTP methods may also be used. These request methods should be called *last*.

## Advanced usage
In addition to the `.success()` callback, you may also set the following callbacks

### `begin`
When the request is just sent, you can receive a callback with the current `readyState`. The `readyState` should be `1`.

```javascript
$http("data.php")
	.begin(function(state) {
		console.log("The request has been sent.");
	})
	.get();
```

The `begin` callback will receive a parameter that specifies the current state of the request.

### `progress`
If you are uploading a file, you can receive `ProgressEvent` callbacks to get the current status of the upload.

```javascript
$http("data.php")
	.progress(function(event) {
		if(event.lengthComputable) {
			console.log("Upload status is " + Math.floor((event.loaded/e.total)*100) + "%");
		}
	})
	.post({"file": new File(["Hello"], "file.txt")});
```

### `error`
If the request is sent out but fails to get information, an error is called. Basically, if the HTTP status code isn't 200, your error callback will be executed.

```javascript
$http("data.php")
	.success(callbacks.success)
	.error(callbacks.error)
	.get();
```

Where `callbacks` is an object containing your callbacks

```javascript
var callbacks = {
	success: function(response) {
		console.log("Response is " + response);
	},
	
	error: function(error) {
		console.log("Error has occurred. Status " + error);
	}
};
```
