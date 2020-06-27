import {showMap} from "../main";

export const init = () => {
	const parent = document.getElementById("battle");
	
	parent.querySelector("#attack").addEventListener("click", () => {
		alert("Attack");
	});
	parent.querySelector("#heal").addEventListener("click", () => {
		alert("Heal");
	});
	parent.querySelector("#backToMap").addEventListener("click", () => {
		showMap();
	});
};