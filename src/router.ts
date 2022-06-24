import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("root"));
router.setRoutes([
	{ path: "/tateti/", component: "welcome-page" },
	{ path: "/tateti/configuracion", component: "config-page" },
	{ path: "/tateti/juego", component: "play-page" },
]);
