
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
const mistakeCount = document.querySelector("#mistakeCount")
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

// Global variables storing values for squares picked and bottom buttons picked
let answer;
let squarePicked;
let time;
let squareIndex = 1
let randomIndex;

let undoSound = new Audio("./sounds/undo-sound.wav")
let successSound = new Audio("./sounds/success-sound.wav")
let failureSound = new Audio("./sounds/failure-sound.wav")
let appearSound = new Audio("./sounds/appear-sound.wav")
let pauseSound = new Audio("./sounds/pause-sound.wav")
///////////////////////*************************//////////////////////


// STYLES SET WEHN PAGE LOADS
/////////////////////////////////////////////////////////

// Have the start button disabled when the page loads
startBtn.disabled = true;
newGameBtn.disabled = true
undoBtn.disabled = true;
undoBtn.style.background = "gray"
///////////////////////*************************//////////////////////




// START BUTTON FUNCTIONALITY
////////////////////////////////////////////////////////////


// Create start function
// Once player chooses a difficulty and then presses start, the createSquares function will be called with the appropriate difficulty
// The time will also start running as well
const startGame = () => {
	startBtn.addEventListener("click", function(){
		appearSound.play()
		
		startBtn.style.display = "none"
		newGameBtn.disabled = true
		pausedMessage.style.display = "none"


		// Set elements classList to .show
		toggleElements()

		// Hide the greeting message once the start button has been pressed
		greeting.style.display = "none"

		// Call the setTimer function
		// setTimer()
	})
}
/////////////////////*************************//////////////////////


// PAUSE BUTTON FUNCTIONALITY
//////////////////////////////////////////////////////////////

const pauseGame = () => {
	pauseBtn.addEventListener("click", function(){
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
		// Pause the time

		// Hide elements
		startBtn.disabled = true
		pausedMessage.style.display = "none"
		newGamePrompt.style.display = "inline"

		
		// If yes, have greeting, start button appear. Disable startBtn/newGameButton. Enable diffbuttons
		promptYesBtn.addEventListener("click", function(){
			// toggle all elements to hide or appear(difficulty buttons, paused message, start button)

			newGamePrompt.style.display = "none"

			// Appear
			greeting.style.display = "inline"
			startBtn.style.display = "inline"
			startBtn.disabled = true
			newGameBtn.disabled = true

			// Enable with no background color
			let diffButtons = document.querySelectorAll(".diff-buttons")
			for(let j = 0; j < diffButtons.length; j++){
				diffButtons[j].disabled = false
				diffButtons[j].style.background = "none"			
			}
		})

		promptNoBtn.addEventListener("click", function(){
			// Bring user back to pause menu
			
			startBtn.style.display = "inline"
			startBtn.disabled = false
			pausedMessage.style.display = "inline"
			newGamePrompt.style.display = "none"
			
		})		
	})
}


		

const toggleElements = () => {
	let answerButtons = document.querySelectorAll(".answerButton")
	for(let i = 0; i < answerButtons.length; i++){
		answerButtons[i].classList.toggle("show-hide")
	}
	undoBtn.classList.toggle("show-hide")
	hintBtn.classList.toggle("show-hide")
	notesBtn.classList.toggle("show-hide")
	gameTable.classList.toggle("show-hide")
	mistakeText.classList.toggle("show-hide")
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
const solutionArray = [
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
 			square.classList.add("btn", "game-squares")
 			

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
	easyBtn.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0){
			square.innerText = " "
			startBtn.disabled = false;
		} else {
			square.disabled = true
			square.style.color = "red"
		}
		this.style.background = "rgb(45, 152, 181)"
		mediumBtn.disabled = true
		hard.disabled = true
		expert.disabled = true
		time = 100;
	})


	mediumBtn.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random")% 4 == 0){
			square.innerText = " "
			startBtn.disabled = false;
		}
		easy.disabled = true
		hard.disabled = true
		expert.disabled = true
		time = 200
	})
	hardBtn.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0){
			square.innerText = " "
			startBtn.disabled = false;
		}

		medium.disabled = true
		easy.disabled = true
		expert.disabled = true
		time = 300
	})
	expertBtn.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0 || square.getAttribute("random") % 4 == 0){
			square.innerText = " "
			startBtn.disabled = false;
		}
		medium.disabled = true
		hard.disabled = true
		easy.disabled = true
		time = 400
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
	})
}



// Get answer chosen from the user
const getAnswerValue = (answerButton) => {
	// Set the global variable "answer" to the value of the bottom number chosen
	answerButton.addEventListener("click", function(){

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
			// numButton.disabled = true;
			undoBtn.disabled = false;
			undoBtn.style.background = "none"
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
		undoBtn.disabled = true
		undoBtn.style.background = "gray"
	})
}

undoWrongAnswer()

// Create function to keep track of user mistakes
const markMistakes = () => {
	num = 1
	if(mistakeCount.innerText = "0"){
		mistakeCount.innerText = num
		num++
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
			hintSquare.style.color = 'rgb(3, 252, 182)'
			console.log(hintSquare)
			
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
		
		checkSquareEmptiness(square)	
		
		// Disable button
		hintBtn.disabled = true;
		hintBtn.style.background = "gray"
	})	
}

///////////////////////*************************//////////////////////



// NOTE BUTTON FUNCTIONALITY
///////////////////////////////////////////////////////////
 
//Notes function
// When clicked, all empty buttons will be on display none
// When a square is clicked, a div is created
// The user can then click the bottom buttons, which their value will appear inside created div
// To remove number from the div from the square that is selected, the user can click the number at the bottom and it will toggle off
// Create and erase function
// To get rid of all numbers typed in, notes mode is off. the user can click on the square and press the erase button, 
// or click on a number, and the number will replace the div

///////////////////////*************************//////////////////////




// TIMER FUNCTIONALITY
/////////////////////////////////////////////


const setTimer = () => {
	const timer = setInterval(() => {
		time--;
		if(time === 0){
			clearInterval(timer)
			toggleElements()
			pausedMessage.style.display = "none"
			timesUp.style.display = "inline"
		}
		document.querySelector("#timer").innerHTML = ("Time: " + time)
	}, 1000)
}

///////////////////////*************************//////////////////////


createSquares()
generateRandomIndex()
startGame()
pauseGame()
startNewGame()














