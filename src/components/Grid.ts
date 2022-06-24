import { state } from "../state";

export function initGrid() {
	class GridElement extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			let div: any = document.createElement("div");
			div.innerHTML = `
    <div class="container">
          <div id="1"></div>
          <div id="2"></div>
          <div id="3"></div>
          <div id="4"></div>
          <div id="5"></div>
          <div id="6"></div>
          <div id="7"></div>
          <div id="8"></div>
          <div id="9"></div>
    </div>
      `;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `

        div{
          width: 100%;
          height: 100%;
        }
        
        .container {
        	margin: 1rem;
        	display: grid;
          border: solid 0.5rem #000;
          width: 350px;
          height: 350px;
          justify-content: center;
          align-content: center;
        	grid-template-columns: repeat(3, 1fr);
        	grid-template-rows: repeat(3, 1fr);
        }
        
        .container div{
          border: dashed 0.1rem #7a7a7a;
          display: flex;
          justify-content: center;
          align-items: center;
        }
          `;

			/************** FUNCTIONS *******************/

			// Agrega jugada y posicion al estado
			const addPlays = () => {
				const $squares = div.querySelectorAll(".container div");
				$squares.forEach((squares) => {
					squares.addEventListener("click", (e) => {
						if (e.target.childNodes.length === 0) {
							if (state.lastPlay === "circulo") {
								let $equis = document.createElement("component-equis");
								e.target.appendChild($equis);
								state.lastPlayGame("equis");
								state.addCurrentPlay("equis", Number(e.target.id));
							} else if (state.lastPlay === "equis") {
								let $circulo = document.createElement("component-circle");
								e.target.appendChild($circulo);
								state.lastPlayGame("circulo");
								state.addCurrentPlay("circulo", Number(e.target.id));
							}
						}
					});
				});
			};

			addPlays();

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-grid", GridElement);
}
