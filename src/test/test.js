import { North, South, West, East } from '../domains/evNavigation/position.js';
import { Area } from '../domains/evNavigation/area.js';
import { EV } from '../domains/evNavigation/ev.js';
import { Navigation } from '../domains/evNavigation/navigation.js';
import { OutOfAreaError, OccupiedPosition, NoValidInstruction, NoValidInput } from '../errors';

describe('Area', function() {
  it('should be created with the correct limits', function() { 
      var area = new Area(5,4);
      expect(area.sizeX).toEqual(5);
      expect(area.sizeY).toEqual(4);
  });

});

describe('EV', function() {
    it('should be created with the correct position', function() { 
      var area = new Area(5,5);
      var ev = new EV(1,2,'N',area);
      expect(ev.position.x).toEqual(1);
      expect(ev.position.y).toEqual(2);
    });

    it('should be created with the correct direction', function() { 
        var area = new Area(5,5);
        var ev = new EV(1,1,'N',area);
        expect(ev.position instanceof North).toBe(true);
    });

    it('should turn to right', function() { 
      var area = new Area(5,5);
      var ev = new EV(1,1,'N',area);
      ev.turnRight();
      expect(ev.position instanceof East).toBe(true);
    });

    it('should turn to left', function() {
      var area = new Area(5, 5);
      var ev = new EV(1, 1, 'N', area);
      ev.turnLeft();
      expect(ev.position instanceof West).toBe(true);
    });

    it('should move forward', function() { 
      var area = new Area(5,5);
      var ev = new EV(1,1,'N',area);
      ev.moveForward();
      expect(ev.position.y).toEqual(2);
    });

    it('should not move forward to North if it exceeds the limits', function() { 
      var area = new Area(5,1);
      var ev = new EV(1,1,'N',area);
      expect(() => {
        ev.moveForward();
      }).toThrow(OutOfAreaError);
    });

    it('should not move forward to West if it exceeds the limits', function() { 
      var area = new Area(5,5);
      var ev = new EV(0,0,'W',area);
      expect(() => {
        ev.moveForward();
      }).toThrow(OutOfAreaError);
    });

    it('should not move forward to East if it exceeds the limits', function() {
      var area = new Area(5, 5);
      var ev = new EV(5, 5, 'E', area);
      expect(() => {
        ev.moveForward();
      }).toThrow(OutOfAreaError);
    });
});

describe('Navigation', function() {
    it('should alert of incorrect input instruction', function() {
      var nav = new Navigation(5, 5);
      expect(() => {
        nav.addEV("1", "");
      }).toThrow(NoValidInput);
  });


  it('should alert of invalid instructions on input (supported ones: "M", "L", "R")', function() {
      var nav = new Navigation(5, 5);
      expect(() => {
        nav.addEV("1 1 N", "X");
      }).toThrow(NoValidInstruction);
  });

  it('should create the area', function() {
      var nav = new Navigation(5, 4);
      expect(nav.area.sizeX).toEqual(5);
      expect(nav.area.sizeY).toEqual(4);
  });

  it('should add a new EV and navigate', function() {
    var nav = new Navigation(5, 4);
    var evs = nav.addEV("1 1 N", "M");
    expect(evs.length).toEqual(1);
    expect(evs[0].position.x).toEqual(1);
    expect(evs[0].position.y).toEqual(2);
  });

  it('should not be in a position that is allready occupied (moving north)', function() {
    var nav = new Navigation(5, 5);
    var evs = nav.addEV("1 1 N", "M");
    expect(() => {
      nav.addEV("1 1 N", "M");
    }).toThrow(OccupiedPosition);
  });

  it('should not be in a position that is allready occupied (moving west)', function() {
    var nav = new Navigation(5, 5);
    var evs = nav.addEV("1 1 W", "M");
    expect(() => {
      nav.addEV("1 1 W", "M");
    }).toThrow(OccupiedPosition);
  });


});


