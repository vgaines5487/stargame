document.addEventListener('DOMContentLoaded', function() {
    const tilesContainer = document.getElementById('tiles');
    const resetBtn = document.getElementById('reset-btn');
    const messageEl = document.getElementById('message');
    const attemptsEl = document.getElementById('attempts');
    const winsEl = document.getElementById('wins');
    const lossesEl = document.getElementById('losses');
    
    // Game state
    let wins = 0;
    let losses = 0;
    let attemptsLeft = 3;
    let winningTile;
    let revealedTiles = [];
    const totalTiles = 9;
    
    // Initialize the game
    function initGame() {
        tilesContainer.innerHTML = '';
        messageEl.textContent = 'Select a tile to begin!';
        attemptsLeft = 3;
        attemptsEl.textContent = attemptsLeft;
        revealedTiles = [];
        
        // Randomly select the winning tile
        winningTile = Math.floor(Math.random() * totalTiles);
        
        // Create tiles
        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.index = i;
            
            tile.addEventListener('click', function() {
                if (attemptsLeft <= 0 || revealedTiles.includes(i)) return;
                handleTileClick(this, i);
            });
            
            tilesContainer.appendChild(tile);
        }
    }
    
    // Handle tile click
    function handleTileClick(tile, index) {
        revealedTiles.push(index);
        
        if (index === winningTile) {
            // Correct tile
            tile.classList.add('winner', 'revealed');
            tile.textContent = '★';
            messageEl.textContent = '🎉 You found the winning tile! 🎉';
            wins++;
            winsEl.textContent = wins;
            endGame();
        } else {
            // Wrong tile
            attemptsLeft--;
            attemptsEl.textContent = attemptsLeft;
            tile.classList.add('loser', 'revealed');
            tile.textContent = '✗';
            
            if (attemptsLeft > 0) {
               
                
                
                messageEl.textContent = `Wrong tile! Hint: ${hint || 'very close!'}`;
                
                // Highlight nearby tiles after first attempt
                if (attemptsLeft === 1) {
                    highlightAdjacentTiles();
                }
            } else {
                // Game over
                messageEl.textContent = 'Game over! The winning tile was highlighted.';
                losses++;
                lossesEl.textContent = losses;
                endGame();
            }
        }
    }
    
    // Highlight adjacent tiles when on last attempt
    function highlightAdjacentTiles() {
        const winningRow = Math.floor(winningTile / 3);
        const winningCol = winningTile % 3;
        
        for (let i = 0; i < totalTiles; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            
            if (Math.abs(row - winningRow) <= 1 && Math.abs(col - winningCol) <= 1) {
                const tile = tilesContainer.children[i];
                if (!revealedTiles.includes(i)) {
                    tile.classList.add('hint');
                }
            }
        }
    }
    
    // End the game (reveal all tiles)
    function endGame() {
        const tiles = tilesContainer.children;
        
        // Reveal the winning tile if not already found
        if (!revealedTiles.includes(winningTile)) {
            tiles[winningTile].classList.add('winner', 'revealed');
            tiles[winningTile].textContent = '★';
        }
        
        // Disable all tiles
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.cursor = 'default';
        }
    }
    
    // Reset button event listener
    resetBtn.addEventListener('click', initGame);
    
    // Start the initial game
    initGame();
});