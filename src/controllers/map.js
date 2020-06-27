import Type from "../entities/EntityType";
import {City, Dungeon, Empty, Orc} from "../entities/entities";
import ImageMap from "../utils/ImageMap";

const CELL_SIZE = 32;
const FONT_SIZE = 20;
const MAP_SIZE = 512;
const CELLS = MAP_SIZE / CELL_SIZE;

let MAP = null;
let canvas = null;
let context = null;
let sprites = null;

const checkCell = (iX, iY) => {
	MAP[iX][iY].shown = true;
	const enemies = countEnemies(iX, iY);
	if(enemies > 0){
		MAP[iX][iY].enemies = enemies;
	} else {
		checkEmptyCells(iX, iY);
	}
};

const checkEmptyCells = (x, y) => {
	for(let ix = x-1; ix <= x+1; ix ++){
		for(let iy = y-1; iy <= y+1; iy ++){
			if(ix !== x && iy !== y)
				continue;
			
			if(ix < 0 || ix >= CELLS)
				continue;
			
			if(iy < 0 || iy >= CELLS)
				continue;
			
			if(!MAP[ix][iy].shown && MAP[ix][iy].type === Type.EMPTY) {
				checkCell(ix, iy);
			}
		}
	}
};

const drawRect = (x, y, color = "black") => {
	context.fillStyle = color;
	context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	
};

const drawText = (x, y, text, color = "red") => {
	context.font = FONT_SIZE + "px Arial";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = color;
	context.fillText(text, (x * CELL_SIZE) + (CELL_SIZE/2), (y * CELL_SIZE) + (CELL_SIZE/2));
};

const clearCanvas = () => {
	context.fillStyle = "white";
	context.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
};

const updateCanvas = () => {
	clearCanvas();
	drawMap();
};

const drawMap = () => {
	let ent = null;
	for(let x = 0; x < CELLS; x++){
		for(let y = 0; y < CELLS; y++){
			ent = MAP[x][y];
			
			if(ent.shown){
				if(ent.type === Type.EMPTY){
					if((x + y) % 2 === 0){
						drawRect(x, y, "white");
					} else {
						drawRect(x, y, "#faded9");
					}
				} else if(ent.img != null) {
					sprites.draw(ent.img, x, y);
				} else {
					drawRect(x, y, ent.color);
				}
				
				if(ent.enemies > 0 && ent.type !== Type.ENEMY){
					drawText(x, y, ent.enemies, ent.type === Type.EMPTY ? "black" : "white");
				}
			} else {
				if((x + y) % 2 === 0){
					drawRect(x, y, "#364f6b");
				} else {
					drawRect(x, y, "#fc5185");
				}
			}
		}
	}
};

const createMap = () => {
	MAP = [];
	for(let x = 0; x < CELLS; x++){
		let xArr = [];
		for(let y = 0; y < CELLS; y++){
			xArr[y] = Empty();
		}
		MAP[x] = xArr;
	}
};

const countEnemies = (x, y) => {
	let enemies = 0;
	for(let ix = x-1; ix <= x+1; ix ++){
		for(let iy = y-1; iy <= y+1; iy ++){
			if(ix < 0 || ix >= CELLS)
				continue;
			
			if(iy < 0 || iy >= CELLS)
				continue;
			
			if(MAP[ix][iy].type === Type.ENEMY)
				enemies++;
		}
	}
	
	return enemies;
};

const createEntities = (ent, amount) => {
	let created = 0;
	while (created < amount){
		const x = Math.random() * CELLS;
		const y = Math.random() * CELLS;
		
		const iX = Math.floor(x);
		const iY = Math.floor(y);
		
		if(MAP[iX][iY].type === Type.EMPTY){
			MAP[iX][iY] = ent();
			created++;
		}
	}
};

export const init = () => {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	
	sprites = new ImageMap(context, "./public/tilemap.png", () => {
	
	}, {
		hero: { x: 4, y: 0 },
		snake: { x: 4, y: 1 },
		orc: { x: 11, y: 0 },
		city: { x: 6, y: 7 },
		dungeonEnter: { x: 4, y: 3 },
	});
	
	canvas.addEventListener("click", (e) => {
		const x = e.offsetX / CELL_SIZE;
		const y = e.offsetY / CELL_SIZE;
		
		const iX = Math.floor(x);
		const iY = Math.floor(y);
		
		const cell = MAP[iX][iY];
		
		if(cell.shown){
			if(cell.onClick != null){
				cell.onClick();
			}
		} else {
			if(cell.onOpen != null){
				cell.onOpen();
			}
			
			checkCell(iX, iY);
		}
		
		updateCanvas();
	});
	
	createMap();
	
	createEntities(Orc, 25);
	createEntities(City, 8);
	createEntities(Dungeon, 4);
	
	drawMap();
};