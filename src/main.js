import BattleController from "./controllers/battle";
import MapController from "./controllers/map";
import {City, Dungeon, Orc, Treasure} from "./entities/entities";
import InventoryController from "./controllers/inventory";
import StatsController from "./controllers/stats";
import Stats from "./player/stats";

const mapController = new MapController({ name: "map" });
const battleController = new BattleController({ name: "battle" });
const inventoryController = new InventoryController({ name: "inventory" });
const statsController = new StatsController({ name: "stats" });

const stats = new Stats({
	name: "Player",
	health: 5,
	damage: 2,
	defence: 1
});
statsController.setStats(stats);

mapController.setOnReady(() => {
	mapController.createEntities(Orc, 25);
	mapController.createEntities(Dungeon, 2);
	mapController.createEntities(City, 2);
	mapController.createEntities(Treasure, 5);
	
	mapController.drawMap();
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

showMap();