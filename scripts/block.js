class Block {
  constructor(_offsetX, _offsetY, _color) {
    this.offsetX = _offsetX;
    this.offsetY = _offsetY;
    this.color = _color;
    this.posX = 0;
    this.posY = 0;
    this.isDead = false;
  }


  Draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, scale, scale);
  }

  Update() {
    if(!this.isDead)
    this.Draw();
  }

  AssignBodyPosition() {
    if(!this.isDead)
    table[this.posX / scale][this.posY / scale] = 1;
  }

  CollisionCheck(futurePosX, futurePosY) {
    if (table[futurePosX / scale][futurePosY / scale] == 1) {
      return true;
    }
    return false;
  }

};
