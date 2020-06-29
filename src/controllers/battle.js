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
	
	hit(damage){
		damage -= this.defence;
		if(damage > 0){
			this.health -= damage;
		}
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
		this.element.querySelector("#attack").addEventListener("click", () => {
			this.tick(true);
		});
		
		this.enemy = null;
	}
	
	tick(attacking = false){
		this.animateAttack();
		
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
			
			if(damage > 0){
				this.enemy.hit(damage);
				this.updateUi();
				this.animate("health");
			}
			
			if(this.enemy.health < 1){
				showMap();
			}
		}
		
		const eAttack = rollDice(eDx, pDx);
		if(eAttack.critical){
			this.player.hit(this.enemy.attack * 2);
		} else if(eAttack.pass) {
			this.player.hit(this.enemy.attack);
		}
		
		if(this.player.getHealth() < 1){
			alert("You are dead");
		}
	}
	
	onShow(info) {
		this.enemy = new EnemyBattleWrapper(info.enemy);
		this.player = Controllers.stats.getStats();
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
		classList.add("animateNegative");
		setTimeout(() => {
			classList.remove("animateNegative");
		}, 250);
	}
	
	animateAttack(){
		const classList = this.element.querySelector("#attack").classList;
		classList.add("animateAttack");
		setTimeout(() => {
			classList.remove("animateAttack");
		}, 100);
	}
}

export default BattleController;