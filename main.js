// By Andreas Faisst, December 2021
// Graphics from: https://www.gamedeveloperstudio.com/



// EVENTS
window.addEventListener('keydown' , function(event){
    if (event.code === "ArrowDown"){
        if (packageArray.length <= 0){
            packageArray.push(new Package());
        }
    }
    if (event.code === "ArrowRight"){
        player_acc = true;
    }
    if (event.code === "ArrowLeft"){
    }
    if (event.code === "Space" && !gamestarted) {
        score = 0;
        fuel = 100;
        gameOver = false;
        animate(); 
        gamestarted = true;
        gameFrame = 0;
    }
});

window.addEventListener('keyup' , function(event){
    if (event.code === "ArrowRight"){

        player_acc = false;
    }
    if (event.code === "ArrowLeft"){
    }
});


// HANDLERS

// Particle handler for plane
function particleHandler(){

    if (gameFrame % 1 == 0){
        particlesArray.unshift(new Particle());
    }
    
    for (i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    if (particlesArray.length > 20){
        particlesArray.splice(particlesArray.length-5,5);
    }
}

// Particle handler for fuel plane
function particleFuelPlaneHandler(){

    if (fuelplaneArray.length > 0){
        if (gameFrame % 1 == 0){
            particlesArray_fuelplane.unshift(new ParticleFuelPlane());
            particlesArray_fuelplane[0].x = fuelplaneArray[0].x;
            particlesArray_fuelplane[0].y = fuelplaneArray[0].y;
        }
        
        for (i = 0; i < particlesArray_fuelplane.length; i++){
            particlesArray_fuelplane[i].update();
            particlesArray_fuelplane[i].draw();
        }
        if (particlesArray_fuelplane.length > 20){
            particlesArray_fuelplane.splice(particlesArray_fuelplane.length-5,5);
        }

    }
}

// Fuel Plane Handler
function fuelPlaneHandler(){

    // create fuel plane only if there is none already there
    if ((gameFrame % fuelplanespawnspeed == 0) && (fuelplaneArray.length <= 0) ){
        fuelplaneArray.push(new FuelPlane());
    }

    // update and remove and refuel
    for (let i = 0; i < fuelplaneArray.length; i++){

        // update
        fuelplaneArray[i].update();
        fuelplaneArray[i].draw();

        // refuel
        const dist = Math.sqrt( Math.pow(fuelplaneArray[i].x - player.x,2) + Math.pow(fuelplaneArray[i].y - player.y,2)  )
        if ( dist < (fuelplaneArray[i].radius + player.radius) ) {
            fuel += fuelplaneArray[i].refuelspeed;
        }

        // remove
        if ( (fuelplaneArray[i].x > canvas.width+50) ){
            fuelplaneArray.splice(i,1);
            fuelplanespawnspeed = parseInt(Math.random()*800+300); // recalculate next spawn.
        } 

    }



 
}



// package handler
function packageHandler(){
    for (let i = 0; i < packageArray.length; i++){
        packageArray[i].update();
        packageArray[i].draw();
    }
    for (let i = 0; i < packageArray.length; i++){
        if ( (packageArray[i].x < 0) || (packageArray[i].x > canvas.width) || (packageArray[i].y > canvas.height) ){
            packageArray.splice(i,1);
        }  
    }    
}

// island handler
function islandHandler(){

    // Adding new Islands
    if (islandArray.length <= 0){
        islandArray.push(new Island);
    } else {
        // condition for new Island to spawn.
        if ( (islandArray[islandArray.length-1].x + islandArray[islandArray.length-1].width/2) <  canvas.width*0.2 ){
            islandArray.push(new Island);
        }
    }

    // Update Islands
    for (let i = 0; i < islandArray.length; i++){
        islandArray[i].update();
        islandArray[i].draw();
    }

    // Remove Islands
    for (let i = 0; i < islandArray.length; i++){
        if ( (islandArray[i].x + islandArray[i].width) < 0 ) {
            islandArray.splice(i,1);
        }  
    } 

    // Score
    for (let i = 0; i < packageArray.length; i++){
        for (let j = 0; j < islandArray.length; j++){

            if ( !islandArray[j].delivered && Math.abs( packageArray[i].x - (islandArray[j].x+islandArray[j].width/2) ) <=  (islandArray[j].width/2) & (packageArray[i].y >= islandArray[j].y) & (!packageArray[i].counted) ){
                packageArray[i].counted = true;
                score = score + islandArray[j].score;
                islandArray[j].delivered = true;
            }



        }
    } 

}

// GameOver Handler
function gameOverHandler(){

    if (fuel <= 0){
        
        ctx.save();
        ctx.font = '60px Georgia';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText("GAME OVER!", canvas.width/2, canvas.height/2);

        ctx.fillStyle = 'red';
        ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);

        ctx.restore();


        gameOver = true;
    }

}



// ANIMATE
function animate(){
    ctx.clearRect(0, 0, canvas.width , canvas.height);


    // backgrounds
    sun.update();
    sun.draw();
    background1.update();
    background1.draw();
    background2.update();
    background2.draw();
    
    particleFuelPlaneHandler();
    fuelPlaneHandler();

    packageHandler();
    islandHandler();
    
    particleHandler();
    player.update();
    player.draw();

    // score
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score , 70, 20);

    // Fuel
    //ctx.fillStyle = 'black';
    //ctx.fillText('Fuel: ', canvas.width-120, 20);
    //ctx.fillText(' ' + (Math.round(fuel*10)/10) , canvas.width-50, 20);
    
    ctx.beginPath();
    if (fuel >= 70){
        ctx.fillStyle = "green";
    }
    if ( (fuel >= 30) && (fuel < 70) ){
        ctx.fillStyle = "orange";
    }
    if ( fuel < 30){
        ctx.fillStyle = "red";
    }
    ctx.strokeStyle = "black";
    ctx.fillRect(canvas.width-170 , 10 , (Math.round(fuel*10)/10)*1.5 , 20);
    ctx.lineWidth = 4;
    ctx.rect(canvas.width-170 , 10 , 100*1.5 , 20);
    ctx.stroke();
    
    ctx.closePath();

    // Game Over
    gameOverHandler();


    gameFrame++;
    if (!gameOver) requestAnimationFrame(animate);
}


// START GAME
// Start game
function start(){

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText('Deliver the Donuts to the Islands.', canvas.width/2, canvas.height/2-20);
    ctx.strokeText('Don\'t run out of fuel!', canvas.width/2, canvas.height/2+20);
    ctx.strokeText('(Refuel by following other planes.)', canvas.width/2, canvas.height/2+60);
    ctx.strokeText('press SPACE BAR to START', canvas.width/2, canvas.height/2+140);

    ctx.fillStyle = 'white';
    ctx.fillText('Deliver the Donuts to the Islands.', canvas.width/2, canvas.height/2-20);
    ctx.fillText('Don\'t run out of fuel!', canvas.width/2, canvas.height/2+20);
    ctx.fillText('(Refuel by following other planes.)', canvas.width/2, canvas.height/2+60);

    ctx.fillStyle = 'cyan';
    ctx.fillText('press SPACE BAR to START', canvas.width/2, canvas.height/2+140);
    

}

start();