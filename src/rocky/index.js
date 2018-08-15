var rocky = require('rocky');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var priceData = "";
rocky.on('draw', function(event) {
    var ctx = event.context;
    var bounds = { width: ctx.canvas.unobstructedWidth, height: ctx.canvas.unobstructedHeight };
    
    // Clear the previous selection.
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    
    // Render the 3 stripes
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, bounds.width, bounds.height / 3);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, bounds.height / 3, bounds.width, 2 * bounds.height / 3);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 2 * bounds.height / 3, bounds.width, bounds.height);    
    
    
    ctx.textAlign = 'center';
    ctx.font = '32px bold numbers Leco-numbers';
    ctx.fillStyle = "black";
    ctx.fillText(priceData,bounds.width / 2, 5);


    ctx.textAlign = 'center';
    ctx.font = '42px bold numbers Leco-numbers';
    ctx.fillStyle = 'white';
    var time = new Date();
    ctx.fillText((time.getHours() > 12 ? time.getHours() % 12 : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()),
        bounds.width / 2, bounds.height / 2 - 28);
    
    ctx.fillStyle = "black";
    ctx.font = '28px bold Gothic';
    ctx.fillText(time.getDate() + ' ' + months[time.getMonth()] + ' ' + time.getFullYear(), bounds.width / 2, bounds.height - 47);
    
});

rocky.on('minutechange', function() {
    rocky.requestDraw();
    var time = new Date();
    
    if (time.getMinutes()%15==0) {
        rocky.postMessage({'fetch': true});
    }
});

rocky.on('hourchange', function(event) {
  
});

rocky.on('message', function(event) {
  if (event.data.price) {
    priceData = event.data.price;
    rocky.requestDraw();
  }
});

rocky.requestDraw();

rocky.postMessage({'fetch': true});