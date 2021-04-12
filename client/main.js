var ID_array = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"]
];
const initState = [
    ["r", " ", " ", " ", " ", " ", "P", "R"],
    ["n", " ", " ", " ", " ", " ", "P", "N"],
    ["b", " ", " ", " ", " ", " ", "P", "B"],
    ["q", " ", " ", " ", " ", " ", "P", "Q"],
    ["k", " ", " ", " ", " ", " ", "P", "K"],
    ["b", " ", " ", " ", " ", " ", "P", "B"],
    ["n", " ", " ", " ", " ", " ", "P", "N"],
    ["r", " ", " ", " ", " ", " ", "P", "R"]
];
var boardState = initState;
var board_in = [];
var board_out = [];
var i, j;
var valSelec = ' ';
var val;
var val_hold;
var lastI;
var lastJ;
var X;
var Y;
var movesTot;
var holdState = initState;
var mi;
var mj;
var moveListi = [];
var moveListj = [];
var whiteTurn = true;
var kingCoord = [0,0]
var displayMoveArray = [];
//&#9817
var PieceDict = {
    ' ' : ' ',
    'p' : ' ',
    'r' : '&#9814',
    'n' : '&#9816',
    'b' : '&#9815',
    'q' : '&#9813',
    'k' : '&#9812',
    'P' : '&#9823',
    'R' : '&#9820',
    'N' : '&#9822',
    'B' : '&#9821',
    'Q' : '&#9819',
    'K' : '&#9818'
};


function NewGame() {
    for (i=0; i<8; i++) {
        for (j=0; j<8; j++){
            document.getElementById(ID_array[i][j]).innerHTML = PieceDict[initState[i][j]];
            }
        }
};

function setCell(x, y, inputVal) {
    boardState[x][y] = inputVal;
    document.getElementById(ID_array[x][y]).innerHTML = PieceDict[inputVal];
};

function clickCell(i, j){
    valDest = boardState[i][j];
    if (valSelec == ' '){
        if (pieceColour(valDest) == 'W' && !whiteTurn){
            console.log("It's Black to move.");
            valDest = ' ';
            valSelec = ' ';
            return
        } 
        if (pieceColour(valDest) == 'B' && whiteTurn){
            console.log("It's White to move.");
            valDest = ' ';
            valSelec = ' ';
            return
        } 
    }

    if (pieceColour(valDest) == 'W' && whiteTurn){
        clearMoves()
        displayMoves(i,j)
    }
    if (pieceColour(valDest) == 'B' && !whiteTurn){
        clearMoves()
        displayMoves(i,j)
    }  

    if (valSelec != ' '){
        if (valDest == ' ' || validCap(valSelec, valDest)){
            moveValid = checkMove(boardState, lastI, lastJ, i, j);
            if (moveValid){
                movePiece(lastI, lastJ, i, j);
            }
            valDest = ' ';
            valSelec = ' ';
            clearMoves()
            return
        }
    }

    valSelec = valDest;
    lastI = i;
    lastJ = j;
};

function displayMoves(x,y){
    displayMoveArray = getMoves(boardState, x, y)
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            if (displayMoveArray[i][j] == 1 && boardState[i][j] == ' '){
                document.getElementById(ID_array[i][j]).innerHTML = '•' 
            }    
        }
    }   
}

function clearMoves(){
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            val = document.getElementById(ID_array[i][j]).innerHTML
            if (val == '•'){
                document.getElementById(ID_array[i][j]).innerHTML = ' ' 
            }    
        }
    }   
}

function checkMove(board, x1, y1, x2, y2){
    val = board[x1][y1];
    moveValid = false
    if (displayMoveArray[x2][y2] == 1){
        moveValid = true;
    }
    return moveValid;
};

function getMoves(board, x, y){
    moves = pieceMoves(board, x ,y)
    movesMod = checkChecks(x, y, moves)  
    return movesMod
}

function pieceMoves(board, x, y){
    val = board[x][y];
    if (val == 'p' || val =='P'){
        moves = Pawn(board, x, y);
    }
    if (val == 'n' || val =='N'){
        moves = Night(board, x, y);
    }
    if (val == 'b' || val =='B'){
        moves = Bishop(board, x, y);
    }
    if (val == 'r' || val =='R'){
        moves = Rook(board, x, y);
    }
    if (val == 'q' || val =='Q'){
        moves = Queen(board, x, y);
    }
    if (val == 'k' || val =='K'){
        moves = King(board, x, y);
    } 
    return moves
}

function movePiece(x1, y1, x2, y2){
    val = boardState[x1][y1];
    setCell(x1, y1, ' ');
    setCell(x2, y2, val);
    if (whiteTurn){
        whiteTurn = false;
    } else{
        whiteTurn = true;
    }
    mated = checkMate()
};

function emptyCell(board, x, y){
    if (board[x][y] == ' '){
        return true
    } else {
        return false
    }
};
function pieceColour(val){
    if (val=='r'||val=='n'||val=='b'||val=='q'||val=='k'||val=='p'){
        return 'W'
    } else if (val=='R'||val=='N'||val=='B'||val=='Q'||val=='K'||val=='P') {
        return 'B'
    } else {
        return ' '
    }
}
function validCap(v1,v2){
    if (pieceColour(v1) == 'W' && pieceColour(v2) == 'B'){
        return true
    } else if (pieceColour(v2) == 'W' && pieceColour(v1) == 'B'){
        return true
    } else {
        return false
    }
}
// DEFINED PIECE MOVEMENTS //
function Pawn(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (val == 'p'){
        if (y+1 < 8){
            if (emptyCell(board, x, y+1)){
                moveArray[x][y+1] = 1; 
            }
        }
        if (y == 1){
            if (emptyCell(board, x, y+2)){ 
                moveArray[x][y+2] = 1; 
            }
        }
        if (x+1 < 8 || y+1 < 8){
            if (validCap(board[x][y], board[x+1][y+1])){
                moveArray[x+1][y+1] = 1; 
            }
        }
        if (x-1 > 0 || y+1 < 8){
            if (validCap(board[x][y], board[x-2][y+1])){
                moveArray[x-1][y+1] = 1; 
            }
        }
    } 
    if (val == 'P'){
        if (y-1 > 0){
            if (emptyCell(board, x, y-1)){
                moveArray[x][y-1] = 1;
            }
        }
        if (y == 6){
            if (emptyCell(board, x, y-2)){
                moveArray[x][y-2] = 1; 
            }
        }
        if (x+1 < 8 && y-1 > 0){
            if (validCap(board[x][y], board[x+1][y-1])){
                moveArray[x+1][y-1] = 1; 
            }
        }   
        if (x-1 > 0 && y-1 > 0){
            if (validCap(board[x][y], board[x-1][y-1])){
                moveArray[x-1][y-1] = 1; 
            }
        }
    } 
    return moveArray;
}

function Night(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (x+1<8 && y+2<8){
        if (validCap(board[x][y], board[x+1][y+2]) || emptyCell(board, x+1, y+2)){
        moveArray[x+1][y+2]=1;
        }
    }
    if (x+1<8 && y-2>-1){
        if (validCap(board[x][y], board[x+1][y-2]) || emptyCell(board, x+1, y-2)){
        moveArray[x+1][y-2]=1;
        }
    }
    if (x-1>-1 && y+2<8){
        if (validCap(board[x][y], board[x-1][y+2]) || emptyCell(board, x-1, y+2)){
        moveArray[x-1][y+2]=1;
        }
    }
    if (x-1>-1 && y-2>-1){
        if (validCap(board[x][y], board[x-1][y-2]) || emptyCell(board, x-1, y-2)){
        moveArray[x-1][y-2]=1;
        }
    }
    if (x+2<8 && y+1<8){
        if (validCap(board[x][y], board[x+2][y+1]) || emptyCell(board, x+2, y+1)){
        moveArray[x+2][y+1]=1;
        }
    }
    if (x+2<8 && y-1>-1){
        if (validCap(board[x][y], board[x+2][y-1]) || emptyCell(board, x+2, y-1)){
        moveArray[x+2][y-1]=1;
        }
    }
    if (x-2>-1 && y+1<8){
        if (validCap(board[x][y], board[x-2][y+1]) || emptyCell(board, x-2, y+1)){
        moveArray[x-2][y+1]=1;
        }
    }
    if (x-2>-1 && y-1>-1){
        if (validCap(board[x][y], board[x-2][y-1]) || emptyCell(board, x-2, y-1)){
        moveArray[x-2][y-1]=1;
        }
    }
    return moveArray;
}

function Bishop(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (i=1; i<8; i++){
        X = x+i;
        Y = y+i;
        if (X>7 || Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y-i;
        if (X<0 || Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y-i;
        if (X>7 || Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y+i;
        if (X<0 || Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function Rook(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (i=1; i<8; i++){
        X = x+i;
        Y = y;
        if (X>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y;
        if (X<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y-i;
        if (Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y+i;
        if (Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function Queen(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (i=1; i<8; i++){
        X = x+i;
        Y = y+i;
        if (X>7 || Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y-i;    
        if (X<0 || Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y-i;
        if (X>7 || Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y+i;
        if (X<0 || Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y;
        if (X>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y;
        if (X<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y-i;
        if (Y<0){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y+i;
        if (Y>7){
            break
        }
        if (board[X][Y] != ' '){
            if (validCap(board[x][y], board[X][Y])){
                moveArray[X][Y] = 1            
                break
            } else{
                break
            }
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function King(board, x, y){
    let moveArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (x-1>-1){
        if (emptyCell(board, x-1,y)){
            moveArray[x-1][y] = 1
        }
        else if (validCap(board[x][y], board[x-1][y])){
            moveArray[x-1][y] = 1
        }
    }
    if (x-1>-1 && y+1<8){
        if (emptyCell(board, x-1,y+1)){
            moveArray[x-1][y+1] = 1
        }
        else if (validCap(board[x][y], board[x-1][y+1])){
            moveArray[x-1][y+1] = 1
        }
    }
    if (x+1<8){
        if (emptyCell(board, x,y+1)){
            moveArray[x][y+1] = 1
        }
        else if (validCap(board[x][y], board[x][y+1])){
            moveArray[x][y+1] = 1
        }
    }
    if (x+1<8 && y+1<8){
        if (emptyCell(board, x+1,y+1)){
            moveArray[x+1][y+1] = 1
        }
        else if (validCap(board[x][y], board[x+1][y+1])){
            moveArray[x+1][y+1] = 1
        }
    }
    if (x+1<8){
        if (emptyCell(board, x+1,y)){
            moveArray[x+1][y] = 1
        }
        else if (validCap(board[x][y], board[x+1][y])){
            moveArray[x+1][y] = 1
        }
    }
    if (x+1<8 && y-1>-1){
        if (emptyCell(board, x+1,y-1)){
            moveArray[x+1][y-1] = 1
        }
        else if (validCap(board[x][y], board[x+1][y-1])){
            moveArray[x+1][y-1] = 1
        }
    }
    if (y-1>-1){
        if (emptyCell(board, x,y-1)){
            moveArray[x][y-1] = 1
        }
        else if (validCap(board[x][y], board[x][y-1])){
            moveArray[x][y-1] = 1
        }
    }
    if (x-1>-1 && y-1>-1){
        if (emptyCell(board, x-1,y-1)){
            moveArray[x-1][y-1] = 1
        }
        else if (validCap(board[x][y], board[x-1][y-1])){
            moveArray[x-1][y-1] = 1
        }
    }
    return moveArray;
}

function testMove(board_in, x, y, mx, my){
    // board_out = board_in
    val_in = board_in[x][y]
    board_out = JSON.parse(JSON.stringify(board_in));   
    board_out[mx][my] = val_in
    board_out[x][y] = ' '
    return board_out
}

function getMoveListKing(moveArray){
    moveListi = []
    moveListj = []
    // Get list of moves and king coord
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            if (moveArray[i][j] == 1){
                moveListi.push(i)
                moveListj.push(j)
            }
            // Store King coord for later
            if (whiteTurn){
                if (boardState[i][j] == 'k'){
                    kingCoord = [i,j]
                }
            } else{
                if (boardState[i][j] == 'K'){
                    kingCoord = [i,j]
                }
            }
        }
    }
    return moveListi, moveListj, kingCoord
}

function checkChecks(x, y, moveArray){
    moveListi, moveListj, kingCoord = getMoveListKing(moveArray)
    // WHITE'S TURN
    if (whiteTurn){
        for (m=0; m<moveListi.length; m++){
            mi = moveListi[m]
            mj = moveListj[m]
            holdState = testMove(boardState, x, y, mi, mj)
            for (I=0; I<8; I++){
                for (J=0; J<8; J++){
                    val_hold = holdState[I][J]
                    // Skip cell if not black piece
                    if (pieceColour(val_hold) != 'B'){
                        continue
                    }
                    moves_hold = pieceMoves(holdState, I, J)
                    if (boardState[x][y] == 'k'){
                        if (moves_hold[mi][mj] == 1){
                            moveArray[mi][mj] = 0
                        }
                        continue
                    }
                    if (moves_hold[kingCoord[0]][kingCoord[1]] == 1){
                        moveArray[mi][mj] = 0
                        continue
                    }
                }
            }
        }
    // BLACK'S TURN
    } else{
        for (m=0; m<moveListi.length; m++){
            mi = moveListi[m]
            mj = moveListj[m]
            holdState = testMove(boardState, x, y, mi, mj)
            for (I=0; I<8; I++){
                for (J=0; J<8; J++){
                    val_hold = holdState[I][J]
                    // Skip cell if not white piece
                    if (pieceColour(val_hold) != 'W'){
                        continue
                    }
                    moves_hold = pieceMoves(holdState, I, J)
                    if (boardState[x][y] == 'K'){
                        if (moves_hold[mi][mj] == 1){
                            moveArray[mi][mj] = 0
                        }
                        continue
                    }
                    if (moves_hold[kingCoord[0]][kingCoord[1]] == 1){
                        moveArray[mi][mj] = 0
                        continue
                    }
                }
            }
        }
    }
    
    return moveArray
}

function checkMate(){
    kingCheck = false
    // WHITES TURN
    // Check for any legal move
    if (whiteTurn){
        for (X_ck=0; X_ck<8; X_ck++){
            for (Y_ck=0; Y_ck<8; Y_ck++){
                // Skip cell if space
                if (pieceColour(boardState[X_ck][Y_ck]) == ' '){
                    continue
                }
                // if White, check for a legal move
                if (pieceColour(boardState[X_ck][Y_ck]) == 'W'){
                    moves = getMoves(boardState, X_ck, Y_ck)
                    moveListi, moveListj, kingCoord  = getMoveListKing(moves)
                    // If a legal move is found, no checkmate - return 'N'
                    if (moveListi.length == 0){
                        continue
                    }
                    return 'N'
                    
                }
                // if Black, check if king is in check
                if (pieceColour(boardState[X_ck][Y_ck]) == 'B'){
                    moves = pieceMoves(boardState, X_ck, Y_ck)
                    if (moves[kingCoord[0]][kingCoord[1]] == 1){
                        kingCheck = true
                    }
                }
            }
        }
    }
    else {
        for (X_ck=0; X_ck<8; X_ck++){
            for (Y_ck=0; Y_ck<8; Y_ck++){
                // Skip cell if space
                if (pieceColour(boardState[X_ck][Y_ck]) == ' '){
                    continue
                }
                // if White, check for a legal move
                if (pieceColour(boardState[X_ck][Y_ck]) == 'B'){
                    moves = getMoves(boardState, X_ck, Y_ck)
                    moveListi, moveListj, kingCoord  = getMoveListKing(moves)
                    // If a legal move is found, no checkmate - return 'N'
                    if (moveListi.length == 0){
                        continue
                    }
                    return 'N'
                    
                }
                // if Black, check if king is in check
                if (pieceColour(boardState[X_ck][Y_ck]) == 'W'){
                    moves = pieceMoves(boardState, X_ck, Y_ck)
                    if (moves[kingCoord[0]][kingCoord[1]] == 1){
                        kingCheck = true
                    }
                }
            }
        }
    }
    if (kingCheck){
        console.log('Checkmate!')
        return 'Y'
    }
    console.log('Stalemate lmao')
    return 'S'
}

NewGame();
