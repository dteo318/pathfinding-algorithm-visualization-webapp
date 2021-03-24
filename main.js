function toggleStartNode(target_node) {
  if (target_node.id == start_node) {
    start_node = null;
    target_grid_box.style.backgroundColor = "";
    return;
  }
  start_node = target_node.id;
  target_node.style.backgroundColor = "green"; // TODO Change to start img icon
}

function toggleEndNode(target_node) {
  if (target_node.id == end_node) {
    end_node = null;
    target_grid_box.style.backgroundColor = "";
    return;
  }
  end_node = target_node.id;
  target_node.style.backgroundColor = "red"; // TODO Change to end img icon
}

function appendGridArrayNode(grid_array, current_row_num) {
  if (grid_array.length - 1 < current_row_num) {
    grid_array.push([]);
  }
  const current_row = grid_array[current_row_num];
  current_row.push(0);
}

function drawWall(e) {
  const target_grid_box = e.target;
  const cell_row = target_grid_box.id.split("_")[1];
  const cell_col = target_grid_box.id.split("_")[2];
  if (!mouse_clicked) return;

  grid_array[cell_row][cell_col] = 1;

  // Handling start and end nodes
  if (!start_node || target_grid_box.id == start_node) {
    toggleStartNode(target_grid_box);
    return;
  }
  if (!end_node || target_grid_box.id == end_node) {
    toggleEndNode(target_grid_box);
    return;
  }

  // Making toggling wall node on target node
  if (target_grid_box.className.includes("wall-node")) {
    target_grid_box.className = target_grid_box.className.replace(
      "wall-node",
      ""
    );
    target_grid_box.className += "grid-item";
  } else {
    target_grid_box.className = "wall-node";
  }
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
    appendGridArrayNode(grid_array, cell_row);

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

const GRID_ROWS = 20;
const GRID_COLUMNS = 40;
let mouse_clicked = false;

let start_node = null;
let end_node = null;

let grid_array = makeRows(GRID_ROWS, GRID_COLUMNS);
