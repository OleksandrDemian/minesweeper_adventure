import Controller from "./Controller";
import {Controllers} from "../main";

class StatsController extends Controller {
	onInit() {
		this.stats = null;
	}
	
	setStats(stats){
		this.stats = stats;
		this.stats.onUpdate = () => {
			this.updateUi();
		};
		
		this.updateUi();
	}
	
	getStats(){
		return this.stats;
	}
	
	updateUi(){
		this.element.querySelector("[name]").innerText = this.stats.name;
		this.element.querySelector("[health]").innerText = this.stats.getHealth();
		this.element.querySelector("[damage]").innerText = this.stats.getDamage();
		this.element.querySelector("[armor]").innerText = this.stats.getArmor();
		this.element.querySelector("[dexterity]").innerText = this.stats.getDexterity();
	}
	
	addItem(item){
		Controllers.inventory.addItem(item);
	}
}

export default StatsController;