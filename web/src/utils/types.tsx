export interface InventoryItem {
    name: string;
    type: string;
    quantity: number;
    weight: number;
    image: string;
    description: string;
    slot: number;
    stacked: boolean;
    metadata?: Record<string, any>;
    rarity: string;
    inventoryId: string;
    ammoType?:string;
    tetrisAmount?:number
  }
  
