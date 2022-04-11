  
// Utility
function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


//   variabili globali indispensabili per la lettura in tutti gli ambiti(scope)
const BOMB_NUMBER = 16;
let arrayBomb = [];
let maxTentativi;
let tentativi = 0;


// prendo il bottone per l'avvio del gioco e setto le caselle per difficoltà
document.getElementById("play").addEventListener("click", setLevel);

// setto per difficoltà
function setLevel(event){
    
  const level = document.getElementById("select").value;
    // console.log("livello selezionato: ", level);
    let numeroBox;
    switch (level) {
      case "1":
      default:
        numeroBox = 100;
        break;
      case "2":
        numeroBox = 81;
        break;
      case "3":
        numeroBox = 49;
        break;
      }
      // console.log(numeroBox, 'boxtotali')

  //   definisco le caselle per riga in base alla difficoltò
  let boxPerRiga = Math.sqrt(numeroBox);
    // console.log("celle per lato: ", boxPerRiga);

  //   chiamo ad eseguire funzioni che generano le bombe e griglia
  generateBomb(numeroBox);
  // console.log(maxTentativi, numeroBox,"-", BOMB_NUMBER)
  generaGriglia(numeroBox, boxPerRiga);
  // gameOver();    // per il debug
}


// funzione crea bombe
function generateBomb(numeroBox) {

  maxTentativi = numeroBox - BOMB_NUMBER;

  arrayBomb = [];
  
  while (arrayBomb.length < BOMB_NUMBER) {
    let bombNUmber = getRandomInt(1, numeroBox);
    // console.log(bombNUmber);
    if (!arrayBomb.includes(bombNUmber)) {
      arrayBomb.push(bombNUmber);
    }
  }
  console.log(arrayBomb);
}


// funzione crea griglia
function generaGriglia(numeroBox, boxPerRiga) {

  // console.log("numero di celle totali: ", numeroBox);
  const app = document.getElementById("main-container");
  app.innerHTML = "";
  let row = document.createElement("div");
  row.setAttribute("class", "gridrow");
  for (let i = 1; i <= numeroBox; i++) {
    const box = generaCella(i, boxPerRiga);
    row.append(box);
  }
    app.append(row);
}


//   funzione che crea ogni singola cella
function generaCella(numeroBox, boxPerRiga) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    box.style.width = `calc(100% / ${boxPerRiga})`;
    box.style.height = `calc(100% / ${boxPerRiga})`;
    box.classList.add("pointer");
    box.innerHTML = `<span>${numeroBox}</span>`;
    box.addEventListener("click", coloraCella);
    return box;
  }

//   funzione per colorare e interagire con ogni singola cella
function coloraCella() {
    // console.log(this.innerText);
    let num = parseInt(this.innerText);
    // console.log(this);
    if (arrayBomb.includes(num)) 
    {
      this.style.backgroundColor = "red";
      this.innerHTML = `<img src="img/bomba-logo.png" 
      style ="width: 75%;
      transform: translate(-50%, -50%);
      position: relative;
      left: 50%;
      top: 50%;">`;
      gameOver();
    } 
    else {
      tentativi++;
      this.style.backgroundColor = "#6495ed";
      if(tentativi == maxTentativi){
        document.write('hai vinto')
        // console.log(maxTentativi)

      }
    }

    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
}


//   funzione per terminare la partita
function gameOver() {

  let end = document.createElement('div');
  // console.log(end)
  if(tentativi <= maxTentativi){
    // let sconfitta = document.write('hai perso');
  }
  
  let quadratini = document.getElementsByClassName('box');  //variabile caselle con le bombe
  console.log('leggo array', quadratini)

  for(let i = 0; i < quadratini.length; i++){
    console.log(quadratini[i].innerText);
    // if(arrayBomb.includes(parseInt(quadratini[i].innerText))){
    //   quadratini[i].style.backgroundColor = "red";
    //   quadratini[i].innerHTML = `<img src="img/bomba-logo.png" 
    //   style ="width: 75%;
    //   transform: translate(-50%, -50%);
    //   position: relative;
    //   left: 50%;
    //   top: 50%;">`;
    // }
  // }
// }
                      // altro metodo

  if(arrayBomb.includes(i + 1)){
    quadratini[i].style.backgroundColor = "red";
    quadratini[i].innerHTML = `<img src="img/bomba-logo.png" 
    style ="width: 75%;
    transform: translate(-50%, -50%);
    position: relative;
    left: 50%;
    top: 50%;">`;
    }
  }
}


