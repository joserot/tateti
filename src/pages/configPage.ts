import { Router } from "@vaadin/router";
import { state } from "../state";

export function initConfigPage() {
	class ConfigPage extends HTMLElement {
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
      <component-text>Elige un simbolo y un color para comenzar</component-text>
      <form>
          <div>
            <label for="equis">
                       <component-equis></component-equis>
            </label>
          <input type="radio" id="equis" name="play" value="equis"
                   >
          </div>
          <div>
              <label for="circle">
              <component-circle></component-circle>
            </label>
            <input type="radio" id="circle" name="play" value="circulo">
          </div>
      </form>

       <form>


   <div>
            <label for="black">
                     <div class="color black"></div>
            </label>
          <input type="radio" id="black" name="color" value="#000"
                   >
          </div>

          <div>
            <label for="red">
                     <div class="color red"></div>
            </label>
          <input type="radio" id="red" name="color" value="#FF6347"
                   >
          </div>

          <div>
            <label for="blue">
                     <div class="color blue"></div>
            </label>
          <input type="radio" id="blue" name="color" value="#00008B">
          </div>

          <div>
            <label for="green">
                     <div class="color green"></div>
            </label>
          <input type="radio" id="green" name="color" value="#00FF00">
          </div>
       
      </form>


      <component-button>Jugar!</component-button>
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
      }

      component-text{
        text-align:center;
      }

      form{
        display: flex;
        align-items:  flex-end;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 5rem;
      }

      form div{
         display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      .color{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

       .red{
        background-color: #FF6347;
      }

      .blue{
        background-color:	#00008B;
      }

      .green{
        background-color: #00FF00;
      }

      .black{
           background-color: #000;
      }

      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			// Cambia el estado, dando como ultima jugada al simbolo contrario del seleccionado
			const changeSimbol = () => {
				const $inputsRadio = div.querySelectorAll("[name=play]");
				$inputsRadio.forEach((input) => {
					input.addEventListener("change", (e) => {
						if (e.target.value === "circulo") {
							state.lastPlayGame("equis");
						}
						if (e.target.value === "equis") {
							state.lastPlayGame("circulo");
						}
					});
				});
			};

			const ChangeColor = () => {
				const $inputsRadio = div.querySelectorAll("[name=color]");
				$inputsRadio.forEach((input) => {
					input.addEventListener("change", (e) => {
						state.setColor(e.target.value);
					});
				});
			};

			const goToPlay = () => {
				const $btn = div.querySelector("component-button");
				$btn.addEventListener("click", (e) => {
					Router.go("/tateti/juego");
				});
			};

			goToPlay();
			changeSimbol();
			ChangeColor();
		}
	}
	customElements.define("config-page", ConfigPage);
}
