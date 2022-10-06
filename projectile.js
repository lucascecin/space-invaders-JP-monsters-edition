projectilesArray = [];

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 0.35 
        this.radius = 5;
        this.width = 5;
        this.height = 5;        
        this.color = 'red'
        this.isOutofScreen = false;
    } 
    update(){ 
        this.y -= this.dy * step
        if (this.y < -this.height + 30) this.isOutofScreen = true;
    }

    draw(){
        ctx.fillStyle = this.color; 
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.closePath();
        // ctx.fill();
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

///////////////////////////
/// Player Projectiles ///
/////////////////////////

function createProjectile(){ // called when spacebar is pressed 
    let projectile = new Projectile(player.x + player.width/2, player.y);
    projectilesArray.push(projectile)
    laserSound.play()
    //console.log(projectilesArray)
}

function updatePlayerProjectiles(){
    for (i in projectilesArray) { 
        projectilesArray[i].update()
        destroyProjectilesOutOfScreen() 
    }
}

function destroyProjectilesOutOfScreen(){
    for (i in projectilesArray) {
        let projectile = projectilesArray[i];
        if (projectile.isOutofScreen) {
            projectilesArray.splice(i, 1)
            i--
        }
    }
} 

function drawPlayerProjectiles(){
    for (i in projectilesArray) { 
        projectilesArray[i].draw()
    }
}

////////////////////////
// Enemy Projectiles //
///////////////////////

enemyProjectiles = []

class EnemyProjectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 0.3 
        this.radius = 5;
        this.width = 10;
        this.height = 10;        
        this.color = 'green'
        this.isOutofScreen = false;
    } 
    update(){ 
        this.y += this.dy * step
        if (this.y > canvas.height) this.isOutofScreen = true;
    }

    draw(){
        ctx.fillStyle = this.color; 
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.closePath();
        // ctx.fill();
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function destroyEnemyProjectilesOutOfScreen() {
    for (i in enemyProjectiles) {
        if (enemyProjectiles[i].isOutofScreen == true) {
            enemyProjectiles.splice(i, 1);
            i--;
        }
    }
}

function updateEnemyProjectiles(){
    for (i in enemyProjectiles){
        enemyProjectiles[i].update()
    }
}

function checkIfEnemyProjectileHitPlayer () { 
    for (i in enemyProjectiles) {
        if (collision(enemyProjectiles[i], player)) {
            player.hp -= 1;
            if (player.hp > 0) {
                enemyProjectiles.splice(i, 1);
                i--;
                // som de hit no player
                // draw some particles on collision spot
                enemyExplosionAudio.play()
            } else if (player.hp == 0 && game.over == false) {
                enemyProjectiles.splice(i, 1);
                // TURN THIS SPEGUETTI CODE TO NEW FUNCTION
                const explosionX = player.x + player.width / 2
                const explosionY = player.y + player.height / 2
                for (i = 0; i < 50; i++) {
                particlesArray.push(new Particle(
                    explosionX,                 // x
                    explosionY,                 // y
                    (Math.random() - 0.5) * 2,  // dx
                    (Math.random() - 0.5) * 2,  // dy
                    Math.random() * 7,          //radius
                    'white'                     //color
                ))
                }
                //hide player, cancel player commands and wait 2 seconds to pause animation
                player.opacity = 0
                playerExplosionAudio.play()
                game.over = true
                setTimeout(() => { game.active = false }, 2000)
            }
        }
    }
}

// wraper for enemy projectile logics
function handleEnemyProjectiles() {
    updateEnemyProjectiles();
    checkIfEnemyProjectileHitPlayer();
    destroyEnemyProjectilesOutOfScreen();
}


function drawEnemyProjectiles(){
    for (i in enemyProjectiles){
        enemyProjectiles[i].draw()
    }
}