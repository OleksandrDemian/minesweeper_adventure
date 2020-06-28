import Item, {ItemType} from "./item";

function useWeapon(stats){
	stats.setWeapon(this);
}
function useArmor(stats){
	stats.setArmor(this);
}

function useHealPotion(stats){
	stats.heal(this.data.heal);
}

export const SmallHealthPotion = () => new Item({
	name: "Small health potion",
	type: ItemType.POTION,
	effect: useHealPotion,
	monoUse: true,
	data: {
		heal: 1
	}
});

export const HealthPotion = () => new Item({
	name: "Health potion",
	type: ItemType.POTION,
	effect: useHealPotion,
	monoUse: true,
	data: {
		heal: 2
	}
});

export const BigHealthPotion = () => new Item({
	name: "Big health potion",
	type: ItemType.POTION,
	effect: useHealPotion,
	monoUse: true,
	data: {
		heal: 3
	}
});

export const Dagger = () => new Item({
	name: "Dagger",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 2,
		dexterity: 2
	}
});

export const WoodenStick = () => new Item({
	name: "Wooden stick",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 1
	}
});

export const ShortSword = () => new Item({
	name: "Short sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 3,
		dexterity: 1
	}
});

export const Sword = () => new Item({
	name: "Wooden stick",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 3
	}
});

export const LeatherArmor = () => new Item({
	name: "Leather armor",
	type: ItemType.ARMOR,
	effect: useArmor,
	data: {
		defence: 1,
		dexterity: 0
	}
});

export const WoodenArmor = () => new Item({
	name: "Wooden armor",
	type: ItemType.ARMOR,
	effect: useArmor,
	data: {
		defence: 3,
		dexterity: -2
	}
});

export const TwoHandedSword = () => new Item({
	name: "Two handed sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 7,
		dexterity: -2
	}
});

export const SilverSword = () => new Item({
	name: "Silver sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 4
	}
});

export const Items = [
	//level 1
	SmallHealthPotion,
	WoodenStick,
	//level 2
	Dagger,
	ShortSword,
	WoodenArmor,
	LeatherArmor,
	//level 3
	Sword,
	HealthPotion,
	//level 4
	TwoHandedSword,
	//level 5
	SilverSword,
	BigHealthPotion
	//level 6
];