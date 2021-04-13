/*const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;*/

var engine, world;
var boy;
var gameState = 0;
var timeMachine; 
var boyImg, timeMachineImg, manImg;
var bgImg, bgImg1;
var obstacle, obstacleImg;
var obstacleGroup;
var bullet, bulletImg, gun, gunImg;
var bulletGroup;
var girl, girlImg;
var temp_bullet;


function preload(){
boyImg = loadImage("walkingBoy.gif");
timeMachineImg = loadImage("timeMachine.jpg");
bgImg = loadImage("livingRoom.jpg");
bgImg1 = loadImage("Lab.jpg");
manImg = loadImage("Man.png");
girlImg = loadImage("Girl.png");
obstacleImg = loadImage("Obstacle.png");
bulletImg = loadImage("bullet.png");
gunImg = loadImage("Gun.png");
bgImg = loadImage("Lab.jpg");
bgImg1 = loadImage("livingRoom.jpg");
 

}
function setup(){
    var canvas = createCanvas(1340,600);
   // engine = Engine.create();
   // world = engine.world;
    boy = createSprite(100,300,10,20);
    boy.addImage("boy",boyImg);
    boy.addImage("man",manImg);
     boy.shapeColor = "Red"
    // console.log(boy);
   //  boy.debug = true;
    boy.setCollider("rectangle",0,0,100,300);

    timeMachine = createSprite(760,300,20,10);
    timeMachine.addImage(timeMachineImg);
    timeMachine.scale = 0.2
    timeMachine.shapeColor = "Orange"
    timeMachine.debug = true;

    girl = createSprite(700,410,10,10);
    girl.addImage(girlImg);
    girl.shapeColor = "Pink"
    girl.visible = false;

    gun = createSprite(120,250,10,10);
    gun.addImage(gunImg)
    gun.shapeColor = "yellow"
    gun.visible = false;
    gun.scale = 0.2;

    //boy.addAnimation("man",manImg);
   // timeMachine.addImage();
   obstacleGroup = new Group();
    bulletGroup = new Group();
}

function draw(){
    background(0);
    //Engine.update(engine);

    if(gameState===0){
        push()
        textSize(34.89);
        textFont("Great Vibes");
        fill("Aqua")
        text("You have come across a Time Machine. You always dreamt of travelling through the Time Machine to explore the future!",02,50)
       pop()
       
       background(bgImg)
       textSize(35);
       textFont("Great Vibes");
       fill("Pink")

        text("To get started with your journey press the Up Arrow key",300,110)

        timeMachine.visible = false;

        if(keyDown(UP_ARROW)){
            boy.y = boy.y + 50;
            gameState = 1;

        }
    }
    else
    
    if(gameState===1){
        background(bgImg)

        timeMachine.visible = true;

        if(keyDown(RIGHT_ARROW)){
            boy.velocityX = 4; 
        }

        if(keyDown(LEFT_ARROW)){
            boy.velocityX = -4;
        }

        textSize(35);
        textFont("Great Vibes");
        fill("Blue")
        text("Control the boy with help of arrow keys ", 430,50);
        text("and make it touch the Time Machine to enjoy the adventure of future",300,100);

     /* if(boy.x-timeMachine.x<boy.width/2+timeMachine.width/2 &&
            timeMachine.x - boy.x< boy.width/2 +timeMachine.width/2 &&
            boy.y-timeMachine.y< boy.height/2+timeMachine.height/2 &&
            timeMachine.y-boy.y<boy.height/2+timeMachine.height/2){
                gameState = 2;
               
            }
            else{
                gameState = 1;
            }*/
           
            if(boy.isTouching(timeMachine)){
                gameState = 2;
            }

    }
    
   


    else if(gameState===2){

        background(bgImg1);
        boy.changeImage("man",manImg);
        
        boy.scale = 0.3
        
        girl.visible = true;
        girl.scale = 0.3;

        boy.x = 400;
        boy.y = 400;

        timeMachine.visible = false;
        
        push()
        textSize(31);
        textFont("Great Vibes");
        fill(" blue")

        text("Cross the girl to reach your destination (Time Machine) after certain adventures to get back to the past.",200,50)
        text("You have 10 bullets to shoot the hurdles on your way. After the 10 bullets are over, you have to face the challenges on your own",70,100)
        text("When you touch any of the hurdles you'll have to go through them from the beginning",250,150)
        pop()
        
        textSize(35);
        textFont("Algerian");
        fill("Yellow ")
        text("Press 'S' to start your journey",310,200);

       
    if(keyDown("S")){
        gameState = 3;
    }
}

    else if(gameState === 3){
        background(bgImg);
    spawnObstacles();
   // boy.x = 100;
   // boy.y = 400;
    boy.velocityX = 2;
    girl.visible = false;
   
   // bullets();
    gun.visible = true;

    for(var i = 0; i<=3; i++){
        if(keyDown("A")){
            bullets();
     
        }
    }

    for(var i = 0; i<=6; i++){
        spawnObstacles();

        if(keyDown("space")){
          bullets();
           
           }
    }

   

    if(bulletGroup.isTouching(obstacleGroup)){
        obstacleGroup.destroyEach();
        bulletGroup.destroyEach();
    }

    if(boy.isTouching(obstacleGroup))
    {
        gameState=2;
        obstacleGroup.setVisibleEach(false);
        bulletGroup.setVisibleEach(false);
        gun.visible = false;
        
    }


    if(boy.x>1360){
        gameState =4;
        
    }
   /* if(bullet.x-obstacle.x<bullet.width/2+obstacle.width/2 &&
        obstacle.x - bullet.x< bullet.width/2 +obstacle.width/2 &&
        bullet.y-obstacle.y< bullet.height/2+obstacle.height/2 &&
        obstacle.y-bullet.y<bullet.height/2+obstacle.height/2)
        {
            obstacle.destroy();
        }*/
}
if(gameState === 4){
  
    background(bgImg1);
    boy.changeImage("boy",boyImg);
    boy.x = 700;
    boy.y = 268;
    boy.scale = 0.7;
    gun.visible = false;

    timeMachine.visible = true;
    timeMachine.scale = 0.099;
    timeMachine.x = 550;
    timeMachine.y = 300;
}
    drawSprites();
}

function spawnObstacles() {
    //write code here to spawn the clouds
    if (frameCount % 200 === 0) {
       obstacle = createSprite(1360,500,40,10);
       obstacle.addImage(obstacleImg);
    
     // obstacle.addImage(obstacleImg);
      obstacle.scale = 0.8;
      obstacle.velocityX = -3;
      
       //assign lifetime to the variable
       obstacle.lifetime = 700;
      
      //adjust the depth
      obstacle.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //add each cloud to the group
      obstacleGroup.add(obstacle);
    }
    
  }

  function bullets(){
     //if(frameCount%80 === 0){
      bullet = createSprite(220,211,10,10);
      bullet.addImage(bulletImg);
      bullet.scale = 0.05;
      bullet.velocityX = 10;
      bullet.shapeColor = "brown"
     
      bulletGroup.add(bullet); 
    // }
    
      //bullet.lifetime = 600;
  }
  














  /*text("After he reached the future he was suprised to meet his future daughter! He had a great conversation with her and visited a few places with the help of her. After a day, he wanted to get back to his world (The Past)",200,150);
  text("But unfortunately the Time Machine was broken and he was really upset about it");
  text("At that moment his future daughter who understood his situation started to guide him to a new machine")*/