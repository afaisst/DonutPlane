// By Andreas Faisst, December 2021
// Graphics from: https://www.gamedeveloperstudio.com/

// OTHER FUNCTIONS -------

// This function draws a rectangle with round corners.
function roundedRectangle(x, y, w, h)
{
  var mx = x + w / 2;
  var my = y + h / 2;
  ctx.beginPath();
  ctx.strokeStyle='rgb(255,240,0)';   
  ctx.lineWidth="10";   
  ctx.fillStyle = 'rgb(255,255,0)';
  ctx.moveTo(x,my);
  ctx.quadraticCurveTo(x, y, mx, y);
  ctx.quadraticCurveTo(x+w, y, x+w, my);
  ctx.quadraticCurveTo(x+w, y+h, mx, y+h);
  ctx.quadraticCurveTo(x, y+h, x, my);      
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

// SUN
const sunImage = new Image();
sunImage.src = "./graphics/sun.png";

class Sun {
    constructor(){
        this.spriteWidth = 553 * 0.3;
        this.spriteHeight = 717 * 0.3;
        this.x = canvas.width*0.8;
        this.y = canvas.height*0.01;
    }
    update(){
        this.x = this.x - gameSpeed*0.025;
        if ((this.x + this.spriteWidth) < 0) this.x = canvas.width + this.spriteWidth;
    }
    draw(){
        ctx.drawImage(sunImage, this.x , this.y , this.spriteWidth , this.spriteHeight );

    }
}
const sun = new Sun();


// BACKGROUND
//const backgroundImage0 = new Image();
//backgroundImage0.src = "./graphics/sky0.png"
const backgroundImage1 = new Image();
backgroundImage1.src = "./graphics/sky1.png"
const backgroundImage2 = new Image();
backgroundImage2.src = "./graphics/sky2.png"

class Background1 {
    constructor(){
        this.spriteWidth = 1434 * 1;
        this.spriteHeight = 668 * 1;
        this.x1 = 0;
        this.x2 = this.x1 + this.spriteWidth*0.999;
        this.y = -50;
    }
    update(){
        this.x1 = this.x1 - gameSpeed*0.15;
        this.x2 = this.x2 - gameSpeed*0.15;
        if ((this.x1 + this.spriteWidth) < 0) this.x1 = canvas.width;
        if ((this.x2 + this.spriteWidth) < 0) this.x2 = this.x1 + this.spriteWidth*0.999;
    }
    draw(){
        ctx.drawImage(backgroundImage1, this.x1 , this.y , this.spriteWidth , this.spriteHeight );
        ctx.drawImage(backgroundImage1, this.x2, this.y , this.spriteWidth , this.spriteHeight );

    }
}
const background1 = new Background1();

class Background2 {
    constructor(){
        this.spriteWidth = 1434 * 1;
        this.spriteHeight = 332 * 1;
        this.x1 = 0;
        this.x2 = this.x1 + this.spriteWidth*0.999;
        this.y = 130;
    }
    update(){
        this.x1 = this.x1 - gameSpeed*0.3;
        this.x2 = this.x2 - gameSpeed*0.3;
        if ((this.x1 + this.spriteWidth) < 0) this.x1 = canvas.width;
        if ((this.x2 + this.spriteWidth) < 0) this.x2 = this.x1 + this.spriteWidth*0.999;
    }
    draw(){
        ctx.drawImage(backgroundImage2, this.x1 , this.y , this.spriteWidth , this.spriteHeight );
        ctx.drawImage(backgroundImage2, this.x2, this.y , this.spriteWidth , this.spriteHeight );

    }
}
const background2 = new Background2();


// ISLANDS
const palmtreeImage1 = new Image();
palmtreeImage1.src = "./graphics/palmtree1.png";
const palmtreeImage2 = new Image();
palmtreeImage2.src = "./graphics/palmtree2.png";
const deliverImage = new Image();
deliverImage.src = "./graphics/heart.png";

class Island {
    constructor(){
        this.x = canvas.width + 30;
        this.y = canvas.height * 0.95;
        
        this.width = Math.random()*200 + 70;
        this.height = 50;
        this.score = parseInt((270 - this.width + 15)/10);

        this.delivered = false; // set this to true if this island was delivered.
        
        this.palmtreeWidth = 244;
        this.palmtreeHeight = 344;

        this.ycoin = this.y;
        this.deliverImgWidth = 256;
        this.deliverImgHeight = 256;

    }
    update(){
        this.x = this.x - gameSpeed;
    }
    draw(){

        // add palm trees
        if (this.width < 150){
            ctx.drawImage(palmtreeImage1 , this.x+this.width*0.4 , this.y-60 , this.palmtreeWidth*0.2 , this.palmtreeHeight*0.2);
        } else {
            ctx.drawImage(palmtreeImage1 , this.x+this.width*0.8 , this.y-60 , this.palmtreeWidth*0.2 , this.palmtreeHeight*0.2);
            ctx.drawImage(palmtreeImage2 , this.x+this.width*0.1 , this.y-60 , this.palmtreeWidth*0.2 , this.palmtreeHeight*0.2);
        }
        

        // draw Island
        roundedRectangle(this.x, this.y, this.width, this.height);
        /*ctx.fillStyle = 'black';
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(this.x , this.y , this.width, this.height);
        ctx.stroke();
        ctx.closePath();*/


        // display score (can be deleted afterwards)
        //ctx.fillStyle = 'black';
        //ctx.fillText(this.score , this.x + this.width/2, this.y-this.height*1);

        // pop a little coin if successfully delivered
        //Math.sin(20*gameFrame * Math.PI/180)*40
        if (this.delivered){
            this.ycoin = this.ycoin - 4;

            if (this.ycoin > canvas.height*0.7){
                /*ctx.beginPath();
                ctx.fillStyle = 'red'
                ctx.rect(this.x + this.width/2 , this.ycoin  , 20, 20);
                ctx.fill();
                ctx.closePath();*/
                var modifier = Math.sin(20*gameFrame * Math.PI/180)*1.0
                ctx.drawImage(deliverImage , this.x + this.width/2 - 15*modifier , this.ycoin ,
                    this.deliverImgWidth*0.15 * modifier,
                    this.deliverImgHeight*0.15 );
            }
        }
    }

};
