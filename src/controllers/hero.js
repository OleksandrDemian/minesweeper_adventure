import Controller from "./Controller";

class HeroController extends Controller {
	onInit() {
		this._onStart = null;
		this.element.querySelector("[enter]").addEventListener("click", () => {
			const hero = this.element.querySelector("#heroSelect").value;
			this._onStart && this._onStart({ hero });
		})
	}
	
	onStart(callback){
		this._onStart = callback;
	}
}

export default HeroController;