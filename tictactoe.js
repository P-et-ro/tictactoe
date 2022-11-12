const playerMarks = ["X","O"];
var grid = undefined;
var message = undefined;
var turn = undefined;
var rows = undefined;
var cols = undefined;
var diags = undefined;
var aDiags = undefined;
var winner = undefined;

var cellClick = (event) => {
    cell = event.target;
    if (cell.firstChild || winner != undefined) {
        return;
    } 
    
    message.innerHTML = '';

    rows[currentPlayerIndex()][cell.x]++;
    cols[currentPlayerIndex()][cell.y]++;
    if(cell.x === cell.y) {
        diags[currentPlayerIndex()]++;
    }
    if (cell.x + cell.y == 2) {
        aDiags[currentPlayerIndex()]++;
    }
    
    const markText = document.createTextNode(currentMark());
    cell.appendChild(markText);

    if(gameOver()) {
        showWinner();
    } else {
        turn++;
    }

  }

  resetGame = () => {
    grid = document.getElementById("grid");
    message = document.getElementById("message");
    grid.innerHTML = '';
    rows = [[0,0,0],[0,0,0]];
    cols = [[0,0,0],[0,0,0]];
    diags = [0,0];
    aDiags = [0,0];
    turn = 0;
    winner = undefined;
    message.innerHTML = currentMark() + ' starts!';

    for(var i = 0; i < 3 ; i++) {
        for(var j = 0; j < 3 ; j++) {
            var cell = document.createElement("div");
            cell.id = i + "_" + j;
            cell.x = i;
            cell.y = j;
            cell.addEventListener("click", cellClick);
            grid.appendChild(cell);
        }
    }
  }

document.addEventListener("DOMContentLoaded", resetGame);

  function currentMark() {
     return playerMarks[currentPlayerIndex()];
  }

  function currentPlayerIndex() {
    return turn % 2;
 }

  function gameOver() {
   if(rows[currentPlayerIndex()][0] === 3 ||
        rows[currentPlayerIndex()][1] === 3 ||
        rows[currentPlayerIndex()][2] === 3 ||
        cols[currentPlayerIndex()][0] === 3 ||
        cols[currentPlayerIndex()][1] === 3 ||
        cols[currentPlayerIndex()][2] === 3 ||
        diags[currentPlayerIndex()] === 3 ||
        aDiags[currentPlayerIndex()] === 3) {
            winner = currentMark();
            return true;
        };

        if(turn > 7) {
            winner = "draw";
            return true;
        }

        return false;
  }

  function showWinner() {
    var textMessage = "Winner is " + winner + "!!!";
    if(winner === "draw") {
        textMessage = "It's a draw!!!";
    } 
        message.appendChild(document.createTextNode(textMessage));
  }