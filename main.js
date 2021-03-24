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

function drawWall(e) {
  target_grid_box = e.target;
  if (!mouse_clicked) return;

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
  const grid_container = document.getElementById("path-grid");
  // Setting display:grid number of rows and columns
  grid_container.style.setProperty("--grid-rows", rows);
  grid_container.style.setProperty("--grid-cols", cols);

  for (let c = 1; c <= rows * cols; c++) {
    const grid_box = document.createElement("div");
    const grid_box_id = "grid_cell_" + c;
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
}

const GRID_ROWS = 20;
const GRID_COLUMNS = 40;
let mouse_clicked = false;
let start_node = null;
let end_node = null;

makeRows(GRID_ROWS, GRID_COLUMNS);
