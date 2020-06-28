import Type from "../entities/EntityType";
import {Dungeon, Empty, Treasure} from "../entities/entities";
import ImageMap from "../utils/ImageMap";
import Controller from "./Controller";
import {Levels} from "../levels/levels";
import {random} from "../utils/utils";
import {Items} from "../items/items";

const CELL_SIZE = 32;
const FONT_SIZE = 20;
const MAP_SIZE = 512;
const CELLS = MAP_SIZE / CELL_SIZE;

class MapController extends Controller {

	onInit(){
		const canvas = this.element.querySelector("canvas");
		this.context = canvas.getContext("2d");
		
		canvas.addEventListener("click", this.handleClick.bind(this));
		
		this.map = null;
		this.ready = false;
		this.onReady = null;
		
		this.sprites = new ImageMap(this.context, "./public/tilemap.png", () => {
			this.createMap();
			this.ready = true;
			this.onReady && this.onReady();
		}, {
			hero: { x: 4, y: 0 },
			snake: { x: 4, y: 1 },
			orc: { x: 11, y: 0 },
			city: { x: 6, y: 7 },
			dungeonEnter: { x: 4, y: 3 },
			treasure: { x: 9, y: 3 },
			deadEnemy: { x: 8, y: 7 },
		});
	}
	
	handleClick(e){
		const x = e.offsetX / CELL_SIZE;
		const y = e.offsetY / CELL_SIZE;
		
		const iX = Math.floor(x);
		const iY = Math.floor(y);
		
		const cell = this.map[iX][iY];
		
		if(cell.shown){
			if(cell.onClick != null){
				cell.onClick();
			}
		} else {
			if(cell.onOpen != null){
				cell.onOpen();
			}
			
			this.checkCell(iX, iY);
		}
		
		this.drawMap();
	}
	
	setOnReady(callback){
		this.onReady = callback;
		if(this.ready){
			this.onReady();
		}
	}
	
	createMap() {
		this.map = [];
		for(let x = 0; x < CELLS; x++){
			let xArr = [];
			for(let y = 0; y < CELLS; y++){
				xArr[y] = Empty();
			}
			this.map[x] = xArr;
		}
	};
	
	createEntities(ent, amount) {
		let created = 0;
		while (created < amount){
			const x = Math.random() * CELLS;
			const y = Math.random() * CELLS;
			
			const iX = Math.floor(x);
			const iY = Math.floor(y);
			
			if(this.map[iX][iY].type === Type.EMPTY){
				this.map[iX][iY] = ent();
				created++;
			}
		}
	};
	
	clearCanvas() {
		this.context.fillStyle = "white";
		this.context.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
	};
	
	checkCell (iX, iY) {
		this.map[iX][iY].shown = true;
		const enemies = this.countEnemies(iX, iY);
		if(enemies > 0){
			this.map[iX][iY].enemies = enemies;
		} else {
			this.checkEmptyCells(iX, iY);
		}
	};
	
	checkEmptyCells(x, y) {
		for(let ix = x-1; ix <= x+1; ix ++){
			for(let iy = y-1; iy <= y+1; iy ++){
				if(ix !== x && iy !== y)
					continue;
				
				if(ix < 0 || ix >= CELLS)
					continue;
				
				if(iy < 0 || iy >= CELLS)
					continue;
				
				const ent = this.map[ix][iy];
				if(!ent.shown && (ent.type === Type.EMPTY || !ent.enabled)) {
					this.checkCell(ix, iy);
				}
			}
		}
	};
	
	drawRect(x, y, color = "black") {
		this.context.fillStyle = color;
		this.context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	};
	
	drawText(x, y, text, color = "red") {
		this.context.font = FONT_SIZE + "px text";
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillStyle = color;
		this.context.fillText(text, (x * CELL_SIZE) + (CELL_SIZE/2), (y * CELL_SIZE) + (CELL_SIZE/2));
	};
	
	drawMap() {
		let ent = null;
		this.clearCanvas();
		
		for(let x = 0; x < CELLS; x++){
			for(let y = 0; y < CELLS; y++){
				ent = this.map[x][y];
				
				if(ent.shown){
					if(ent.type === Type.EMPTY || !ent.enabled){
						if((x + y) % 2 === 0){
							this.drawRect(x, y, "white");
						} else {
							this.drawRect(x, y, "#faded9");
						}
					} else if(ent.img != null) {
						this.sprites.draw(ent.img, x, y);
					} else {
						this.drawRect(x, y, ent.color);
					}
					
					if(ent.enemies > 0 && ent.type !== Type.ENEMY){
						const color = ent.type === Type.EMPTY || !ent.enabled ? "black" : "white";
						this.drawText(x, y, ent.enemies, color);
					}
				} else {
					if((x + y) % 2 === 0){
						this.drawRect(x, y, "#364f6b");
					} else {
						this.drawRect(x, y, "#fc5185");
					}
				}
			}
		}
	};
	
	countEnemies(x, y) {
		let enemies = 0;
		for(let ix = x-1; ix <= x+1; ix ++){
			for(let iy = y-1; iy <= y+1; iy ++){
				if(ix < 0 || ix >= CELLS)
					continue;
				
				if(iy < 0 || iy >= CELLS)
					continue;
				
				const { type, enabled } = this.map[ix][iy];
				if(enabled && type === Type.ENEMY)
					enemies++;
			}
		}
		
		return enemies;
	};
	
	buildLevel(level){
		this.createMap();
		
		const Chest = (l) => {
			return () => {
				const rand = random(0, l);
				return Treasure(Items[rand]())
			};
		};
		
		for(let i = 0; i < level.enemies.length; i++){
			const { enemy, qty } = level.enemies[i];
			this.createEntities(enemy, qty);
		}
		
		this.createEntities(Dungeon, 1);
		this.createEntities(Chest(level.maxItemLevel), random(2, level.maxTreasures));
		
		this.drawMap();
	}
}

export default MapController;