//dropdown menu
const gameSelector = document.getElementById("game-selector");

function selectGame() 
{
    const selectedGame = gameSelector.value;

    if (selectedGame) 
        {
        window.location.href = selectedGame; // Open the selected game
        } 
        
        else 
        {
        console.log("Please select a game theme to play!");
        }
}

gameSelector.addEventListener("change", selectGame);
