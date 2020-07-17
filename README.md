# GA-Project-1-Game-App

For project 1, I've created a sudoku app.

When the page loads, the user will have the choice of picking 1 of 4 difficulties. Once the difficulty is chosen, the start button is enabled so the user can click it.

Once clicked, many things happen. 
The start button and greeting disappear.
The pause button appears (by appears I mean element.style.display = "inline")
The game board appears with the appropriate amount of numbers already given (based on the difficulty).
The answer buttons appear at the bottom of the page
The undo, hint, and notes button appear
The mistakes count appears
The newGame button is enabled

And lastly, the timer appears and begins its countdown.


If the game is paused:
The timer stops
The paused button disappears
The start button reappears 
All of the elements that appeared after clicking start all disappear (and by disappear I mean element.style.display = "none")
The paused message appears
The new game button becomes enabled

At this point, the user can either click "start" to resume the game, or he/she can click the "new game button"

If the new game button is clicked, a message will appear to confirm that the user wants to end it.
If clicked no, the app goes back to the paused screen. If clicked yes, the app goes back to the way it was when the page first loaded.

Once the user is in the game and the timer is ticking, the board is fully interactive. The grid is made up of 9x9 squares, each having a button inside. The squares that already have a number inside are disabled, but the empty ones can be clicked on.
Once clicked on a square, the user can choose an answer from the buttons 1-9 at the bottom of the screen.
If the user selects the right answer, the number will appear in the intended square in the color black and will become disabled.
If the user is wrong, the number will appear in the intended square, but in the color red.
Every square will become disabled, and the undo button (which was disabled), becomes enabled
When the used clicks the undo button, the square will become empty, and all other squares will become enabled again
The undo button once again becomes disabled

If the user clicks the hint button, a random empty square will fill up with its correct value in the color green.
The hint button will become disabled for the rest of the game

If the user selects the notes button...




When all squares are filled in correctly, the game will end.
All board elements will disappear, and a congratulations message will appear, and a play again button will appear
When selected, the app will show its original onload page










