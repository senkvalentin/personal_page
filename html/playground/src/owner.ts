export class Human {
    public name: string;
    public pet?: string;

    constructor(name: string) {
        this.name = name;
    }

    public inform(): void {
        console.log('Owner ' + this.name + ' was informed!');
    }
}