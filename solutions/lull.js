
var detectLull = 
(function(delay, onLull) {
	var that;
	// we always keep the last detectLull call identifier
	var lastCallId = 0;

	/*
	 * This function call setTimeout with a copy of the current id
	 * @param {number} callId The current detectLull call identifier
	 */
	function spawnTimeout(callId) {
		setTimeout(function(){
			// if after "delay" ms, if the global call id haven't changed,
			// then no actions have been taken by the user and a lull is triggered
			if (callId == lastCallId) {
				// trigger the lull
				onLull.call(that);
			}
		}, delay);
	}

	// Define the detectLull function as a worker spawner
	return function () {
		that = this;
		// each call increase the global id
		lastCallId = lastCallId + 1;
		// spawn a new timeout with a copy of it's id
		spawnTimeout(lastCallId);
	}
})(delay, onLull);
