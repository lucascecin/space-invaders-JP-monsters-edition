let grids = [new Grid()]

class Grid {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.enemies = [];

    for (i = 0; i < 10; i++) {
        this.enemies.push(new Enemy(randomSelectedEnemy)) 
        console.log(this.enemies)
        } 
    }

    update() {}
}

grids.forEach(grid => {
    grid.update()
    grid.enemies.forEach(invader => {
        invader.update()
    })
})

