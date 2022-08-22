const unitLength = 20;
const strokeColor = (219, 229, 92);
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr = 60;
frSlider = document.querySelector('#fr')
const boxColor = (241, 251, 120);

// changeable value
let dieVar = 2
let populationVar = 3
let reproductionVar = 3








function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init(); // Set the initial values of the currentBoard and nextBoard
}

/**
 * Initialize/reset the board state
 */
function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}


function draw() {
    frameRate(fr)
    background(255);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill(boxColor);
            } else {
                fill(59,10,66);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
    // ellipse(mouseX, mouseY, 33, 33);
}

// function boxColor(x, y) {
//     let r = 255 * (x / columns)
//     let g = 255 * (y / rows)
//     let b = (255 * (1 - x / columns + (1 - y / rows))) / 2
//     return color(r, g, b);

// }



function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < dieVar) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > populationVar) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == reproductionVar) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}



//change rule
const dieElement = document.querySelector("#die-select");
dieElement.addEventListener("change", changeDieRule);

function changeDieRule(event) {
    // console.log(event.currentTarget.value)
    dieVar = event.currentTarget.value
}

// formElement.addEventListener('change', (event) => {
//     console.log(event.currentTarget.value)
// })



const populationElement = document.querySelector("#population-select");
populationElement.addEventListener("change", changePopulationRule);

function changePopulationRule(event) {
    // console.log(event.currentTarget.value)
    populationVar = event.currentTarget.value
}





const reproductionElement = document.querySelector("#reproduction-select");
reproductionElement.addEventListener("change", changerReproductionRule);

function changerReproductionRule(event) {
    // console.log(event.currentTarget.value)
    reproductionVar = event.currentTarget.value
}




/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);

}

/**
 * When mouse is pressed
 */
function mousePressed() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    loop();
}

document.querySelector('#reset-game')
    .addEventListener('click', function () {
        init();
    });


frSlider.addEventListener('input', function () {
    fr = Number(frSlider.value)
})


//button of Start/Stop

const btn = document.querySelector(".start-button");

btn.addEventListener("click", updateBtn);

function updateBtn() {
    if (btn.textContent === "Start") {
        btn.textContent = "Stop";
    } else {
        noLoop()
        btn.textContent = "Start";
    }

}

const randomBtn = document.querySelector("#start-random")

randomBtn.addEventListener("click", startRandom);

function startRandom() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            currentBoard[i][j] = (Math.random() > 0.5) ? 1 : 0;
        }
    }

}

//2d array
//for loop  loop個array

// let pattern1 = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

// ]


// function placePattern() {
//     for (let i = 0; i < pattern1.length; i++) { //row
//         for (let j = 0; j < pattern1[0].length; j++) { //column
//             currentBoard[j][i] = 1;
//         }
//     }
// }




//resize
window.addEventListener('resize', reportWindowSize);

function reportWindowSize() {

    setup()
    //   heightOutput.textContent = window.innerHeight;
    //   widthOutput.textContent = window.innerWidth;

}

function drawPattern() {

    let pattern =
        `
......OO......
......O.O.OO.O
........O.O.OO
........OO....
..............
..............
.OOOOO.....OO.
O....O.....OO.
.....O........
O...O.........
..O...........`
    let patternRowStringArray = pattern.split("\n")
    // patternRowStringArray.shift()
    // patternRowStringArray.pop()

    for (let i = 0; i < patternRowStringArray.length; i++) {
        for (let j = 0; j < patternRowStringArray[i].length; j++) {
            console.log(patternRowStringArray[i][j])
            if (patternRowStringArray[i][j] === "O") {
                fill("yellow")
                rect(j * unitLength, i * unitLength, unitLength, unitLength);
                
            }
        }
    }
}

const patternOne = document.querySelector("#pattern-1")
patternOne.addEventListener("click", drawPattern)





