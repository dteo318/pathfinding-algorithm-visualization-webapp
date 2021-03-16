function makeRows(rows, cols) {
  const grid_container = document.getElementById("path-grid");
  grid_container.style.setProperty("--grid-rows", rows);
  grid_container.style.setProperty("--grid-cols", cols);
  for (let c = 0; c < rows * cols; c++) {
    let grid_box = document.createElement("div");
    grid_container.appendChild(grid_box).className = "grid-item";
  }
}

const GRID_ROWS = 31;
const GRID_COLUMNS = 40;

makeRows(GRID_ROWS, GRID_COLUMNS);
