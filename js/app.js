// Variables / Cached Elements
const footer = document.querySelector("footer")



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