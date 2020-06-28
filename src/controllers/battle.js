import {Controllers, showMap} from "../main";
import Controller from "./Controller";
import {random} from "../utils/utils";

class EnemyBattleWrapper {
	constructor(enemy) {
		this.name = enemy.data.name;
		this.health = enemy.data.health;
		this.attack = enemy.data.attack;
		this.defence = enemy.data.defence;
		this.dexterity = enemy.data.dexterity;
	}
	
	hit(damage, dex){
		const maxDex = this.dexterity + dex;
		const rand = random(maxDex);
		
		if(rand < dex){
			damage -= this.defence;
			if(damage > 0){
				this.health -= damage;
			}
		}
	}
}

class BattleController extends Controller {

	onInit() {
		this.element.querySelector("#attack").addEventListener("click", () => {
			this.enemy.hit(this.player.getDamage(), this.player.getDexterity());
			this.updateUi();
			
			if(this.enemy.health < 1){
				alert("You won");
				showMap();
			}
			
			this.player.hit(this.enemy.attack, this.enemy.dexterity);
			
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
		this.element.querySelector("[dexterity]").innerText = this.enemy.dexterity;
	}
}

export default BattleController;