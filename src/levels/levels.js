import {Orc, Snake} from "../entities/entities";

export const Levels = [
	{
		maxTreasures: 4,
		maxItemLevel: 2,
		enemies: [
			{ enemy: Orc, qty: 15 },
			{ enemy: Snake, qty: 10 },
		]
	},
	{
		maxTreasures: 3,
		maxItemLevel: 4,
		enemies: [
			{ enemy: Orc, qty: 20 },
			{ enemy: Snake, qty: 10 },
		]
	}
]