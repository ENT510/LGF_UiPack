import { InventoryItem } from "./types";

export const mockData: InventoryItem[] = [

  {
    name: "Water",
    type: "Item",
    quantity: 10,
    weight: 0.5,
    image: "https://cdn.discordapp.com/attachments/1204818747693604954/1329869125438148759/water.png?ex=678be8a3&is=678a9723&hm=77205737d8dca2a9b17ec0a5c2b0b6791cda59b74dca19abf93113bf5c0ce4cb&",
    description: "Restores 50 HP when consumed.",
    slot: 2,
    stacked: true,
    rarity: "Common",
    inventoryId: "67890",
    ammoType: "None",
    
  },
  {
    name: "Carabine Rifle",
    type: "weapon",
    quantity: 1,
    weight: 3.0,
    image: "https://cdn.discordapp.com/attachments/1204818747693604954/1329869153888375015/WEAPON_CARBINERIFLE.png?ex=678be8aa&is=678a972a&hm=8385683709448ecbb61a231af48ff72d6635f9280b8f12b9bc91ffc69950cd83&",
    description: "A bow that shoots fiery arrows.",
    slot: 3,
    stacked: false,
    rarity: "Rare",
    inventoryId: "11223",
    ammoType: "Arrow",

  },
  {
    name: "Molotov",
    type: "Weapon",
    quantity: 50,
    weight: 1.2,
    image: "https://cdn.discordapp.com/attachments/1204818747693604954/1329869182208311307/WEAPON_MOLOTOV.png?ex=678be8b0&is=678a9730&hm=ce6b5273b95b38ce6f25cf7414573f443da9c7a7956bf7e459013e7c711ef18b&",
    description: "A basic crafting material used to forge weapons.",
    slot: 4,
    stacked: true,
    rarity: "Legendary",
    inventoryId: "44556",


  },
  {
    name: "Weed Cali",
    type: "Item",
    quantity: 5,
    weight: 0.8,
    image: "https://cdn.discordapp.com/attachments/1204818747693604954/1329869206736338996/weed.png?ex=678be8b6&is=678a9736&hm=7d5c3aed628046203296c7a6413b6b3df9964ff53202b800d118d19f1d8e9788&",
    description: "A crystal infused with magical energy, used for crafting spells.",
    slot: 5,
    stacked: true,
    rarity: "Uncommon",
    inventoryId: "78901",

  }
];
