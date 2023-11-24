// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione:
// nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati:
// - abbiamo calpestato una bomba
// - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti
// (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// CODICE DELL'ESERCIZIO PRECEDENTE
const gridEl = document.querySelector('.main-grid');
const startButtonEl = document.querySelector('button#start-button');
const gameModeEl = document.querySelector('select#select-difficulty');

startButtonEl.addEventListener('click', function(){
    startNewGame(gridEl, gameModeEl);
});

function startNewGame(wrapperEl, modeSelector) {
    wrapperEl.innerHTML = '';
    const mode = parseInt(modeSelector.value);
    let cellsNumb = getNumberOfSquares(mode);
    // bombe
    const bombs = genBombs(cellsNumb);

    // 'Math.sqrt'static method returns the square root of a number (source: mdn)
    let squaresRow = Math.sqrt(cellsNumb);
    // ciclo for per generare gli squares
    for (let i = 0; i < cellsNumb; i++) {
        const singularSquare = createNewSquare();
        const squareContent = i + 1; 
        singularSquare.innerHTML += `<span> ${squareContent} </span>`;
        // grandezze square
        const squareSize = `calc(100% / ${squaresRow})`;
        singularSquare.style.width = squareSize;
        singularSquare.style.height = squareSize;
        //creazione if che include anche le bombe + if per bg colors on click
        if (bombs.includes(squareContent)) {
            singularSquare.classList.add('bomba');
        } else {
            if (squareContent % 2 === 0) {
                singularSquare.classList.add('bg-black');
            } else {
                singularSquare.classList.add('bg-purple')
            }

            // onf-off on click(toggle) + spostato nell'else il toggle realtivo al cambio bg-color 
            singularSquare.addEventListener('click', function(){
                if (singularSquare.classList.contains('bomba')) {
                    endGame();
                } else {
                    singularSquare.classList.toggle('clicked');
                    console.log(squareContent);
                }
            });
        }
        wrapperEl.appendChild(singularSquare);
    }
}
// funzione per creare il quadratino
function createNewSquare(){
    const newSquareEl = document.createElement('article');
    newSquareEl.classList.add('squareEl');
    return newSquareEl;
}
// generare 16 numeri casuali (prolly with an array) in ogni difficolta (quindi 16 numeri tra 1-) + attenzione che non possono essere generati gli stessi numeri = bombe 
// aggiungo all'event listener del codice precedente un array per implementare le bombe e crearle automaticamente quando clicco il button per creare i quadratini

    // step .1 rifaccio la funzione per le difficolta per semplificare l'aggiunta delle bombe
function getNumberOfSquares(mode) {
    switch (mode){
        case 1:
            cellsNumb = 81;
            break;
        case 2:
            cellsNumb = 49;
            break;
        default:
            cellsNumb = 100;
            break;
    }
    return cellsNumb;
}
    // step .2 creo la funzione per generare le bombe
    // + aggiunto all'interno una seconda const per piazarle in posizioni random
function genBombs(cellsNumb) {
    const bombs = [];
    while (bombs.length < 16) {
        const bombPosition = Math.floor(Math.random() * cellsNumb) + 1;
        if (!bombs.includes(bombPosition)) {
            bombs.push(bombPosition);
        }
    }
    return bombs;
}
    // step .3 creo un alert per mostrare al player che ha perso se clicca una bomba
function endGame() {
    alert('BOOM! you clicked the wrong square, GAME OVER!')
}