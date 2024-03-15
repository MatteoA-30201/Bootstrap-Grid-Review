var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
var word = "SQUID";

window.onload = function(){
  intialize();
}

function intialize() {
  
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      // <span id="0-0" class="tile">P<span>
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }
  
    // listen for key press
     document.addEventListener("keyup", (e) => {
        if (gameOver) return;

       // alert(e.code);
        if ("KeyA" <= e.code && e.code <=  "KeyZ"){
            if (col < width){
              let currentTile = document.getElementById(row.toString() + "-" + col.toString());

              if (currentTile.innerText == "") {
                currentTile.innerText = e.code[3];
                col++;
              }
            }
        }
        else if (e.code == "Backspace") {
          if (0 < col && col <= width) {
            col--;
            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
            currentTile.innerText = "";
          }
        }
        else if (e.code == "Enter") {
          update();
          row += 1;
          col = 0;
        }

        if (!gameOver && row == height) {
          gameOver = true;
          document.getElementById("answer").innerText = word;
        }
     })
}

function update() {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(row.toString() + "-" + c);
    let letter = currentTile.innerText;

    if (word[c] == letter) {
      currentTile.classList.add("correct");
      correct++;
    }
    else if (word.includes(letter)) {
      currentTile.classList.add("present");
    }
    else {
      currentTile.classList.add("absent");
    }
  }
}
