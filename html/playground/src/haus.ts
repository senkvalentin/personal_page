import { Human } from "./owner";

export class Haus {
    public color: string;
    public address: string;

    private owner: Human;

    private onFire: boolean;

    public ownerHere: boolean = false;

    public leftNeighbour: Haus;
    public rightNeighbour: Haus;

    /**
     * This is just a house
     * 
     * @param color Color of the new house
     * @param address location of the house
     * @param {Human} owner who owns the new house
     */
    constructor(color: string, address: string, owner: Human) {
        this.color = color;
        this.address = address;
        this.owner = owner;
    }

    public setOnFire(): void {
        this.onFire = true;
    }

    public isBurning(): boolean {
        return this.onFire;
    }

    public ring(): void {
        if(this.ownerHere === true) 
            this.owner.inform();
    }

    public enterHome(human: Human) {
        if (human === this.owner) {
            this.ownerHere = true;
        }
    }
}