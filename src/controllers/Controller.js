class Controller {
	constructor({ name }) {
		this.element = document.querySelector("[controller='" + name + "']");
		this.visible = true;
		this.onInit();
	}
	
	show(info){
		this.element.style.display = "block";
		this.visible = true;
		this.onShow(info);
	}
	
	hide(info){
		this.element.style.display = "none";
		this.visible = false;
		this.onHide(info);
	}
	
	onInit(){}
	onShow(){}
	onHide(){}
}

export default Controller;