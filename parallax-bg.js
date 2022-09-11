const cloudsBackground = new Image()
cloudsBackground.src = 'img/fundo-nuvens.png'

class Layer {
    constructor() {
        this.width = 500
        this.height = 1000
        this.x = 0
        this.y = -this.height
    }
    update() {
        this.y += 6
        if (this.y > canvas.height + 3000) this.y = -this.height
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = 1
        ctx.drawImage(cloudsBackground, this.x, this.y, this.width*2.2, this.height*2.2)
        ctx.restore()
    }
}

let layer2 = new Layer()

function handleLayer2() {
    layer2.update()
    layer2.draw()
}