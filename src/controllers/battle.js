import {showMap} from "../main";
import Controller from "./Controller";

class BattleController extends Controller {

	onInit() {
		this.element.querySelector("#attack").addEventListener("click", () => {
			alert("Attack");
		});
		this.element.querySelector("#heal").addEventListener("click", () => {
			alert("Heal");
		});
		this.element.querySelector("#backToMap").addEventListener("click", () => {
			showMap();
		});
	}
	
}

export default BattleController;