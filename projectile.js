projectilesArray = [];

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 16 
        this.radius = 5;
        this.width = 5;
        this.height = 5;        
        this.color = 'red'
        this.isOutofScreen = false;
    } 
    update(){ 
        this.y -= this.dy
        if (this.y < -this.height) this.isOutofScreen = true;
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

function createProjectile(){ // called when spacebar is pressed 
    let projectile = new Projectile(player.x + player.width/2, player.y);
    projectilesArray.push(projectile)
    laserSound.play()
    //console.log(projectilesArray)
}

function destroyProjectilesOutOfScreen(){
    for (i in projectilesArray) {
        let projectile = projectilesArray[i];
        if (projectile.isOutofScreen) {
            projectilesArray.splice(i, 1)
            i--
            //console.log('PROJECTILE REMOVED!')
        }
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
        this.dy = 8 
        this.radius = 10;
        this.width = 10;
        this.height = 10;        
        this.color = 'green'
        this.isOutofScreen = false;
        
    } 
    update(){ 
        this.y += this.dy
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

let projectileInterval = 300 
function createEnemyProjectile(){ 
    if (frame % projectileInterval === 0 && enemiesArray.length > 0) {
        let randomSelectedEnemy = enemiesArray[Math.floor(Math.random() * enemiesArray.length)]
        let enemyProjectile = new EnemyProjectile(
            randomSelectedEnemy.x + randomSelectedEnemy.width/2, // x do inimigo
            randomSelectedEnemy.y + randomSelectedEnemy.width)   // y do inimigo
        enemyProjectiles.push(enemyProjectile)
        projectileInterval = Math.floor((Math.random() * 75) + 150) // set new interval
        console.log('enemy projectile created!')
        console.log(projectileInterval)
        // play another sound
        return
    }
}

// function handleEnemyProjectiles(){
//     for (i in enemyProjectiles) {
//         enemyProjectiles[i].update()
//         enemyProjectiles[i].draw()
//         destroyEnemyProjectilesOutOfScreen()
//     }
// }

function destroyEnemyProjectilesOutOfScreen() {
    for (i in enemyProjectiles) {
        let enemyProjectile = enemyProjectiles[i];
        if (enemyProjectile.isOutofScreen) {
            enemyProjectiles.splice(i, 1)
            i--
            console.log('ENEMY PROJECTILE REMOVED!')
        }
    }
} 



/////////////////////////////////////////////
// function that wraps all class functions //
////////////////////////////////////////////
function handleProjectiles(){
    for (i in projectilesArray) { 
        projectilesArray[i].update()
        projectilesArray[i].draw()
        destroyProjectilesOutOfScreen() 
    }
    for (i in enemyProjectiles){
        enemyProjectiles[i].update()
        enemyProjectiles[i].draw()
        destroyEnemyProjectilesOutOfScreen()
    }
}