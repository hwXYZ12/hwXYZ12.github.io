(() => {

	/* matrix background stolen from kdex___ all credit goes to him!! https://kdex.de/dev/matrix/ */
	const FONT_SIZE = "20px";
	const FONT_FAMILY = "monospace";
	const START_CHARACTER = "0";
	const END_CHARACTER = "z";
	const dX = 20;
	const dY = dX;
	const HUE_ANGLE = 140;
	const SATURATION = 100;
	const LIGHTNESS = 65;
	const COLOR_STEPS = 15;
	const FPS = 15;
	const COLORS = [];
	const canvas = document.querySelector("canvas");
	const context = canvas.getContext("2d");
	const fontSize = Number.parseInt(FONT_SIZE);
	const mod = (m, n) => ((m % n) + n) % n;
	const FPS_INTERVAL = 1000 / FPS;
	const characterCache = {};
	let stop = false, frameCount = 0, startTime, now, then, elapsed, width, height, rows, columns, shaderCache;
	for (let i = 0; i < COLOR_STEPS; ++i) {
		const color = `hsl(${HUE_ANGLE}, ${SATURATION}%, ${i * LIGHTNESS/ COLOR_STEPS}%)`;
		COLORS.push(color);
	}
	const resize = () => {
		const { body } = document;
		width = body.clientWidth;
		height = body.clientHeight;
		rows = Math.floor(height / (fontSize + (dX - fontSize)));
		columns = Math.floor(width / (fontSize + (dY - fontSize)));
		shadeCache = new Array(columns).fill(0).map(x => new Array(rows).fill(0));
		canvas.width = width;
		canvas.height = height;
		context.font = `${FONT_SIZE} ${FONT_FAMILY}`;
		initialize();
	};
	const updateCache = (x, y, char) => {
		if (!characterCache.hasOwnProperty(x)) {
			characterCache[x] = {};
		}
		characterCache[x][y] = char;
		return char;
	};
	const getCharacter = (x, y) => {
		if (characterCache.hasOwnProperty(x) && characterCache[x].hasOwnProperty(y)) {
			return characterCache[x][y];
		}
		const code = Math.round(START_CHARACTER.charCodeAt() + Math.random() * (END_CHARACTER.charCodeAt() - START_CHARACTER.charCodeAt()));
		const char = String.fromCharCode(code);
		return updateCache(x, y, char);
	};
	const initializeShadeCache = () => {
		for (let column = 0; column < columns; ++column) {
			const startRow = Math.floor(Math.random() * rows);
			for (let c = 0; c < COLORS.length; ++c) {
				shadeCache[column][(startRow + c) % rows] = c;
			}
		}
	};
	const drawCharacters = () => {
		for (let y = 0; y < rows; ++y) {
			for (let x = 0; x < columns; ++x) {
				const color = shadeCache[x][y];
				context.fillStyle = COLORS[color];
				context.fillText(getCharacter(x, y), x * dX, y + y * dY);
			}
		}
	};
	const updateShadeCache = () => {
		for (let column = 0; column < columns; ++column) {
			const ends = shadeCache[column].map((x, i) => x === COLORS.length - 1 ? i : -1).filter(x => x !== -1)
			for (const end of ends) {
				for (let f = 0; f < COLORS.length; ++f) {
					const offset = end - f;
					shadeCache[column][mod(offset + 1, rows)] = shadeCache[column][mod(offset, rows)];
				}
			}
			
		}
	};
	const animate = () => {
		requestAnimationFrame(animate);
		now = Date.now();
		elapsed = now - then;
		if (elapsed > FPS_INTERVAL) {
			then = now - (elapsed % FPS_INTERVAL);
			draw();
		}
	};
	const initialize = () => {
		initializeShadeCache();
		draw();
	};
	const draw = () => {
		updateShadeCache();
		context.clearRect(0, 0, width, height);
		drawCharacters();
	};
	const startAnimation = () => {
		then = Date.now();
		startTime = then;
		resize();
		animate();
	};
	window.addEventListener("resize", resize);
	startAnimation();

})();