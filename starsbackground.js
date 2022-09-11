// deals with the animated background

let maxStars = 300
let starsArray = []

class Star {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 2;
        this.radius = Math.random() * 1.2;
    }
    update(){
        this.x += 0;
        this.y += this.dy * gameSpeed;
        //respawn no topo
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    draw(){
        ctx.fillStyle = 'white'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
    }
}

function initStars(){ 
    for (let i = 0; i < maxStars ; i++) { 
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsArray.push(new Star(x, y))
    }
}    
initStars()

function handleStars(){
    for (i in starsArray) {
        starsArray[i].update();
        starsArray[i].draw();
    }
}
