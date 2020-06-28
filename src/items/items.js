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

//POTIONS
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

//WEAPONS
export const Dagger = () => new Item({
	name: "Dagger",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 1,
		dexterity: 2
	}
});

export const SilverDagger = () => new Item({
	name: "Silver dagger",
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
		damage: 2,
		dexterity: 1
	}
});

export const Sword = () => new Item({
	name: "Sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 3
	}
});

export const LongSword = () => new Item({
	name: "Long sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 4,
		dexterity: -1
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

export const ElderSword = () => new Item({
	name: "Elder sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 5,
		dexterity: 1
	}
});

export const ElderLongSword = () => new Item({
	name: "Elder long sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 6
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

export const TwoHandedSilverSword = () => new Item({
	name: "Two handed silver sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 8,
		dexterity: -2
	}
});

export const Axe = () => new Item({
	name: "Axe",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 5,
		dexterity: -2
	}
});

export const SilverAxe = () => new Item({
	name: "Axe",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 6,
		dexterity: -2
	}
});

export const Mace = () => new Item({
	name: "Mace",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 6,
		dexterity: -4
	}
});

export const SilverMace = () => new Item({
	name: "Silver mace",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: {
		damage: 7,
		dexterity: -4
	}
});

//ARMOR
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
		defence: 2,
		dexterity: -2
	}
});

export const SteelArmor = () => new Item({
	name: "Steel armor",
	type: ItemType.ARMOR,
	effect: useArmor,
	data: {
		defence: 4,
		dexterity: -3
	}
});

export const SilverArmor = () => new Item({
	name: "Silver armor",
	type: ItemType.ARMOR,
	effect: useArmor,
	data: {
		defence: 5,
		dexterity: -3
	}
});

export const ElderArmor = () => new Item({
	name: "Elder armor",
	type: ItemType.ARMOR,
	effect: useArmor,
	data: {
		defence: 6,
		dexterity: -2
	}
});

export const Items = [
	//level 1
	SmallHealthPotion,
	WoodenStick,
	Dagger,
	Mace,
	//level 2
	ShortSword,
	WoodenArmor,
	LeatherArmor,
	Axe,
	//level 3
	Sword,
	LongSword,
	HealthPotion,
	SilverMace,
	SteelArmor,
	//level 4
	TwoHandedSword,
	SilverAxe,
	SilverArmor,
	SilverDagger,
	ElderSword,
	//level 5
	TwoHandedSilverSword,
	ElderArmor,
	SilverSword,
	BigHealthPotion,
	ElderLongSword
	//level 6
];