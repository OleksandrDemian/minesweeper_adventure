import {init as initMap} from "./controllers/map";
import {init as initBattle} from "./controllers/battle";

export const showMap = () => {
	document.getElementById("battle").style.display = "none";
	document.getElementById("map").style.display = "block";
};

export const showBattle = () => {
	document.getElementById("map").style.display = "none";
	document.getElementById("battle").style.display = "block";
};

initMap();
initBattle();
showMap();