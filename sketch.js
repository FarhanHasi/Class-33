const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,rope,frouit,rope1,rope2;
var frouitlink;

let engine;
let world;

var ismute = false;

function preload()
{
  bg = loadImage("background.png");
  rabbit1 = loadImage("blink_1.png");
  melon = loadImage("melon.png");
  rabbitHappy = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  rabbitEat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  rabbitSad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bgSound = loadSound("sound1.mp3");
  cutSound = loadSound("cutting Through Foliage.mp3");
  eatSound = loadSound("eating_sound.mp3");
  ropeSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  airSound = loadSound("air.wav");



  rabbitHappy.playing = true;
  rabbitEat.playing = true;
  rabbitSad.playing = true;

  rabbitEat.looping = false;
  rabbitSad.looping = false;
}

function setup() 
{
  var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  console.log(isMobile);
  if(isMobile){
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    createCanvas(windowWidth,windowHeight);
  }
  
  engine = Engine.create();
  world = engine.world;
  bgSound.play();
  bgSound.setVolume(0.5);
  
  //console.log(height);

  cutButton = createImg("cut_btn.png");
  cutButton.position(width/2-10,70);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);

  cutButton1 = createImg("cut_btn.png");
  cutButton1.position(width/2-300,60);
  cutButton1.size(50,50);
  cutButton1.mouseClicked(drop1);

  cutButton2 = createImg("cut_btn.png");
  cutButton2.position(width/2+250,180);
  cutButton2.size(50,50);
  cutButton2.mouseClicked(drop2);

  blower = createImg("balloon.png");
  blower.position(width/4-100,height/2-100);
  blower.size(150,100);
  blower.mouseClicked(airblower);

  mute = createImg("mute.png");
  mute.position(width-200,100);
  mute.size(50,50);
  mute.mouseClicked(muteSound);
  
  rabbitHappy.frameDelay = 10;
  rabbitEat.frameDelay = 10;
  rabbitSad.frameDelay = 20;

  rabbit = createSprite(width-200,height-150,200,200);
  rabbit.addAnimation("happy",rabbitHappy);
  rabbit.addAnimation("eat",rabbitEat);
  rabbit.addAnimation("sad",rabbitSad);
  rabbit.changeAnimation("happy");
  rabbit.scale = 0.3;
 
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

    ground = new Ground(width/2,height-10,width,20);

    rope = new Rope(8,{x:width/2,y:90});
    rope1 = new Rope(15,{x:width/2-300,y:80});
    rope2 = new Rope(10,{x:width/2+250,y:200});

    frouit = Bodies.circle(300,300,20);
    Composite.add(rope.body,frouit); 

    frouitlink = new Link(rope.body,frouit);
    frouitlink1 = new Link(rope1.body,frouit);
    frouitlink2 = new Link(rope2.body,frouit);

    rabbit.x = Math.round(random(200,width-200));
}

function draw() 
{
  background(51);

  

  image(bg,width/2,height/2,width,height)
  Engine.update(engine);
   
  ground.display();
  rope.show();
  rope1.show();
  rope2.show();
  if(frouit !== null)
  {
    image(melon,frouit.position.x,frouit.position.y,80,80);

    //console.log(frouit.position.y);
    var result = checkCollisition(frouit,rabbit);
    if(result === true){
      rabbit.changeAnimation("eat");
      frouit = null;
      
      if(!ismute){
        eatSound.play();
      }
    }
    else if(result === false && frouit.position.y >= height-100){
      rabbit.changeAnimation("sad");
      //console.log("enter");
      bgSound.stop();
      if(!sadSound.isPlaying()){

        
        if(!ismute){
          sadSound.play();  
        }
      }

      

    }
  }
  

  drawSprites();
}

function drop()
{
    rope.break();
    frouitlink.detach();
    frouitlink = null;
    
    if(!ismute)
    {
      ropeSound.play();
    }
}

function drop1()
{
    rope1.break();
    frouitlink1.detach();
    frouitlink1 = null;
    
    if(!ismute)
    {
      ropeSound.play();
    }
}

function drop2()
{
    rope2.break();
    frouitlink2.detach();
    frouitlink2 = null;
    
    if(!ismute)
    {
      ropeSound.play();
    }
}

function checkCollisition(body,sprite)
{
    if(body!== null)
    {
      var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
      if(distance <= 80){

        World.remove(world,body);
        return true;
      } 
      else{
        return false;
      }
    }
}

function airblower()
{
  Matter.Body.applyForce(frouit,{x:0,y:0},{x:0.1,y:0});
  
  if(!ismute){
    airSound.play();  
  }
}
function muteSound()
{
  
  if(bgSound.isPlaying()){
    bgSound.stop();
    ismute = true;
  }
  else{
    bgSound.play();
    ismute = false;
  }
}

