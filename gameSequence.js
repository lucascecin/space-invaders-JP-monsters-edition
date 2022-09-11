// mvt types:
    // straightDown / straightDownRandomX / senoidDown / senoidRightAndDive
    // senoidBorderRightAndDive / senoidBorderLeftAndDive
    // dando problema em Straight Down e senoidRightAndDive
    // monstrito, coronga, bocaPreta, fantasmaNoturno, polvoEspinho,
    // olhosDaNoite, miladudi, sapao
 
    // 1st wave: spawn 5 coronga > straightDown
    // inserir intervalos de random movements.. automatizar e randomizar blocos

function spawnEnemy() {
   
   //1st wave: random enemy ; straightDownRandomX || 6 inimigos
    if (frame % 100 === 0 && frame < 800) {
      let randomSelectedEnemy = enemySprites[Math.floor(Math.random() * enemySprites.length)]
      let enemy = new Enemy(randomSelectedEnemy, "straightDownRandomX");
      enemiesArray.push(enemy)
    }
    
    // 2nd wave: coronga ; senoidDown || 
    if (frame % 150 === 0 && frame >= 800 && frame <1250) {
      let enemy = new Enemy(coronga, "senoidDown", 50, -150);
      enemiesArray.push(enemy)
      console.log(enemy)
    }
    
    // 3rd wave: 2 sequências de borderDive esquerda e direta
    if (frame % 250 === 0 && frame > 1250 && frame < 1750) {
      let enemy = new Enemy(monstrito, "senoidBorderRightAndDive", 1000, 0);
      enemiesArray.push(enemy)
      let enemy1 = new Enemy(monstrito, "senoidBorderLeftAndDive", -150, 0);
      enemiesArray.push(enemy1)
    }

    // 4th wave: 
    if (frame % 50 === 0 && frame >= 1750 && frame <= 2450) {
       let enemy = new Enemy(sapao, "senoidRightAndDive", -150, 30);
       enemiesArray.push(enemy)
    }

    // 5th wave: 
    if (frame % 100 === 0 && frame >= 1750 && frame <= 2450) {
      let enemy = new Enemy(fantasmaNoturno, "senoidBorderLeftAndDive", canvas.width + 150, 30);
      enemiesArray.push(enemy)
   }


   //  if (frame == 900) {
   //     let enemy = new Enemy(coronga, "straightDown", 90, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 950) {
   //     let enemy = new Enemy(coronga, "straightDown", 250, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1000) {
   //     let enemy = new Enemy(coronga, "straightDown", 420, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1050) {
   //     let enemy = new Enemy(coronga, "straightDown", 630, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1100) {
   //     let enemy = new Enemy(coronga, "straightDown", 750, -150);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1350) {
   //     let enemy = new Enemy(coronga, "straightDownRandomX");
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1500) {
   //     let enemy = new Enemy(coronga, "straightDownRandomX");
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1550) {
   //     let enemy = new Enemy(sapao, "senoidBorderRightAndDive", 
   //     canvas.width, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1650) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1700) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 75);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1820) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 85);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1870) {
   //     let enemy = new Enemy(coronga, "senoidRightAndDive", -150, 50);
   //     enemiesArray.push(enemy)
   //  }
   //  if (frame == 1900) {
   //      let enemy = new Enemy(monstrito, "senoidBorderLeftAndDive", 
   //      -150, 50);
   //      enemiesArray.push(enemy)
   //   }
 }