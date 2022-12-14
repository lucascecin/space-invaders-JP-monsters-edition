//to handle enemy explosion
particlesArray = [];

class Particle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;

    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.opacity -= 0.017
    }
} 

function updateParticles() {
    for (i in particlesArray) {
        particlesArray[i].update();
    }
    for (i = particlesArray.length - 1; i >= 0; i--) {
        if (particlesArray[i].opacity <= 0) {
            particlesArray.splice(i, 1)
        }
    }
}

function drawParticles() {
    for (i in particlesArray) {
        particlesArray[i].draw();
    }
}