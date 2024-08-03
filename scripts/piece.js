class Piece {
  constructor(_x, _y, blockNum) {
    this.futurePosX = _x;
    this.futurePosY = _y;
    this.myBlocks = new Array(blockNum);
    this.oldPosX = _x;
    this.oldPosY = _y;
    this.isActive = true;
    this.rotNum = 0;
    this.isSmash = false;
    this.isHero = false;
  }



  Update() {
    for (var i = 0; i < this.myBlocks.length; i++) {
      if (this.myBlocks[i].CollisionCheck(this.futurePosX + this.myBlocks[i].offsetX, this.futurePosY + this.myBlocks[i].offsetY) == true) {
        createNewPiece = true;
        return;
      }
    }

    this.oldPosX = this.futurePosX;
    this.oldPosY = this.futurePosY;

    this.UpdateBlocks();
  }

  DeadUpdate() {
    for (var i = 0; i < this.myBlocks.length; i++) {
      this.myBlocks[i].posX = this.oldPosX + this.myBlocks[i].offsetX;
      this.myBlocks[i].posY = this.oldPosY + this.myBlocks[i].offsetY;
      this.myBlocks[i].AssignBodyPosition();
      this.myBlocks[i].Update();
    }

  }

  Fall() {
    this.futurePosY += scale;
  }


  UpdateBlocks() {
    for (var i = 0; i < this.myBlocks.length; i++) {
      this.myBlocks[i].posX = this.oldPosX + this.myBlocks[i].offsetX;
      this.myBlocks[i].posY = this.oldPosY + this.myBlocks[i].offsetY;
      this.myBlocks[i].Update();
    }
  }

}
