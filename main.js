function drawWall(e) {
  target_grid_box = e.target;
  if (mouse_clicked) {
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
}

function makeRows(rows, cols) {
  const grid_container = document.getElementById("path-grid");
  // Setting display:grid number of rows and columns
  grid_container.style.setProperty("--grid-rows", rows);
  grid_container.style.setProperty("--grid-cols", cols);

  for (let c = 0; c < rows * cols; c++) {
    const grid_box = document.createElement("div");
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
    grid_container.appendChild(grid_box);
  }
}

const GRID_ROWS = 20;
const GRID_COLUMNS = 40;
let mouse_clicked = false;

makeRows(GRID_ROWS, GRID_COLUMNS);
