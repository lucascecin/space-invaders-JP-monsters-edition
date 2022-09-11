// To do´s
// enemy shoots (at random intervals)
// change enemy movement: like original space invaders and others
// enemies spawns in grids
// maniputale delta time and fps
// pause game
// enemy HP
// boss 1
// Stage 2


//setup and loop file
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let scoreElement = document.querySelector('#scoreElement');
let score = 0

canvas.width = 1024
canvas.height = 576

var frame = 0;
var gameSpeed = 1;
var quitGame = false

//game speed
function handleGameStatus() {
    if (frame % 2000 === 0) { // 2000 / 60 = every 33 seconds
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
    ctx.drawImage(gameOverDrawing, 70, 140, gameOverDrawing.width, gameOverDrawing.height)
}

function drawPressSpaceBarMessage() {
    ctx.font = '40px Georgia';
    ctx.fillStyle = 'white'
    ctx.fillText('Aperte a barra de espaço para recomeçar', 120, 430)
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

function drawTempoDeJogo() {
    // assuming broser runs at 60 fps
    let tempoDeJogo = document.getElementById('tempoDeJogo')
    tempoDeJogo.innerHTML = 'Tempo de jogo: ' + Math.floor(frame/60) + ' segundos'
}
function drawFpsDisplay() {
    let fpsDisplay = document.getElementById('fpsDisplay')
    fpsDisplay.innerHTML = Math.floor(frame/(timeAcumInMiliseconds/1000)) + ' fps'
}

let lastTime = 1
let timeAcumInMiliseconds = 0


function animate(timeStamp) {
    if (!game.active) {
        drawPressSpaceBarMessage()
        return
    }
    frame++
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    timeAcumInMiliseconds += deltaTime
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleStars()
    handlePlayer()
    handleProjectiles()
    handleEnemies()
    handleParticles()
    handleGameStatus()
    drawTempoDeJogo()
    drawFpsDisplay()
    //handleLayer2()
    if (game.over) {drawGameOverMessage()}
    //if (game.over) {setTimeout(drawGameOverMessage, 200)} // timeout not working
    if (quitGame) {return} //if "Q" is pressed
    if (game.active) requestAnimationFrame(animate);
}
animate(0);
