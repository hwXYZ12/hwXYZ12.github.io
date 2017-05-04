(() => {

	window.addEventListener("keyup", setupCustomInput);

	function setupCustomInput(){
		let c = document.getElementById('customInput');
		let x1 = document.getElementById('username');
		let x2 = document.getElementById('message');

		// pad username with whitspace to the right by at most
		// 50 characters
		let padded = (x1.value+"                                                  ").slice(0,50);						
		
		c.value = padded + x2.value;
	}

})();