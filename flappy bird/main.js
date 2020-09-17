var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
        this.ySpeed = 3;
    }
    show() {
        c.fillStyle = 'yellow';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        this.y += this.ySpeed;
        this.ySpeed += gravity;
    }
}

class TopPipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = Math.floor(Math.random() * 500) + 100;
        this.xSpeed = 1;
        
        this.needsAdd = true;
    }
    show() {
        c.fillStyle = 'green';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        this.x -= this.xSpeed;
        
        if (p.x < this.x + this.w && p.x + p.w > this.x && p.y < this.y + this.h && p.y + p.h > this.y) {
            canFlap = false;
            for (let i = 0; i < topPipes.length; i++) {
                topPipes[i].xSpeed = 0;
                bottomPipes[i].xSpeed = 0;
            }
        }
        //add to score
        if (p.x < this.x + this.w && p.x + p.w-10 > this.x && this.needsAdd) {
            score++;
            this.needsAdd = false
        }
    }
}

class BottomPipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 800;
        this.xSpeed = 1;
    }
    show() {
        c.fillStyle = 'green';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        this.x -= this.xSpeed;
        
        if (p.x < this.x + this.w && p.x + p.w > this.x && p.y < this.y + this.h && p.y + p.h > this.y) {
            canFlap = false;
            for (let i = 0; i < topPipes.length; i++) {
                topPipes[i].xSpeed = 0;
                bottomPipes[i].xSpeed = 0;
            }
        }
    }
}

var p;

var gravity = 0.1;

var topPipes = [];
var bottomPipes = [];
var pipeX = 800;

var score = 0;

var canFlap = true;

window.onload = function() {
    start();
    setInterval(update, 10);
}

function start() {
    p = new Player(400, 400);
    
    for (let i = 0; i < 10; i++) {
        var tp = new TopPipe(pipeX, 0);
        topPipes.push(tp);
        
        var bp = new BottomPipe(pipeX, tp.h+110);
        bottomPipes.push(bp);
        
        pipeX+=300;
    }
}

function update() {
    canvas.width=canvas.width;
    //player
    p.show();
    p.update();
    //ground
    c.fillStyle = 'rgb(102, 72, 0)';
    c.fillRect(0, 750, 800, 100);
    //roof
    c.fillRect(0, 0, 800, 50);
    //collision with ground and roof
    if (p.y >= 750-40) {
        location.reload();
    }
    if (p.y <= 0+40) {
        location.reload();
    }
    //pipes
    for (let i = 0; i < topPipes.length; i++) {
        topPipes[i].show();
        bottomPipes[i].show();        
        topPipes[i].update();
        bottomPipes[i].update();
    }
    //score
    document.getElementById("showScore").innerHTML = score;
}

function keyDown(e) {
    if (canFlap) {
        p.ySpeed = -3;
    }
}

document.onkeydown = keyDown;