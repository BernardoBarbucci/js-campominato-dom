// CODICE DELL'ESERCIZIO PRECEDENTE
const gridEl = document.querySelector('.main-grid');
const startButtonEl = document.querySelector('button#start-button');
const gameModeEl = document.querySelector('select#select-difficulty');

startButtonEl.addEventListener('click', function(){
    startNewGame(gridEl, gameModeEl)
});

// funzione dove creo i quadratini e creo una griglia
function startNewGame(wrapperEl, modeSelector) {
    wrapperEl.innerHTML = '';
    const mode = parseInt(modeSelector.value);
    let cellsNumb;
    // creo uno switch per implementare piu modalita dentro un unico elemento su js (special thanks goes to 'rc2pc2')
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
    // 'Math.sqrt'static method returns the square root of a number (source: mdn)
    let squaresRow = Math.sqrt(cellsNumb);
    // ciclo for per generare gli squares
    for (let i = 0; i < cellsNumb; i++) {
        const singularSquare = createNewSquare();
        const squareContent = i + 1; // aggiunto + 1 per far partire i quadratini da 1 e non da 0
        // print su html
        singularSquare.innerHTML += `<span> ${squareContent} </span>`;
        // grandezza square
        const squareSize = `calc(100% / ${squaresRow})`;
        singularSquare.style.width = squareSize;
        singularSquare.style.height = squareSize;
        // if per cambiare background-color in base a pari e dispari
        if (squareContent % 2 === 0){
            singularSquare.classList.add('bg-black');
        } else {
            singularSquare.classList.add('bg-purple')
        }
        // accendi e spengi ad ogni click
        singularSquare.addEventListener('click', function(){
            singularSquare.classList.toggle('clicked');
            console.log(squareContent);
        });
        // appendchild di singularS
        wrapperEl.appendChild(singularSquare);
    }
}
// funzione per creare il quadratino
function createNewSquare(){
    const newSquareEl = document.createElement('article');
    newSquareEl.classList.add('squareEl');
    return newSquareEl;
}
// FINE CODICE DELL'ESERCIZIO PRECEDENTE

    // CONSEGNA ESERCIZIO
    // Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    // Attenzione:
    // nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
    // In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati:
    // - abbiamo calpestato una bomba
    // - la cella si colora di rosso e la partita termina.
    // Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    // La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
    // (ovvero quando ha rivelato tutte le celle che non sono bombe).
    // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// generare 16 numeri casuali (prolly with an array) in ogni difficolta + attenzione che non possono essere generati gli stessi numeri = bombe