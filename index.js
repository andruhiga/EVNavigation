import { Navigation } from './src/domains/evNavigation/navigation.js';
import { OutOfAreaError, OccupiedPosition, NoValidInstruction, NoValidInput } from './src/errors.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to EVNavigation");
rl.question("Please enter coordinates of the area: ", function(input) {
    var coordinates = input.split(" ");
    if (coordinates.length < 2)
        console.error(`Invalid input for coordinates of the area, something like this was expected: 5 5`);
    navigation = new Navigation(parseInt(coordinates[0]),parseInt(coordinates[1]));
    recursiveAsyncReadLine();
});

rl.on("close", function() {
    console.log("\nBye! See you next time!");
    process.exit(0);
});

var navigation;

var recursiveAsyncReadLine = function () {
    rl.question("Please enter EV position: ", function(input) {
        rl.question("Please enter EV instructions: ", function(ins) {
            try {
                var evs = navigation.addEV(input, ins);
                console.log(evs);
            } catch (e) {
                if (e instanceof OutOfAreaError || e instanceof OccupiedPosition || e instanceof NoValidInstruction || e instanceof NoValidInput) {
                    console.error(`${e.message}. Please try again.`);}
                else 
                    console.error(`Ups, an unexpected error has ocurred: ${e.name} - ${e.message}. Please try again.`)
            }
            recursiveAsyncReadLine();
        });
    });
  };



