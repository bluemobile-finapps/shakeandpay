// The watch id references the current `watchAcceleration`
var watchID = null;
var previousReading = {
    x: null,
    y: null,
    z: null
};
//wait for PhoneGap to load
document.addEventListener("deviceready", loaded, false);
// PhoneGap is ready
function loaded() {
    startWatch();
}
// Start watching the acceleration
function startWatch() {
    navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 200 });
}
function shaken(){
    console.log("Shaken");
    Finappsparty.app.getController('DirectTransferController').searchTransfer();
}
// Success
function onSuccess(acceleration) {
    var changes = {},
    bound = 0.2;
    if (previousReading.x !== null) {
        changes.x = Math.abs(previousReading.x - acceleration.x);
        changes.y = Math.abs(previousReading.y - acceleration.y);
        changes.z = Math.abs(previousReading.z - acceleration.z);
    }
    console.log(changes.x + ' ' + changes.y + ' ' +changes.z);
    if (changes.x > bound && changes.y > bound && changes.z > bound) {
        shaken();
    }
    previousReading = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
    };
}
// Error
function onError() {
    //alert('onError!');
}