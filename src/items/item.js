export const ItemType = {
	POISON: 0,
	POTION: 1,
	WEAPON: 2,
	ARMOR: 3
};

class Item {

	constructor({ name, type, effect, data, monoUse = false }) {
		this.name = name;
		this.type = type;
		this.effect = effect;
		this.data = data;
		this.monoUse = monoUse;
	}
	
	use(stats) {
		this.effect && this.effect(stats);
	}
}

export default Item;