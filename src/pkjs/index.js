Pebble.on('message', function(event) {
  var message = event.data;

  if (message.fetch) {
  	request("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", 'GET', function(respText) {
	  var respData = JSON.parse(respText);
	  Pebble.postMessage({
	    'price': respData.USD
	  });
	});
  }
});


function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}