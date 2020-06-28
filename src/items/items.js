import Item, {ItemType} from "./item";

function useWeapon(stats){
	stats.setWeapon(this);
}
function useArmor(stats){
	stats.setArmor(this);
}

function useHealPotion(stats){
	stats.heal(this.value);
}

export const HealthPotion = () => new Item({
	name: "Health potion",
	type: ItemType.POTION,
	effect: useHealPotion,
	monoUse: true,
	value: 1
});

export const Dagger = () => new Item({
	name: "Dagger",
	type: ItemType.WEAPON,
	effect: useWeapon,
	value: 2
});

export const WoodenStick = () => new Item({
	name: "Wooden stick",
	type: ItemType.WEAPON,
	effect: useWeapon,
	value: 1
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

export const Items = [
	HealthPotion,
	WoodenStick,
	Dagger,
	LeatherArmor
];