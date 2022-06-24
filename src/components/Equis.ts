import { state } from "../state";

export function initEquis() {
	class EquisElement extends HTMLElement {
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
        <div></div>
        <div></div>
      </div>
      `;

			/* STYLES */

			let color = state.color;

			let styles = document.createElement("style");
			styles.innerHTML = `
     .container{
      width: 5rem;
      height: 5rem;
      display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: center;
      }

      .container div{
      width: 7rem;
      height: 1rem;
      background-color: ${color};
      position: absolute;
      }

      .container  div:nth-child(1){
        transform: rotate(45deg);
      }

       .container  div:nth-child(2){
         transform: rotate(-45deg);
      }
      `;

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-equis", EquisElement);
}
