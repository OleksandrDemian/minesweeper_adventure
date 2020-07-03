class Stats {
	constructor({ name, health = 0, damage = 0, defence = 0, dexterity = 0 }) {
		this.name = name;
		this.damage = damage;
		this.health = health;
		this.defence = defence;
		this.dexterity = dexterity;
		
		this.weapon = null;
		this.armor = null;
		this.onUpdate = null;
		
		this.def = {
			health,
			damage
		}
	}
	
	setWeapon(item){
		const oldDamage = this.getDamage();
		const oldDex = this.getDexterity();
		
		this.weapon = item;
		this.onUpdate && this.onUpdate();
		
		if(oldDamage < this.getDamage()){
			this.animate && this.animate("damage", "animatePositive");
		} else if(oldDamage > this.getDamage()){
			this.animate && this.animate("damage", "animateNegative");
		}
		
		if(oldDex < this.getDexterity()){
			this.animate && this.animate("dexterity", "animatePositive");
		} else if(oldDex > this.getDexterity()){
			this.animate && this.animate("dexterity", "animateNegative");
		}
		
		return this;
	}
	
	setArmor(item){
		const oldArmor = this.getArmor();
		const oldDex = this.getDexterity();
		
		this.armor = item;
		this.onUpdate && this.onUpdate();
		
		if(oldArmor < this.getArmor()){
			this.animate && this.animate("armor", "animatePositive");
		} else if(oldArmor > this.getArmor()){
			this.animate && this.animate("armor", "animateNegative");
		}
		
		if(oldDex < this.getDexterity()){
			this.animate && this.animate("dexterity", "animatePositive");
		} else if(oldDex > this.getDexterity()){
			this.animate && this.animate("dexterity", "animateNegative");
		}
		return this;
	}
	
	heal(amount = 1){
		this.health += amount;
		if(this.health > this.def.health){
			this.health = this.def.health;
		} else {
			this.animate && this.animate("health", "animatePositive");
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
			d += this.weapon.data.damage;
		}
		
		return d;
	}
	
	getArmor(){
		let a = this.defence;
		if(this.armor != null){
			a += this.armor.data.defence;
		}
		
		return a;
	}
	
	getDexterity(){
		let d = this.dexterity;
		if(this.armor != null){
			d += (this.armor.data.dexterity || 0);
		}
		
		if(this.weapon != null){
			d += (this.weapon.data.dexterity || 0);
		}
		
		return d;
	}
	
	hit(amount){
		amount -= this.getArmor();
		if(amount > 0){
			this.health -= amount;
			this.onUpdate && this.onUpdate();
			this.animate && this.animate("health", "animateNegative");
		}
		
		return amount;
	}
}

export default Stats;