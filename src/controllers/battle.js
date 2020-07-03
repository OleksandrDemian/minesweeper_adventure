import {Controllers, restart, showMap} from "../main";
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
	
	hit(damage){
		damage -= this.defence;
		if(damage > 0){
			this.health -= damage;
		}
		
		return damage;
	}
}

const rollDice = (dAttack, dDefence) => {
	const maxDex = dAttack + dDefence;
	const rand = random(maxDex);
	
	return {
		pass: dAttack > rand,
		critical: rand === 0
	}
};

class BattleController extends Controller {

	onInit() {
		this.attackButton = this.element.querySelector("[attack]");
		this.resurrectButton = this.element.querySelector("[resurrect]");
		this.continueButton = this.element.querySelector("[continue]");
		
		this.attackButton.addEventListener("click", () => {
			this.tick(true);
		});
		
		this.resurrectButton.addEventListener("click", () => {
			restart();
		});
		
		this.continueButton.addEventListener("click", () => {
			showMap();
		});
		
		this.enemy = null;
	}
	
	tick(attacking = false){
		this.animateAttack();
		Controllers.battleLog.clear();
		
		const pDx = this.player.getDexterity();
		const eDx = this.enemy.dexterity;
		
		if(attacking === true){
			const pAttack = rollDice(pDx, eDx);
			let damage = 0;
			if(pAttack.critical){
				damage = this.player.getDamage() * 2;
			} else if(pAttack.pass) {
				damage = this.player.getDamage()
			}
			
			damage = this.enemy.hit(damage);
			
			if(damage > 0){
				this.updateUi();
				this.animate("health", "animateNegative");
				Controllers.battleLog.append(this.enemy.name + " gets " + damage + " damage", "positive-text");
			} else {
				Controllers.battleLog.append(this.player.name + " miss " + this.enemy.name, "negative-text");
			}
			
			if(this.enemy.health < 1){
				Controllers.battleLog.append(this.enemy.name + " is dead", "positive-text");
				this.showContinue();
				return;
			}
		}
		
		const eAttack = rollDice(eDx, pDx);
		let damage = 0;
		
		if(eAttack.critical){
			damage = (this.enemy.attack * 2);
		} else if(eAttack.pass) {
			damage = (this.enemy.attack);
		}
		
		damage = this.player.hit(damage);
		if(damage > 0){
			Controllers.battleLog.append(this.player.name + " gets " + damage + " damage", "negative-text");
		} else {
			Controllers.battleLog.append(this.enemy.name + " miss " + this.player.name, "positive-text");
		}
		
		if(this.player.getHealth() < 1){
			Controllers.battleLog.append(this.player.name + " is dead", "negative-text");
			this.showResurrect();
		}
	}
	
	onShow(info) {
		this.enemy = new EnemyBattleWrapper(info.enemy);
		this.player = Controllers.stats.getStats();
		
		this.resurrectButton.style.display = "none";
		this.continueButton.style.display = "none";
		this.attackButton.style.display = "flex";
		
		this.updateUi();
	}
	
	updateUi(){
		this.element.querySelector("[name]").innerText = this.enemy.name;
		this.element.querySelector("[health]").innerText = this.enemy.health;
		this.element.querySelector("[damage]").innerText = this.enemy.attack;
		this.element.querySelector("[defence]").innerText = this.enemy.defence;
		this.element.querySelector("[dexterity]").innerText = this.enemy.dexterity;
	}
	
	animate(stat, type){
		const classList = this.element.querySelector("[" + stat + "]").classList;
		classList.add(type);
		setTimeout(() => {
			classList.remove(type);
		}, 250);
	}
	
	animateAttack(){
		const classList = this.attackButton.classList;
		classList.add("animateAttack");
		setTimeout(() => {
			classList.remove("animateAttack");
		}, 100);
	}
	
	showResurrect(){
		this.attackButton.style.display = "none";
		this.resurrectButton.style.display = "flex";
	}
	
	showContinue(){
		this.attackButton.style.display = "none";
		this.continueButton.style.display = "flex";
	}
}

export default BattleController;