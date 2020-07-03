import {Controllers} from "../main";

let element = null;

const init = () => {
	element = document.getElementById("infoPopUp");
	
	element.querySelector("#closeInfo").addEventListener("click", () => {
		close();
	});
	
	close();
};

const close = () => {
	Controllers.stats.showInventoryButton();
	element.style.display = "none";
};

const show = (title, message) => {
	element.querySelector("[title]").innerText = title;
	element.querySelector("[info]").innerText = message;
	
	element.style.display = "flex";
	Controllers.stats.hideInventoryButton();
};

const InfoPopUp = {
	init,
	close,
	show
};

export default InfoPopUp;