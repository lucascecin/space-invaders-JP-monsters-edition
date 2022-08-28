// To do´s
// when game over, space bar restars the game (insert message)
// enemy shoots (at random intervals)
// change enemy movement: like space invaders



//setup and loop file
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let scoreElement = document.querySelector('#scoreElement');
let score = 0

canvas.width = 1024
canvas.height = 576

var frame = 0;
var gameSpeed = 1;
//var gameOver = false;
var quitGame = false

//game speed
function handleGameStatus() {
    if (frame % 2000 === 0) {
    gameSpeed += 0.05
    console.log('Game Speed set to ' + gameSpeed)
    }
}

let game = {
    over: false,
    active: true,
}

// keys
const LEFT = 37, RIGHT = 39, SPACE = 32, Q = 81;
let spaceIsPressed = false;

window.addEventListener("keydown",keydownHandler,false);
window.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e) {
    //console.log(e)
    //if (game.over) return
  
    switch(e.keyCode){
        case RIGHT:
            player.mvRight = true;
            player.mvLeft = false;
            break;
        case LEFT:
            player.mvRight = false;
            player.mvLeft = true;
            break; 
        case SPACE:
            spaceIsPressed = true;
            player.firing = true
            if (!game.over) {player.shoot()}
            player.canFireAgain = false; // após 1 disparo, não pode disparar mais
            if (game.over && !game.active) {restartGame()}
            break;
        case Q:
            quitGame = true;
            break;
    }
}

function keyupHandler(e) {
    
    switch(e.keyCode){
        case RIGHT:
            player.mvRight = false;
            break;
        case LEFT:
            player.mvLeft = false;
            break;
        case SPACE:
            spaceIsPressed = false;
            player.firing = false;
            player.canFireAgain = true;
            break;
    }
}



function drawGameOverMessage() {
    ctx.drawImage(gameOverDrawing, 70, 160, gameOverDrawing.width, gameOverDrawing.height)
}

function drawPressSpaceBarMessage() {
    // Aperte a barra de espaço para recomeçar
    // Posição: Logo abaixo do game over
}

function restartGame() {
    if (!game.active && game.over && spaceIsPressed) {
        console.log('Restart Game Triggered!')
        game.active = true;
        game.over = false;
        enemiesArray = [];
        projectilesArray = [];
        player.opacity = 1;
        player.x = canvas.width/2 - 25;
        player.y = 500;
        score = 0
        scoreElement.innerHTML = score
        frame = 0
        gameSpeed = 1
        animate()
    }
}

function animate() {
    if (!game.active) {
        drawPressSpaceBarMessage()
        return
    }
    frame++
    console.log(frame)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleStars()
    handlePlayer()
    handleEnemies()
    handleProjectiles()
    handleParticles()
    handleGameStatus()
    if (game.over) {drawGameOverMessage()}
    //if (game.over) {setTimeout(drawGameOverMessage, 200)} // timeout not working
    if (quitGame) {return} //if "Q" is pressed
    if (game.active) requestAnimationFrame(animate);
}
animate();

