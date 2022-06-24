export function initText() {
	class TextElement extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			const content = this.textContent;

			let shadow = this.attachShadow({ mode: "open" });

			let p: any = document.createElement("p");
			p.innerText = content;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
     p{
        font-size: 2rem;
        font-family: "Roboto", sans-serif;
        color: #7a7a7a;
      }
      `;

			shadow.appendChild(styles);
			shadow.appendChild(p);
		}
	}
	customElements.define("component-text", TextElement);
}
