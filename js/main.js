//TODO réorganiser tout ça pour update que les positions dans les modèles
//et afficher tout seulement dans la map ou le dom qui affiche la map plutôt

const fps = 60;
const fpsLow = 25;
const gridWidth = 14;
const gridHeight = 14;

const gameSize = getUsableHeight(gridHeight);
const TILE_SIZE = gameSize/gridHeight;

let map = new Map($('.map'), gridWidth, gridHeight);
// map.constructCells();

let dom = new Dom();


dom.createMapDom(map.cells, gridWidth, gridHeight, gameSize);

map.replaceTypeOfCells(map.cellsWall, 'wall');
map.replaceTypeOfCells(map.cellsBlock, 'block');
let mobs = map.createForecellMobs(map.initMobs);

let players = [];
players.push(new Player(5, 10, TILE_SIZE));



function gameUpdate(){
  // debugger;
  for (player of players) {
    player.update();
    player.updateTheirBombs();
    player.updateTheirFlames();
  }
  for (mob of mobs) {
    mob.update();
    console.log(mob.cell.grid);
  }
  // for (bomb of bombs){
  //   bomb.update();
  // }

  gameDraw();
}

function gameDraw(){
  for (player of players) {
    player.display();
  }

  for (mob of mobs) {
    mob.display();
  }
  // for (bomb of bombs){
  //   bomb.display();
  // }
  IHMDebug(players[0], map);
}

setInterval(gameUpdate, 20);
// gameUpdate();
