var goal1,goal2,boundary1,boundary2,boundary3,boundary4,boundary5,
    boundary6,boundary7,boundary8,boundary9,boundary10;
var gameState = "serve";
var striker, playerMallet,computerMallet;
//variables to keep the score
var compScore = 0;
var playerScore = 0;
var car1,car2,footballpitch,football;
var timer; 
var timeLeft = 90;
function preload(){ 
  car1 = loadImage("car1.png");
  car2 = loadImage("car2.png"); 
  footballpitch =loadImage("footballpitch.png"); 
  football=loadImage("football.png")
}
function setup(){
  createCanvas(windowWidth, windowHeight);
goal1=createSprite(width-50,height/2,40,130);
goal1.shapeColor=("yellow");
 goal2=createSprite(50,height/2,40,130);
goal2.shapeColor=("yellow");

  boundary1=createSprite(width/2,20,width-50,5);
  boundary2=createSprite(width/2,height-20,width-50,5);
  boundary3=createSprite(30,height/2,5,height-40);
  boundary4=createSprite(width-30,height/2,5,height-40);
  

// creating objects and giving them colours
striker = createSprite(width/2,height/2,10,10,10);
striker.addImage(football);
  striker.scale=0.2;

 playerMallet = createSprite(width-80,height/2,10,50);
playerMallet.addImage(car2);
  playerMallet.scale=0.5;
  // playerMallet.debug=true;
  playerMallet.setCollider("rectangle",0,0,90,50)

computerMallet = createSprite(80,height/2,10,50);
computerMallet.addImage(car1);
 computerMallet.scale=0.1;
  //computerMallet.debug=true;
  computerMallet.setCollider("rectangle",0,0,500,300)



}
function draw() {
  //clear the screen
 background(footballpitch);
  //background("green");
  //place info text in the center and giving gamestate 
  if (gameState === "serve") {
    textSize(18);
    fill ("maroon");
    text("Press Space to Strike",120,180);
    boundary1.visible=false;
    boundary2.visible=false;
    boundary3.visible=false;
    boundary4.visible=false;
    //computerMallet.x = 200;
    //computerMallet.y = 350;
  }
  //display scores
  textSize(18);
  fill("maroon");
  text(compScore, width/2-20,30);
  text(playerScore,width/2+15,30);
  
  //make the player paddle move with the Arrow keys
    
    if(keyDown("left")){
    playerMallet.x = playerMallet.x-10
    
  }
  if(keyDown("right")){
     playerMallet.x = playerMallet.x+10
    
  }
  if(keyDown("up")){
  
    playerMallet.y = playerMallet.y- 10;
   
  }
  if(keyDown("down")){
    
   
    playerMallet.y = playerMallet.y+10;
   
  }
   if(keyDown("a")){
    computerMallet.x = computerMallet.x-10
    
  }
  if(keyDown("d")){
     computerMallet.x = computerMallet.x+10
    
  }
  if(keyDown("w")){
 
    computerMallet.y = computerMallet.y- 10;
   
  }
  if(keyDown("s")){
    
    
   
    computerMallet.y =computerMallet.y+10;
   
  }
  
  
 
   
  
  //draw line at the centre
   for (var i = 0; i < height; i=i+20) {
    line(width/2,i,width/2,i+10);
  }
  
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom e
 
  edges=createEdgeSprites();
  striker.bounceOff(boundary1);
  striker.bounceOff(boundary2);
  striker.bounceOff(boundary3);
  striker.bounceOff(boundary4);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
 computerMallet.collide(boundary1);  
computerMallet.collide(boundary2);
  computerMallet.collide(boundary3);
  computerMallet.collide(boundary4);
  playerMallet.collide(boundary1);  
playerMallet.collide(boundary2);
  playerMallet.collide(boundary3);
  playerMallet.collide(boundary4);


 
  
  //serve the striker when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    striker.velocityX = striker.velocityX -1;
    striker.velocityY = striker.velocityY -1;
    gameState = "play";
    
  }
  
  // Score
  if(striker.isTouching(goal1) || striker.isTouching(goal2) )
  {
    if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
      }
      
      reset();
      gameState = "serve";
  }
  
  // Game State END
  if (playerScore === 5 || compScore === 5){
    gameState = "end";
    fill("maroon");
    textSize(18);
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
    playerMallet.x = 200;
    playerMallet.y = 40;
  }
  
  // Restarting the Game
  if (keyDown("r") && gameState === "end") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}
function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function reset() {
  striker.x = width/2;
  striker.y = height/2;
  playerMallet.x=width-80;
  playerMallet.y=height/2;
  computerMallet.x=80;
  computerMallet.y=height/2;
  striker.velocityX = 0;
  striker.velocityY = 0;
}
function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    gameOver();
  }
}


