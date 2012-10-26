var shakeEvent = function() {
    alert('shaked');
};

var shakeSuccess = function(coords) {
    var max = 2;
    if (Math.abs(coords.x) > max || Math.abs(coords.y) > max || Math.abs(coords.z) > max) {
        
        console.log('shaked it');
        //disable shaking for 10 seconds to prevent too many updates
        stopWatchingShake();//prevent endless looping: store interval 
        sessionStorage.intervalId=setInterval(startWatchingShake, 10000);
        //do whatever you want on "shake" here
        shakeEvent();
    }
};
    
var shakeError = function(){
    console.log('shake error');
};

var stopWatchingShake = function(){
    console.log('stop watching shake');
    //clear watching from sessionStorage reference
    navigator.accelerometer.clearWatch(sessionStorage.watchId);
};

var startWatchingShake = function(){
    console.log('start watching shake');
    
    //prevent endless loop (kill all intervals)
    if(sessionStorage.intervalId){
        clearInterval(sessionStorage.intervalId);
    }
    
    var options = {};
	options.frequency = 100;
	//start watching acceleration (save reference in session storage)
	sessionStorage.watchId = navigator.accelerometer.watchAcceleration(shakeSuccess,
			shakeError, options);
};