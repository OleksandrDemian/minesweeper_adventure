import Controller from "./Controller";
import {Controllers} from "../main";

const createItemElement = item => {
	const itemUi = document.createElement("div");
	const name = document.createElement("p");
	const use = document.createElement("button");
	const drop = document.createElement("button");
	
	itemUi.style.display = "inline-block";
	itemUi.style.width = "160px";
	
	name.innerText = item.name;
	
	use.innerText = "Use";
	use.addEventListener("click", () => {
		item.use(Controllers.stats.getStats());
		if(item.monoUse){
			Controllers.stats.dropItem(item);
		}
		
		Controllers.battle.visible && Controllers.battle.tick(false);
	});
	
	drop.innerText = "Drop";
	drop.addEventListener("click", () => {
		Controllers.stats.dropItem(item);
	});
	
	itemUi.appendChild(name);
	itemUi.appendChild(use);
	itemUi.appendChild(drop);
	
	return itemUi;
};

class StatsController extends Controller {
	onInit() {
		this.stats = null;
		this.items = [];
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
		this.items.push(item);
		this.renderInventory();
	}
	
	dropItem(item){
		for(let i = 0; i < this.items.length; i++){
			if(this.items[i] === item){
				this.items.splice(i, 1);
				this.renderInventory();
				return true;
			}
		}
		
		return false;
	}
	
	renderInventory(){
		const itemsContainerUi = this.element.querySelector("[items]");
		itemsContainerUi.innerHTML = null;
		for(let i = 0; i < this.items.length; i++){
			itemsContainerUi.appendChild(createItemElement(this.items[i]));
		}
	}
}

export default StatsController;