var ss;
var bgm;
var spaceShip , bullet,  background, Enemy1, Enemy2, Enemy3 ,Enemy4 ,bulletGroup;
var spaceShipImage, bulletImage, enemy1Image, enemy2Image, enemy3Image ,enemy4Image, backgroundImage;
var speed;
var background;
var game,health;
var health1,health2,health3;
var health1Image,health2Image,health3Image;
var barrier;
var GameOver,gom,hrtm;
var explode;
var spaceinvaders,spaceinvaderImage;
var start,startIMG,start2IMG,difficulty,difficultyIMG1,difficultyIMG2;
var Score,spcgrp;


speed = 3;



function preload(){
  
  backgroundImage = loadImage("images/background.png");
  GameoverImage = loadImage("images/gameover.png");
  bulletImage = loadImage("images/bullet.png");
  spaceShipImage = loadImage("images/spaceShip.png");
 enemy1Image = loadImage("images/enemy1.png");
 enemy2Image = loadImage("images/enemy2.png");
  enemy3Image = loadImage("images/enemy3.png");
 enemy4Image = loadImage("images/enemy4.png");
 health1Image = loadImage("images/fullheart1.png");
 health2Image = loadImage("images/halfheart1.png");
  health3Image = loadImage("images/emptyheart1.png");
  spaceinvaderImage = loadImage("images/spaceinvaders.png");
  startIMG = loadImage("images/start.png");
  difficultyIMG1= loadImage("images/difficultyMedium.png")
  difficultyIMG2= loadImage("images/difficultyHard.png")

  ss = loadSound("music/lazer.mp3");
  bgm=loadSound("music/bgmusic.mp3");
  gom=loadSound("music/gameover.wav");
  hrtm=loadSound("music/damage.mp3");
  explode = loadSound("music/explotion.mp3")
}

  // creating spaceShip to shoot bullets



function setup() {
  createCanvas(1000, 600);
  



  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 1.2
  
  spaceinvaders = createSprite(500,150,20,20);
spaceinvaders.addImage(spaceinvaderImage);
spaceinvaders.scale = 0.20

  //create spaceship
  spaceShip = createSprite(900,220,20,50);
  spaceShip.addImage(spaceShipImage); 
  spaceShip.scale = 0.07;

  //creating health
  health1=createSprite(200,50,20,20)
health1.addImage(health1Image);
health1.scale = 0.03

health2=createSprite(230,50,20,20)
health2.addImage(health1Image);
health2.scale = 0.03

health3=createSprite(260,50,20,20)
health3.addImage(health1Image);
health3.scale = 0.03



start = createSprite(480,350,20,20);
start.addImage(startIMG);
start.scale = 0.15

difficulty = createSprite(50,50,20,20);
difficulty.addImage(difficultyIMG1);
difficulty.scale =0.07

//creating gameover sign
GameOver= createSprite(500,300,20,20)
    GameOver.addImage(GameoverImage);
    GameOver.scale = 0.5;

    //making a collition barrier
barrier=createSprite(1100,300,20,600)

  health=7;
   game=1;


   score = 0  


   //making groups
  Enemy1= new Group();
  Enemy2= new Group();
  Enemy3= new Group();
  Enemy4= new Group();
  spcgrp = new Group();
bulletGroup= new Group();



}




function draw() {







GameOver.visible = false;




if(health>6){
health1.visible = false;
health2.visible = false;
health3.visible = false;
difficulty.visible = false



if(mousePressedOver(start)){

  spaceinvaders.visible = false;

  health = 6
  bgm.play()
}
spaceShip.visible = false;
}


  // moving ground
  background.velocityX = 3 

  if (background.x > 900){
    background.x = background.width/6;
  }

  if (health> 0 && health < 7){






difficulty.visible = true;
    spaceShip.visible = true;
    health1.visible = true;
    health2.visible = true;
    health3.visible = true;

if (World.frameCount % 100 ==0){
speed = speed+1;
}


GameOver.visible = false;
start.visible = false;






 //moving spaceship
  spaceShip.y = World.mouseY
  
   // release bullet when space key is pressed
if(speed<30){
if( World.frameCount % 20 == 0 && keyDown("space")){
createbullet();
}
difficulty.addImage(difficultyIMG1);
}

if(speed > 29){

  if(keyWentDown("space")){
    createbullet();
difficulty.addImage(difficultyIMG2);
  }
}


  
  
  //creating continous enemies
  var select_Enemy = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_Enemy == 1) {
     Enemy_1();
    } else if (select_Enemy == 2) {
      Enemy_2();
    } else if (select_Enemy == 3) {
      Enemy_3();
    } else {
      Enemy_4();
    }
  }


  if(Enemy1.collide(barrier)){
    Enemy1.visible = false;
health = health - 1;
hrtm.play();
  }
  if(Enemy2.collide(barrier)){
    Enemy2.visible = false;
health = health - 1;
hrtm.play();
  }
  if(Enemy3.collide(barrier)){
    Enemy3.visible = false;
health = health - 1;
hrtm.play();
  }
  if(Enemy4.collide(barrier)){
    Enemy4.visible = false;
health = health - 1;
hrtm.play();

  }
  
  if (bulletGroup.isTouching(Enemy1)) {
  Enemy1.destroyEach();
explode.play();
    score=score+1;
}


if(health<6 && health>4){
health3.addImage(health2Image)
health3.scale = 0.05

}

if(health<5 && health>3){
health3.addImage(health3Image)
health3.scale = 0.08

}

if(health<4 && health>2){
health2.addImage(health2Image);
health2.scale=0.05

}

if(health<3 && health>1){
  health2.addImage(health3Image);
  health2.scale=0.08 


  }

  if(health<2 && health>0){
    health1.addImage(health2Image);
    health1.scale=0.05
  
    }

    if(health<1 && health>-1){
      health1.addImage(health3Image);
      health1.scale=0.08

      gom.play();

      

      }

      

 if (bulletGroup.isTouching(Enemy2)) {
Enemy2.destroyEach();

explode.play();
  
  score=score+3;
}



 if (bulletGroup.isTouching(Enemy3)) {
  Enemy3.destroyEach();
explode.play();
  score=score+2;
}



if (bulletGroup.isTouching(Enemy4)) {
  Enemy4.destroyEach();
  explode.play();
   score=score+1;
}






  }
  else{
    if(health <1){


difficulty.visible = false;
GameOver.visible = true;
    background.velocityX = 0


    if(keyDown("space")){
score=0;
health=6;
speed=3
tt=1;



health1.addImage(health1Image);
health2.addImage(health1Image);
health3.addImage(health1Image);

health1.scale = 0.03;
health2.scale = 0.03;
health3.scale = 0.03;

    }
    }


  } 


  drawSprites();

if(health<7){
    fill ("white");
text("Score: "+ score, 850,50,50,50);
}


}         



console.log("An evil alien group has attacked earth.You are our last hope,shoot down as many alien spaceships as you can!");

function Enemy_1() {
  var enemy1 = createSprite(0,Math.round(random(20, 370)), 10, 10);
 enemy1.addImage(enemy1Image);
  enemy1.velocityX = speed;
  enemy1.lifetime = 300;
  enemy1.scale = 0.10;
  Enemy1.add(enemy1);

}

function Enemy_2() {
  var enemy2 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  enemy2.addImage(enemy2Image);
  enemy2.velocityX = speed;
  enemy2.lifetime = 300;
  enemy2.scale = 0.15;
  Enemy2.add(enemy2);
  

}

function Enemy_3() {
  var enemy3 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  enemy3.addImage(enemy3Image);
  enemy3.velocityX = speed;
  enemy3.lifetime = 300;
  enemy3.scale = 0.10;
  Enemy3.add(enemy3);

}

function Enemy_4() {
  var enemy4 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  enemy4.addImage(enemy4Image);
  enemy4.velocityX = speed;
  enemy4.lifetime = 300;
  enemy4.scale = 0.05
  Enemy4.add(enemy4);

}


// Creating  arrows for bow
function createbullet() {
     
    var bullet= createSprite(100, 100, 60, 10);
    bullet.addImage(bulletImage);
    bullet.x = spaceShip.x - 40;
    bullet.y=spaceShip.y;
    bullet.velocityX = -7;
  
    bullet.lifetime = 200;
    bullet.scale = 0.05;
    bulletGroup.add(bullet);
    ss.play();
     
   }

