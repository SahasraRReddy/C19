var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ufo;
var space, invisibleGround, spaceImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

function preload(){
  ufo = loadImage("ufo.png")

  space = loadImage("space.png")

  obstacle1 = loadImage("obstacle_1.png");
  obstacle2 = loadImage("obstacle_2.png");
  obstacle3 = loadImage("obstacle_3.png");
  obstacle4 = loadImage("obstacle_4.png");
  obstacle5 = loadImage("obstacle_5.png");
  obstacle6 = loadImage("obstacle_6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}


function setup(){
  createCanvas(600, 200);

  ufo = createSprite(50,180,20,50);
  ufo.scale = 0.5;

  space = createSprite(200,180,400,20);
  space.addImage(spaceImage);
  space.x = space.width /2;
  space.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;

  
}

function draw(){
  ufo.debug = true;
  background(255);
  text("Score: "+ score, 500,50);

  score = score + Math.round(getFrameRate()/60);
    space.velocityX = -(6 + 3*score/100);
  
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
    
      if(keyDown("space") && ufo.y >= 159) {
       ufo.velocityY = -12;
      }
    
      ufo.velocityY = ufo.velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      ufo.collide(invisibleGround);
      spawnClouds();
      spawnObstacles();
    
      if(obstaclesGroup.isTouching(ufo)){
          gameState = END;
      }
    }


  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    space.velocityX = 0;
    ufo.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    ufo.changeAnimation("collided",ufo_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle_1);
              break;
      case 2: obstacle.addImage(obstacle_2);
              break;
      case 3: obstacle.addImage(obstacle_3);
              break;
      case 4: obstacle.addImage(obstacle_4);
              break;
      case 5: obstacle.addImage(obstacle_5);
              break;
      case 6: obstacle.addImage(obstacle_6);
              break;
      default: break;
    }
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
     //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  
  
 
  
  score = 0;
  
}