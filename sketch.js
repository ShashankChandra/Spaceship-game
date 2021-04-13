var PLAY = 1;
var END = 0;
var bulletCount=0;
var gameState = "PLAY";
var rock;
var laser;
var movingBullet;
var fuelCount=300;
var live=3;

var spaceship, spaceshipImage;


var lasersGroup, laserImage;
var rocksGroup, rockImage1,rockImage2,rockImage3;
var bulletsGroup, bulletGroupImage, bulletImage;
var fuelGroup, fuelImage;

var score;
var gameOverImg,restartImg;
var backGround, backgroundImage;

function preload()
  {
    
    laserImage = loadImage("laser.png");
    laserImage2 = loadImage("laserv.png");
    rockImage1 = loadImage("rockc.jpg");
    rockImage2 = loadImage("rockc2.jpg");
    rockImage3 = loadImage("rockc3.jpg");
    backgroundImage = loadImage("background.png");
    spaceshipImage = loadImage("spaceship2.jpg");
    bulletGroupImage = loadImage("bulletgroup2.jpg");
    bulletImage = loadImage("bullet2.jpg");
    fuelImage = loadImage("fuel2.jpg");

    
  }

function setup() 
  {
    createCanvas(600, 600);

    backGround = createSprite(0,0,1200,1200);
    backGround.shapeColor="white";
    //backGround.addImage(backgroundImage);
    
    spaceship = createSprite(100,200,30,30);
    spaceship.addImage(spaceshipImage);
    spaceship.scale=0.4;
   
     
  
   
    
    lasersGroup = createGroup();
    rocksGroup = createGroup();
    bulletsGroup = createGroup();
    fuelGroup = createGroup();
  
    score = 0;
    
  
  }

function draw() 
  {
    background("white");
    
    if(gameState==="PLAY")
    {
  if(keyDown("LEFT_ARROW"))
      {
        
        spaceship.x=spaceship.x-5;
        
      }
    
    if(keyDown("RIGHT_ARROW"))
      {
        
        spaceship.x=spaceship.x+5;
        
      }
    
    if(keyDown("UP_ARROW"))
      {
        
        spaceship.y=spaceship.y-5;
        
      }
    
    if(keyDown("DOWN_ARROW"))
      {
        
        spaceship.y=spaceship.y+5;
        
      }
  

        
        backGround.velocityX = -3;
    
        if (backGround.x < 0)
          {
              backGround.x = backGround.width/2;
          }
          
    
        console.log(bulletCount);
    spawnRocks();
    spawnLasers();  
    spawnBullets();
    spawnFuel();
    pickupBullets();
    if(keyDown("q"))
    {
      shootBullets();
    }
    decreaseFuel();
    pickupFuel();
    loseLife();

    if(live===0)
    {

      gameState="END";

    }

  }

  if(gameState==="END")
  {

    gameOver();

  }

      drawSprites();

      fill("black");
      textSize(20);
    text("Bullet Count: " + bulletCount,50,575);
    text("Fuel Count: " + fuelCount,450,575);
    text("Lives: "+ live,285,575);
   
  }




function spawnRocks()
  {
     
    if(frameCount%25===0)
      {
        rock = createSprite(700,100,20,20);
        rock.setCollider("rectangle",0,0,35,35);
        //rock.shapeColor = "darkgray";
        var randm = Math.round(random(1,3));
        switch(randm)
        {

          case 1:rock.addImage(rockImage1);
          break;
          
          case 2:rock.addImage(rockImage2);
          break;

          case 3:rock.addImage(rockImage3);
          break;
        }
        rock.scale=0.2;

        rock.velocityX=-3;
        rock.y=Math.round(random(100,500));
        rock.lifetime=250;
        rocksGroup.add(rock);
        
      }
    
   }


function spawnLasers()
  {
    if(frameCount%65===0)
      {
        laser = createSprite(700,100,30,30);
        var randmm = Math.round(random(1,2));
        switch(randmm)
        {
          case 1:laser.addImage(laserImage);
          break;
          
          case 2:laser.addImage(laserImage2);
          break;
        }
        laser.scale=0.2;
        laser.velocityX=-3;
        laser.y=Math.round(random(100,500));
        laser.lifetime=250;
        lasersGroup.add(laser);
        
      }
  }

function spawnBullets()
{
  

  if(frameCount%175===0)
      {
        var bullet = createSprite(700,100,15,15);
        //bullet.shapeColor = "green";
        bullet.addImage(bulletGroupImage);
        bullet.scale=0.2;
        bullet.velocityX=-3;
        bullet.y=Math.round(random(100,500));
        bullet.lifetime=250;
        bulletsGroup.add(bullet);
      }
  
}

function shootBullets()
{

if(bulletCount>=1)
{


movingBullet = createSprite(spaceship.x,spaceship.y,20,20);
movingBullet.scale=0.3;
movingBullet.addImage(bulletImage);
movingBullet.lifetime=250;
movingBullet.velocityX=3;
for (i=0; i < lasersGroup.length;i++)
{ 
  if (lasersGroup.get(i).isTouching(movingBullet))
  { 
    lasersGroup.get(i).destroy(); 
    movingBullet.destroy();
  }
}

for (i=0; i < rocksGroup.length;i++)
{ 
  if (rocksGroup.get(i).isTouching(movingBullet))
  { 
    rocksGroup.get(i).destroy(); 
    movingBullet.destroy();
  }
}

bulletCount=bulletCount-1;

 }
}

function pickupBullets()
{

if(spaceship.isTouching(bulletsGroup))
{
  bulletsGroup.destroyEach();
  bulletCount=bulletCount+3;

}

}





function spawnFuel()
{
  
  if(frameCount%250===0)
      {
        var fuel = createSprite(700,100,15,15);
        //fuel.shapeColor = "blue";
        fuel.addImage(fuelImage);
        fuel.scale=0.2;
        fuel.velocityX=-3;
        fuel.y=Math.round(random(100,500));
        fuel.lifetime=250;
        fuelGroup.add(fuel);
      }
  
}

function decreaseFuel()
{
if(frameCount%5===0)
{
  if(fuelCount>0)
  {
    fuelCount=fuelCount-2;
  }
  else
  {
    gameState=END;
  }
  }

}

function pickupFuel()
{

  for (i=0; i < fuelGroup.length;i++)
  { 
    if (fuelGroup.get(i).isTouching(spaceship))
    { 
      fuelGroup.get(i).destroy(); 
      fuelCount=300;
     
    }
  }

}

function loseLife()
{

if(spaceship.isTouching(rocksGroup))
{

  for (i=0; i < rocksGroup.length;i++)
  { 
    if (rocksGroup.get(i).isTouching(spaceship))
    { 
      rocksGroup.get(i).destroy(); 
      live=live-1;
    }
  }

}

if(spaceship.isTouching(lasersGroup))
{

  for (i=0; i < lasersGroup.length;i++)
  { 
    if (lasersGroup.get(i).isTouching(spaceship))
    { 
      lasersGroup.get(i).destroy(); 
      live=live-1;
    }
  }

}

}

function gameOver()
{

lasersGroup.destroyEach();
rocksGroup.destroyEach();
spaceship.destroy();
bulletsGroup.destroyEach();
fuelGroup.destroyEach();
background("black");
fill("white");
textSize(35);
text("You Lose!",220,300);
backGround.visible=false;


}
