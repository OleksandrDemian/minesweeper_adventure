import Controller from "./Controller";
import {restart, showMap} from "../main";

class BattleLogController extends Controller {
	
	onInit() {
		this.logsContainer = this.element.querySelector("[logs]");
	}
	
	clear(){
		this.logsContainer.innerText = "";
	}
	
	onShow(){
		this.clear();
		this.append("Beginning of the Battle");
	}
	
	append(message, mod = null){
		const p = document.createElement("p");
		p.innerText = message;
		if(mod != null){
			p.classList.add(mod);
		}
		
		this.logsContainer.appendChild(p);
	}
}

export default BattleLogController;