// DECK OF CARDS: Sub-function to generate a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// CARD SHUFFLING: Sub-function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var cardDeck = makeDeck();
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(cardDeck);
var cardDeck = makeDeck();

// Define variables to store Player and Computer's scores.
var playerCardScores = 0;
var computerCardScores = 0;
var playerScore = 0;

// Define variables to store P/C's cards and values.
var playerCards = [];
var computerCards = [];
var playerCardsValue = [];

//Define variables for different game modes.
var dealPlayerCards = "Deal cards for Player";
var hitACard = "Draw another card";
var endTurn = "End turn";

//Define variables to track num of rounds played and who is winning.
var totalRounds = 0;
var playerWins = 0;
var computerWins = 0;

//Default game mode.
gameMode = dealPlayerCards;

//BUTTON SETTINGS: Create different buttons for the Player to click to play the game.
// var playerModeButton = document.getElementById("playermode-button");
// var adminModeButton = document.getElementById("adminmode-button");

var button = document.getElementById("deal-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");

//Only want the "Deal" button to be active at the start of the game.
hitButton.disabled = true;
standButton.disabled = true;

// Define a subfunction to calculate Player's score.
var countPlayerHandValue = function (playerCardsValue) {
  var playerCardScores = 0;
  var hasAce = false;
  for (let i = 0; i < playerCardsValue.length; i += 1) {
    playerCardScores = playerCardScores + Number(playerCardsValue[i]);
    //Check if user has an ace
    if (playerCardsValue[i] === 11) {
      hasAce = true;
    }
  }
  //If user has an ace and if the score doesn't exceed 21 if ace = 11 then it can have the value of 11.
  if (hasAce && playerCardsValue.length >= 3 && playerCardScores >= 21)
    playerCardScores = playerCardScores - 10;

  return playerCardScores;
};

// Default Mode: Drawing 2 cards for Player.
var main = function () {
  playerCardScores = 0;
  playerCards = [];
  if (gameMode == dealPlayerCards) {
    playerCardsValue = [];
    gameMode = hitACard;
    // Generate 2 cards for Player using for-loop.
    for (counter = 0; counter < 2; counter += 1) {
      var playerCard = shuffledDeck.pop();
      playerCards.push(playerCard.name + " of " + playerCard.suit);
      playerCardsValue.push(playerCard.value);
    }
    playerScore = countPlayerHandValue(playerCardsValue);

    myOutputValue =
      "Hi Player, you drew: " +
      playerCards +
      "<br><br>" +
      "Your current score is " +
      playerScore +
      ". <br><br>" +
      "Please choose the hit or stand button!";
  }

  //Special case when Player draws Blackjack from the start.
  if (playerScore == 21) {
    myOutputValue =
      "Hi Player, you drew: " +
      playerCards +
      "<br><br>" +
      "and your current score is " +
      playerScore +
      ". This means you just drew a BLACKJACK! <br><br>" +
      "Let's hit the stand button to see if the Computer is as lucky as you!";
  }

  // Allow Player to choose to end turn immediately if score is > 17.
  if (playerScore >= 17) {
    standButton.disabled = false;
  }
  button.disabled = true;
  hitButton.disabled = false;

  return myOutputValue;
};

// Function to allow user to draw cards.
var hitCard = function () {
  // If an Ace choice is pending, return and wait for input.
  gameMode = hitACard;
  standButton.disabled = false;
  var playerCard = shuffledDeck.pop();
  playerCards.push(playerCard.name + " of " + playerCard.suit);
  playerCardsValue.push(playerCard.value);
  playerScore = countPlayerHandValue(playerCardsValue);
  myOutputValue =
    "You drew " +
    playerCard.name +
    " of " +
    playerCard.suit +
    ". <br><br>" +
    "Your current hand is " +
    playerCards +
    "<br><br>" +
    "Your new score is " +
    playerScore +
    ". <br><br> Press 'Hit' if you wish to continue to draw more cards. Press 'Stand' if you wish to end your turn.";
  if (playerScore > 21) {
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br>" +
      "Oh no, you have BURST but hopefully the Computer will burst as well. Let's hit the Stand button to find out!";
  } else if (playerScore == 21) {
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br> Congrats! You got a Blackjack, but let's see if the Computer has the same luck as you. Press 'Stand' to find out!";
  } else if (playerScore < 17) {
    standButton.disabled = true;
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br> You have to draw up till at least 17 points. Keep going!";
  }
  gameMode = hitACard;
  return myOutputValue;
};

// When Player decides to end turn and Computer's turn is triggered.
var standCard = function () {
  computerCardScores = 0;
  computerCards = [];

  // Generate 2 initial cards for Computer.
  for (let counter = 0; counter < 2; counter++) {
    var computerCard = shuffledDeck.pop();
    computerCardScores += computerCard.value;
    computerCards.push(`${computerCard.name} of ${computerCard.suit}`);
  }

  // Automatically drawing cards for the computer if score is <17.
  while (computerCardScores < 17) {
    computerCard = shuffledDeck.pop();
    computerCardScores += computerCard.value;
    computerCards.push(`${computerCard.name} of ${computerCard.suit}`);
  }

  totalRounds += 1;

  // Determine all the different possible outcome scenarios.
  let outcome;
  if (playerScore > 21 && computerCardScores > 21) {
    outcome = "Both burst! It's a tie!";
  } else if (playerScore > 21) {
    outcome = "You burst! Computer wins!";
    computerWins += 1;
  } else if (computerCardScores > 21) {
    outcome = "Computer burst! You win!";
    playerWins += 1;
  } else if (playerScore === computerCardScores) {
    outcome =
      playerScore === 21
        ? "Both got Blackjack! It's a tie!"
        : "Same score, It's a tie!";
  } else if (playerScore === 21) {
    outcome = "Blackjack! You win!";
    playerWins += 1;
  } else if (computerCardScores === 21) {
    outcome = "Computer got Blackjack! Computer wins!";
    computerWins += 1;
  } else if (playerScore > computerCardScores) {
    outcome = "You win!";
    playerWins += 1;
  } else {
    outcome = "Computer wins!";
    computerWins += 1;
  }

  // Final message
  finalOutcome = `
    The computer drew ${computerCards.join(
      ", "
    )} and scored ${computerCardScores}.<br><br>
    ${outcome}<br><br>
    Total Rounds: ${totalRounds}<br>
    Player Wins: ${playerWins}<br>
    Computer Wins: ${computerWins}
  `;

  // Disable buttons and reset the game mode
  button.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;

  updateGameStats();
  gameMode = dealPlayerCards;

  return finalOutcome;
};
