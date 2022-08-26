projectilesArray = [];

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 4 
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
    //console.log('PROJECTILE CREATED')
    console.log(projectilesArray)
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

// function that wraps all class functions
function handleProjectiles(){
    for (i in projectilesArray) { 
        projectilesArray[i].update()
        projectilesArray[i].draw()
        destroyProjectilesOutOfScreen() 
    }
}
