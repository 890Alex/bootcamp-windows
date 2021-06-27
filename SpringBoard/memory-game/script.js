const gameContainer = document.getElementById("game");
const startBtn = document.getElementById('start-button')
const restartBtn = document.getElementById('restart-button')
const count = document.getElementById('score')

let clickDisabled = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if(clickDisabled) return; // do nothing

  // change target's color
  let targetDiv = event.target;
  targetDiv.style.backgroundColor = targetDiv.classList[0];

  targetDiv.classList.add("flipped");
  let flippedNotDone = document.querySelectorAll('.flipped:not(.done)');
  
  if(flippedNotDone.length == 2){
    // increment number of guesses
    count.innerText = parseInt(count.innerText) + 1;

    let thisCard = flippedNotDone[0];
    let thatCard = flippedNotDone[1];
    if(thisCard.classList[0] == thatCard.classList[0]){ // a match
      thisCard.classList.add('done')
      thatCard.classList.add('done')
    }
    else{
      clickDisabled = true;                                               // not a match
      setTimeout(function(){
        thisCard.classList.remove('flipped')
        thatCard.classList.remove('flipped')
        thisCard.style.backgroundColor = 'white'
        thatCard.style.backgroundColor = 'white'
        clickDisabled = false;
      }, 1000)
    }
    if(document.querySelectorAll('.done').length == COLORS.length){
      alert('YOU WIN!')
      // store score in localStorage
      let bestScore = localStorage.getItem('lowestScore');
      if(bestScore == null){
        bestScore = Number.MAX_VALUE;
      }
      if(count < bestScore){
        localStorage.setItem('lowestScore', count)
      }
      alert(`best score: ${localStorage.getItem('lowestScore')}`)
    }
  }
}

startBtn.addEventListener('click', function(e){
  gameContainer.style.visibility = 'visible'
  createDivsForColors(shuffledColors);
})

restartBtn.addEventListener('click', function(e){
  gameContainer.innerHTML = ''
  createDivsForColors(shuffle(COLORS));
})

gameContainer.style.visibility = 'hidden'


// // when the DOM loads
// createDivsForColors(shuffledColors);
