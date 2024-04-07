const form = document.querySelector("form");
const model = document.querySelector(".model");
const gridContainer = document.querySelector(".grid-container");
const message = document.querySelector(".message");
let turn = true;
let isWinner = false;
let player = ["player-1" , "player-2"];
let board = [ ['', '', ''],['', '', ''],['', '', '']];
form.addEventListener("submit" ,getForm);
function getForm(e){
	e.preventDefault();
	toggleForm();
	player = [form.p1.value , form.p2.value];
	form.reset();
	createCellGrid();
	toggleModel();
}
function toggleForm(){
	form.classList.toggle("hide");
	form.classList.toggle("show");
}
function toggleModel(){
	model.classList.toggle("hide");
	model.classList.toggle("show");
}
function createCellGrid(){
	for(let i=1 ; i<=9 ; i++){
		let cell = document.createElement("div");
		cell.className = "grid";
		cell.id = i;
		cell.addEventListener("click" ,addingText);
		gridContainer.append(cell);
	}
	message.textContent = `${player[0]}, you're up`;	
}
function addingText(e){
	if(!e.target.textContent && !isWinner){
		let id = Number(e.target.id);
		let col = (id-1)%3;
		let row = Math.floor((id-1)/3);
		if(turn){
			e.target.textContent = `x`;
			board[row][col] = 'x';
			(checkWinner(row,col)) ? message.textContent = `${player[0]} congratulations you won!`:
				message.textContent = `${player[1]}, you're up`;
		}else{
			e.target.textContent = `o`;
			board[row][col] = 'o';
			(checkWinner(row,col)) ? message.textContent = `${player[1]} congratulations you won!`:
				message.textContent = `${player[0]}, you're up`;
		}
		turn = !turn;
	}
}
function checkWinner(row,col){
	let winnerCell = getWinnerCell(row,col);
	if(winnerCell){
		for(let i of winnerCell){
			id = `${i}`;
			let cell = document.getElementById(id);
			cell.style.backgroundColor = "#66ff99";
		}
        isWinner = true;
		return true;
	}
	return false;	
}
function getWinnerCell(row,col){
	let winnerCell = 0;
	if(board[row][0] ===board[row][1] && board[row][1] ===board[row][2] ) {
		winnerCell = [(row*3)+1,(row*3)+2,(row*3)+3];
		return winnerCell;
	} 
	if(board[0][col] ===board[1][col] && board[0][col] ===board[2][col] ) {
		winnerCell = [col+1,(1*3)+col+1,(2*3)+col+1];
		return winnerCell;
	}
	
    if(col === row && (board[0][0] === board[1][1] && board[1][1] === board[2][2]))  {
        winnerCell = [1,5,9];
        return winnerCell;
    }
    if(col+row===2 && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
        winnerCell = [3,5,7];
        return winnerCell;
    }
	return null;
}
