//thanks to Daniel Shiffman on YouTube for the help

/*
Make the initial cell the current cell and mark it as visited
While there are unvisited cells
  If the current cell has any neighbours which have not been visited
    Choose randomly one of the unvisited neighbours
    Push the current cell to the stack
    Remove the wall between the current cell and the chosen cell
    Make the chosen cell the current cell and mark it as visited
  Else if stack is not empty
    Pop a cell from the stack
    Make it the current cell
*/

var cols, rows;
var w = 25;
var grid = [];

var current;
var stack = [];

function setup() {
  createCanvas(401, 401);
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(10);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  //STEP 1
  var next = current.checkNeighbors();
  if (next) {
    current.highlight();
    next.visited = true;
    //STEP 2
    stack.push(current);
    //STEP 3
    removeWalls(current, next);
    //STEP 4
    current = next;
  } else if (stack.length > 0) {
    current.highlight();
    current = stack.pop();
  } else {
    grid[0].walls[3] = false;
    grid[grid.length - 1].walls[1] = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1
  }
  return (i + (j * cols));
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
