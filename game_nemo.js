let rows, cols, gameArr;
let playerTurn = 1; // Player 1 starts
let gameOver = false;
let musicMuted = false; // To track if the music is muted
const board = document.getElementById("board");
const turnIndicator = document.getElementById("turn-indicator");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
const muteBtn = document.getElementById("mute-btn");
const message = document.getElementById("message");
const gameMusic = document.getElementById("game-music");

// home page
function homePage() 
{
    window.location.href = "gameSelectTheme.html";
}

document.getElementById("home-btn").addEventListener("click", homePage);

// Image URLs for players
const player2Image = "image_nemo.webp";
const player1Image = "image_dory.jpg";

// Initialize the game
function initializeGame() 
{
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("columns");

    rows = parseInt(rowsInput.value);
    cols = parseInt(colsInput.value);

    if (rows < 4 || cols < 4 || isNaN(rows) || isNaN(cols)) 
        {
        message.textContent = "Both Rows & Columns must be greater than 3";
        return;
        }

    // Play music if not muted
    if (!musicMuted) 
        {
        gameMusic.play();
        }

    gameArr = createBoard(rows, cols);
    renderBoard();

    turnIndicator.textContent = "Nemo's Turn";
    message.textContent = "";
    gameOver = false;
    playerTurn = 1;

    restartBtn.style.display = "block";
}

// Create a board
function createBoard(rows, cols) 
{
    let board = [];
    for (let i = 0; i < rows; i++) 
        {
        let row = [];
        for (let j = 0; j < cols; j++) 
            {
            row.push(""); // Add empty strings to the row
            }
        board.push(row); // Add the row to the board
        }
    return board;
}

// Render the board
function renderBoard() 
{
    // Clear previous board
    board.innerHTML = "";

    // Create the table
    const table = document.createElement("table");

    for (let i = 0; i < rows; i++) 
        {
        const row = document.createElement("tr");

        for (let j = 0; j < cols; j++) 
            {
            const cell = document.createElement("td");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            if (gameArr[i][j]) 
                {
                cell.dataset.value = gameArr[i][j];
                if (gameArr[i][j] === "D") 
                    {
                    cell.style.backgroundImage = `url(${player1Image})`;
                    } 
                    
                    else 
                    {
                    cell.style.backgroundImage = `url(${player2Image})`;
                    }
                }

            cell.addEventListener("click", handleCellClick);
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }

    board.appendChild(table);
}

// Handle cell clicks
function handleCellClick(event) 
{
    if (gameOver) return;

    const col = parseInt(event.target.dataset.col);

    // Find the lowest empty row in the selected column
    let row = rows - 1;
    while (row >= 0 && gameArr[row][col] !== "") 
        {
        row--;
        }

    if (row === -1) 
        {
        message.textContent = "Column is full!!! Choose another column";
        return;
        }

    // Place the token for the current player
    if (playerTurn === 1) 
        {
        gameArr[row][col] = "N";
        } 
        
        else 
        {
        gameArr[row][col] = "D";
        }

    // Check for win or draw conditions
    if (checkWinConditions()) 
        {
        gameOver = true;
        if (playerTurn === 1) 
            {
            turnIndicator.textContent = "Hurryahhhhh!!!! Nemo Won!";
            } 
            
            else 
            {
            turnIndicator.textContent = "Hurryahhhhh!!!! Dory Won!";
            }

        renderBoard();
        return;
    }

    if (checkDraw()) 
        {
        gameOver = true;
        turnIndicator.textContent = "Match Draw!";
        renderBoard();
        return;
        }

    // Switch player turn
    if (playerTurn === 1) 
        {
        playerTurn = 2;
        turnIndicator.textContent = "Dory's Turn";
        } 
        
        else 
        {
        playerTurn = 1;
        turnIndicator.textContent = "Nemo's Turn";
        }

    message.textContent = "";
    renderBoard();
}

// Check horizontal, vertical, and diagonal win conditions
function checkWinConditions() 
{
    return (
        checkHorizontal() ||
        checkVertical() ||
        checkDiagonalLeftToRight() ||
        checkDiagonalRightToLeft()
    );
}

// Horizontal check
function checkHorizontal() 
{
    for (let i = 0; i < rows; i++) 
        {
        for (let j = 0; j < cols - 3; j++) 
            {
            if (gameArr[i][j] !== "" &&
                gameArr[i][j] === gameArr[i][j + 1] &&
                gameArr[i][j] === gameArr[i][j + 2] &&
                gameArr[i][j] === gameArr[i][j + 3]) 
                
                {
                return true;
                }
            }
        }
    return false;
}

// Vertical check
function checkVertical() 
{
    for (let j = 0; j < cols; j++) 
        {
        for (let i = 0; i < rows - 3; i++) 
            {
            if (gameArr[i][j] !== "" &&
                gameArr[i][j] === gameArr[i + 1][j] &&
                gameArr[i][j] === gameArr[i + 2][j] &&
                gameArr[i][j] === gameArr[i + 3][j]) 
                {
                return true;
                }
            }
        }
    return false;
}

// Left to right
function checkDiagonalLeftToRight() 
{
    for (let i = 0; i < rows - 3; i++) 
        {
        for (let j = 0; j < cols - 3; j++) 
            {
            if (gameArr[i][j] !== "" &&
                gameArr[i][j] === gameArr[i + 1][j + 1] &&
                gameArr[i][j] === gameArr[i + 2][j + 2] &&
                gameArr[i][j] === gameArr[i + 3][j + 3]) 
                
                {
                return true;
                }
            }
        }
    return false;
}

// Right to left
function checkDiagonalRightToLeft() 
{
    for (let i = 0; i < rows - 3; i++) 
        {
        for (let j = 3; j < cols; j++) 
            {
            if (gameArr[i][j] !== "" &&
                gameArr[i][j] === gameArr[i + 1][j - 1] &&
                gameArr[i][j] === gameArr[i + 2][j - 2] &&
                gameArr[i][j] === gameArr[i + 3][j - 3]) 
                
                {
                return true;
                }
            }
        }
    return false;
}

// Draw condition
function checkDraw() 
{
    for (let i = 0; i < rows; i++) 
        {
        for (let j = 0; j < cols; j++) 
            {
            if (gameArr[i][j] === "") 
                {
                return false; // Empty cell found, not a draw
                }
            }
        }
    return true; // All cells are filled, and no winner
}

// Event Listeners
startBtn.addEventListener("click", initializeGame);
restartBtn.addEventListener("click", initializeGame);

// Mute button functionality
function switchMusic() 
{
    musicMuted = !musicMuted;
    if (musicMuted) 
        {
        gameMusic.pause();
        muteBtn.textContent = "Unmute Music";
        } 
        
        else 
        {
        gameMusic.play();
        muteBtn.textContent = "Mute Music";
        }
}

muteBtn.addEventListener("click", switchMusic);
