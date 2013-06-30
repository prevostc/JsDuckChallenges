/**
 * @param {Number} delay The Lull detection delay
 * @param {Function} onLull The callback to call on lull
 * @return {Function} The detectLull function. When called on every user action, this function will call onLull when the last user action was delay ms ago
 */
(function(delay, onLull) {
	/**
	 * @var {Object} that The last detectLull call target
	 */
	var that;
	
	/**
	 * @var {Number} lastTimeoutId The last timeout identifier
	 */
	var lastTimeoutId;
	
	/**
	 * The lull detector !
	 */
	return function detectLull() {
		// prevent the last timeout from executing
		clearTimeout(lastTimeoutId);
		// save the event target
		that = this;
		// start a new timeout
		lastTimeoutId = setTimeout(function(){
			onLull.call(that);
		}, delay);
	}
})(delay, onLull);