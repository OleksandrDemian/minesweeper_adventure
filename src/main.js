import BattleController from "./controllers/battle";
import MapController from "./controllers/map";
import InventoryController from "./controllers/inventory";
import StatsController from "./controllers/stats";
import Stats from "./player/stats";
import {Levels} from "./levels/levels";

const mapController = new MapController({ name: "map" });
const battleController = new BattleController({ name: "battle" });
const inventoryController = new InventoryController({ name: "inventory" });
const statsController = new StatsController({ name: "stats" });

let CUR_LEVEL = 0;

const stats = new Stats({
	name: "Player",
	health: 5,
	damage: 2,
	defence: 1,
	dexterity: 10
});
statsController.setStats(stats);

mapController.setOnReady(() => {
	const level = Levels[CUR_LEVEL];
	mapController.buildLevel(level);
});

export const showMap = (info) => {
	mapController.show(info);
	battleController.hide();
};

export const showBattle = (info) => {
	mapController.hide();
	battleController.show(info);
};

export const Controllers = {
	map: mapController,
	battle: battleController,
	inventory: inventoryController,
	stats: statsController
};

export const nextLevel = () => {
	CUR_LEVEL++;
	const level = Levels[CUR_LEVEL];
	mapController.buildLevel(level);
};

showMap();