import { Router } from "@vaadin/router";

export function initWelcomePage() {
	class WelcomePage extends HTMLElement {
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
      <h1>TA-TE-TI</h1>
        <component-text>Completa una columna o fila para ganar</component-text>
        <component-button>Comenzar</component-button>   
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

      h1{
      font-family: "Roboto", sans-serif;
      color: #7a7a7a;
      }

      component-text{
        text-align: center;
      }

      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			const goToConfig = () => {
				const $btn = div.querySelector("component-button");
				$btn.addEventListener("click", (e) => {
					Router.go("/tateti/configuracion");
				});
			};
			goToConfig();
		}
	}
	customElements.define("welcome-page", WelcomePage);
}
