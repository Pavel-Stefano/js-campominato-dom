  
// Utility
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
//   variabili globali indispensabili per la lettura in tutti gli ambiti(scope)
const BOMB_NUMBER = 16;
const bombs = [];
let max_attempt;
let attempts = 0;


// prendo il bottone per l'avvio del gioco e setto le caselle per difficoltà
document.getElementById("play").addEventListener("click", setLevel);

// setto per difficoltà
function setLevel(event){
const level = document.getElementById("select").value;
  console.log("livello selezionato: ", level);
  let numSquare;
  switch (level) {
    case "1":
    default:
      numSquare = 100;
      break;
    case "2":
      numSquare = 81;
      break;
    case "3":
      numSquare = 49;
      break;
    }
//   definisco le caselle per riga in base alla difficoltò
let squareperSide = Math.sqrt(numSquare);
  console.log("celle per lato: ", squareperSide);
//   chiamo ad eseguire funzioni che generano le bombe e griglia
generateBomb(numSquare);
generaGriglia(numSquare, squareperSide);
}

// funzione crea bombe
function generateBomb(numSquare) {
    max_attempt = numSquare - BOMB_NUMBER;
    while (bombs.length < BOMB_NUMBER) {
      let bombNUmber = getRandomInt(1, numSquare);
      if (!bombs.includes(bombNUmber)) {
        bombs.push(bombNUmber);
      }
    }
  }
// funzione crea griglia
function generaGriglia(numSquare, squareperSide) {
    console.log("numero di celle totali: ", numSquare);
    const app = document.getElementById("main-container");
    app.innerHTML = "";
    let row = document.createElement("div");
    row.setAttribute("class", "gridrow");
    for (let i = 1; i <= numSquare; i++) {
      const square = generaCella(i, squareperSide);
      row.append(square);
    }
    app.append(row);
  }
//   funzione che crea ogni singola cella
function generaCella(numSquare, squareperSide) {
    let square = document.createElement("div");
    square.setAttribute("class", "box");
    square.style.width = `calc(100% / ${squareperSide})`;
    square.style.height = `calc(100% / ${squareperSide})`;
    square.classList.add("pointer");
    square.innerHTML = `<span>${numSquare}</span>`;
    square.addEventListener("click", coloraCella);
    return square;
  }
//   funzione per colorare e interagire con ogni singola cella
function coloraCella() {
    //console.log(this.innerText);
    let num = parseInt(this.innerText);
    attempts++;
    if (bombs.includes(num)) {
      this.style.backgroundColor = "red";
      this.innerHTML = `<img src="img/bomba-logo.png" 
      style ="width: 75%;
      transform: translate(-50%, -50%);
      position: relative;
      left: 50%;
      top: 50%;">`;
      gameOver();
    } else {
      this.style.backgroundColor = "#6495ed";
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
  }
//   funzione per terminare la partita
function gameOver() {
    
}
document.getElementById("play").addEventListener("click", setLevel);
