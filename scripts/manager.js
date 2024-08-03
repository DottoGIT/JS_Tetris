const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 40;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const table = new Array(10);
var fallTickCONST = 100;
var playable = false;
var createNewPiece = false;
var pieceLifeTime = 0;

var score = 0;
var level = 1;
var fallTick = fallTickCONST;
var ticktock = 0;
var piece;
var deadPieces = [];

(function setup() {

  for (var i = 0; i < 10; i++) {
    table[i] = new Array(20);
    for (var j = 0; j < 20; j++) {
      table[i][j] = 0;
    }
    table[i][20] = 1;
  }

  CreateRandomPiece();

  window.setInterval(() => {

    if(playable)
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (createNewPiece == true) {
        deadPieces.push(piece);
        CreateRandomPiece();
        createNewPiece = false;

          if(pieceLifeTime < 10)
          {
            GameOver();
          }
        pieceLifeTime = 0;
      }


      RefreshTableValues();

      for (var i = 0; i < this.deadPieces.length; i++) {
        this.deadPieces[i].DeadUpdate();

      }

      piece.Update();
      CheckForDestruction();


      ticktock += 1;
      if (ticktock >= fallTick) {
        piece.Fall();
        piece.Update();
        ticktock = 0;
      }

      pieceLifeTime++;

    }
  }, 10);

}());

window.addEventListener('keydown', ((evt) => {

  const direction = evt.key.replace('Arrow', '');
  if (direction == 'Down') {
    fallTick = fallTickCONST / 20;
  }
}));

window.addEventListener('keyup', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  if (direction == 'Right') {
    piece.futurePosX += scale;
  } else if (direction == 'Left') {
    piece.futurePosX -= scale;
  }

  if (direction == "Up") {
    RotatePiece();
  }

  if (direction == 'Down') {
    fallTick = fallTickCONST;
  }
}));

function CheckForDestruction() {
  for (var j = 0; j < 20; j++)
  {
    var destroyAfterLoop = true;

    for (var i = 0; i < 10; i++) {
      if (table[i][j] == 0)
      {
        destroyAfterLoop = false;
      }
    }

    if (destroyAfterLoop) {
      DestroyRow(j);
      AddPoints();
      UpdateScoreAndLevel();
    }
  }
}

function StartGame(){
  playable = true;
  var div = document.getElementById('startScreen');
  div.style.opacity="0";
  score = 0;
  level = 1;
  this.deadPieces = [];
  RefreshTableValues();
  createNewPiece = false;
  CreateRandomPiece();
  UpdateScoreAndLevel();
}

function SaveScore(){

}

function GameOver(){
    playable = false;
    var div = document.getElementById('startScreen');
    div.style.opacity="1";
    document.querySelector('#scoreText').textContent ="Wynik: " + score;
}

function UpdateHeighScoreTable(){

}


function AddPoints(){
  score+=1000;
}


function UpdateScoreAndLevel(){
  document.querySelector('#score').textContent = score;
  level = Math.ceil(score / 2999);
  if(level == 0) level = 1;
  document.querySelector('#level').textContent = level;
  if(level <= 8)
    fallTickCONST = 100 - level*10;
  else if(level < 15)
    fallTickCONST-=2;


  fallTick = fallTickCONST;
}

function DestroyRow(RowIndex) {
for (var i = 0; i < 10; i++)
  table[i][RowIndex] = 0;

  for (var i = 0; i < deadPieces.length; i++) {
    for (var j = 0; j < deadPieces[i].myBlocks.length; j++) {
      if (deadPieces[i].oldPosY + deadPieces[i].myBlocks[j].offsetY == RowIndex * scale) {
        deadPieces[i].myBlocks[j].isDead = true;
      }
      else if (deadPieces[i].oldPosY + deadPieces[i].myBlocks[j].offsetY < RowIndex * scale) {
        deadPieces[i].myBlocks[j].offsetY += scale;

      }
    }
  }
}

function RefreshTableValues() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 20; j++) {
      table[i][j] = 0;
    }
    table[i][20] = 1;
  }
}

function RotatePiece() {

  if (piece.isSmash) {
    return;
  }

  if (piece.isHero) {

    for (var i = 0; i < 4; i++) {
      if (piece.myBlocks[i].offsetY == 0) {
        if (piece.myBlocks[i].offsetX == 0) {
          piece.myBlocks[i].offsetX = 3 * scale;
          piece.myBlocks[i].offsetY = 0;
          continue;
        } else if (piece.myBlocks[i].offsetX == scale) {
          piece.myBlocks[i].offsetX = 3 * scale;
          piece.myBlocks[i].offsetY = scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 2 * scale) {
          piece.myBlocks[i].offsetX = 3 * scale;
          piece.myBlocks[i].offsetY = 2 * scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 3 * scale) {
          piece.myBlocks[i].offsetX = 3 * scale;
          piece.myBlocks[i].offsetY = 3 * scale;
          continue;
        }
      } else if (piece.myBlocks[i].offsetY == scale) {
        if (piece.myBlocks[i].offsetX == 0) {
          piece.myBlocks[i].offsetX = 2 * scale;
          piece.myBlocks[i].offsetY = 0;
          continue;
        } else if (piece.myBlocks[i].offsetX == scale) {
          piece.myBlocks[i].offsetX = 2 * scale;
          piece.myBlocks[i].offsetY = scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 2 * scale) {
          piece.myBlocks[i].offsetX = 2 * scale;
          piece.myBlocks[i].offsetY = 2 * scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 3 * scale) {
          piece.myBlocks[i].offsetX = 2 * scale;
          piece.myBlocks[i].offsetY = 3 * scale;
          continue;
        }
      } else if (piece.myBlocks[i].offsetY == 2 * scale) {
        if (piece.myBlocks[i].offsetX == 0) {
          piece.myBlocks[i].offsetX = scale;
          piece.myBlocks[i].offsetY = 0;
          continue;
        } else if (piece.myBlocks[i].offsetX == scale) {
          piece.myBlocks[i].offsetX = scale;
          piece.myBlocks[i].offsetY = scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 2 * scale) {
          piece.myBlocks[i].offsetX = scale;
          piece.myBlocks[i].offsetY = 2 * scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 3 * scale) {
          piece.myBlocks[i].offsetX = scale;
          piece.myBlocks[i].offsetY = 3 * scale;
          continue;
        }
      } else if (piece.myBlocks[i].offsetY == 3 * scale) {
        if (piece.myBlocks[i].offsetX == 0) {
          piece.myBlocks[i].offsetX = 0;
          piece.myBlocks[i].offsetY = 0;
          continue;
        } else if (piece.myBlocks[i].offsetX == scale) {
          piece.myBlocks[i].offsetX = 0;
          piece.myBlocks[i].offsetY = scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 2 * scale) {
          piece.myBlocks[i].offsetX = 0;
          piece.myBlocks[i].offsetY = 2 * scale;
          continue;
        } else if (piece.myBlocks[i].offsetX == 3 * scale) {
          piece.myBlocks[i].offsetX = 0;
          piece.myBlocks[i].offsetY = 3 * scale;
          continue;
        }
      }
    }
    return;
  }

  for (var i = 0; i < 4; i++) {
    if (piece.myBlocks[i].offsetY == 0) {
      if (piece.myBlocks[i].offsetX == 0) {
        piece.myBlocks[i].offsetX = 2 * scale;
        continue;
      } else if (piece.myBlocks[i].offsetX == scale) {

        piece.myBlocks[i].offsetX = 2 * scale;
        piece.myBlocks[i].offsetY = scale;
        continue;
      } else if (piece.myBlocks[i].offsetX == 2 * scale) {

        piece.myBlocks[i].offsetX = 2 * scale;
        piece.myBlocks[i].offsetY = 2 * scale;
        continue;
      }
    } else if (piece.myBlocks[i].offsetY == scale) {
      if (piece.myBlocks[i].offsetX == 0) {
        piece.myBlocks[i].offsetX = scale;
        piece.myBlocks[i].offsetY = 0;
        continue;
      } else if (piece.myBlocks[i].offsetX == scale) {
        continue;
      } else if (piece.myBlocks[i].offsetX == 2 * scale) {

        piece.myBlocks[i].offsetX = scale;
        piece.myBlocks[i].offsetY = 2 * scale;
        continue;
      }

    } else if (piece.myBlocks[i].offsetY == 2 * scale) {
      if (piece.myBlocks[i].offsetX == 0) {
        piece.myBlocks[i].offsetY = 0;
        continue;
      } else if (piece.myBlocks[i].offsetX == scale) {
        piece.myBlocks[i].offsetX = 0;
        piece.myBlocks[i].offsetY = scale;
        continue;
      } else if (piece.myBlocks[i].offsetX == 2 * scale) {
        piece.myBlocks[i].offsetX = 0;
        piece.myBlocks[i].offsetY = 2 * scale;
        continue;
      }
    }
  }
}

function CreateRandomPiece() {

  switch (Math.floor(Math.random() * 7) + 1) {
    case 1:
      piece = CreateTeewee();
      break;
    case 2:
      piece = CreateOrangeRicky();
      break;
    case 3:
      piece = CreateBlueRicky();
      break;
    case 4:
      piece = CreateHero();
      piece.isHero = true;
      break;
    case 5:
      piece = CreateClaveland();
      break;
    case 6:
      piece = CreateRhode();
      break;
    case 7:
      piece = CreateSmashBoy();
      piece.isSmash = true;
      break;
  }
}

function CreateTeewee() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(scale, 0, "#FF006E");
  _piece.myBlocks[1] = new Block(0, scale, "#FF006E");
  _piece.myBlocks[2] = new Block(scale, scale, "#FF006E");
  _piece.myBlocks[3] = new Block(scale * 2, scale, "#FF006E");
  return _piece;
}

function CreateOrangeRicky() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(scale * 2, 0, "#F87060");
  _piece.myBlocks[1] = new Block(0, scale, "#F87060");
  _piece.myBlocks[2] = new Block(scale, scale, "#F87060");
  _piece.myBlocks[3] = new Block(scale * 2, scale, "#F87060");
  return _piece;
}

function CreateBlueRicky() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(0, 0, "#072AC8");
  _piece.myBlocks[1] = new Block(0, scale, "#072AC8");
  _piece.myBlocks[2] = new Block(scale, scale, "#072AC8");
  _piece.myBlocks[3] = new Block(scale * 2, scale, "#072AC8");
  return _piece;
}

function CreateHero() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(0, scale, "#76BED0");
  _piece.myBlocks[1] = new Block(scale, scale, "#76BED0");
  _piece.myBlocks[2] = new Block(scale * 2, scale, "#76BED0");
  _piece.myBlocks[3] = new Block(scale * 3, scale, "#76BED0");
  return _piece;
}

function CreateClaveland() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(0, 0, "#F00000");
  _piece.myBlocks[1] = new Block(scale, 0, "#F00000");
  _piece.myBlocks[2] = new Block(scale, scale, "#F00000");
  _piece.myBlocks[3] = new Block(scale * 2, scale, "#F00000");
  return _piece;
}

function CreateRhode() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(scale, 0, "#00FF00");
  _piece.myBlocks[1] = new Block(scale * 2, 0, "#00FF00");
  _piece.myBlocks[2] = new Block(0, scale, "#00FF00");
  _piece.myBlocks[3] = new Block(scale, scale, "#00FF00");
  return _piece;
}

function CreateSmashBoy() {
  var _piece = new Piece(scale * 3, 0, 4);
  _piece.myBlocks[0] = new Block(0, 0, "#FFFF00");
  _piece.myBlocks[1] = new Block(scale, 0, "#FFFF00");
  _piece.myBlocks[2] = new Block(0, scale, "#FFFF00");
  _piece.myBlocks[3] = new Block(scale, scale, "#FFFF00");
  return _piece;
}
