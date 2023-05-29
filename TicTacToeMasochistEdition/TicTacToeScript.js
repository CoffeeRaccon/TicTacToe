let board;
let currentPlayer;
let playerSign = [];
let numberOfPlayer;
let gameFinished;

function Run(){
    SetPlayers();
    if(ValidInputCheck()){
        let tableSize = document.getElementById("tableSizeTag").value;
        gameFinished = false;
        document.getElementById('board').innerHTML = "";
        createNewButtonTable(tableSize);
        createTable(tableSize);
    }
}
function SetPlayers(){
    currentPlayer = 0;
    playerSign = [];
    let Signs = document.getElementById("playerSignsTag").value;
    let j = 0;
    for (let i = 0; i < Signs.length; i++) {
        if(Signs[i] != ' '){
            playerSign[j++] = Signs[i];
        }
    }
    numberOfPlayer = playerSign.length;
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
    board[rowNumber][collumnNumber] = document.createElement("button");
    board[rowNumber][collumnNumber].className = "BoardField";
    board[rowNumber][collumnNumber].innerText = "";
    board[rowNumber][collumnNumber].addEventListener("click", ()=>{
        FieldHandler(rowNumber, collumnNumber);
    });
    return board[rowNumber][collumnNumber];
}
function createNewButtonTable(tableSize){
    board = [];
    for (let i = 0; i < tableSize; i++) {
        board[i] = [];
    }
}
function FieldHandler(rowNumber, collumnNumber){
    if( gameFinished == false){
        if(board[rowNumber][collumnNumber].innerText != ""){
            return;
        }
        board[rowNumber][collumnNumber].innerText = playerSign[currentPlayer];
        CheckWin();
        currentPlayer++;
        currentPlayer %= numberOfPlayer;
    }
}
function CheckWin(){
    if(CheckLines()){
         gameFinished = true;
        alert("Gracz " + playerSign[currentPlayer] + " Wygrywa");
    }
}
function CheckLines(){
    for (let i = 0; i < board.length; i++) {
       if(CheckRow(i)
        || CheckCollumn(i)){
        return true;
       }
    }

    if(CheckHorizontalA() || CheckHorizontalB()){
        return true;
    }
    return false;
}
function CheckRow(row){
    if(board[row][0].innerText == "")
        return false;
    for(let collumn = 0; collumn < board.length - 1; collumn++){
        if(board[row][collumn].innerText != board[row][collumn + 1].innerText){
            return false;
        }
    }
    return true;
}
function CheckCollumn(collumn){
    if(board[0][collumn].innerText == "")
        return false;
    for(let row = 0; row < board.length - 1; row++){
        if(board[row][collumn].innerText != board[row + 1][collumn].innerText){
            return false;
        }
    }
    return true;
}
function CheckHorizontalA(){
    if(board[0][0].innerText != ""){
        for (let i = 0; i < board.length - 1; i++) {
            if(board[i][i].innerText != board[i+1][i+1].innerText){
                return false;
            }
        }
        return true;
    }
    return false;
}
function CheckHorizontalB(){
    let length = board.length;
    if(board[length-1][0].innerText != ""){
        for (let i = 1; i < length; i++) {
            if(board[length-i][i-1].innerText != board[length-1-i][i].innerText){
                return false;
            }
        }
        return true;
    }
    return false;
}
function ValidInputCheck(){
    if(ValidTableSize() && ValidPlayersCheck())
        return true;
    else
        return false;
}
function ValidTableSize(){
    if(document.getElementById("tableSizeTag").value > 0)
        return true;
    else
        return false;
}
function ValidPlayersCheck(){
    if(numberOfPlayer > 0)
        return true;
    else
        return false;
}