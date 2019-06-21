const DB_MAP = 1;

class Map {
  constructor($map, gridWidth, gridHeight) {
    this.$element = $map;
    this.height = this.$element.css('max-height');
    this.width = this.$element.css('max-height');
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cellSize = Math.round(this.$element.find('.cell').css('height').replace('px',''));//px
    this.cells = [];
    this.constructCells();
    this.cellsBlock = [[10, 12], [4, 5], [8, 4], [6,9], [10,7], [4,1], [11,1], [2,10]];
    this.replaceTypeOfCells(this.cellsBlock, 'block');
  }

  constructCells(){
    let cellsDom = $('.cell').toArray();
    // console.log($cellsDom.toArray());
    for (let y=0 ; y<gridHeight ; y++) {
      let tmpTabAllY = [];
      for (let x=0; x<gridWidth; x++) {
        let elmt = cellsDom[x*this.gridWidth+y]
        let tmpCell = new Cell($(elmt), this.cellSize);
        tmpTabAllY.push(tmpCell);
        // C'EST QU'UN TABLEAU ET PAS UN TABLEAU DE TABLEAU
        // let tmpCell = new Cell($(elmt), this.cellSize);
      }
      this.cells.push(tmpTabAllY);
    }
  }

  getCellAt(x, y){
    // console.log("get cell at", this.cells, x, y);
    return this.cells[x][y];
  }

  replaceTypeOfCells(cellsPos, type){
    for (let pos of cellsPos) {
      this.cells[pos[0]][pos[1]].changeType(type);
    }
  }

  static posToGridPos(x, y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));

    // let remainX = (x-Math.floor(x/sizeCell))%sizeCell;
    // let remainY = (y-Math.floor(y/sizeCell))%sizeCell;
    // let gridX = Math.floor( (x-remainX)/(sizeCell+1) );
    // let gridY = Math.floor( (y-remainY)/(sizeCell+1) );
    let gridX = Math.floor( x/sizeCell );
    let gridY = Math.floor( y/sizeCell );

    // console.log(`ALLO. y=[${y}], cellSize=[${sizeCell}], remainY=[${remainY}], gridY=[${gridY}]`);
    // if(DB_MAP) console.log(`DBMAP y=[${y}], x=[${x}], cellSize=[${sizeCell}], remainY=[${remainY}], gridY=[${gridY}], gridX=[${gridX}]`);
    return [gridX, gridY];
  }

  static closestCol(x){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(x%sizeCell<sizeCell/2){
      return 'LEFT';
    }else{
      return 'RIGHT';
    }
  }

  static closestLine(y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(y%sizeCell<sizeCell/2){
      return 'UP';
    }else{
      return 'DOWN';
    }
  }

  static offsetToBeOnALine(y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    let offset = y%sizeCell;
    if(this.closestLine(y)==UP){
      offset *=(-1);
    }
    return offset;
    // mettre plutôt return offset pixel
    // console.log("next is in testing on line !");
    // return this.offsetToBeOnACol(y);//puisque sizeCellHeight==sizeCell==sizeCellWidth
  }
  static offsetToBeOnACol(x){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    let offset = x%sizeCell;
    if(this.closestCol(x)==LEFT){
      offset *=(-1);
    }
    return offset;
  }

  getCellSize(){
    return this.cellSize;
  }

  static innerDistanceBweenCells(cell1, cell2){
    // cell.pos, .width
    // TODO elle pue de ouf cell1 est prise depuis son centre mais pas cell2
    console.log(cell1, cell2);
    console.log("=> distance =", (Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2));
    return (Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2);
  }
}
