import {DarkElf, DarkKnight, Goblin, Orc, Snake} from "../entities/entities";

export const Levels = [
	{
		maxTreasures: 5,
		maxItemLevel: 1,
		enemies: [
			{ enemy: Goblin, qty: 12 },
			{ enemy: Snake, qty: 8 }
		]
	},
	{
		maxTreasures: 4,
		maxItemLevel: 2,
		enemies: [
			{ enemy: Orc, qty: 5 },
			{ enemy: Goblin, qty: 10 },
			{ enemy: Snake, qty: 10 }
		]
	},
	{
		maxTreasures: 3,
		maxItemLevel: 3,
		enemies: [
			{ enemy: Orc, qty: 10 },
			{ enemy: DarkElf, qty: 10 },
			{ enemy: Goblin, qty: 10 }
		]
	},
	{
		maxTreasures: 4,
		maxItemLevel: 4,
		enemies: [
			{ enemy: Orc, qty: 10 },
			{ enemy: DarkElf, qty: 10 },
			{ enemy: Goblin, qty: 5 },
			{ enemy: DarkKnight, qty: 5 },
			{ enemy: Snake, qty: 5 }
		]
	},
	{
		maxTreasures: 3,
		maxItemLevel: 5,
		enemies: [
			{ enemy: Orc, qty: 15 },
			{ enemy: DarkElf, qty: 20 },
			{ enemy: DarkKnight, qty: 5 }
		]
	}
];