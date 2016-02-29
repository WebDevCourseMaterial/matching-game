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

// Note, this is an interface instead of a full class just to stay lightweight.
// You can think of it like a class with no methods though.
interface ImageFilenamePair {
  a: string;
  b: string;
}

// Override point for your filenames.
// If the pair is an exact image match, use identical values for the a and b fields.
// If the pair is a like a tennis ball matching a tennis racket, use different names for a and b.
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

// This will be prepended to the image filename if set.
var IMAGE_FOLDER_PATH = "";

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}


class MatchingGame {

  // This array will be shuffled when the game begins and will contain a string that represents an
  // index to the image filename that is hidden under every card.  For example 4a, 8b, 0a, 4b, etc...
  private cardIndices : string[];

  // An array that is the same length as the cardIndices that tracks the state of each card.
  public cardStates : CardState[];

  // Contains the filename to the cardback image being used.  If there are multiple images in the
  // ALL_IMAGE_FILENAME_BACKS then one will be randomly selected.
  public cardBackImageFilename: string;

  // Keeps track of the game state.
  public gameState = GameState.WaitingForFirstSelection;

  // Tracks which cards were selected during a turn.
  private indexOfFirstSelection: number;
  private indexOfSecondSelection: number;


  // Used to print a simple text representation of the board for cheating (testing) purposes.
  // Since this is meant to just help in developmen,t it's got a HACK hardcode for a 4 by 5 grid.
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
    if (numPairs > ALL_IMAGE_FILENAMES.length) {
      numPairs = ALL_IMAGE_FILENAMES.length; // Just in case they ask for too many.
    }
    while (indicesUsed.length < numPairs) {
      // Randomly select an index that is within the bounds of ALL_IMAGE_FILENAMES.length
      var randomIndex = Math.floor(Math.random() * ALL_IMAGE_FILENAMES.length);
      if (indicesUsed.indexOf(randomIndex) == -1) {
        indicesUsed.push(randomIndex);
        this.cardIndices.push(randomIndex + "a");
        this.cardIndices.push(randomIndex + "b");
      }
    }
    shuffle(this.cardIndices);

    // Randomly select a card back
    var randomCardBack = Math.floor(Math.random() * ALL_IMAGE_FILENAME_BACKS.length);
    this.cardBackImageFilename = ALL_IMAGE_FILENAME_BACKS[randomCardBack];

    // Reset cardState
    // Simple way
    //this.cardStates = [];
    //for (var i = 0; i < this.cardIndices.length; ++i) {
    //  this.cardStates.push(CardState.Hidden);
    //}
    // Fancy way
    this.cardStates = Array.apply(null, Array(this.cardIndices.length)).map(function(){return CardState.Hidden});
  }

  getImageFilenameForIndex(index: number): string {
    var indexOfImageFilenamePair = this.cardIndices[index].slice(0, - 1);
    var imageFilenamePair = ALL_IMAGE_FILENAMES[indexOfImageFilenamePair];
    if (this.cardIndices[index].slice(- 1) === "a") {
      return imageFilenamePair.a;
    } else {
      return imageFilenamePair.b;
    }
  }

  // Performs the action of turning non-matching cards back over or removing matches.
  startNewTurn() {
    switch (this.gameState) {
      case GameState.TurnComplete:
        this.gameState = GameState.WaitingForFirstSelection;
        var firstCard = this.cardIndices[this.indexOfFirstSelection].slice(0, - 1);
        var secondCard = this.cardIndices[this.indexOfSecondSelection].slice(0, - 1);
        if (firstCard === secondCard) {
          // Match!
          this.cardStates[this.indexOfFirstSelection] = CardState.Removed;
          this.cardStates[this.indexOfSecondSelection] = CardState.Removed;
        } else {
          this.cardStates[this.indexOfFirstSelection] = CardState.Hidden;
          this.cardStates[this.indexOfSecondSelection] = CardState.Hidden;
        }
        break;
      case GameState.GameOver:
        // This state is used for the last match.  The last match was still being shown.
        this.cardStates[this.indexOfFirstSelection] = CardState.Removed;
        this.cardStates[this.indexOfSecondSelection] = CardState.Removed;
        break;
      default:
        console.log("Start new turn pressed at unexpected time.");
        break;
    }
  }

  // Updates the game state based on the card that was selected.
  pressedCard(index: number) {
    switch (this.gameState) {
      case GameState.WaitingForFirstSelection:
        if (this.cardStates[index] === CardState.Hidden) {
          this.cardStates[index] = CardState.Shown;
          this.gameState = GameState.WaitingForSecondSelection;
          this.indexOfFirstSelection = index;
        }
        break;
      case GameState.WaitingForSecondSelection:
        if (index === this.indexOfFirstSelection) {
          return; // Pressed the same card again ingore.
        }
        if (this.cardStates[index] === CardState.Hidden) {
          this.cardStates[index] = CardState.Shown;
          this.gameState = GameState.TurnComplete;
          this.indexOfSecondSelection = index;
          var isGameOver = true;
          for (var cardState of this.cardStates) {
            if (cardState === CardState.Hidden) {
              isGameOver = false;
              break;
            }
          }
          if (isGameOver) {
            this.gameState = GameState.GameOver;
          }
        }
        break;
      default:
        break;
    }
  }
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
