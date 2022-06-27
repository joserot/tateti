import "./router";
// Components
import { initButton } from "./components/Button";
import { initText } from "./components/Text";
import { initCircle } from "./components/Circle";
import { initEquis } from "./components/Equis";
import { initGrid } from "./components/Grid";
// Pages
import { initWelcomePage } from "./pages/welcomePage";
import { initConfigPage } from "./pages/configPage";
import { initPlayPage } from "./pages/playPage";

const initApp = (params: Element | null) => {
	// Pages
	initWelcomePage();
	initConfigPage();
	initPlayPage();

	// Components
	initButton();
	initText();
	initCircle();
	initEquis();
	initGrid();
};

(function () {
	const root = document.getElementById("root");
	initApp(root);
})();
