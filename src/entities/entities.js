import Entity from "./Entity";
import Type from "./EntityType";
import {Controllers, showBattle} from "../main";
import Items from "../items/items";

export const Orc = () => new Entity({
	img: "orc",
	type: Type.ENEMY,
	onOpen: function () {
		showBattle();
	},
	onClick: function () {
		alert("Orc is dead");
	}
});

export const Empty = () => new Entity({color: "white", type: Type.EMPTY});

export const City = () => new Entity({
	img: "city",
	type: Type.NPO,
	onClick: function () {
		alert("Entering the city");
	}
});

export const Dungeon = () => new Entity({
	img: "dungeonEnter",
	type: Type.NPO,
	onClick: function () {
		alert("Entering the dungeon");
	}
});

export const Treasure = () => new Entity({
	img: "treasure",
	type: Type.NPO,
	onClick: function () {
		if(this.enabled){
			let rand = Math.floor(Math.random() * Items.length);
			Controllers.inventory.addItem(Items[rand]());
			this.enable(false);
		}
	}
});