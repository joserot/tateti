import { state } from "../state";

export function initCircle() {
	class CircleElement extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			let div: any = document.createElement("div");
			div.classList.add("circle");

			let color = state.color;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
     .circle{
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: transparent;
        border: 1rem solid ${color};
      }
      `;

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-circle", CircleElement);
}
