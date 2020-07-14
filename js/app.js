// Variables / Cached Elements
const footer = document.querySelector("footer")
const tableBody = document.querySelector("#table-body")
const gameTable = document.querySelector("#game-table") 


// Creat solution arrays to check user's answers

const easySolutionArray = [
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
 	}
 }

 createNumButtons()


 // Set up squares (inputs) for the game board

 const createSquares = () => {


 	//from 0 to 9, create rows
 	for(let i = 0; i < 9; i++){
 		let row = document.createElement("tr")
 		

 		// From 0 to 9, create columns
 		for(let j = 0; j < 9; j++){
 			let cell = document.createElement("td")

 			// Create divs for each cell
 			let square = document.createElement("div")
 			
 			
  			
 			randomNum(square)

 		
		
 			square.innerHTML = easySolutionArray[i][j]
 			
 			clearRandomSquareEasy(square)
			
 		

 			// Append square divs to each cell, and then each cell to each row
 			cell.appendChild(square)
 			row.appendChild(cell)
 		}

 		// Append each row to our table
 		tableBody.appendChild(row)

 	}
 }



const randomNum = (square) => {
	let randomNumber = Math.floor(Math.random() * 100) + 1
	square.className = randomNumber

}


const clearRandomSquareEasy = (square) => {
	if(square.className % 2 == 0){
		square.innerHTML = ""
	}
}


// const applyRandomNum = (square) => {
// 	for(let k = 0; k < easySolutionArray.length; k++){
// 		for(q = 0; q < easySolutionArray.length; q++){
// 			let numbers = easySolutionArray[k][q]
// 			let input = document.createElement("input")
// 			input.type = "number"
// 			input.setAttribute("value", numbers)
// 			input.name = numbers
			
// 			let label = document.createElement("label")
// 			label.htmlFor = numbers
// 			label.appendChild(document.createTextNode(numbers))

// 			let p = document.createElement("p")

// 			// p.appendChild(input)
// 			p.appendChild(label)
// 			square.appendChild(p)
			
// 		}
// 	}
// }

// applyRandomNum(square)
createSquares()






















