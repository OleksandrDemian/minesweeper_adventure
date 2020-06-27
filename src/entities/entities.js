import Entity from "./Entity";
import Type from "./EntityType";
import {showBattle} from "../main";

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

export const Empty = () => new Entity({ color: "white", type: Type.EMPTY });

export const City = () => new Entity({
	img: "city",
	type: Type.BLOCK,
	onClick: function () {
		alert("Entering the city");
	}
});

export const Dungeon = () => new Entity({
	img: "dungeonEnter",
	type: Type.BLOCK,
	onClick: function () {
		alert("Entering the dungeon");
	}
});