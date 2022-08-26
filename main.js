//To improve
//Sound: when shooting
//Score
//Game Over
//Limit max bullets on screen to 3 or 4

//setup and loop file
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let scoreElement = document.querySelector('#scoreElement');
let score = 0

canvas.width = 1024
canvas.height = 576

var frame = 0;
var gameSpeed = 1;
var gameOver = false;
var quitGame = false

//game speed
function handleGameStatus() {
    if (frame % 1500 === 0) {
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

window.addEventListener("keydown",keydownHandler,false);
window.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e) {
    //console.log(e)
    if (game.over) return
  
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
            player.firing = true
            player.shoot()    
            player.canFireAgain = false; // após 1 disparo, não pode disparar mais
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
            player.firing = false;
            player.canFireAgain = true;
            break;
    }
}

function animate() {
    if (!game.active) return
    frame++
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleStars()
    handlePlayer()
    handleEnemies()
    handleProjectiles()
    handleParticles()
    handleGameStatus()
    if (quitGame) {return} //if "Q" is pressed
    if (!gameOver) requestAnimationFrame(animate);
}
animate();