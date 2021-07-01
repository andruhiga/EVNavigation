import { OutOfAreaError } from '../../errors.js';

class Position {
    constructor(x, y, area) {
        this.x = x;
        this.y = y;
        this.area = area;
    }

};
  
export class North extends Position {
    constructor(x, y, area) {
        super(x,y, area);
        this.direction = 'N';
    }

    turnLeft () {
        return new positionFactory(this.x, this.y, 'W', this.area);
    }

    turnRight () {
        return new positionFactory(this.x, this.y, 'E', this.area);
    }

    moveForward () {
        if (this.area.sizeY > this.y)
            this.y++;
        else
            throw new OutOfAreaError(this.x, ++this.y);
    }

};

export class South extends Position {
    constructor(x, y, area) {
        super(x,y, area);
        this.direction = 'S';
    }

    turnLeft () {
        return new positionFactory(this.x, this.y, 'E', this.area);
    }

    turnRight () {
        return new positionFactory(this.x, this.y, 'W', this.area);
    }

    moveForward () {
        if (this.y > 0)
            this.y--;
        else
            throw new OutOfAreaError(this.x, --this.y);
    }

};

export class East extends Position {
    constructor(x, y, area) {
        super(x,y, area);
        this.direction = 'E';
    }

    turnLeft () {
        return new positionFactory(this.x, this.y, 'N', this.area);
    }

    turnRight () {
        return new positionFactory(this.x, this.y, 'S', this.area);
    }

    moveForward () {
        if (this.area.sizeX > this.x)
            this.x++;
        else
            throw new OutOfAreaError(++this.x, this.y);
    }
};

export class West extends Position {
    constructor(x, y, area) {
        super(x,y, area);
        this.direction = 'W';
    }

    turnLeft () {
        return new positionFactory(this.x, this.y, 'S', this.area);
    }

    turnRight () {
        return new positionFactory(this.x, this.y, 'N', this.area);
    }

    moveForward () {
        if (this.x > 0)
            this.x--;
        else
            throw new OutOfAreaError(--this.x, this.y);
    }
};

export class positionFactory {
    constructor(x, y, direction, area) {
        switch(direction.toUpperCase()) {
            case 'N':
                return new North(x, y, area);
            case 'S':
                return new South(x, y, area);
            case 'E':
                return new East(x, y, area);
            case 'W':
                return new West(x, y, area);
          }
    }
};


