let tab;
let currentPlayer = 1;
let playerSign = ['X', 'O'];
let numberOfPlayer = 2;
function Run(){ 
    document.getElementById('board').innerHTML = "";
    let tableSize = document.getElementById("tableSize").value;
    createNewButtonTable(tableSize);
    createTable(tableSize);
}
function createTable(tableSize){
    let gameTable = document.createElement("table");
    document.getElementById("board").appendChild(gameTable);
    fillTable(tableSize, gameTable);
}
function fillTable(tableSize, gameTable){
    for (let rowNumber = 0; rowNumber < tableSize; rowNumber++) {
        let row = getNewRow(tableSize, rowNumber);
        gameTable.appendChild(row);
    }
}
function getNewRow(tableSize, rowNumber){
    let row = document.createElement("tr");
    for (let collumnNumber = 0; collumnNumber < tableSize; collumnNumber++) {
        row.appendChild(getNewButton(rowNumber, collumnNumber));
    }
    return row;
}
function getNewButton(rowNumber, collumnNumber){
    tab[rowNumber][collumnNumber] = document.createElement("button");
    tab[rowNumber][collumnNumber].className = "BoardField";
    tab[rowNumber][collumnNumber].addEventListener("click", ()=>{
        tab[rowNumber][collumnNumber].innerText = rowNumber + " " + collumnNumber;

        /*FieldHandler(rowNumber, collumnNumber);*/
    });
    return tab[rowNumber][collumnNumber];
}
function createNewButtonTable(tableSize){
    tab = [];
    for (let i = 0; i < tableSize; i++) {
        tab[i] = [];
    }
}
function FieldHandler(i, j){
    if(tab[i, j].innerText != "s"){
        alert("good")
        return;
    }
    tab[i, j].innerText = playerSign[currentPlayer];
    
    CheckWin();
}
function CheckWin(){
    if(CheckRows())
        alert(currentPlayer + "win");
}
function CheckRows(){
    let win = true;
    for (let row = 0; row < tab.length; row++) {
        for(let collumn = 0; collumn < tab.length + 1; collumn++){
            if(tab[row, collumn].innerText == tab[row, collumn + 1].innerText){
                continue
            }
            else{
                win = false;
                break;
            }
        }
        if(win)
            return true;
    }
    return false;
}