# js-http

This is a library to simplify asynchronous calls for data. Doing an `XMLHttpRequest` is rather trivial, but sometimes it's convenient to be able to do an AJAX call in only a few seconds. Obviously, something like angular already has this, but if you only need a light-weight library for AJAX, this is right for you.

A demo is available on my [playground](https://playground.michaelcheng.us/lib-js/http/).

## Usage
Usage is extremely simple. To do an asynchronous call, just write

```javascript
iqwerty.http.request('data.php')
	.success((response) => {
		console.log(response);
	})
	.get({ 'param': 'value' });
```

`data.php` is your data source. The `.success()` callback delivers a `response` parameter to your callback. This is called when the request succeeds and the status is OK. The `response` will be parsed as JSON if possible, otherwise plain text will be delivered to your callback.

The `get()` parameters specify what parameters to send with the request. `.post()`, `.put()`, and `.delete()` HTTP methods may also be used. These request methods should be called *last*. After calling the request method, a `Promise` is returned. The `Promise` is resolved when the return status is `200`. It is rejected when the request fails or the return status is not `200`.

```javascript
iqwerty.http.request('data.php')
	.get({ 'param': 'value' })
	.then((response) => {
		console.log(response);
	});
```

## Advanced usage
In addition to the `.success()` callback, you may also set the following callbacks

### `.begin()`
When the request is just sent, you can receive a callback with the current `readyState`. The `readyState` should be `1`.

```javascript
iqwerty.http.request('data.php')
	.begin((state) => {
		console.log('The request has been sent.');
	})
	.get();
```

The `begin` callback will receive a parameter that specifies the current state of the request.

### `.progress()`
If you are uploading a file, you can receive `ProgressEvent` callbacks to get the current status of the upload.

```javascript
iqwerty.http.request('data.php')
	.progress((event) => {
		if(event.lengthComputable) {
			console.log(`Upload status is ${Math.floor((event.loaded/e.total)*100)}%`);
		}
	})
	.post({ 'file': new File(['Hello'], 'file.txt') });
```

### `.error()`
If the request is sent out but fails to get information, an error is called. Basically, if the HTTP status code isn't 200, your error callback will be executed.

```javascript
iqwerty.http.request('data.php')
	.success(callbacks.success)
	.error(callbacks.error)
	.get();
```

Where `callbacks` is an object containing your callbacks

```javascript
const callbacks = {
	success: (response) => {
		console.log(`Response is ${response}`);
	},

	error: (error) => {
		console.log(`Error has occurred. Status ${error}`);
	}
};
```

### `.cache()`
If you wish to cache your `GET` requests, simply specify `.cache()` in your request builder

```javascript
iqwerty.http.request('data.php')
	.success(callbacks.success)
	.cache()
	.get();
```

The next time you request `data.php`, you will retrieve the cached version. Cache invalidation will come soon.

## Legacy support
The legacy `$http` object is still available. It is an alias for `iqwerty.http.request`.