import Controller from "./Controller";
import {Controllers} from "../main";

const createItemElement = item => {
	const itemUi = document.createElement("div");
	const name = document.createElement("p");
	const use = document.createElement("button");
	const drop = document.createElement("button");
	
	name.innerText = item.name;
	
	use.innerText = "Use";
	use.addEventListener("click", () => {
		item.use(Controllers.stats.getStats());
		if(item.monoUse){
			Controllers.inventory.dropItem(item);
		}
		
		Controllers.battle.visible && Controllers.battle.tick(false);
	});
	
	drop.innerText = "Drop";
	drop.addEventListener("click", () => {
		Controllers.inventory.dropItem(item);
	});
	
	itemUi.appendChild(name);
	itemUi.appendChild(use);
	itemUi.appendChild(drop);
	
	return itemUi;
};

class InventoryController extends Controller {
	
	onInit() {
		this.items = [];
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

export default InventoryController;