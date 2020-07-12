const NROWS_DEFAULT = 25;
const GRID_WIDTH = Math.min(window.innerHeight, window.innerWidth) * 0.8;;
const GRID_HEIGHT = GRID_WIDTH;

// Default draw mode, just darken the pixel fully
function darkenImmediately(event) {
    event.target.classList.add('active');
    event.target.style.opacity = 1;
}


// Increases the pixel opacity by 0.1
function darkenGradually(event) {
    event.target.classList.add('active');
    let alpha = Number(event.target.style.opacity);
    event.target.style.opacity = Math.min(alpha + 0.1, 1);
}

// Sets the pixel to a random color
function randomRGB(event) {
    if (!event.target.classList.contains("active")){
        darkenImmediately(event);
        const [red, green, blue] = [0, 0, 0].map(x => Math.floor(Math.random() * 256));
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        console.log(event.target.style.backgroundColor)
    }
}



function newRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
}


function newTile(width, height = false, drawFunction) {
    height = height || width;
    const tile = document.createElement('div');
    tile.style.width = `${width}px`;
    tile.style.height = `${height}px`;
    tile.classList.add('tile');
    tile.addEventListener("mouseout", drawFunction);
    return tile;
}


function newGrid(nrows = NROWS_DEFAULT, ncols = false, drawFunction = darkenImmediately) {
    ncols = ncols || nrows;
    GRID_DIV.style.gridTemplateColumns = `repeat(${ncols}, 1fr)`;
    GRID_DIV.style.width = `${GRID_WIDTH}px`;
    GRID_DIV.style.height = `${GRID_HEIGHT}px`;
    console.log(`Grid is ${GRID_WIDTH}px wide, ${GRID_HEIGHT}px high.`);
    console.log(`Grid has ${nrows} rows.`)
    console.log(`Grid has ${ncols} cells per row.`)
    const tileWidth = GRID_WIDTH / ncols;
    const tileHeight = GRID_HEIGHT / nrows;
    console.log(`Tiles are ${tileWidth}px wide, ${tileHeight} high.`)
    for (let i = 0; i < nrows; i++) {
        row = newRow();
        for (let j = 0; j < nrows; j++) {
            row.appendChild(newTile(tileWidth, tileHeight, drawFunction));
        }
        GRID_DIV.appendChild(row);
    }
}


function reset(event) {
    const nrows = NROWS_INPUT.value;
    let drawFunction;
    switch (event.target.value) {
        case "gradual":
            drawFunction = darkenGradually;
            break;
        case "random":
            drawFunction = randomRGB;
            break;
        default:
            drawFunction = darkenImmediately;
    }
    GRID_DIV.innerHTML = "";
    newGrid(nrows, nrows, drawFunction);
}


const GRID_DIV = document.getElementById('grid');
const NROWS_INPUT = document.getElementById("nrows");

newGrid();

for (let button of document.querySelectorAll('.set-mode')) {
    button.addEventListener("click", reset);
}

