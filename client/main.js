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
var i, j;
var valSelec = ' ';
var lastI;
var lastJ;
var X;
var Y;
var movesTot;
var whiteTurn = true;
var kingCoord;
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
            moveValid = checkMove(lastI, lastJ, i, j);
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
    displayMoveArray = getMoves(x,y)
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            if (displayMoveArray[i][j] == 1 && emptyCell(i,j)){
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

function checkMove(x1, y1, x2, y2){
    val = boardState[x1][y1];
    moveValid = false
    if (val == 'p' || val =='P'){
        moves = Pawn(x1, y1);
    }
    if (val == 'n' || val =='N'){
        moves = Night(x1, y1);
    }
    if (val == 'b' || val =='B'){
        moves = Bishop(x1, y1);
    }
    if (val == 'r' || val =='R'){
        moves = Rook(x1, y1);
    }
    if (val == 'q' || val =='Q'){
        moves = Queen(x1, y1);
    }
    if (val == 'k' || val =='K'){
        moves = King(x1, y1);
    }
    if (moves[x2][y2] == 1){
        moveValid = true;
    }
    return moveValid;
};

function getMoves(x, y){
    val = boardState[x][y];
    if (val == 'p' || val =='P'){
        moves = Pawn(x, y);
    }
    if (val == 'n' || val =='N'){
        moves = Night(x, y);
    }
    if (val == 'b' || val =='B'){
        moves = Bishop(x, y);
    }
    if (val == 'r' || val =='R'){
        moves = Rook(x, y);
    }
    if (val == 'q' || val =='Q'){
        moves = Queen(x, y);
    }
    if (val == 'k' || val =='K'){
        moves = King(x, y);
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
    // Checks()
};

function emptyCell(x, y){
    if (boardState[x][y] == ' '){
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
function Pawn(x, y){
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
            if (emptyCell(x, y+1)){
                moveArray[x][y+1] = 1; 
            }
        }
        if (y == 1){
            if (emptyCell(x, y+2)){ 
                moveArray[x][y+2] = 1; 
            }
        }
        if (x+1 < 8 || y+1 < 8){
            if (!emptyCell(x+1,y+1)){
                moveArray[x+1][y+1] = 1; 
            }
        }
        if (x-1 > 0 || y+1 < 8){
            if (!emptyCell(x-1,y+1)){
                moveArray[x-1][y+1] = 1; 
            }
        }
    } 
    if (val == 'P'){
        if (y-1 > 0){
            if (emptyCell(x, y-1)){
                moveArray[x][y-1] = 1;
            }
        }
        if (y == 6){
            if (emptyCell(x, y-2)){
                moveArray[x][y-2] = 1; 
            }
        }
        if (x+1 < 8 && y-1 > 0){
            if (!emptyCell(x+1,y-1)){
                moveArray[x+1][y-1] = 1; 
            }
        }   
        if (x-1 > 0 && y-1 > 0){
            if (!emptyCell(x-1,y-1)){
                moveArray[x-1][y-1] = 1; 
            }
        }
    } 
    return moveArray;
}

function Night(x, y){
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
        moveArray[x+1][y+2]=1;
    }
    if (x+1<8 && y-2>-1){
        moveArray[x+1][y-2]=1;
    }
    if (x-1>-1 && y+2<8){
        moveArray[x-1][y+2]=1;
    }
    if (x-1>-1 && y-2>-1){
        moveArray[x-1][y-2]=1;
    }
    if (x+2<8 && y+1<8){
        moveArray[x+2][y+1]=1;
    }
    if (x+2<8 && y-1>-1){
        moveArray[x+2][y-1]=1;
    }
    if (x-2>-1 && y+1<8){
        moveArray[x-2][y+1]=1;
    }
    if (x-2>-1 && y-1>-1){
        moveArray[x-2][y-1]=1;
    }
    return moveArray;
}

function Bishop(x, y){
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
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y-i;
        if (X<0 || Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y-i;
        if (X>7 || Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y+i;
        if (X<0 || Y>7){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function Rook(x, y){
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
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y;
        if (X<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y-i;
        if (Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y+i;
        if (Y>7){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function Queen(x, y){
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
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y-i;    
        if (X<0 || Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y-i;
        if (X>7 || Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y+i;
        if (X<0 || Y>7){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x+i;
        Y = y;
        if (X>7){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    for (i=1; i<8; i++){
        X = x-i;
        Y = y;
        if (X<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
    }
    for (i=1; i<8; i++){
        X = x;
        Y = y-i;
        if (Y<0){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    moveArray[X][Y] = 1
    for (i=1; i<8; i++){
        X = x;
        Y = y+i;
        if (Y>7){
            break
        }
        if (!emptyCell(X,Y)){
            moveArray[X][Y] = 1            
            break
        }
        moveArray[X][Y] = 1
    }
    return moveArray;
}

function King(x, y){
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
    if (!emptyCell(x-1,y)){
        moveArray[x-1,y] = 1
    }
    if (!emptyCell(x-1,y+1)){
        moveArray[x-1,y+1] = 1
    }
    if (!emptyCell(x,y+1)){
        moveArray[x,y+1] = 1
    }
    if (!emptyCell(x+1,y+1)){
        moveArray[x+1,y+1] = 1
    }
    if (!emptyCell(x+1,y)){
        moveArray[x+1,y] = 1
    }
    if (!emptyCell(x+1,y-1)){
        moveArray[x+1,y-1] = 1
    }
    if (!emptyCell(x,y-1)){
        moveArray[x,y-1] = 1
    }
    if (!emptyCell(x-1,y-1)){
        moveArray[x-1,y-1] = 1
    }
    return moveArray;
}

function Checks(){
    // White 
    let movesTot = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];    
    // Calculate all moveArrays and combine
    if (whiteTurn){
        for (I=0; I<8; I++){
            for (J=0; J<8; J++){
                val = boardState[I][J]
                // SkIp cell if space or if not black
                if (val == ' '){
                    continue
                }
                // Store King coord for later
                if (val == 'k'){
                    kingCoord = [I,J]
                }
                if (pieceColour(val) != 'B'){
                    continue
                }
                moves = getMoves(I, J)
                movesTot += moves
            }
        }
    }
    // Set movesTot to be binary
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            if (movesTot[i][j] > 0){
                movesTot[i][j] = 1
            } else{
                movesTot[i][j] = 0
            }
        }
    }
    // Check for valid king moves and potential check mate
    kingMoves = getMoves(kingCoord[0], kingCoord[1])
    kingMoves[kingCoord[0]][kingCoord[1]] = 1
    kingMoves -= movesTot

    // Set kingMoves to be binary
    for (i=0; i<8; i++){
        for (j=0; j<8; j++){
            if (kingMoves[i][j] > 0){
                kingMoves[i][j] = 1
            } else{
                kingMoves[i][j] = 0
            }
        }
    }    
    if (kingMoves.reduce((a, b => a+b, 0) == 0)){
        console.log('CHECK M8, BLACK WINS!')
        return 'B'
    }

    // Look for checked spaces - restrict movement

}


NewGame();
