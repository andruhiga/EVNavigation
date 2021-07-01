import { Area } from './area.js';
import { EV } from './ev.js';
import { OutOfAreaError, OccupiedPosition, NoValidInstruction, NoValidInput } from '../../errors.js';

export class Navigation {
    constructor(x, y) {
        this.area = new Area(x, y);
        this.evs = [];
    }

    navigateEV (ev, instruction) {
        try{
            for (var i = 0; i< instruction.length; i++) {
                switch(instruction.charAt(i).toUpperCase()){
                    case 'R':
                        ev.turnRight();
                        break;
                    case 'L':
                        ev.turnLeft();
                        break;
                    case 'M':
                        ev.moveForward();
                        break;
                    default:
                        throw new NoValidInstruction(instruction);
                        break;
                    };
                this.checkPosition(ev);
            };
        } catch (e) {
            this.evs = this.evs.filter(item => item !== ev);
            throw e;
        }
    }

    addEV (initialPosition, instruction) {
        var position = initialPosition.split(" ");
        if (position.length !== 3)
            throw new NoValidInput("EV position", "1 1 N");
        if (instruction.length < 1)
            throw new NoValidInput("EV instructions", "MRMLM");
        var ev = new EV(parseInt(position[0]), parseInt(position[1]), position[2], this.area);
        this.checkPosition(ev);
        this.evs.push(ev);
        this.navigateEV(ev, instruction);
        return this.evs;
    }

    checkPosition(ev) {
        if ((this.evs.find(e => e.position.x == ev.position.x && e.position.y == ev.position.y 
                            && this.evs.indexOf(e) != this.evs.indexOf(ev))) != undefined)
            throw new OccupiedPosition(ev.position.x, ev.position.y);
    }

};