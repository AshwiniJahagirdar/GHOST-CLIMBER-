var tower, ghost,door,balcony,invisible;
var tower1,ghost1,baclcony1,door1;
var play = 1;
var end = 0;
var gamestate  = play ;
var score = 0 ;
var sound;

function preload(){
  
  tower1 = loadImage ("tower.png");
  ghost1 = loadAnimation("ghost-jumping.png","ghost-standing.png");
  door1 = loadImage("door.png");
  balcony1 = loadImage ("climber.png");
  sound = loadSound ("spooky.wav");
}

function setup(){
  
  createCanvas(700,700);
  
  tower = createSprite(350,400);
  tower.addImage("tower", tower1);
  tower.scale = 1.2;
  tower.velocityY = 3;
  
   ghost = createSprite (400,400);
  ghost.addAnimation("ghost",ghost1);
  ghost.scale = 0.3;
  
  doorgroup = new Group ();
  balconygroup = new Group ();
  invisiblegroup = new Group ();
 
  sound.loop ();
  
}

function draw(){
  
  if(gamestate===play){
    
    score  = 0;
    
    if(tower.y>400){
    tower.y = 200;
  }
  
    score = score + Math.round(frameCount / 10);
    
  if(keyDown("space")){
    ghost.velocityY = -8.5;
     }
  
  ghost.velocityY = ghost.velocityY +0.5
  
  if(keyDown("left")){
    ghost.x = ghost.x-5;
     }  
  
  
  if(keyDown("right")){
    ghost.x = ghost.x+5;
     }
  
  if(balconygroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
    
    
  
  if(invisiblegroup.isTouching(ghost) || ghost.y>700)  {
    ghost.destroy();
    gamestate = end;
  }
    
    
    doors();
     }
  
  if(gamestate === end ){
    tower.destroy();
    doorgroup.destroyEach();
    balconygroup.destroyEach();
    invisiblegroup.destroyEach();
    
    sound.stop ();
    
    background("black");
    
    textSize(70);
    stroke ("yellow");
    fill("yellow");
    text (" GAME OVER ",200,350);
    
     textSize(20);
    text("score = "+score,25,45);
    
  }
  
  
  
  drawSprites();
  
}

function doors(){
  
  if(frameCount % 100 ===0){
  door = createSprite(Math.round(random(200,600)),12);
 door.addImage ("door",door1);
    door.scale = 0.8;
    door.velocityY  = 3;
    door.lifetime = 400;
    doorgroup.add(door);
    
    balcony = createSprite(door.x,52);
    balcony.addImage("climber",balcony1);
    balcony.scale = 0.8;
    balcony.velocityY = 3;
    balcony.debug = true;
    balcony.lifetime = 400;
    balconygroup.add(balcony);
    
    invisible = createSprite(balcony.x,57,balcony.width,7);
    invisible.velocityY = 3;
   // invisible.visible = false;
   invisible.shapeColor  = "red";
    invisible.debug = true;
    invisible.lifetime = 400;
    invisiblegroup.add(invisible);
  
    ghost.depth = balcony.depth +1;
   }
}
