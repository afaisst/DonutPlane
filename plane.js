// By Andreas Faisst, December 2021
// Graphics from: https://www.gamedeveloperstudio.com/

// PARTICLES ------
const particlesArray = [];
class Particle {
    constructor(){
        this.x = player.x;
        this.y = player.y + Math.random()*2-1;
        this.vx = 50*player.ax;
        this.vy = Math.random()*2;
        this.radius = Math.random()*15 + 5;
        this.color = 'rgba(255,255,255,0.1)';
    }
    update(){
        this.x = this.x - this.vx;
        this.vx = this.vx + dragforce;
        this.y = this.y + this.vy;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0 , Math.PI * 2 , true);
        ctx.fill();
        ctx.closePath();
    }
}

const particlesArray_fuelplane = [];
class ParticleFuelPlane {
    constructor(){
        this.x = 100;
        this.y = 100 + Math.random()*2-1;
        this.vx = 10;
        this.vy = Math.random()*2;
        this.radius = Math.random()*15 + 5;
        this.color = 'rgba(255,255,255,0.1)';
    }
    update(){
        this.x = this.x - this.vx;
        this.vx = this.vx + dragforce;
        this.y = this.y + this.vy;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0 , Math.PI * 2 , true);
        ctx.fill();
        ctx.closePath();
    }
}


// FUEL PLANE ------
// This plane goes faster then the player's plane and allows
// the player to refuel!
const fuelplaneImage = new Image();
fuelplaneImage.src = "./graphics/fuelplane1.png";
class FuelPlane {
    constructor(){
        this.x = 0;
        this.y = player.y;
        this.vx = Math.random()*3+1;
        this.refuelspeed = Math.random()*1 + 0.3; // speed at which refueling happens
        this.spriteWidth = 507;
        this.spriteHeight = 279;
        this.radius = 30;
    }
    update(){
        this.x = this.x + this.vx;
        this.y = this.y + Math.sin(1.5*gameFrame * Math.PI/180)*1.1;       
    }
    draw(){

        /*ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0 , Math.PI * 2 , true);
        ctx.fill();
        ctx.closePath();*/

        ctx.drawImage(fuelplaneImage,this.x-40,this.y-28,this.spriteWidth*0.2,this.spriteHeight*0.2);
    }
}




// PLAYER PLANE -----------
const playerImage = new Image();
playerImage.src = "./graphics/player1.png";

class Player {
    constructor(){
        this.xstart = canvas.width/2;
        this.ystart = canvas.height*0.15;
        this.radius = 30;
        this.vx = 0;
        this.ax = 0.2;
        this.x = this.xstart;
        this.y = this.ystart;
        this.angle = 0;
        
        this.fuelcostidle = 0.01 // fuel cost if idle
        this.fuelcostacc = 0.2 // fuel cost if accelerating

        this.spriteWidth = 817;
        this.spriteHeight = 483;

    }
    update(){

        this.y = this.y + Math.sin(5*gameFrame * Math.PI/180)*1.1;

        this.x = this.x + this.vx;
        this.vx = this.vx - dragforce;

        if (this.x < 50){
            this.x = 50;
            this.vx = 0;

        }
        if (this.x > canvas.width*0.95){
            this.x = canvas.width*0.95;
            this.vx = 0;
        }

        if (player_acc){
            player.acc();
        }

        // Fuel
        fuel = fuel - this.fuelcostidle;
        if (fuel > 100) fuel = 100;
        if (fuel < 0) fuel = 0; // CHANGE THIS WHEN WE HAVE FUELING OPTION!

    }
    acc(){
        this.vx = this.vx + this.ax;
        fuel = fuel - this.fuelcostacc;
    }
    draw(){
        
        /*ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0 , Math.PI * 2 , true);
        ctx.fill();
        ctx.closePath();*/

        ctx.drawImage(playerImage,this.x-40,this.y-28,this.spriteWidth*0.1,this.spriteHeight*0.1);
        
    }
}
const player = new Player();


// PACKAGES ------------

// create image array
const nbrPackageImages = 3
const packageImageArray = [];
for (let i = 0; i < nbrPackageImages; i++){
    packageImageArray.push(new Image());
    packageImageArray[i].src = './graphics/drop' + (i+1) + '.png';
}

class Package {
    constructor(){
        this.x = player.x+10;
        this.y = player.y;
        this.vx = player.vx
        this.vy = 0;
        this.radius = 20;
        this.counted = false;

        this.angle = 0;
        this.anglespeed = gameSpeed *  Math.random()/10;

        this.spriteWidth = 544;
        this.spriteHeight = 457;
        this.imageidx = parseInt(Math.random()*(nbrPackageImages)); // because 0-indexed (down-rounding)
    }
    update(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        this.vx = this.vx - dragforce;
        this.vy = this.vy + gravityforce;

        this.angle = this.angle + this.anglespeed * ((this.y - canvas.height)/(canvas.height)) ;
    }
    draw(){
        /*ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0 , Math.PI * 2 , true);
        ctx.fill();
        ctx.closePath();*/

        ctx.save();
        ctx.translate(this.x , this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(packageImageArray[this.imageidx], -20 , -15 ,
            this.spriteWidth*0.065 , this.spriteHeight*0.065)
        ctx.restore();
        
    }
}
