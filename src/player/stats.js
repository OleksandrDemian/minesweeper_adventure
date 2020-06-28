class Stats {
	constructor({ name, health = 0, damage = 0, defence = 0 }) {
		this.name = name;
		this.damage = damage;
		this.health = health;
		this.defence = defence;
		
		this.weapon = null;
		this.armor = null;
		this.onUpdate = null;
		
		this.def = {
			health,
			damage
		}
	}
	
	setWeapon(item){
		this.weapon = item;
		this.onUpdate && this.onUpdate();
	}
	
	setArmor(item){
		this.armor = item;
		this.onUpdate && this.onUpdate();
	}
	
	heal(amount = 1){
		this.health += amount;
		if(this.health > this.def.health){
			this.health = this.def.health;
		}
		
		this.onUpdate && this.onUpdate();
		return this;
	}
	
	getHealth(){
		return this.health;
	}
	
	getDamage(){
		let d = this.damage;
		if(this.weapon != null){
			d += this.weapon.value;
		}
		
		return d;
	}
	
	getArmor(){
		let a = this.defence;
		if(this.armor != null){
			a += this.armor.value;
		}
		
		return a;
	}
}

export default Stats;