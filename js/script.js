const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingDisplay = document.querySelector("span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");

const word = "magnolia";

const letterPlaceholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

letterPlaceholder(word);

button.addEventListener("click", function (e) {
  e.preventDefault();

  const guess = textInput.value;
  console.log(guess);
  textInput.value = "";
});
