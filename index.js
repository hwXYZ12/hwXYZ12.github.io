(() => {

	window.addEventListener("keyup", setupCustomInput);

	function setupCustomInput(){
		let c = document.getElementById('customInput');
		let x1 = document.getElementById('username');
		let x2 = document.getElementById('message');
		let x3 = document.getElementById('memeURL');

		// pad username with whitspace to the right by at most
		// 50 characters
		let padded = (x1.value+"                                                  ").slice(0,30);						
		
		let x4 = padded + x2.value;
		
		let memeLen = x3.value.length;

		x4 = x4.slice(0, 256 - memeLen - 1);

		c.value = x4 + '|' + x3.value;
	}

})();