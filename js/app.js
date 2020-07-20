
// GLOBAL VARIABLES
////////////////////////////////////////////////

// Variables / Cached Elements
const footer = document.querySelector("footer")
const tableBody = document.querySelector("#table-body")
const gameTable = document.querySelector("#game-table") 
const easyBtn = document.querySelector("#easy")
const mediumBtn = document.querySelector("#medium")
const hardBtn = document.querySelector("#hard")
const expertBtn = document.querySelector("#expert")
const mistakeText = document.querySelector("#mistakeText")
const mistakeCountDisplay = document.querySelector("#mistakeCountDisplay")
const mistakesMessage = document.querySelector("#mistakes-message")
const startBtn = document.querySelector("#startBtn")
const pauseBtn =  document.querySelector("#pauseBtn")
const newGameButton = document.querySelector("#newGameButton")
const greeting = document.querySelector("#greeting")
const pausedMessage = document.querySelector("#paused-message")
const hintBtn = document.querySelector("#hintBtn")
const undoBtn = document.querySelector("#undoBtn")
const notesBtn = document.querySelector("#notesBtn")
const timesUp = document.querySelector("#times-up")
const newGamePrompt = document.querySelector("#new-game-prompt")
const promptYesBtn = document.querySelector("#promptYesBtn")
const promptNoBtn = document.querySelector("#promptNoBtn")
const timeDisplay = document.querySelector("#timer")

// Global variables storing values for squares picked and bottom buttons picked
let answer;
let squarePicked;
let time;
let squareIndex = 1
let randomIndex;
let mistakesCount = 0
let randomPuzzle;

let undoSound = new Audio("./sounds/undo-sound.wav")
let successSound = new Audio("./sounds/success-sound.wav")
let failureSound = new Audio("./sounds/failure-sound.wav")
let appearSound = new Audio("./sounds/appear-sound.wav")
let pauseSound = new Audio("./sounds/pause-sound.wav")
let clickSound = new Audio("./sounds/click-sound.wav")
///////////////////////*************************//////////////////////


// STYLES SET WEHN PAGE LOADS
/////////////////////////////////////////////////////////

// Have the start button disabled when the page loads
startBtn.disabled = true;
newGameBtn.disabled = true
undoBtn.disabled = true;
undoBtn.style.background = "gray"
let isPaused = false

///////////////////////*************************//////////////////////


const randomPuzzleGenerator = () => {
	randomPuzzle = Math.floor(Math.random() * 4) 
	
}



// START BUTTON FUNCTIONALITY
////////////////////////////////////////////////////////////


// Create start function
// Once player chooses a difficulty and then presses start, the createSquares function will be called with the appropriate difficulty
// The time will also start running as well
const startGame = () => {
	startBtn.addEventListener("click", function(e){
		mistakeText.style.display = "inline"
		timeDisplay.style.display = "inline"
		e.preventDefault()
		isPaused = false


		appearSound.play()

		
		startBtn.style.display = "none"
		newGameBtn.disabled = true
		pausedMessage.style.display = "none"


		// Set elements classList to .show
		toggleElements()

		// Hide the greeting message once the start button has been pressed
		greeting.style.display = "none"

		// Call the setTimer function
		
	})
}
/////////////////////*************************//////////////////////


// PAUSE BUTTON FUNCTIONALITY
//////////////////////////////////////////////////////////////

const pauseGame = () => {
	pauseBtn.addEventListener("click", function(e){
		isPaused = true
		e.preventDefault()
		
		pauseSound.play()
		startBtn.style.display = "inline"
		
		pausedMessage.style.display = "inline"

		newGameBtn.disabled = false;

		// Set elements classList to .hide
		toggleElements()

		})
}

/////////////////////*************************//////////////////////


//NEW GAME FUNCTIONALITY
///////////////////////////////////////////////////////////////////////



const startNewGame = () => {
	newGameBtn.addEventListener("click", function(){
		clickSound.play()

		// Hide elements
		startBtn.disabled = true
		pausedMessage.style.display = "none"
		newGamePrompt.style.display = "inline"
		timesUp.style.display = "none"
		mistakesMessage.style.display = "none"

		
		// If yes, have greeting, start button appear. Disable startBtn/newGameButton. Enable diffbuttons
		promptYesBtn.addEventListener("click", function(){
			
			
			console.log(randomPuzzle)
			successSound.play()

			// Hide elemtents
			mistakeText.style.display = "none"
			timeDisplay.style.display = "none"
			newGamePrompt.style.display = "none"

			// Appear
			greeting.style.display = "inline"
			startBtn.style.display = "inline"
			startBtn.disabled = true
			newGameBtn.disabled = true

			// Enable sqaures with no background color
			let diffButtons = document.querySelectorAll(".diff-buttons")
			for(let j = 0; j < diffButtons.length; j++){
				diffButtons[j].disabled = false
				diffButtons[j].style.background = "none"			
			}

			// Enable hint button
			hintBtn.disabled = false;
			hintBtn.style.background = "none"

			// Disable answer buttons and undo button
			let answerButtons = document.querySelectorAll(".answerButton")
			for(let i = 0; i < answerButtons.length; i++){
				answerButtons[i].disabled = true
			}
			undoBtn.disabled = true

			// Reset mistake count		
			mistakeCountDisplay.innerHTML = 0
			mistakesCount = 0
		})

		// If no, hide/show/disable appropriate elements to get back to paused screen
		promptNoBtn.addEventListener("click", function(){
			// Bring user back to pause menu
			
			failureSound.play()
			startBtn.style.display = "inline"
			startBtn.disabled = false
			pausedMessage.style.display = "inline"
			newGamePrompt.style.display = "none"
			
		})		
	})
}


		
// Create function that selects the elements I want to hide and show when clicking pause and start
const toggleElements = () => {
	let answerButtons = document.querySelectorAll(".answerButton")
	for(let i = 0; i < answerButtons.length; i++){
		answerButtons[i].classList.toggle("show-hide")
	}
	undoBtn.classList.toggle("show-hide")
	hintBtn.classList.toggle("show-hide")
	// notesBtn.classList.toggle("show-hide")
	gameTable.classList.toggle("show-hide")
	pauseBtn.classList.toggle("show-hide")
}


////////////////////****************************////////////////////////



// CREATING ANSWER BUTTONS FOR THE BOTTOM OF THE PAGE
/////////////////////////////////////////////////////////////////

//Create buttons 1-9 for user to choose from
 const createAnswerButtons = () => {
 	//Loop 1-9 to create buttons with corresponding values
 	for(let i = 1; i < 10; i++){
 		const answerButton = document.createElement("button")
 		answerButton.textContent = i
 		answerButton.setAttribute("value", i)
 		
 		answerButton.disabled = true
 		//Give the buttons some style and room
 		answerButton.classList.add("btn", "btn-primary", "answerButton")
 		
 		//push each button into footer section of html
 		footer.appendChild(answerButton)

 		getAnswerValue(answerButton)
 	}
 }

///////////////////////*************************//////////////////////






// CREATING SQUARES FOR GAME BOARD
/////////////////////////////////////////////////////

// Create an array of game puzzles

// const test = [
// [
// [5, 2, 7, 9, 4, 6, 1, 3, 8],
// [8, 9, 4, 1, 3, 5, 2, 7, 6],
// [1, 6, 3, 7, 2, 8, 9, 4, 5],
// [3, 8, 2, 6, 9, 4, 7, 5, 1],
// [4, 7, 5, 8, 1, 2, 6, 9, 3],
// [9, 1, 6, 3, 5, 7, 4, 8, 2],
// [7, 3, 8, 2, 6, 9, 5, 1, 4],
// [6, 5, 1, 4, 7, 3, 8, 2, 9],
// [2, 4, 9, 5, 8, 1, 3, 6, 7]
// ],
// [
// [5, 3, 1, 9, 8, 4, 7, 6, 2],
// [6, 4, 9, 2, 5, 7, 3, 8, 1],
// [8, 2, 7, 6, 1, 3, 4, 5, 9],
// [9, 6, 2, 3, 7, 8, 1, 4, 5],
// [1, 8, 5, 4, 2, 9, 6, 7, 3],
// [3, 7, 4, 5, 6, 1, 2, 9, 8],
// [2, 1, 8, 7, 4, 5, 9, 3, 6],
// [7, 5, 3, 1, 9, 6, 8, 2, 4],
// [4, 9, 6, 8, 3, 2, 5, 1, 7]
// ],
// [
// [4, 2, 7, 8, 6, 5, 9, 3, 1],
// [9, 1, 5, 2, 4, 3, 6, 8, 7],
// [6, 8, 3, 7, 9, 1, 2, 5, 4],
// [8, 7, 1, 6, 2, 9, 3, 4, 5],
// [3, 4, 9, 1, 5, 8, 7, 2, 6],
// [2, 5, 6, 3, 7, 4, 8, 9, 1],
// [5, 8, 9, 4, 3, 7, 1, 6, 2],
// [1, 3, 2, 5, 8, 6, 4, 7, 9],
// [7, 6, 4, 9, 1, 2, 5, 3, 8]
// ],
// [
// [7, 3, 4, 1, 6, 2, 9, 8, 5],
// [6, 8, 5, 4, 7, 9, 3, 2, 1],
// [2, 1, 9, 5, 3, 8, 6, 4, 7],
// [5, 6, 8, 9, 1, 3, 2, 7, 4],
// [3, 4, 2, 6, 8, 7, 1, 5, 9],
// [1, 9, 7, 2, 5, 4, 8, 3, 6],
// [8, 5, 1, 7, 2, 6, 4, 9, 3],
// [9, 2, 6, 3, 4, 5, 7, 1, 8],
// [4, 7, 3, 8, 9, 1, 5, 6, 2]
// ]
// ]





const solutionArray = 
[
[5, 2, 7, 9, 4, 6, 1, 3, 8],
[8, 9, 4, 1, 3, 5, 2, 7, 6],
[1, 6, 3, 7, 2, 8, 9, 4, 5],
[3, 8, 2, 6, 9, 4, 7, 5, 1],
[4, 7, 5, 8, 1, 2, 6, 9, 3],
[9, 1, 6, 3, 5, 7, 4, 8, 2],
[7, 3, 8, 2, 6, 9, 5, 1, 4],
[6, 5, 1, 4, 7, 3, 8, 2, 9],
[2, 4, 9, 5, 8, 1, 3, 6, 7]
]


 // Set up squares (inputs) for the game board
 const createSquares = () => {
 	//from 0 to 9, create rows
 	for(let i = 0; i < 9; i++){
 		let row = document.createElement("tr")

 		// From 0 to 9, create columns
 		for(let j = 0; j < 9; j++){
 			let cell = document.createElement("td")
 			cell.className = "td"
 			// Create divs for each cell
 			let square = document.createElement("button")
 			square.classList.add("btn", "game-squares", "diff-buttons")
 	
 			
  			// Set button's value and text to be number from solution array		
 			square.setAttribute("value", solutionArray[i][j])
 			square.innerText = solutionArray[i][j]
 			
			
 			// Append square divs to each cell, and then each cell to each row
 			cell.appendChild(square)
 			row.appendChild(cell)

 			

			// Call functions
 			assignRandomNum(square)
 			clearByDifficulty(square)
 			getSquareValue(square)				
			assignSquareIndex(square)
 			getHint(square)		
 		}
 		// Append each row to our table
 		tableBody.appendChild(row)
 	}
 }

///////////////////////*************************//////////////////////




// ASSIGNING NUMBER FUNCTIONS TO SQUARES
////////////////////////////////////////////////////////////

// Create a function to generate a random number. Assign this number to each square, thereby randomly hiding squares for each difficulty
const assignRandomNum = (square) => {
	const randomNum = Math.floor(Math.random() * 100) + 1
	square.setAttribute("random", randomNum)
}


// Create function to assign numbers 1-81 to each square
const assignSquareIndex = (square) => {
	square.setAttribute("name", squareIndex)
	squareIndex++	
}

///////////////////////*************************//////////////////////





//DIFFICULTY FUNCTIONALITY
////////////////////////////////////////////////////////////////

// Add event listeners for each difficulty button, which will clear the appropriate amount of squares
const clearByDifficulty = (square) => {
	easyBtn.addEventListener("click", function(e){
		clickSound.play()
		if(square.getAttribute("random") % 2 == 0){
			square.innerText = " "
			startBtn.disabled = false;
			square.disabled = false
		} else {
			square.disabled = true
			square.style.color = "#212529"
		}
		this.style.background = "rgb(45, 152, 181)"
		mediumBtn.disabled = true
		hard.disabled = true
		expert.disabled = true
		// time = 10;

		// new stuff
		let twoMinutes = 60 * 2
		display = document.querySelector("#timer")
		setTimer(twoMinutes, display)
	})


	mediumBtn.addEventListener("click", function(){
		clickSound.play()
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random")% 4 == 0){
			square.innerText = " "
			startBtn.disabled = false;
			square.disabled = false
		} else {
			square.disabled = true
			square.style.color = "#212529"
		}
		easy.disabled = true
		hard.disabled = true
		expert.disabled = true
		// time = 200

		let fourMinutes = 60 * 4
		display = document.querySelector("#timer")
		setTimer(fourMinutes, display)
	})
	hardBtn.addEventListener("click", function(){
		clickSound.play()
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0){
			square.innerText = " "
			startBtn.disabled = false;
			square.disabled = false
		} else {
			square.disabled = true
			square.style.color = "#212529"
		}

		medium.disabled = true
		easy.disabled = true
		expert.disabled = true
		// time = 300

		let tenMinutes = 60 * 10
		display = document.querySelector("#timer")
		setTimer(tenMinutes, display)
	})
	expertBtn.addEventListener("click", function(){
		clickSound.play()
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0 || square.getAttribute("random") % 4 == 0){
			square.innerText = " "
			startBtn.disabled = false;
			square.disabled = false   
		} else {
			square.disabled = true 
			square.style.color = "#212529"
		}
		medium.disabled = true
		hard.disabled = true
		easy.disabled = true
		// time = 400
		let twentyMinutes = 60 * 20
		display = document.querySelector("#timer")
		setTimer(twentyMinutes, display)
	})
}

///////////////////////*************************//////////////////////








// GETTING VALUES FROM SQUARES AND  CLICK EVENTS
///////////////////////////////////////////////////////////////

// On the event of a square clicked
const getSquareValue = (square) => {
	// Set global variable "squarePicked" to the clicked square
	square.addEventListener("click", function(){
		squarePicked = square
		clickSound.play()

		// Enable answer buttons
			let answerButtons = document.querySelectorAll(".answerButton")
			for(let i = 0; i < answerButtons.length; i++){
				answerButtons[i].disabled = false
			}
	})
}



// Get answer chosen from the user
const getAnswerValue = (answerButton) => {
	// Set the global variable "answer" to the value of the bottom number chosen
	answerButton.addEventListener("click", function(){
		let answerButtons = document.querySelectorAll(".answerButton")
		for(let i = 0; i < answerButtons.length; i++){
			answerButtons[i].disabled = true
		}
		answer = answerButton.value
		
		if(squarePicked.value === answer){
			squarePicked.innerText = answer
			successSound.play()
			squarePicked.disabled = true;
		} else {
			failureSound.play()
			squarePicked.innerText = answer
			squarePicked.style.color = "red"
			markMistakes()
			
			// Enable undo button
			undoBtn.disabled = false;
			undoBtn.style.background = "none"

			// Disable elements
			let answerButtons = document.querySelectorAll(".answerButton")
			hintBtn.disabled = true
			// notesBtn.disabled = true
			for(let i = 0; i < answerButtons.length; i++){
				answerButtons[i].disabled = true
			}

			// Disable all squares
			let squares = document.querySelectorAll(".game-squares")
			for(let j = 0; j < squares.length; j++){
				squares[j].disabled = true
			}

		}
	})
}

createAnswerButtons()
///////////////////////*************************//////////////////////




//UNDO BUTTON FUNCTIONALITY
/////////////////////////////////////////////////////

// Create undo function 
const undoWrongAnswer = () => {
	undoBtn.addEventListener("click", function(){
		undoSound.play()

		squarePicked.innerHTML = " "
		squarePicked.style.color = "rgb(33, 37, 41)"
		// squarePicked.disabled = false
		undoBtn.disabled = true
		undoBtn.style.background = "gray"



		// Enable elements
		let answerButtons = document.querySelectorAll(".answerButton")
		hintBtn.disabled = false
		// notesBtn.disabled = false

		for(let i = 0; i < answerButtons.length; i++){
			answerButtons[i].disabled = false
		}

		let squares = document.querySelectorAll(".game-squares")
		
		for(let j = 0; j < squares.length; j++){
			squarePicked.style.background = "none"
			if(squares[j].innerHTML === " "){
				squares[j].disabled = false
			}
		
		}
	})
}

undoWrongAnswer()

// Create function to keep track of user mistakes
const markMistakes = () => {
	// Increase the mistakesCount variable
	mistakesCount++
	// Update the html
	mistakeCountDisplay.innerHTML = mistakesCount

	// If 3 mistakes are made, end the game
	if(mistakesCount === 3){
		toggleElements()
		newGameBtn.disabled = false
		timeDisplay.style.display = "none"
		mistakesMessage.style.display = "inline"
	}
}
///////////////////////*************************//////////////////////



//HINT BUTTON FUNCTIONALITY
///////////////////////////////////////////////


// Create function to come up with a random number 1-81
const generateRandomIndex = () => {
	randomIndex = Math.floor(Math.random() * 81) + 1
}

// Create function to find a square thats empty, and then fill it with it's value
const checkSquareEmptiness = (square) => {

	// Find the square whose name = random number
	if(parseInt(square.name) == randomIndex){
		let hintSquare = square

		// If square is empty
		
		if(hintSquare.innerHTML == " "){
			// make the square.innerHTML = square.value
			hintSquare.innerHTML = hintSquare.value
			
			hintSquare.style.background = 'rgb(204, 188, 67)'
			console.log(hintSquare)
			hintSquare.disabled = true
			
		} else {
			// If that square is not empty epeat the function
			console.log(hintSquare)
			generateRandomIndex()
			console.log(randomIndex)
			checkSquareEmptiness(square)
		}
	} 
}



// Create function for hintBtn click event to run above code
const getHint = (square) => {
	// Create event listener on the hint button
	hintBtn.addEventListener("click", function(){
		clickSound.play()
		
		checkSquareEmptiness(square)	
		
		// Disable button
		hintBtn.disabled = true;
		hintBtn.style.background = "gray"
		
	})	
}

///////////////////////*************************//////////////////////




// TIMER FUNCTIONALITY
////////////////////////////////////////////////////////////

// Timer functionality
// Code taken and minipulated from a stackoverflow post
// https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

const setTimer = (duration, display) => {
	isPaused = false
	let timer = duration;
	let minutes;
	let seconds;
	const countdown = setInterval(function() {
		if(!isPaused){
			minutes = parseInt(timer / 60, 10);
    		seconds = parseInt(timer % 60, 10);
       
    		minutes = minutes < 10 ? "0" + minutes : minutes;
    		seconds = seconds < 10 ? "0" + seconds : seconds;
    		
    		if (--timer < 0) {
    			clearInterval(countdown)
        		timer = duration;
        		toggleElements()
				pausedMessage.style.display = "none"
				timesUp.style.display = "inline"
				newGameBtn.disabled = false
				mistakeText.style.display = "none"
        	}

        	promptYesBtn.addEventListener("click", function(){
        		clearInterval(countdown)
        	})
        display.textContent = minutes + ":" + seconds;		
	}	
	
	}, 1000)
}

///////////////////////*************************//////////////////////


createSquares()
generateRandomIndex()
startGame()
pauseGame()
startNewGame()














