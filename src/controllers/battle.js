import {Controllers, showMap} from "../main";
import Controller from "./Controller";

class EnemyBattleWrapper {
	constructor(enemy) {
		this.name = enemy.data.name;
		this.health = enemy.data.health;
		this.attack = enemy.data.attack;
		this.defence = enemy.data.defence;
	}
	
	hit(damage){
		damage -= this.defence;
		if(damage > 0){
			this.health -= damage;
		}
	}
}

class BattleController extends Controller {

	onInit() {
		this.element.querySelector("#attack").addEventListener("click", () => {
			this.enemy.hit(this.player.getDamage());
			this.updateUi();
			
			if(this.enemy.health < 1){
				alert("You won");
				showMap();
			}
			
			this.player.hit(this.enemy.attack);
			
			if(this.player.getHealth() < 1){
				alert("You are dead");
			}
		});
		
		this.enemy = null;
	}
	
	onShow(info) {
		this.enemy = new EnemyBattleWrapper(info.enemy);
		this.player = Controllers.stats.getStats();
		info.enemy.enable(false);
		this.updateUi();
	}
	
	updateUi(){
		this.element.querySelector("[name]").innerText = this.enemy.name;
		this.element.querySelector("[health]").innerText = this.enemy.health;
		this.element.querySelector("[damage]").innerText = this.enemy.attack;
		this.element.querySelector("[defence]").innerText = this.enemy.defence;
	}
}

export default BattleController;