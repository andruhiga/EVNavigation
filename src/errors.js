export class OutOfAreaError extends Error {
    constructor(...params) {
      super(...params)
      this.name = 'OutOfAreaError'
      this.x = params[0]
      this.y = params[1]
      this.message = `The EV is trying to move out of the area: ${this.x} ${this.y}`;
    }
}

export class OccupiedPosition extends Error {
    constructor(...params) {
      super(...params)
      this.name = 'OccupiedPosition'
      this.x = params[0]
      this.y = params[1]
      this.message = `The EV is trying to move to a position already occupied: ${this.x} ${this.y}`;
    }
}

export class NoValidInstruction extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'NoValidInstruction'
    this.instruction = params[0]
    this.message = `Invalid instruction: ${this.instruction}. Try one of the supported: 'M','R','L'`;
  }
}

export class NoValidInput extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'NoValidInput'
    this.paramInput = params[0]
    this.paramExpected = params[1]
    this.message = `Invalid input for ${this.paramInput}, something like this was expected: ${this.paramExpected}`;
  }
}