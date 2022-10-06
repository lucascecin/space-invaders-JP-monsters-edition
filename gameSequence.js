// mvt types
  // straightDown / straightDownRandomX / senoidDown / senoidRightAndDive
  // senoidBorderRightAndDive / senoidBorderLeftAndDive
  // dando problema em Straight Down e senoidRightAndDive
// enemy types
  //monstrito, coronga, bocaPreta, fantasmaNoturno, polvoEspinho,
  //olhosDaNoite, miladudi, sapao, bee, bee2, bee3, bocaTorta, monstroAzul
 
let accumulator = 0 // tracks all time > logic cycles of current stage
let enemyTimer = 0 
let enemyInterval = 0 
let newSequence = false;
movements = ["straightDown", "straightDownRandomX", "senoidDown", 
            "senoidRightAndDive", "senoidBorderRightAndDive", 
            "senoidBorderLeftAndDive"]

// randomizer functions
function randomSelectEnemy() {
  let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
  return randomSelectedEnemy
}
function randomSelectMovement() {
  let randomMovement = movements[Math.floor(Math.random() * movements.length)]
  return randomMovement
}

// main game sequence
function spawnEnemy() {

  accumulator += step // tracks global time
  
// 1st wave: random enemy ; straightDownRandomX
  if (accumulator > 0 && accumulator < 15000) { // for 45 seconds
    let enemyInterval = 3000 // every 2 seconds
    enemyTimer += step
    Math.floor(enemyTimer)
    if (enemyTimer > enemyInterval) {
      let config = { 
        sourceImage: randomSelectEnemy(), 
        x: (Math.random() * (canvas.width - 95)),
        y: -150,
        dx: (Math.random() * 0.25 + 0.25) * step,
        dy: (Math.random() * 0.25 + 0.25) * step,
        width: 105,
        height: 105,
        movementType: "straightDownRandomX"
      }
      enemiesArray.push(new Enemy(config));
      enemyTimer = 0
    } else {
      enemyTimer += step
    }
  }

  // 2nd wave: monstritos apears on both borders, buzz and dive
  if (accumulator > 15000 && accumulator < 25000){
    let enemyInterval = 5000;  
    enemyTimer += step;
    Math.floor(enemyTimer)
    if (enemyTimer > enemyInterval) {
      let config = {
        sourceImage: monstrito,
        x: -125,
        y: 10,
        dx: (Math.random() * 0.25 + 0.25) * step,
        dy: (Math.random() + 2) * step,
        width: 125,
        height: 125,
        movementType: "senoidBorderLeftAndDive",
      }
      enemiesArray.push(new Enemy(config));
      config["movementType"] = "senoidBorderRightAndDive";
      config["x"] = 1024; 
      enemiesArray.push(new Enemy(config));
      enemyTimer = 0;
    } else {
        enemyTimer += step;
    }
  }

  // 3rd wave: boss
  if (accumulator > 25000 && accumulator < 30000){
    let enemyInterval = 5000;  
    enemyTimer += step;
    Math.floor(enemyTimer)
    if (enemyTimer > enemyInterval) {
      
      // definir o movement type por último? 
      // Porque na fase de setup pode ser setada variáveis!
      let config = {
        sourceImage: polvoEspinho,
        width: 250,
        height: 175,
        hp: 15,
        movementType: "bossMovement",
      }
      
      enemiesArray.push(new Enemy(config));
      enemyTimer = 0;
    
    } else {
        enemyTimer += step;
    }
  }

  // 4rd wave: senoid
  if (accumulator > 30000 && accumulator < 42000){
    let enemyInterval = 3000;  
    enemyTimer += step;
    Math.floor(enemyTimer)
    if (enemyTimer > enemyInterval) {
      
      let config = {
        dy: (Math.random()*0.10 + 0.15) * step,
        movementType: "senoidDown"
      }
      
      enemiesArray.push(new Enemy(config));
      enemyTimer = 0;
    
    } else {
        enemyTimer += step;
    }
  }

  // 4rd wave: senoid
    if (accumulator > 43000 && accumulator < 50000){
      let enemyInterval = 2500;  
      enemyTimer += step;
      Math.floor(enemyTimer)
      if (enemyTimer > enemyInterval) {
        
        let config = {
         x: -150,
         y: 15,
         width: 85,
         height: 85,
         dy: (Math.random()*0.10 + 0.15) * step,
         movementType: "senoidRightAndDive"
        }
        
        enemiesArray.push(new Enemy(config));
        enemyTimer = 0;
      
      } else {
          enemyTimer += step;
      }
    }






  // //1st wave: random enemy ; straightDownRandomX
  // if (accumulator > 0 && accumulator < 15000) { // for 30 seconds
  //   let enemyInterval = 2000
  //   enemyTimer += step
  //   Math.floor(enemyTimer)

  //   if (enemyTimer > enemyInterval) {
  //     let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
  //     let enemy = new Enemy(randomSelectedEnemy, "straightDownRandomX")
  //     enemiesArray.push(enemy)
  //     enemyTimer = 0
  //   } else {
  //     enemyTimer += step
  //   }
  // }

  // //2nd wave: random enemy ; straightDownRandomX
  // if (accumulator > 15000 && accumulator < 24000) { 
  //   let enemyInterval = 4000
  //   enemyTimer += step
  //   Math.floor(enemyTimer)
  //   if (enemyTimer > enemyInterval) {
  //     let enemy = new Enemy(monstrito, "senoidBorderRightAndDive", 1000, 0);
  //     enemiesArray.push(enemy)
  //     let enemy1 = new Enemy(monstrito, "senoidBorderLeftAndDive", -150, 0);
  //     enemiesArray.push(enemy1)
  //     enemyTimer = 0
  //   } else {
  //     enemyTimer += step
  //   }
  // }

  // 3rd wave with for loop
  // if (accumulator > 24500 && accumulator < 28500){
  //   let enemyInterval = 4000  
  //   enemyTimer += step
  //   Math.floor(enemyTimer)

  //   if (enemyTimer > enemyInterval) {
  //     for (i=0; i<5; i++) {
  //         const space = 150 * i;
  //         enemiesArray.push(new Enemy(
  //         bee,
  //         "senoidBorderLeftAndDive",
  //         -700 + space,  // x
  //         10,     // y
  //         4,      // dx 
  //         4,      // dy
  //         100,    // width
  //         100));   // height
  //         enemyTimer = 0;
  //       }
  //     } else {
  //       enemyTimer += step
  //     }
  //   }


  // // 4th wave: random enemy ; straightDownRandomX
  // if (accumulator > 28500 && accumulator < 35000) { // for 30 seconds
  //   let enemyInterval = 500
  //   enemyTimer += step
  //   Math.floor(enemyTimer)

  //   if (enemyTimer > enemyInterval) {
  //     beeArray = [bee, bee2, bee3]
  //     let randomSelectedEnemy = beeArray[Math.floor(Math.random() * beeArray.length)]
  //     let enemy = new Enemy(randomSelectedEnemy, 
  //       "straightDownRandomX",
  //       (Math.random() * (canvas.width - this.width)),
  //       -150,
  //       2,
  //       Math.random() * 3 + 3,
  //       85,
  //       85)
  //     enemiesArray.push(enemy)
  //     enemyTimer = 0
  //   } else {
  //     enemyTimer += step
  //   }
  // }

    
  //   // 2nd wave: coronga ; senoidDown
  //   if (accumulator % 250 === 0 && accumulator >= 3000 && accumulator <6000) {
  //     let enemy = new Enemy(coronga, "senoidDown", 50, -150);
  //     enemiesArray.push(enemy)
  //     console.log(enemy)
  //   }
    
  //   // 3rd wave: 4 sequências de borderDive esquerda e direta
  //   if (accumulator % 400 === 0 && accumulator >= 6000 && accumulator <= 8400) {
  //     let enemy = new Enemy(monstrito, "senoidBorderRightAndDive", 1000, 0);
  //     enemiesArray.push(enemy)
  //     let enemy1 = new Enemy(monstrito, "senoidBorderLeftAndDive", -150, 0);
  //     enemiesArray.push(enemy1)
  //   }

  //  if (accumulator == 900) {
   //     let enemy = new Enemy(coronga, "straightDown", 90, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 950) {
   //     let enemy = new Enemy(coronga, "straightDown", 250, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1000) {
   //     let enemy = new Enemy(coronga, "straightDown", 420, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1050) {
   //     let enemy = new Enemy(coronga, "straightDown", 630, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1100) {
   //     let enemy = new Enemy(coronga, "straightDown", 750, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1350) {
   //     let enemy = new Enemy(coronga, "straightDownRandomX");
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1500) {
   //     let enemy = new Enemy(coronga, "straightDownRandomX");
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1550) {
   //     let enemy = new Enemy(sapao, "senoidBorderRightAndDive", 
   //     canvas.width, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1650) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1700) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 75);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1820) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 85);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1870) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (accumulator == 1900) {
   //      let enemy = new Enemy(monstrito, "senoidBorderLeftAndDive", 
   //      -150, 50);
   //      enemiesArray.push(enemy)
   //   }
 }