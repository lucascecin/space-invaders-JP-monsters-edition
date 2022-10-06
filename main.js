// V5
// to do´s
// deterministic fixed time step (DONE)
// FIX ME: update enemies with fixed step (DONE)
// FIX ME: update particles with fixed step
// enemy shoots (at random intervals) (DONE)
// enemy shoot collision (DONE)
// change enemy movement: like original space invaders and others
// enemies spawns in grids
// pause game
// enemy HP (DONE)
// player HP (DONE)
// Player HP display
// boss 1 (DONE)
// Stage 2
// smaller hitboxes 

//setup and loop file
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let scoreElement = document.querySelector('#scoreElement');
let score = 0;
canvas.width = 1024;
canvas.height = 576;
var gameSpeed = 1;
var quitGame = false;

//game speed
let gameStatusTimer = 0
function handleGameStatus(deltaTime) {
    if (gameStatusTimer > 30000) { // a cada 30 segundos
    gameSpeed += 0.05;
    console.log('Game Speed set to ' + gameSpeed);
    gameStatusTimer = 0;
    } else {
        gameStatusTimer += deltaTime;
    }
}

let game = {
    over: false,
    active: true,
    paused: false
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
        console.log('Restart Game Triggered!');
        game.active = true;
        game.over = false;
        enemiesArray = [];
        projectilesArray = [];
        player.opacity = 1;
        player.x = canvas.width/2 - 25;
        player.y = 500;
        score = 0;
        scoreElement.innerHTML = score;
        frameTimer = 0;
        lastTime = 0;
        gameSpeed = 1;
        accumulator = 0;
        player.hp = 3;
        animate();
    }
}

let tempoDoJogo = 0;
function drawTempoDeJogo(deltaTime) {
    let tempoDeJogo = document.getElementById('tempoDeJogo');
    tempoDoJogo += deltaTime;
    tempoDeJogo.innerHTML = Math.floor(tempoDoJogo/1000) + ' segundos';
}

//inicializa as variáveis
let lastTime = 0; // variável para calcular o deltaTime
let deltaTime = 0; // tempo em milisegundos do último frame > expectativa para o próximo
let frameTimer = 0; // acumula o deltaTime > tempo decorrido de verdade em milisegundos
const step = ((1/60)*1000); // static time step

//tweaking game loop to deterministic time step
function animate(timeStamp) {
    if (!game.active) {
        drawPressSpaceBarMessage();
        return;
    }
    let deltaTime = timeStamp - lastTime; // calcula o deltaTime do frame ~16.6
    frameTimer += deltaTime; // frameTimer é o accumulator de tempo, decrescido pelo step
    let updated = false; // no início de cada loop, updated é falso
    let whileCounter = 0;
    while (frameTimer > step) {
        // update and collision checks
        updateStars();
        player.update();
        updatePlayerProjectiles();
        handleEnemies();
        handleEnemyProjectiles();
        handleGameStatus();
        updateParticles();
        // safeguard to endless while loop        
        whileCounter++;
        frameTimer -= step;
        if(whileCounter > 3) {
            console.log('while counter > 5 !!!');
            frameTimer = 0
            break;
        }
        // only draw if updated at least once
        updated = true;
    }

    if (updated) {  
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        drawStars();
        player.draw();
        drawPlayerProjectiles();
        drawEnemies();
        drawEnemyProjectiles();
        drawParticles();
        drawTempoDeJogo(deltaTime);
    }

    lastTime = timeStamp; // last time recebe o timeStamp atual
    
    if (game.over) {drawGameOverMessage()};
    //if (game.over) {setTimeout(drawGameOverMessage, 200)}; // timeout not working
    if (quitGame) {return}; //if "Q" is pressed
    if (game.active) requestAnimationFrame(animate);
}
animate(0);