const playerImage = new Image();
playerImage.src = 'img/nave.png';

laserSound = new Audio();
laserSound.src = 'audio/laser1.wav'
laserSound.volume = 0.2;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 75;
        this.dx = 0;
        this.dy = 0;
        this.dead = false;
        this.hp = 100;
        this.mvRight = false;
        this.mvLeft = false;
        this.firing = false;
        this.canFireAgain = true; // to avoid turbo fire
        this.opacity = 1;
    }
    update(){
        if (this.mvRight) {
            this.x += 8;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width
            }
        }
        if (this.mvLeft) {
            this.x -= 8;
            if (this.x < 0) {
                this.x = 0
            }
        }
    }
    draw(){
        //ctx.fillStyle = 'blue'
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height)
        ctx.restore();
    }
    // se já deu 1 tiro e ainda não levantou space, canFireAgain = false
    shoot(){ 
        if (this.firing && this.canFireAgain) {
            //console.log('SHOOT!');
            createProjectile()
        }
    }
}

//let player = new Player (canvas.width/2 - 25, 500)
let player = new Player (490, 500)

function handlePlayer() {
    player.update();
    player.draw();
}

