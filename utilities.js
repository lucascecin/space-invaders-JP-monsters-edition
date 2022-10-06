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

// collision
function collision(first, second) {
    return !(first.x > second.x + second.width ||   
       first.x + first.width < second.x ||   
       first.y > second.y + second.height ||  
       first.y + first.height < second.y)    
 }  