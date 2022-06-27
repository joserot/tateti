import { Router } from "@vaadin/router";
import { state } from "../state";
import { initGrid } from "../components/Grid";
import { stat } from "fs";

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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }

      component-button{
      z-index: 200;
      }

      h2{
        font-family: "Roboto", sans-serif;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        margin: 0 auto;
        text-align: center;
        background-color: #FF6347;
        color: #fff;
      }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			state.initState();
			let h2 = document.createElement("h2");
			let endGame = document.createElement("div");

			const renderAgain = () => {
				endGame.classList.remove("end");
				div.innerHTML = `
         <div class="container">
        <component-grid></component-grid>
        <component-button>Volver a Jugar</component-button>
      </div>
        `;
			};

			const listenWin = () => {
				let lastWin = state.lastWin;
				if (lastWin === "xWin") {
					h2.textContent = "La Equis ganó";
					endGame.classList.add("end");
					endGame.appendChild(h2);
					div.appendChild(endGame);
				}

				if (lastWin === "circleWin") {
					h2.textContent = "El Circulo ganó";
					endGame.classList.add("end");
					endGame.appendChild(h2);
					div.appendChild(endGame);
				}
			};

			const playAgain = () => {
				const $btn = div.querySelector("component-button");

				$btn.addEventListener("click", (e) => {
					state.resetState();
					renderAgain();
					listenWin();
					playAgain();
					Router.go("/tateti/configuracion");
				});
			};

			playAgain();

			document.addEventListener("click", listenWin);
		}
	}
	customElements.define("play-page", PlayPage);
}
