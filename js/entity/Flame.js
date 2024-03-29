class Flame {

  constructor(xG, yG, date, flameType, color) {
    this.cell = new Forecell(xG, yG, 'flame');
    this.date = date;
    this.expired = false;
    this.cooldown = 700;//temps d'expiration en ms

    flameType = this.checkDestruction(xG, yG, flameType);

    // this.cell.$elmt.addClass('flame--'+color);
    this.cell.$elmt.addClass(flameType);
    if(flameType!='item' && flameType!='block'){
      this.animation = new MyAnimation(this.cell.$elmt, 'terrain.png', 700/12, [0, 1, 2, 3, 4, 3, 4, 3, 4, 3, 2, 1, 0], false);
    }else{
      this.animation = new MyAnimation(this.cell.$elmt, 'terrain.png', 700/4, [0, 1, 2, 3, 4], false);
    }
    this.animation.startAnimation();
    // this.color = color;
    // console.log("j'y passe");

  }

  update(){
    // console.log("bijour");
  }

  shouldExpire(){
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    let now = new Date().getTime();
    return (!this.expired && now >= this.date+this.cooldown);
  }

  expire(){
    this.expired = true;
    this.cell.$elmt.remove();//supprimer du dom
  }

  checkDestruction(xG, yG, flameType){
    let tmpBlock = map.getCellAt(xG, yG);
    let typeWithoutSubype = tmpBlock._type.split("_")[0];

    switch (typeWithoutSubype) {
      case 'block':
        flameType = 'block';
        map.replaceSingleTypeOfCells([xG, yG], 'item_bombUp');
        tmpBlock.animation = new MyAnimation(tmpBlock.$elmt, 'items.png', 100, [0, 1]);
        tmpBlock.animation.startAnimation();
        break;

      case 'item':
        flameType = 'item';
        debugger;
        map.replaceSingleTypeOfCells([xG, yG], 'empty');
        break;
      default:
    }

    let mobs = map.getMobsAt(xG, yG);
    if(mobs.length>0){
      for (mob of mobs) {
        mob.die();
      }
    }

    return flameType;
  }


}
