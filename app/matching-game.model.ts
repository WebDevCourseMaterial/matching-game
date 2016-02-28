enum CardState {
  Hidden,
  Shown,
  Removed
}

enum GameState {
  WaitingForFirstSelection,
  WaitingForSecondSelection,
  TurnComplete,
  GameOver
}

interface ImageFilenamePair {
  a: string;
  b: string;
}

// Optional override point for your filenames.
// If the pair is an exact image match use identical for the a and b fields.
// If the pair is a like a tennis ball matching a tennis racket use different names for a and b.
var ALL_IMAGE_FILENAMES: ImageFilenamePair[] = [
  {"a": "card0_a.png", "b": "card0_b.png"},
  {"a": "card1_a.png", "b": "card1_b.png"},
  {"a": "card2_a.png", "b": "card2_b.png"},
  {"a": "card3_a.png", "b": "card3_b.png"},
  {"a": "card4_a.png", "b": "card4_b.png"},
  {"a": "card5_a.png", "b": "card5_b.png"},
  {"a": "card6_a.png", "b": "card6_b.png"},
  {"a": "card7_a.png", "b": "card7_b.png"},
  {"a": "card8_a.png", "b": "card8_b.png"},
  {"a": "card9_a.png", "b": "card9_b.png"}];
// Note the length of this array must be equal to or greater than the number of pairs used.

// Optional override point for your filenames if you want the card back to change between rounds.
var ALL_IMAGE_FILENAME_BACKS: string[] = ["card_back1.png"];
// Note the length of this array must be equal to or greater than 1.


class MatchingGame {

  // This array will be shuffled when the game begins and will contain a string that represents
  // an index to the filename that is hidden under every card.  For example 4a, 8b, 0a, 4b, etc...
  cardIndices : string[];

  // Contains the filename to the cardback image being used.
  cardBackImageFilename: string;

  // An array that is the same length as the cardIndices that tracks the state of each card.
  cardStates : CardState[];

  // Keeps track of the game state.
  gameState = GameState.WaitingForFirstSelection;

  // Used to print a simple text representation of the board for cheating (testing) purposes.
  // Since this is meant to just help in development it's got a HACK hardcode for a 4 by 5 grid.
  toString() {
    var boardString = "";
    for (var row = 0; row < 5; ++row) {
      var index = row * 4;
      boardString += this.cardIndices[index] + " ";
      boardString += this.cardIndices[index + 1] + " ";
      boardString += this.cardIndices[index + 2] + " ";
      boardString += this.cardIndices[index + 3] + " ";
      boardString += "\n";
    }
    return boardString;
  }


  constructor(numPairs: number) {
    // Randomly select image filename pairs to use in this round of the game.
    var indicesUsed: number[] = [];
    this.cardIndices = [];
    while (indicesUsed.length < numPairs) {
      // Randomly select an index that is within the bounds of ALL_IMAGE_FILENAMES.size
      var randomCard = Math.floor(Math.random() * ALL_IMAGE_FILENAMES.length);
      // See if it has already been added
      //   If it has not been added, add both the #a and #b strings to the cards array and the index to the indicesUsed
    }

    // TODO: Implement
    //this.cardIndices.shuffle();

    // Randomly select a card back
    var randomCardBack = Math.floor(Math.random() * ALL_IMAGE_FILENAME_BACKS.length);
    this.cardBackImageFilename = ALL_IMAGE_FILENAME_BACKS[randomCardBack];


    // I am here!!!


    // Reset cardState
    //cardStates = [CardState](count: cards.count, repeatedValue: CardState.Hidden)
  }


//
//  func startNewTurn() {
//    switch gameState {
//      case .TurnComplete(let firstIndex, let secondIndex):
//        gameState = GameState.WaitingForFirstSelection
//        if cards[firstIndex] == cards[secondIndex] {
//          // Match!
//          cardStates[firstIndex] = .Removed
//          cardStates[secondIndex] = .Removed
//        } else {
//          cardStates[firstIndex] = .Hidden
//          cardStates[secondIndex] = .Hidden
//        }
//      case .GameOver:
//          for i in 0..<cardStates.count {
//            cardStates[i] = .Removed
//          }
//      default:
//        println("Start new turn pressed at unexpected time.")
//    }
//  }
//
//  func pressedCard(atIndex index : Int) {
//    switch gameState {
//      case .WaitingForFirstSelection:
//          if cardStates[index] == CardState.Hidden {
//            cardStates[index] = CardState.Shown
//            gameState = GameState.WaitingForSecondSelection(index)
//          }
//      case .WaitingForSecondSelection(let firstIndex):
//        if index == firstIndex {
//          return // Pressed the same card again.  Ignore.
//        }
//        if cardStates[index] == CardState.Hidden {
//          cardStates[index] = CardState.Shown
//          gameState = GameState.TurnComplete(firstIndex, index)
//          if !contains(cardStates, .Hidden) {
//            gameState = GameState.GameOver
//          }
//        }
//      default:
//        return
//    }
//  }
}

//
//// ------------------------------------------------
////  Completely optional test code if you choose to
////  use a Playground to develop the model object.
//// ------------------------------------------------
//
//// Real game to see random values
//var game = MatchingGame(numPairs: 10)
//game.cards
//game.cards[0]
//game.cardStates
//game.cardStates[0].rawValue
//game.cardBack
//game.gameState.simpleDescription()
//game.description
//
//// Playing with non-random cards
//game.cards = Array("01234567890123456789")
//
//// Making a match
//game.cards[2]
//game.cards[12]
//game.cardStates[2].rawValue
//game.cardStates[12].rawValue
//game.gameState.simpleDescription()
//game.pressedCard(atIndex: 2)
//game.cardStates[2].rawValue
//game.cardStates[12].rawValue
//game.gameState.simpleDescription()
//game.pressedCard(atIndex: 12)
//game.cardStates[2].rawValue
//game.cardStates[12].rawValue
//game.gameState.simpleDescription()
//game.startNewTurn()
//game.cardStates[2].rawValue
//game.cardStates[12].rawValue
//game.gameState.simpleDescription()
//
//// Non-match
//game.cards[1]
//game.cards[15]
//game.cardStates[1].rawValue
//game.cardStates[15].rawValue
//game.gameState.simpleDescription()
//game.pressedCard(atIndex: 1)
//game.cardStates[1].rawValue
//game.cardStates[15].rawValue
//game.gameState.simpleDescription()
//game.pressedCard(atIndex: 15)
//game.cardStates[1].rawValue
//game.cardStates[15].rawValue
//game.gameState.simpleDescription()
//game.startNewTurn()
//game.cardStates[1].rawValue
//game.cardStates[15].rawValue
//game.gameState.simpleDescription()
