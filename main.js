class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    // A* Algorithm Scores
    this.f_score = null;
    this.g_score = null;
    this.h_score = null;
    // Cell properties
    this.is_wall = false;
    this.is_start_end = false;
  }

  toggleWallNode(target_grid_box) {
    if (this.is_start_end) return;

    if (this.is_wall) {
      target_grid_box.className = target_grid_box.className.replace(
        "wall-node",
        ""
      );
      this.is_wall = false;
      target_grid_box.className += "grid-item";
    } else {
      target_grid_box.className = "wall-node";
      this.is_wall = true;
    }
  }

  toggleStartNode(target_grid_box) {
    if (target_grid_box.id == start_node) {
      start_node = null;
      target_grid_box.style.backgroundColor = "";
      this.is_start_end = true;
      return;
    }
    start_node = target_grid_box.id;
    target_grid_box.style.backgroundColor = "green"; // TODO Change to start img icon
    this.is_start_end = false;
  }

  toggleEndNode(target_grid_box) {
    if (target_grid_box.id == end_node) {
      end_node = null;
      target_grid_box.style.backgroundColor = "";
      this.is_start_end = true;
      return;
    }
    end_node = target_grid_box.id;
    target_grid_box.style.backgroundColor = "red"; // TODO Change to end img icon
    this.is_start_end = false;
  }
}

function appendGridArrayNode(grid_array, row, column) {
  if (grid_array.length - 1 < row) {
    grid_array.push([]);
  }
  const row_array = grid_array[row];
  const node = new Node(row, column);
  row_array.push(node);
}

function drawWall(e) {
  const target_grid_box = e.target;
  const cell_row = target_grid_box.id.split("_")[1];
  const cell_col = target_grid_box.id.split("_")[2];
  const selected_node = grid_array[cell_row][cell_col];

  // Preventing changes to board if mouse not clicked or if search started
  if (!mouse_clicked || pathfinder_started) return;

  // Handling start and end nodes
  if (!start_node || target_grid_box.id == start_node) {
    selected_node.toggleStartNode(target_grid_box);
    return;
  }
  if (!end_node || target_grid_box.id == end_node) {
    selected_node.toggleEndNode(target_grid_box);
    return;
  }

  // Making toggling wall node on target node
  selected_node.toggleWallNode(target_grid_box);
}

function makeRows(rows, cols) {
  let grid_array = [[]];
  const grid_container = document.getElementById("path-grid");
  // Setting display:grid number of rows and columns
  grid_container.style.setProperty("--grid-rows", rows);
  grid_container.style.setProperty("--grid-cols", cols);

  for (let c = 0; c < rows * cols; c++) {
    const grid_box = document.createElement("div");
    // Calculating cell row and column to create ID
    const cell_row = Math.floor(c / cols);
    const cell_column = c % cols;
    const grid_box_id = `cell_${cell_row}_${cell_column}`;

    // Creating grid array
    appendGridArrayNode(grid_array, cell_row, cell_column);

    // Adding event listeners for drawing capability
    grid_box.addEventListener("mousedown", function (e) {
      mouse_clicked = true;
      drawWall(e);
    });
    grid_box.addEventListener("mouseup", function () {
      mouse_clicked = false;
    });
    // To allow drag and draw
    grid_box.addEventListener("mouseenter", drawWall);

    // Adding grid class so that a grid is drawn
    grid_box.className = "grid-item";
    // Setting grid cell ID so that div can be linked to node object
    grid_box.setAttribute("id", grid_box_id);
    grid_container.appendChild(grid_box);
  }

  return grid_array;
}

function triggerSearch() {
  const startSearchButton = document.getElementById("start-visualizer");
  startSearchButton.onclick = function (event) {
    console.log("Search started!");
    pathfinder_started = true;
  };
}

function resetBoard() {
  const clearBoardButton = document.getElementById("clear-board");
  const board = document.getElementById("path-grid");

  // Reset board
  clearBoardButton.onclick = function (event) {
    // Prevent clearing board when search started
    if (pathfinder_started) return;

    // Remove drawn path
    board.innerHTML = "";
    // Reset variables
    mouse_clicked = false;
    start_node = null;
    end_node = null;
    // Recreate grid
    grid_array = makeRows(GRID_ROWS, GRID_COLUMNS);

    console.log("Board cleared!");
  };
}

const GRID_ROWS = 20;
const GRID_COLUMNS = 40;
let mouse_clicked = false;

let start_node = null;
let end_node = null;

let pathfinder_started = false; // TODO Needs to be reset when pathfinder search is done
let grid_array = makeRows(GRID_ROWS, GRID_COLUMNS);

triggerSearch();
resetBoard();
