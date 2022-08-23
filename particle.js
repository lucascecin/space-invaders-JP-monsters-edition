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

    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

function handleParticles() {

}

// Chris Couses
// Usa particles.foreach(particle => {particle.update()})