import Entity from "./Entity";
import Type from "./EntityType";
import {Controllers, nextLevel, showBattle} from "../main";

function onEnemy (){
	showBattle({ enemy: this });
}

export const Snake = () => new Entity({
	img: "deadEnemy",
	type: Type.ENEMY,
	onOpen: onEnemy,
	data: {
		name: "Snake",
		health: 5,
		attack: 2,
		defence: 0,
		dexterity: 9
	}
});

export const Goblin = () => new Entity({
	img: "deadEnemy",
	type: Type.ENEMY,
	onOpen: onEnemy,
	data: {
		name: "Goblin",
		health: 4,
		attack: 2,
		defence: 0,
		dexterity: 7
	}
});

export const DarkElf = () => new Entity({
	img: "deadEnemy",
	type: Type.ENEMY,
	onOpen: onEnemy,
	data: {
		name: "Dark elf",
		health: 6,
		attack: 5,
		defence: 0,
		dexterity: 8
	}
});

export const Orc = () => new Entity({
	img: "deadEnemy",
	type: Type.ENEMY,
	onOpen: onEnemy,
	data: {
		name: "Orc",
		health: 7,
		attack: 5,
		defence: 2,
		dexterity: 5
	}
});

export const DarkKnight = () => new Entity({
	img: "deadEnemy",
	type: Type.ENEMY,
	onOpen: onEnemy,
	data: {
		name: "Dark Knight",
		health: 10,
		attack: 8,
		defence: 4,
		dexterity: 7
	}
});

export const Empty = () => new Entity({color: "white", type: Type.EMPTY});

export const Dungeon = () => new Entity({
	img: "dungeonEnter",
	type: Type.NPO,
	onClick: function () {
		nextLevel();
	}
});

export const Treasure = (item) => new Entity({
	img: "treasure",
	type: Type.NPO,
	onClick: function () {
		if(this.enabled){
			Controllers.stats.addItem(item);
			this.enable(false);
		}
	}
});