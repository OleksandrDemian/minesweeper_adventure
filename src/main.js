import BattleController from "./controllers/battle";
import MapController from "./controllers/map";
import StatsController from "./controllers/stats";
import Stats from "./player/stats";
import {Levels} from "./levels/levels";
import {Rogue, Thief, Warrior} from "./player/heros";
import HeroController from "./controllers/hero";
import InventoryController from "./controllers/inventory";
import InfoPopUp from "./utils/infoPopUp";

const mapController = new MapController({ name: "map" });
const battleController = new BattleController({ name: "battle" });
const statsController = new StatsController({ name: "stats" });
const heroController = new HeroController({ name: "hero" });
const inventoryController = new InventoryController({ name: "inventory" });

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
	
	if(heroData.startItems != null){
		for(let i = 0; i < heroData.startItems.length; i++){
			statsController.addItem(heroData.startItems[i]);
		}
	}
	
	statsController.show();
	hideInventory();
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

export const showInventory = (info) => {
	inventoryController.show(info);
};

export const hideInventory = (info) => {
	inventoryController.hide(info);
};

export const Controllers = {
	map: mapController,
	battle: battleController,
	stats: statsController,
	inventory: inventoryController
};

export const nextLevel = () => {
	CUR_LEVEL++;
	const level = Levels[CUR_LEVEL];
	mapController.buildLevel(level);
};

export const restart = () => {
	CUR_LEVEL = 0;
	mapController.hide();
	battleController.hide();
	statsController.hide();
	inventoryController.hide();
	inventoryController.clear();
	
	heroController.show();
};

heroController.onStart(({ hero }) => {
	startGame({ hero })
});

InfoPopUp.init();
restart();