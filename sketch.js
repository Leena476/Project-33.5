const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
 
var divisions = [];
var particles;
var plinkos = [];

var divisionHeight = 300;
var score = 0;
var turn = 0;

var a, b, c, d, e, f, g, h, y, z;

var gameState = "instructions";

function setup () {
   
    engine = Engine.create();
    world = engine.world;
    
    createCanvas(800,800);

    a = Math.round(random(100,950));
    b = Math.round(random(100,950));
    c = Math.round(random(100,950));
    d = Math.round(random(100,950));
    e = Math.round(random(100,950));
    f = Math.round(random(100,950));
    g = Math.round(random(100,950));
    h = Math.round(random(100,950));
    y = Math.round(random(100,950));
    z = Math.round(random(100,950));
      
    ground = new Ground(width/2,height,width,20);
    
    for (var k = 0; k <= width; k = k + 80) {
      divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight));
    }

    for (var j = 75; j <= width; j = j + 50) {
      plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <= width - 10; j = j + 50) {
      plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <= width; j = j + 50) {
      plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <= width - 10; j = j + 50) {
      plinkos.push(new Plinko(j,375));
    }

    if(gameState === "play")
      mousePressed();
    
}

function draw() {
  
    background(0);
    
    Engine.update(engine);

    if(gameState === "instructions"){

      textFont("Georgia");
      fill("hotpink");
      stroke(255);
      strokeWeight(3);
      textSize(70);
      text("Welcome to Plinko!",100,125);
      textSize(30);
      noStroke();
      fill(255);
      text("To play Plinko: ",290,200);
      text("1. Click anywhere on the canvas with your mouse. A",30,250);
      text("particle will fall from the top edge. At first, it will",60,300);
      text("have the same x position as where you clicked. The",60,350);
      text("plinkos in its route will impact where it ultimately",60,400);
      text("falls. It is important to WAIT until the particle lands",60,450);
      text("before doing anything else. Based on number of points",60,500);
      text("each column rewards, you score will increase.",60,550);
      text("2. After the first particle has landed and vanished,",30,600)
      text("repeat step #2 until you have used 5 particles.",60,650)
      text("3. 6th time you click on the screen, further instructions",30,700)
      text("will be provided. Press the space bar to begin!!",60,750);

    }
      
    if(gameState === "play"){

      if(score > -1){
        textSize(20)
        text("Score : " + score,20,30);  
      }
      
      for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].display();
      }
    
      for (var k = 0; k < divisions.length; k++) {
        divisions[k].display();
      }
  
      push();
      textFont("Arial");
      textSize(35);
      fill(255);
      text(a + "  " + b + "  " + c + "   " + d + "  " + e + "  " + f + "  " + g + "  " + h + "   " + y + "  " + z,13,530);
      pop();
  
      if (particles !== undefined) {
  
        if(score > -1 && turn >= 1)
        particles.display();
    
        var pos = particles.body.position;
  
        if(pos.y>750){
  
          if(pos.x>0 && pos.x<80 && turn >= 1){
            score = score + a;
            particles = undefined;
          }
  
          if(pos.x>81 && pos.x<160 && turn >= 1){
            score = score + b;
            particles = undefined;
          }
  
          if(pos.x>161 && pos.x<240 && turn >= 1){
            score = score + c;
            particles = undefined;
          }
  
          if(pos.x>241 && pos.x<320 && turn >= 1){
            score = score + d;
            particles = undefined;
          }
  
          if(pos.x>321 && pos.x<400 && turn >= 1){
            score = score + e;
            particles = undefined;
          }
  
          if(pos.x>401 && pos.x<480 && turn >= 1){
            score = score + f;
            particles = undefined;
          }
  
          if(pos.x>481 && pos.x<560 && turn >= 1){
            score = score + g;
            particles = undefined;
          }
  
          if(pos.x>561 && pos.x<640 && turn >= 1){
            score = score + h;
            particles = undefined;
          }
  
          if(pos.x>641 && pos.x<720 && turn >= 1){
            score = score + y;
            particles = undefined;
          }
  
          if(pos.x>721 && pos.x<800 && turn >= 1){
            score = score + z;
            particles = undefined;
          }
  
        }
  
      }
      
      if(turn === 6){
        push();
        textFont("Georgia");
        textSize(100);
        stroke(255);
        strokeWeight(5)
        fill ("red")
        text("GAME OVER",100,475);
        textSize(25);
        strokeWeight(1);
        text("Click anywhere to play again!",240,35);
        pop();
      }

      if(turn === 7){
        score = 0;
        turn = 0;
      }
      
    }

    console.log(particles)
    
}

function mousePressed(){

  if(turn < 5)
    particles = new Particle(mouseX,-10,10,10);

  if(gameState === "play")
    turn = turn + 1;

}

function keyPressed(){
  if(keyCode === 32 && gameState === "instructions")
    gameState = "play";
}