import { positionFactory } from './position.js';

export class EV {
    constructor(x, y, direction, area) {
        this.position = new positionFactory(x, y, direction, area);
    }

    turnLeft () {
        this.position = this.position.turnLeft();
    }

    turnRight () {
        this.position = this.position.turnRight();
    }

    moveForward () {
        this.position.moveForward();
    }

};