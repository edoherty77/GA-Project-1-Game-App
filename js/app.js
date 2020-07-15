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



// Variables / Cached Elements
const footer = document.querySelector("footer")
const tableBody = document.querySelector("#table-body")
const gameTable = document.querySelector("#game-table") 
const easy = document.querySelector("#easy")
const medium = document.querySelector("#medium")
const hard = document.querySelector("#hard")
const expert = document.querySelector("#expert")
const mistakeCount = document.querySelector("#mistakeCount")
const startAndPause = document.querySelector("#start-pause")
const greeting = document.querySelector("#greeting")
const pausedMessage = document.querySelector("#paused-message")
const hintBtn = document.querySelector("#hint")

// Global variables storing values for squares picked and bottom buttons picked
let answer;
let squarePicked;
let time = 30;
let squareIndex = 1
let randomIndex;




// Have the start button disabled when the page loads
startAndPause.disabled = true;

// Create start function
// Once player chooses a difficulty and then presses start, the createSquares function will be called with the appropriate difficulty
// The time will also start running as well

const start = () => {
	startAndPause.addEventListener("click", function(){

		// Hide the greeting message once the start button has been pressed
		greeting.style.display = "none"

		// Call toggle function to toggle elements
		toggleElements()

		// Call the setTimer function
		// setTimer()
	})
}



// Show and hide game table and toggle pause and start button
const toggleElements = () => {
	// Toggle start/pause button and paused message
	if(startAndPause.innerText === "Start"){
		startAndPause.innerText = "Pause"
		pausedMessage.style.display = "none"
	} else {
		startAndPause.innerText = "Start"
		pausedMessage.style.display = "inline"
	}

	// Toggle game table to display and hide
	if(gameTable.style.display === "block"){
		gameTable.style.display = "none"
	} else {
		gameTable.style.display = "block"
		
	}
	
}



//Create buttons 1-9 for user to choose from
 const createNumButtons = () => {
 	//Loop 1-9 to create buttons with corresponding values
 	for(let i = 1; i < 10; i++){
 		const numButton = document.createElement("button")
 		numButton.textContent = i
 		numButton.setAttribute("value", i)
 		
 		//Give the buttons some style and room
 		numButton.classList.add("btn", "btn-primary", "numButton")
 		
 		//push each button into footer section of html
 		footer.appendChild(numButton)

 		getAnswerValue(numButton)
 	}
 }




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

 			

			// Call random number function
 			assignRandomNum(square)

 			// Call clearByDifficulty function to clear appropriate amount of cell
 			clearByDifficulty(square)

 			// Call the getSquareValue function to obtain the value of square selected by user
 			getSquareValue(square)	
 			

 			assignSquareIndex(square)
 			
 			// console.log(typeof square.name)
 		

 			getHint(square)		
 		}
 		// Append each row to our table
 		tableBody.appendChild(row)
 	}
 }




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



// Add event listeners for each difficulty button, which will clear the appropriate amount of squares
const clearByDifficulty = (square) => {
	easy.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0){
			square.innerText = " "
			startAndPause.disabled = false;
		}
	})
	medium.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random")% 4 == 0){
			square.innerText = " "
			startAndPause.disabled = false;
		}
	})
	hard.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0){
			square.innerText = " "
			startAndPause.disabled = false;
		}
	})
	expert.addEventListener("click", function(){
		if(square.getAttribute("random") % 2 == 0 || square.getAttribute("random") % 3 == 0 || square.getAttribute("random") % 4 == 0){
			square.innerText = " "
			startAndPause.disabled = false;
		}
	})
}




// On the event of a square clicked
const getSquareValue = (square) => {
	// Set global variable "squarePicked" to the clicked square
	square.addEventListener("click", function(){
		squarePicked = square
	})
}


// Get answer chosen from the user
const getAnswerValue = (numButton) => {
	// Set the global variable "answer" to the value of the bottom number chosen
	numButton.addEventListener("click", function(){

		answer = numButton.value
		
		if(squarePicked.value === answer){
			squarePicked.innerText = answer
		}else {
			squarePicked.innerText = answer
			squarePicked.style.color = "red"
			markMistakes()
		}
	})
}


// Create function to keep track of user mistakes
const markMistakes = () => {
	num = 1
	if(mistakeCount.innerText = "0"){
		mistakeCount.innerText = num
		num++
	} 
}


///////////////////////////////////////////////
//CODE FOR HINT BUTTON FUNCTIONALITY
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
			square.innerHTML = square.value
			square.style.color = 'rgb(3, 252, 182)'
			console.log(square)
		} else {
			// If that square is not empty epeat the function
			console.log(square)
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



// const setTimer = () => {
// 	const timer = setInterval(() => {
// 		time--;
// 		// if(startAndPause.innerText = "Start"){
// 		// 	clearInterval(timer)
// 		// }
// 		if(time === 0){
// 			clearInterval(timer)
// 			alert("game over dickhead")
// 		}
// 		document.querySelector("#timer").innerHTML = ("Time: " + time)
// 	}, 1000)
// }


createNumButtons()
createSquares()
generateRandomIndex()
start()


console.log(randomIndex)













