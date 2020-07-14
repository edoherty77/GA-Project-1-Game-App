// Variables / Cached Elements
const footer = document.querySelector("footer")
const tableBody = document.querySelector("#table-body")
const gameTable = document.querySelector("#game-table") 
const easy = document.querySelector("#easy")
const medium = document.querySelector("#medium")
const hard = document.querySelector("#hard")
const expert = document.querySelector("#expert")

let answer;
let squarePicked;
// Creat solution arrays to check user's answers

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


//Create buttons 1-9 for user to choose from
 const createNumButtons = () => {
 	//Loop 1-9 to create buttons with corresponding values
 	for(let i = 1; i < 10; i++){
 		const numButton = document.createElement("button")
 		numButton.textContent = i
 		numButton.setAttribute("value", i)

 		//Give the buttons some style and room
 		numButton.className = "btn btn-primary"
 		numButton.style.margin = "10px 10px"

 		//push each button into footer section of html
 		footer.appendChild(numButton)

 		getAnswer(numButton)
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
 			square.style.width = "26px"
 			square.style.height = "30px"
 			 
  			// Set button's value and text to be number from solution array		
 			square.setAttribute("value", solutionArray[i][j]) 
 			square.innerText = solutionArray[i][j]
 			
		
 			// Append square divs to each cell, and then each cell to each row
 			cell.appendChild(square)
 			row.appendChild(cell)

 			// Call clearByDifficulty function to clear appropriate amount of cell
 			clearByDifficulty(square)


 			getSquareValue(square)
 		}

 		// Append each row to our table
 		tableBody.appendChild(row)

 	}
 }



// Add event listeners for each difficulty button, which will clear the appropriate amount of squares
const clearByDifficulty = (square) => {
	easy.addEventListener("click", function(){
		if(square.value % 2 == 0){
			square.innerText = " "
			square.style.width = "26px"
			square.style.height = "30px"
		}
	})
	medium.addEventListener("click", function(){
		if(square.value % 2 == 0 || square.value % 4 == 0){
			square.innerText = " "
			square.style.width = "26px"
			square.style.height = "30px"
		}
	})
	hard.addEventListener("click", function(){
		if(square.value % 2 == 0 || square.value % 3 == 0){
			square.innerText = " "
			square.style.width = "26px"
			square.style.height = "30px"
		}
	})
	expert.addEventListener("click", function(){
		if(square.value % 2 == 0 || square.value % 3 == 0 || square.value % 4 == 0){
			square.innerText = " "
			square.style.width = "26px"
			square.style.height = "30px"
		}
	})
}


// On the event of a square clicked
const getSquareValue = (square) => {
	square.addEventListener("click", function(){
		squarePicked = square.value
		console.log(square.value)
		console.log(squarePicked)

		// User can choose # from the bottom

		// If # value = square value
			// Fill square with black #
		// Else 
			// Fill with red #
			// Mistakes++
	})	
}

// Get answer chosen from the user
const getAnswer = (numButton) => {
	numButton.addEventListener("click", function(){
		answer = numButton.value
		console.log(numButton.value)
		console.log(answer)
	})
}




// const compare = () => {
// 	console.log(getAnswer())
// }


createNumButtons()
createSquares()
// compare()





















