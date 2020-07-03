let element = null;

const init = () => {
	element = document.getElementById("infoPopUp");
	
	element.querySelector("#closeInfo").addEventListener("click", () => {
		close();
	});
	
	close();
};

const close = () => {
	element.style.display = "none";
};

const show = (title, message) => {
	element.querySelector("[title]").innerText = title;
	element.querySelector("[info]").innerText = message;
	
	element.style.display = "flex";
};

const InfoPopUp = {
	init,
	close,
	show
};

export default InfoPopUp;