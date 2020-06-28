import BattleController from "./controllers/battle";
import MapController from "./controllers/map";
import InventoryController from "./controllers/inventory";
import StatsController from "./controllers/stats";
import Stats from "./player/stats";
import {Levels} from "./levels/levels";
import {Rogue, Thief, Warrior} from "./player/heros";
import HeroController from "./controllers/hero";

const mapController = new MapController({ name: "map" });
const battleController = new BattleController({ name: "battle" });
const inventoryController = new InventoryController({ name: "inventory" });
const statsController = new StatsController({ name: "stats" });
const heroController = new HeroController({ name: "hero" });

let CUR_LEVEL = 0;

export const startGame = ({ hero }) => {
	mapController.setOnReady(() => {
		const level = Levels[CUR_LEVEL];
		mapController.buildLevel(level);
	});
	
	let heroData = null;
	switch (hero) {
		case "warrior":
			heroData = Warrior();
			break;
		case "thief":
			heroData = Thief();
			break;
		case "rogue":
			heroData = Rogue();
			break;
	}
	
	const stats = new Stats(heroData);
	statsController.setStats(stats);
	
	inventoryController.show();
	statsController.show();
	heroController.hide();
	
	showMap();
};

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

mapController.hide();
battleController.hide();
inventoryController.hide();
statsController.hide();

heroController.onStart(({ hero }) => {
	startGame({ hero })
});