//monsters

const bocaPreta = new Image()                       //#1
bocaPreta.src = 'img/bocapreta.png' 
const coronga = new Image()                         //#2
coronga.src = 'img/coronga.png'
const monstrito = new Image()                       //#3
monstrito.src = 'img/monstrito.png'
const fantasmaNoturno = new Image()                 //#4
fantasmaNoturno.src = 'img/fantasmaNoturno.png';
const polvoEspinho = new Image()                    //#5
polvoEspinho.src = 'img/polvoespinho.png'
const olhosDaNoite = new Image()                    //#6
olhosDaNoite.src = 'img/olhosdanoite.png'
const miladudi = new Image()                        //#7
miladudi.src = 'img/miladudi.png'
const sapao = new Image()                           //#8
sapao.src = 'img/sapao2.png' 

const gameOverDrawing = new Image()
gameOverDrawing.src = 'img/gameover.png'

//audio 
const enemyExplosionAudio = new Audio()
enemyExplosionAudio.src = 'audio/explosion3.wav'
enemyExplosionAudio.volume = 0.5
const playerExplosionAudio = new Audio()
playerExplosionAudio.src = 'audio/playerexplosion.wav'
playerExplosionAudio.volume = 0.5

enemySprites = [monstrito, coronga, bocaPreta, fantasmaNoturno, polvoEspinho,
   olhosDaNoite, miladudi, sapao]
enemiesArray = []

class Enemy {
   constructor(sourceImage, movementType, x, y) {
      this.x = x  // normal value = 0
      this.y = y // normal value = -150 
      this.width = 150
      this.height = 150
      this.dx = 6
      this.dy = 4
      //this.dy = (Math.random() * 0.15) + 1
      this.isOutofScreen = false
      this.sourceImage = sourceImage
      this.movementType = movementType
      this.distX = 0
      this.distY = 0
      this.angle = 0                      // ever increasing
      this.angleSpeed = Math.random() * 5 // frequência = velocidade
      //this.curve = Math.random() * 5    // amplitude da senoide
      this.curve = 2
      this.firstMovementStart = false
      this.firstMovementFinished = false
      this.secondMovementStart = false
      this.thirdMovementStart = false
      this.setupMovement = false
      this.hp = 1
   }

   update() {

      // testar um por um com createEnemy()
      
      // #1 - STRAIGHT DOWN
      if (this.movementType == "straightDown") {
          this.y += this.dy
      }
         
      // #2 - MOVIMENTO RETO PARA BAIXO FROM RANDOM X
      if (this.movementType == "straightDownRandomX") {
         if (this.setupMovement == false) {
            // enters setup
            this.y = -150
            this.x = (Math.random() * (canvas.width - this.width))
            this.setupMovement = true
         }
         //movement
         this.y += this.dy
      }

      // #3 - MOVIMENTO SENOIDE PARA BAIXO
      if (this.movementType == "senoidDown") {
         if (this.setupMovement == false) {
            // enters setup
            //this.y = -150
            this.angleSpeed = (Math.random() * 5)
            this.curve = ((Math.random() * 175) + 75)
            this.setupMovement = true
         }
         //movement
         this.x = ((this.curve * Math.sin(this.angle * Math.PI/180)) + canvas.width/2 - this.width/2) // offset
         this.angle += this.angleSpeed   // ever increasing
         this.y += this.dy * gameSpeed   
      }

      // #4 - MOVIMENTO SENDOIDE PARA DIREITA, BUZZ POR 2 SEGUNDOS E DIVE
      if (this.movementType == "senoidRightAndDive") {
         // Primeiro movimento
         if (this.x < canvas.width * 0.75 && !this.secondMovementStart && !this.thirdMovementStart) { 
            console.log('1st Movement Triggered')
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 180)
            this.angle += 1
            this.x += this.dx + 1
         } 
         if (this.x >= canvas.width * 0.75) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
            console.log('2ndMovement Triggered')
            this.secondMovementStart = true
            this.x += Math.random() * 4 - 2 
            this.y += Math.random() * 4 - 2 
            setTimeout(()=> {this.secondMovementFinished = true}, 1000)
         }
         // Third Movement 1st part, set player location
         if (this.secondMovementFinished && !this.thirdMovementStart) {
            this.distY = player.y - (this.y - 150) 
            this.distX = player.x - this.x
            this.thirdMovementStart = true 
         }
         // Third Movement, dive
         if (this.thirdMovementStart) {
            console.log('Third movement triggered')
            this.x += this.distX/80
            this.y += this.distY/80
   
         }
      }

       
      // #5 - SENOID BORDER RIGHT, BUZZ AND DIVE
      if (this.movementType == "senoidBorderRightAndDive") {
         // Primeiro movimento
         if (this.x > canvas.width * 0.75 && !this.secondMovementStart && !this.thirdMovementStart) { 
            console.log('1st Movement Triggered')
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 180)
            this.angle += 1
            this.x += -this.dx
         } 
         if (this.x <= canvas.width * 0.75) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
            console.log('2ndMovement Triggered')
            this.secondMovementStart = true
            this.x += Math.random() * 4 - 2 
            this.y += Math.random() * 4 - 2 
            setTimeout(()=> {this.secondMovementFinished = true}, 1300)
         }
         // Third Movement 1st part, set player location
         if (this.secondMovementFinished && !this.thirdMovementStart) {
            this.distY = player.y - (this.y - 150) 
            this.distX = player.x - this.x
            this.thirdMovementStart = true 
         }
         // Third Movement, dive
         if (this.thirdMovementStart) {
            console.log('Third movement triggered')
            this.x += this.distX/90
            this.y += this.distY/90
   
         }
      }

      // #6 - SENOID BORDER LEFT, BUZZ AND DIVE
      if (this.movementType == "senoidBorderLeftAndDive") {
         // Primeiro movimento
         if (this.x < canvas.width * 0.15 && !this.secondMovementStart && !this.thirdMovementStart) { 
            console.log('1st Movement Triggered')
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 180)
            this.angle += 1
            this.x += this.dx
         } 
         if (this.x >= canvas.width * 0.15) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
            console.log('2ndMovement Triggered')
            this.secondMovementStart = true
            this.x += Math.random() * 4 - 2 
            this.y += Math.random() * 4 - 2 
            setTimeout(()=> {this.secondMovementFinished = true}, 1300)
         }
         // Third Movement 1st part, set player location
         if (this.secondMovementFinished && !this.thirdMovementStart) {
            this.distY = player.y - (this.y - 150) 
            this.distX = player.x - this.x
            this.thirdMovementStart = true 
         }
         // Third Movement, dive
         if (this.thirdMovementStart) {
            console.log('Third movement triggered')
            this.x += this.distX/90
            this.y += this.distY/90
   
         }
      }

      if (this.y > canvas.height) this.isOutofScreen = true
      if (this.x > canvas.width + 15) this.isOutofScreen = true
   }

   draw() {
      ctx.drawImage(this.sourceImage, this.x, this.y, this.width, this.height)

   }
}

// push new enemy to array
// function createEnemy() {
//    let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
//    let enemy = new Enemy(randomSelectedEnemy, "straightDownRamdonX", 500, -150);
//    enemiesArray.push(enemy)
//    console.log(enemy)
//    console.log("New enemy created!")
// }

// function createEnemy() {
//    let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
//    movements = ["straightDownNoSetup", "straightDown", "senoidDown", "senoidRightAndDive"]
//    let randomSelectedMovement = movements[Math.floor(Math.random() * movements.length)]
//    let enemy = new Enemy(randomSelectedEnemy, randomSelectedMovement)
//    enemiesArray.push(enemy)
//    console.log(enemy)
//    //console.log("New enemy created!")
// }


// function spawnEnemy() { // 
//    if (frame % 100 === 0) {
//       createEnemy()
//    }
// }


function collision(first, second) {
   return !(first.x > second.x + second.width ||   
      first.x + first.width < second.x ||   
      first.y > second.y + second.height ||  
      first.y + first.height < second.y)    
}  

function checkIfProjectileHitMonster() {
   for (i in projectilesArray) {
      for (j in enemiesArray) {
         if (collision(projectilesArray[i], enemiesArray[j])) {
            //console.log("PROJECTILE HITS ENqEMY!")
            const explosionX = enemiesArray[j].x + enemiesArray[j].width / 2
            const explosionY = enemiesArray[j].y + enemiesArray[j].height / 2
            enemiesArray.splice(j, 1)
            j--
            projectilesArray.splice(i, 1)
            i--
            score += 100; // scores 100 points per hit
            scoreElement.innerHTML = score;   // writes score
            enemyExplosionAudio.play()
            //Enemy explosion
            for (i = 0; i < 35; i++) {
               particlesArray.push(new Particle(
                  explosionX,                 // x
                  explosionY,                 // y
                  (Math.random() - 0.5) * 4,  // dx
                  (Math.random() - 0.5) * 4,  // dy
                  Math.random() * 4,          //radius
                  'yellow'                    //color
               ))
            }
            return // PUTA QUE PARIU!!!
                  // itera projéteis
                  // 1 projétil compara com todos os monstros
                  // se colisão, splice os 2
                  // mas continuava rodando o for sem o projétil para comparar, 
         }
      }
   }
}

function destroyEnemiesOutOfScreen() {
   for (i in enemiesArray) {
      let enemy = enemiesArray[i]
      if (enemy.isOutofScreen) {
         enemiesArray.splice(i, 1)
         i--
         //console.log('ENEMY REMOVED!')
      }
   }
}

function handleEnemies() {
   spawnEnemy()
   for (i in enemiesArray) {
      enemiesArray[i].update()
      enemiesArray[i].draw()

      //collision check: monster x player (game over!)
      if (collision(player, enemiesArray[i])) {
         console.log("Collision PLAYER X ENEMY!")
         const explosionX = player.x + player.width / 2
         const explosionY = player.y + player.height / 2
         enemiesArray.splice(i, 1);
         //Player explosion particles
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
   checkIfProjectileHitMonster() // also generates explosion particles
   destroyEnemiesOutOfScreen()
   createEnemyProjectile()  // FIXME
}

