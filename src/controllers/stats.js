import Controller from "./Controller";
import {Controllers, showInventory} from "../main";

class StatsController extends Controller {
	onInit() {
		this.stats = null;
		
		this.element.querySelector("#showInventory").addEventListener("click", () => {
			showInventory();
		});
	}
	
	setStats(stats){
		this.stats = stats;
		this.stats.onUpdate = () => {
			this.updateUi();
		};
		
		this.stats.animate = (stat, type) => this.animate(stat, type);
		
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
		return Controllers.inventory.addItem(item);
	}
	
	animate(stat, type){
		const classList = this.element.querySelector("[" + stat + "]").classList;
		classList.add(type);
		setTimeout(() => {
			classList.remove(type);
		}, 250);
	}
}

export default StatsController;