const bocaPreta = new Image();
bocaPreta.src = 'img/bocapreta.png'
const coronga = new Image();
coronga.src = 'img/coronga.png'
const monstrito = new Image();
monstrito.src = 'img/monstrito.png'
const fantasmaNoturno = new Image();
fantasmaNoturno.src = 'img/fantasmaNoturno.png'
const polvoEspinho = new Image();
polvoEspinho.src = 'img/polvoespinho.png'
const olhosDaNoite = new Image();
olhosDaNoite.src = 'img/olhosdanoite.png'

enemySprites = [monstrito, coronga, bocaPreta, fantasmaNoturno, polvoEspinho, 
                olhosDaNoite];
enemiesArray = [];

class Enemy {
    constructor(sourceImage) {
        this.width = 150;
        this.height = 150;
        this.x = Math.random() * (canvas.width - this.width)
        this.y = -50;
        this.dx = 1;
        this.dy = 1;
        this.isOutofScreen = false;
        this.sourceImage = sourceImage;    
        
    }
    update() {
        this.y += this.dy * gameSpeed
        if (this.y > canvas.height) this.isOutofScreen = true;
    }
    
    draw(){
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.sourceImage, this.x, this.y, this.width, this.height)
        
    }
}

//push new enemy to array
function createEnemy(){
    let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
    let enemy = new Enemy(randomSelectedEnemy);
    enemiesArray.push(enemy);
    //console.log("New enemy created!")
}

//at every given interval
function spawnEnemy(){
    if (frame % 350 === 0) {
        createEnemy();
    }
} 

//collision funtion
function collision(first, second){
    return !(first.x > second.x + second.width ||   // first está à direita de second, sem colisão = TRUE
             first.x + first.width < second.x  ||   // first está à esquerda de second, sem colisão = TRUE
             first.y > second.y + second.height||  // first está abaixo de second, sem colisão = TRUE
             first.y + first.height < second.y)    // first está acima de second, sem colisão = TRUE
}                                                  // assim, o ! fará retornar FALSO quando não houver colisão!

function checkIfProjectileHitMonster(){
    for (i in projectilesArray){
        for (j in enemiesArray) {
            if (collision(projectilesArray[i], enemiesArray[j])) {
               //console.log("PROJECTILE HITS ENEMY!")
               const explosionX = enemiesArray[j].x + enemiesArray[j].width / 2;
               const explosionY = enemiesArray[j].y + enemiesArray[j].height / 2
               projectilesArray.splice(i, 1)
               i--
               enemiesArray.splice(j, 1) 
               j--
               
               score += 100
               scoreElement.innerHTML = score

               //Enemy explosion
               for (i = 0; i < 30; i++) { 
                    particlesArray.push(new Particle( 
                    explosionX,                 // x
                    explosionY,                 // y
                    (Math.random() - 0.5) * 2,  // dx
                    (Math.random() - 0.5) * 2,  // dy
                    Math.random() * 5,          //radius
                    'yellow'                    //color
                    ))                                                 
               }
            }     
        }
    } 
}

function destroyEnemiesOutOfScreen(){
    for (i in enemiesArray) {
        let enemy = enemiesArray[i];
        if (enemy.isOutofScreen) {
            enemiesArray.splice(i, 1)
            i--
            console.log('ENEMY REMOVED!')
        }
    }
} 

function handleEnemies(){
    spawnEnemy();
    for (i in enemiesArray){
        enemiesArray[i].update()
        enemiesArray[i].draw()
        
        //collision check: monster x player
        if (collision(player, enemiesArray[i])) {
            console.log("Collision PLAYER X ENEMY!")
            const explosionX = player.x + player.width / 2
            const explosionY = player.y + player.height / 2
            enemiesArray.splice(i, 1);
            //Player explosion
            for (i = 0; i < 50; i++) { 
                particlesArray.push(new Particle( 
                explosionX,                 // x
                explosionY,                 // y
                (Math.random() - 0.5) * 2,  // dx
                (Math.random() - 0.5) * 2,  // dy
                Math.random() * 7,          //radius
                'white'                    //color
                )) 
            }
            player.opacity = 0
            game.over = true
            setTimeout(() => {game.active = false}, 2000)


        }
    }
    checkIfProjectileHitMonster() // also generates explosion particles
    destroyEnemiesOutOfScreen()
}
