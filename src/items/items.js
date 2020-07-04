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

const WeaponMaterials = {
	Wood: {
		damage: 0,
		dexterity: 0
	},
	Steel: {
		damage: 2,
		dexterity: -1
	},
	Silver: {
		damage: 3
	},
	Elder: {
		damage: 4,
		dexterity: 1
	}
};

const WeaponTypes = {
	Stick: {
		damage: 1
	},
	Dagger: {
		dexterity: 2
	},
	ShortSword: {
		dexterity: 1,
		damage: 1
	},
	Sword: {
		damage: 2
	},
	LongSword: {
		damage: 3,
		dexterity: -1
	},
	TwoHandedSword: {
		damage: 5,
		dexterity: -2
	},
	Axe: {
		damage: 5,
		dexterity: -3
	},
	Mace: {
		damage: 6,
		dexterity: -5
	}
};

const getNumberValue = (value) => Number(value || 0);

const createWeaponData = (material, type) => {
	const damage = getNumberValue(material.damage) + getNumberValue(type.damage);
	const dexterity = getNumberValue(material.dexterity) + getNumberValue(type.dexterity);
	
	return { damage, dexterity };
};

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
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.Dagger)
});

export const SilverDagger = () => new Item({
	name: "Silver dagger",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Silver, WeaponTypes.Dagger)
});

export const WoodenStick = () => new Item({
	name: "Wooden stick",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Wood, WeaponTypes.Stick)
});

export const ShortSword = () => new Item({
	name: "Short sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.ShortSword)
});

export const Sword = () => new Item({
	name: "Sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.Sword)
});

export const LongSword = () => new Item({
	name: "Long sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.LongSword)
});

export const SilverSword = () => new Item({
	name: "Silver sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Silver, WeaponTypes.Sword)
});

export const ElderSword = () => new Item({
	name: "Elder sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Elder, WeaponTypes.Sword)
});

export const ElderLongSword = () => new Item({
	name: "Elder long sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Elder, WeaponTypes.LongSword)
});

export const TwoHandedSword = () => new Item({
	name: "Two handed sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.TwoHandedSword)
});

export const TwoHandedSilverSword = () => new Item({
	name: "Two handed silver sword",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Silver, WeaponTypes.TwoHandedSword)
});

export const Axe = () => new Item({
	name: "Axe",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.Axe)
});

export const SilverAxe = () => new Item({
	name: "Silver axe",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Silver, WeaponTypes.Axe)
});

export const Mace = () => new Item({
	name: "Mace",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Steel, WeaponTypes.Mace)
});

export const SilverMace = () => new Item({
	name: "Silver mace",
	type: ItemType.WEAPON,
	effect: useWeapon,
	data: createWeaponData(WeaponMaterials.Silver, WeaponTypes.Mace)
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

export const ItemsPerLevel = [
	[
		SmallHealthPotion,
		WoodenStick,
		Dagger,
		Mace,
	],
	[
		ShortSword,
		WoodenArmor,
		LeatherArmor,
		Axe,
	],
	[
		Sword,
		LongSword,
		HealthPotion,
		SilverMace,
		SteelArmor,
	],
	[
		TwoHandedSword,
		SilverAxe,
		SilverArmor,
		SilverDagger,
		ElderSword,
	],
	[
		TwoHandedSilverSword,
		ElderArmor,
		SilverSword,
		BigHealthPotion,
		ElderLongSword
	],
];