import {Component} from 'angular2/core';
import {MatchingGame} from "./matching-game.model";
import {CardState} from "./matching-game.model";
import {GameState} from "./matching-game.model";


@Component({
  selector: 'my-app',
  template: '<h1>Hacky testing for now</h1>	<a (click)="hackyTests()" class="btn btn-primary">Add Quote</a>'
})

export class AppComponent {


  // TODO: Read this and do it correctly.
  // https://angular.io/docs/ts/latest/testing/jasmine-testing-101.html
  hackyTests() {
    // Real game to see random values
    var game = new MatchingGame(10);
    console.log(game.toString());
    console.log("filename at index 0 = " + game.getImageFilenameForIndex(0));
    console.log(game.cardStates);
    console.log("Game state = " + GameState[game.gameState]);

    //// Playing with non-random cards
    game.cardIndices = ["0a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a",
      "0b", "1b", "2b", "3b", "4b", "5b", "6b", "7b", "8b", "9b"];

    // Making a match
    console.log(game.toString());
    console.log("Make a match between 2 and 12...");
    console.log("State at 2 = " + CardState[game.cardStates[2]]);
    console.log("State at 12 = " + CardState[game.cardStates[12]]);
    console.log("Press 2");
    game.pressedCard(2);
    console.log("State at 2 = " + CardState[game.cardStates[2]]);
    console.log("State at 12 = " + CardState[game.cardStates[12]]);
    console.log("Press 12");
    game.pressedCard(12);
    console.log("State at 2 = " + CardState[game.cardStates[2]]);
    console.log("State at 12 = " + CardState[game.cardStates[12]]);
    console.log("Next turn called");
    game.startNewTurn();
    console.log("State at 2 = " + CardState[game.cardStates[2]]);
    console.log("State at 12 = " + CardState[game.cardStates[12]]);

    // Non-match
    console.log(game.toString());
    console.log("Make a non-match between 1 and 15...");
    console.log("State at 1 = " + CardState[game.cardStates[1]]);
    console.log("State at 15 = " + CardState[game.cardStates[15]]);
    console.log("Press 1");
    game.pressedCard(1);
    console.log("State at 1 = " + CardState[game.cardStates[1]]);
    console.log("State at 15 = " + CardState[game.cardStates[15]]);
    console.log("Press 15");
    game.pressedCard(15);
    console.log("State at 1 = " + CardState[game.cardStates[1]]);
    console.log("State at 15 = " + CardState[game.cardStates[15]]);
    console.log("Next turn called");
    game.startNewTurn();
    console.log("State at 1 = " + CardState[game.cardStates[1]]);
    console.log("State at 15 = " + CardState[game.cardStates[15]]);
  }
}
