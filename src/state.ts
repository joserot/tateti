type Jugado = "circulo" | "equis";
type Result = "xWin" | "circleWin";

export const state = {
	data: {
		currentGame: {
			circlePos: [],
			xPos: [],
		},
	},
	lastPlay: "circulo",
	lastWin: "",
	color: "#000",
	listeners: [],
	initState() {
		localStorage.getItem("color") !== null
			? (this.color = localStorage.getItem("color"))
			: (this.color = "#000");

		localStorage.getItem("lastPlay") !== null
			? (this.lastPlay = localStorage.getItem("lastPlay"))
			: (this.lastPlay = "circulo");
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
	},

	/* Agrega la jugada actual */
	addCurrentPlay(type: Jugado, pos) {
		const data = this.getState();

		if (type === "circulo") {
			state.setState({
				currentGame: {
					circlePos: data.currentGame.circlePos.push(pos),
					xPos: data.currentGame.xPos,
				},
			});
		} else if (type === "equis") {
			state.setState({
				currentGame: {
					circlePos: data.currentGame.circlePos,
					xPos: data.currentGame.xPos.push(pos),
				},
			});
		}

		state.setState({
			currentGame: {
				circlePos: data.currentGame.circlePos,
				xPos: data.currentGame.xPos,
			},
		});

		this.whoWin(data.currentGame.circlePos, data.currentGame.xPos);
	},
	//Determina cual es el ganador en base a las posiciones
	whoWin(posCircle, posX) {
		let result: Result | "" = "";

		let c = posCircle,
			x = posX;
		// Posiciones ganadoras para circulo

		if (c.includes(1) && c.includes(2) && c.includes(3)) {
			result = "circleWin";
		}

		if (c.includes(4) && c.includes(5) && c.includes(6)) {
			result = "circleWin";
		}

		if (c.includes(7) && c.includes(8) && c.includes(9)) {
			result = "circleWin";
		}

		if (c.includes(1) && c.includes(4) && c.includes(7)) {
			result = "circleWin";
		}

		if (c.includes(2) && c.includes(5) && c.includes(8)) {
			result = "circleWin";
		}

		if (c.includes(3) && c.includes(6) && c.includes(9)) {
			result = "circleWin";
		}

		if (c.includes(1) && c.includes(5) && c.includes(9)) {
			result = "circleWin";
		}

		if (c.includes(3) && c.includes(5) && c.includes(7)) {
			result = "circleWin";
		}

		// Posiciones ganadoras para equis

		if (x.includes(1) && x.includes(2) && x.includes(3)) {
			result = "xWin";
		}

		if (x.includes(4) && x.includes(5) && x.includes(6)) {
			result = "xWin";
		}

		if (x.includes(7) && x.includes(8) && x.includes(9)) {
			result = "xWin";
		}

		if (x.includes(1) && x.includes(4) && x.includes(7)) {
			result = "xWin";
		}

		if (x.includes(2) && x.includes(5) && x.includes(8)) {
			result = "xWin";
		}

		if (x.includes(3) && x.includes(6) && x.includes(9)) {
			result = "xWin";
		}

		if (x.includes(1) && x.includes(5) && x.includes(9)) {
			result = "xWin";
		}

		if (x.includes(3) && x.includes(5) && x.includes(7)) {
			result = "xWin";
		}

		this.lastWinResult(result);
	},

	// determina ultimo ganador
	lastWinResult(result) {
		this.lastWin = result;
	},
	lastPlayGame(play: Jugado) {
		this.lastPlay = play;

		localStorage.setItem("lastPlay", play);
	},
	setColor(newColor) {
		this.color = newColor;

		localStorage.setItem("color", newColor);
	},
};
