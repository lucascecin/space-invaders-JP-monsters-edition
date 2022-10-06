//monsters

const bocaPreta = new Image();                     //#1
bocaPreta.src = 'img/bocapreta.png'; 
const coronga = new Image();                       //#2
coronga.src = 'img/coronga.png';
const monstrito = new Image();                     //#3
monstrito.src = 'img/monstrito.png';
const fantasmaNoturno = new Image();               //#4
fantasmaNoturno.src = 'img/fantasmaNoturno.png';
const polvoEspinho = new Image();                  //#5
polvoEspinho.src = 'img/polvoespinho.png';
const olhosDaNoite = new Image();                  //#6
olhosDaNoite.src = 'img/olhosdanoite.png';
const miladudi = new Image();                      //#7
miladudi.src = 'img/miladudi.png';
const sapao = new Image();                         //#8
sapao.src = 'img/sapao2.png'; 
const bee = new Image();                           //#9            
bee.src = 'img/bee.png';
const bee2 = new Image();                          //#10
bee2.src = 'img/bee2.png';
const bee3 = new Image();                          //#11
bee3.src = 'img/bee3.png';
const bocaTorta = new Image();                     //#12
bocaTorta.src = 'img/bocatorta.png';
const monstroAzul = new Image();                   //#13
monstroAzul.src = 'img/monstroazul.png';

const gameOverDrawing = new Image();
gameOverDrawing.src = 'img/gameover.png';

//audio 
const enemyExplosionAudio = new Audio();
enemyExplosionAudio.src = 'audio/explosion3.wav';
enemyExplosionAudio.volume = 0.5;
const playerExplosionAudio = new Audio();
playerExplosionAudio.src = 'audio/playerexplosion.wav';
playerExplosionAudio.volume = 0.5;
const hitAudio = new Audio();
hitAudio.src = 'audio/hit.wav';
hitAudio.volume = 0.5;

enemySprites = [monstrito, coronga, bocaPreta, fantasmaNoturno, polvoEspinho,
   olhosDaNoite, miladudi, sapao, bee, bee2, bee3, bocaTorta, monstroAzul]
enemiesArray = []

class Enemy {
   constructor( config ) {
      this.width = config.width || 150;
      this.height = config.height || 150;
      this.x = config.x || (Math.random() * (canvas.width - this.width));  
      this.y = config.y || -150;
      this.dx = config.dx || 0.35 * step; 
      this.dy = config.dy || 0.35 * step;
      this.isOutofScreen = false;
      this.sourceImage = config.sourceImage || randomSelectEnemy();
      this.movementType = config.movementType || randomSelectMovement();
      this.distX = config.distX || 0;  
      this.distY = config.distY || 0;
      this.angle = config.angle || 0; // ever increasing
      this.angleSpeed = config.angleSpeed || Math.random() * 2; // frequência = velocidade
      this.curve = config.curve || 1; //this.curve = Math.random() * 5  // amplitude da senoide
      this.firstMovementStart = false;
      this.firstMovementFinished = false;
      this.secondMovementStart = false;
      this.thirdMovementStart = false;
      this.setupMovement = false;
      this.hp = config.hp || 1;
      this.shootTimer = 0;
      this.shootInterval = config.shootTimer || 2000; // miliseconds
      this.boss = config.boss || false;
   }

   shootProjectile() {
      this.shootTimer += step
      if (this.shootTimer > this.shootInterval) {
         this.shootTimer = 0
         enemyProjectiles.push(new EnemyProjectile(
            this.x + this.width/2,
            this.y + this.height
         ))
      }
   }

   update() { 

      if (this.movementType == "straightDownRandomX") {
         this.y += this.dy
      }

      if (this.movementType == "senoidDown") {
         if (this.setupMovement == false) {
            // enters setup
            this.angleSpeed = (Math.random() * 2) + 3
            this.curve = ((Math.random() * 150) + 100)
            this.setupMovement = true
         }
         //movement
         this.x = ((this.curve * Math.sin(this.angle * Math.PI/180)) + canvas.width/2 - this.width/2) // offset
         this.angle += this.angleSpeed   // ever increasing
         this.y += this.dy * gameSpeed   
      }

      if (this.movementType == "senoidRightAndDive") {
         // Primeiro movimento
         if (this.x < canvas.width * 0.75 && !this.secondMovementStart && !this.thirdMovementStart) { 
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 270)
            this.angle += 10
            this.x += this.dx 
         } 
         if (this.x >= canvas.width * 0.75) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
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
            this.x += this.distX/50
            this.y += this.distY/50
   
         }
      }

      if (this.movementType == "senoidBorderRightAndDive") {
         // Primeiro movimento
         if (this.x > canvas.width * 0.75 && !this.secondMovementStart && !this.thirdMovementStart) { 
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 180)
            this.angle += 10
            this.x += -this.dx
         } 
         if (this.x <= canvas.width * 0.75) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
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
            this.x += this.distX/50
            this.y += this.distY/50
   
         }
      }

      // Enemy spawn at border left, buzz and dive
      if (this.movementType == "senoidBorderLeftAndDive") {
         // Primeiro movimento
         if (this.x < canvas.width * 0.15 && !this.secondMovementStart && !this.thirdMovementStart) { 
            this.firstMovementStart = true
            this.y += 1 * Math.sin(this.angle * Math.PI / 180)
            this.angle += 1
            this.x += this.dx
         } 
         if (this.x >= canvas.width * 0.15) {this.firstMovementFinished = true}
         // Second Movement
         if (this.firstMovementFinished && !this.secondMovementFinished) {
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
            this.x += this.distX/50
            this.y += this.distY/50
   
         }
      }

      //#7 Boss Movement - Bounce Left and Right
      if (this.movementType == "bossMovement") {
         // movement setup
         if (this.setupMovement == false) {
            //this.x = 500;
            this.y = -150;
            this.dy = 3;
            this.dx = 3;
            this.setupMovement = true;
         }
         // first movement - goes down 100 px
         if (this.y < 40 && !this.secondMovementStart && !this.thirdMovementStart) { 
            this.firstMovementStart = true;
            this.y += this.dy;
         } 
         if (this.y >= 40) {this.firstMovementFinished = true}
         // Second Movement Bounce
         if (this.firstMovementFinished && !this.secondMovementFinished) {
            this.secondMovementStart = true;
            this.x += this.dx;
            if (this.x + this.width > canvas.width) this.dx = -this.dx;
            else if(this.x < 0) this.dx = -this.dx;
         }
      }

      if (this.y > canvas.height) this.isOutofScreen = true;
      if (this.x > canvas.width + 15) this.isOutofScreen = true;

   }

   draw() {
      ctx.drawImage(this.sourceImage, this.x, this.y, this.width, this.height);

   }
}

function checkIfProjectileHitMonster() {
   for (i in projectilesArray) {
      for (j in enemiesArray) {
         if (collision(projectilesArray[i], enemiesArray[j])) {
            // se colisão
            enemiesArray[j].hp--;
            const explosionX = enemiesArray[j].x + enemiesArray[j].width / 2;
            const explosionY = enemiesArray[j].y + enemiesArray[j].height / 2;
            projectilesArray.splice(i, 1);
            i--;
            
            if(enemiesArray[j].hp > 0) {
               hitAudio.play();
            }
            else if(enemiesArray[j].hp == 0){
               if (enemiesArray[j].boss == true) {
                  accumulator = 0
                  newSequence = true;
               }
               enemiesArray.splice(j, 1);
               j--;
               
               score += 100; // scores 100 points per hit
               scoreElement.innerHTML = score;   // writes score
               enemyExplosionAudio.play();
               // particles on enemy explosion
               for (i = 0; i < 30; i++) {
                  particlesArray.push(new Particle(
                     explosionX,                 // x
                     explosionY,                 // y
                     (Math.random() * 4) -2,  // dx
                     (Math.random() * 4) -2,  // dy
                     Math.random() * 4,          //radius
                     'yellow'                    //color
                  ))
               }
            }
            return; 
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
      }
   }
}

function handleEnemies() {
   
   spawnEnemy()

   for (i in enemiesArray) {
      enemiesArray[i].update()
      enemiesArray[i].shootProjectile()
      //check collision player x enemy 
      if (collision(player, enemiesArray[i])) {
         player.hp--
         // enemy explosion
         const explosionX = enemiesArray[i].x + enemiesArray[i].width / 2
         const explosionY = enemiesArray[i].y + enemiesArray[i].height / 2
         enemiesArray.splice(i, 1);
         for (i = 0; i < 30; i++) {
            particlesArray.push(new Particle(
               explosionX,                 // x
               explosionY,                 // y
               (Math.random() * 4) -2,  // dx
               (Math.random() * 4) -2,  // dy
               Math.random() * 4,          //radius
               'yellow'                    //color
            ))
         }
         if (player.hp > 0) {enemyExplosionAudio.play()}
         // i--
         if(player.hp == 0){
            // particles
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
   checkIfProjectileHitMonster() // also generates explosion particles
   destroyEnemiesOutOfScreen()
   
}

function drawEnemies(){
   for (i in enemiesArray) {
      enemiesArray[i].draw();
   }
}
