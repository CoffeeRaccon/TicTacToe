let board;
let currentPlayer;
let playersSign = [];
let numberOfPlayer;
let gameFinished;
let gameRound;

function Run(){
    clearBoard();
    if(ValidInputCheck()){
        setPlayers();
        setBoard();
        gameFinished = false;
        gameRound = 0;
    }
}
function clearBoard(){
    document.getElementById('board').innerHTML = "";
}
function setBoard(){
    let boardSize = document.getElementById("tableSizeTag").value;
    createBoardTable(boardSize);
    createBoardUI(boardSize);
}
function setPlayers(){
    currentPlayer = 0;
    playersSign = [];
    let Signs = document.getElementById("playerSignsTag").value;
    let j = 0;
    for (let i = 0; i < Signs.length; i++) {
        if(Signs[i] != ' '){
            playersSign[j++] = Signs[i];
        }
    }
    numberOfPlayer = playersSign.length;
}
function createBoardUI(boardSize){
    let boardUI = document.createElement("table");
    document.getElementById("board").appendChild(boardUI);
    fillTable(boardSize, boardUI);
}
function fillTable(boardSize, boardUI){
    for (let rowNumber = 0; rowNumber < boardSize; rowNumber++) {
        let row = getNewRow(boardSize, rowNumber);
        boardUI.appendChild(row);
    }
}
function getNewRow(boardSize, rowNumber){
    let row = document.createElement("tr");
    for (let collumnNumber = 0; collumnNumber < boardSize; collumnNumber++) {
        row.appendChild(getNewField(rowNumber, collumnNumber));
    }
    return row;
}
function getNewField(rowNumber, collumnNumber){
    board[rowNumber][collumnNumber] = document.createElement("button");
    board[rowNumber][collumnNumber].className = "BoardField";
    board[rowNumber][collumnNumber].innerText = "";
    board[rowNumber][collumnNumber].addEventListener("click", ()=>{
        FieldEventHandler(rowNumber, collumnNumber);
    });
    return board[rowNumber][collumnNumber];
}
function createBoardTable(boardSize){
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
    }
}
function FieldEventHandler(rowNumber, collumnNumber){
    let winningLine;
    if(!gameFinished){
        if(board[rowNumber][collumnNumber].innerText == ""){
            gameRound++;
            board[rowNumber][collumnNumber].innerText = playersSign[currentPlayer];
            if(winningLine = CheckWin()){
                WinCall(winningLine);
            }
            else if(CheckDraw()){
                DrawCall();
            }
            currentPlayer++;
            currentPlayer %= numberOfPlayer;
        }
    }
}
function DrawCall(){
    alert("Remis");
}
function CheckDraw(){
    return Math.pow(board.length, 2) == gameRound;
}
function WinCall(winningLine){
    gameFinished = true;
    MarkLine(winningLine);
}
function MarkLine(line){
    for (let i = 0; i < line.length; i++) {
        line[i].className = "BoardWinField";
    }
}
function CheckWin(){  
    let winningLine;
    if((winningLine = CheckRows())
       || (winningLine = CheckCollumns())
       || (winningLine = CheckHorizontal())){
        return winningLine;
    }
    return false;
}
function CheckLine(line){
    for (let i = 0; i < line.length; i++) {
        if(line[i].innerText != playersSign[currentPlayer]){
            return false;
        }
    }
    return line;
}
function CheckRows(){
    let lineOfSigns;
    for (let row = 0; row < board.length; row++) {
        lineOfSigns = [];
        for(let collumn = 0; collumn < board.length; collumn++){
            lineOfSigns.push(board[row][collumn]);
        }
        if(lineOfSigns = CheckLine(lineOfSigns)){
            return lineOfSigns;
        }
    }
    return false;
}
function CheckCollumns(){
    let lineOfSigns;
    for (let collumn = 0; collumn < board.length; collumn++) {
        lineOfSigns = [];
        for(let row = 0; row < board.length; row++){
            lineOfSigns.push(board[row][collumn]);
        }
        if(lineOfSigns = CheckLine(lineOfSigns)){
            return lineOfSigns;
        }
    }
    return false;
}
function CheckHorizontal(){
    let lineOfSignsY = [];
    let lineOfSignsX = [];
    let winningLine = [];
    for (let i = 0; i < board.length; i++) {    
        lineOfSignsY.push(board[i][i]);
        lineOfSignsX.push(board[i][board.length-i-1]);
    }
    if((winningLine = CheckLine(lineOfSignsX)) 
       ||(winningLine = CheckLine(lineOfSignsY))){
        return winningLine;
    }
    return false;
}
function ValidInputCheck(){
    if(ValidTableSizeCheck() && ValidPlayersCheck())
        return true;
    else
        return false;
}
function ValidTableSizeCheck(){
    return document.getElementById("tableSizeTag").value > 0;
}
function ValidPlayersCheck(){
    return document.getElementById("playerSignsTag").value.length > 0;
}