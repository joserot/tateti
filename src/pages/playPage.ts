import { Router } from "@vaadin/router";
import { state } from "../state";

export function initPlayPage() {
	class PlayPage extends HTMLElement {
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
      <h2></h2>
        <component-grid></component-grid>
        <component-button>Volver a Jugar</component-button>
      </div>
      `;

			/*********************STYLES *************************/

			const style = document.createElement("style");
			style.innerHTML = `
      div{
        width: 100%;
        height: 100%;
      }
      .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
      }

      .end{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
      }

      component-button{
      z-index: 200;
      }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			const listenWin = () => {
				let lastWin = state.lastWin;
				if (lastWin === "xWin") {
					let h2 = div.querySelector("h2");
					h2.textContent = "La Equis ganó";
					let endGame = document.createElement("div");
					endGame.classList.add("end");
					div.appendChild(endGame);
				}

				if (lastWin === "circleWin") {
					let h2 = div.querySelector("h2");
					h2.textContent = "El Circulo ganó";
					let endGame = document.createElement("div");
					endGame.classList.add("end");
					div.appendChild(endGame);
				}
			};

			const playAgain = () => {
				const $btn = div.querySelector("component-button");

				$btn.addEventListener("click", (e) => {
					location.reload();
					Router.go("/tateti/");
				});
			};

			playAgain();

			document.addEventListener("click", listenWin);
		}
	}
	customElements.define("play-page", PlayPage);
}
