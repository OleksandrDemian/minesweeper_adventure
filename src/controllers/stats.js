import Controller from "./Controller";

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
		this.element.querySelector("[health]").innerText = this.stats.getHealth();
		this.element.querySelector("[damage]").innerText = this.stats.getDamage();
		this.element.querySelector("[armor]").innerText = this.stats.getArmor();
	}
}

export default StatsController;