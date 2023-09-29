const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  letterPlaceholder(word);
};

getWord();

// Placeholder dots for the chosen word's letters
const letterPlaceholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("✶");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

letterPlaceholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message
  message.innerText = "";
  // Entered in the input
  const guess = letterInput.value;
  // Single letter?
  const goodGuess = checkInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please only enter one letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter! Please try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuess();
    updateWord(guessedLetters);
  }
};

const showGuess = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkWord();
};

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingDisplay.innerText = `${remainingGuesses} guess`;
  } else {
    remainingDisplay.innerText = `${remainingGuesses} guesses`;
  }
};

const checkWord = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML =
      '<p class="highlight">You guessed the correct word! Congrats!</p>';

    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  //Show play again button
  hiddenButton.classList.remove("hide");
};

hiddenButton.addEventListener("click", function () {
  //Reset original values
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingDisplay.innerText = `${remainingGuesses} guesses`;
  //Show the Guess button and remaining guesses
  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  //Show the guessed letters
  guessedLettersElement.classList.remove("hide");
  //Hide the play button
  hiddenButton.classList.add("hide");
  //Get a new word
  getWord();
});
