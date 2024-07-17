const Gborder = document.getElementById("Gborder");
const cxt = Gborder.getContext("2d");
const score = document.getElementById("score");
const Gblock = document.getElementById("block");
const Gwidth = Gborder.width;
const Gheight = Gborder.height;
const player = document.getElementById("player");
const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");
const l3 = document.getElementById("l3");
const l4 = document.getElementById("l4");
const l5 = document.getElementById("l5");
const optionm = document.getElementById("optionm");
const exitback = document.getElementById("exitback");

const home = document.getElementById("home");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const os = document.getElementById("os");
const ohs = document.getElementById("ohs");
let blockColor = 'red';

const pause = document.getElementById("pause");
const playAG = document.getElementById("playAG");
const playg = document.getElementById("play");
const newG = document.getElementById("newg");
const option = document.getElementById("option");
const exit = document.getElementById("exit");

const gscore = document.getElementById("score");
const ghscore = document.getElementById("hscore");
const glevel = document.getElementById("level");

pause.addEventListener("click" ,()=>{
    
    playg.style.visibility="visible";
    pause.style.visibility="hidden";
    pauseFun();
});
playAG.addEventListener("click",newgfun);
playg.addEventListener("click" ,()=>{
    playg.style.visibility="hidden";
    pause.style.visibility="visible";
    pauseFun();
});
newG.addEventListener("click",newgfun);



let hscore = 93;
let running = 0;
let x=0;
let playerX =x;
let ballR = 10;
let ballH = 20;
let playerY = Gheight-ballH-1;
let playerW = 100;
let playerH = 15;
let blockXw = 150;
let blockYy = 30;
let blockX ;
let blockY ;
let ballW = 20;
let backgroundColor = 'rgb(8, 143, 177)';
let borderColor = "red";
let level=1;
let ballX = x+ballW;
let ballY = playerY-ballR;
let ballSpeed= 1;
let ballYdir = -ballSpeed;
let ballXdir = ballSpeed;
let countBrick = 0;
let Gscore = countBrick;

let X = 5;
let XX = 165;
let XXX = 325;
let XXXX = 485;

let down = 0;
let hmd = 0;
let YYY = 70;
let YYYY = 105;


    let blockA=[
        {blockX:X,blockY:0},
        {blockX:XX,blockY:0},
        {blockX:XXX,blockY:0},
        {blockX:XXXX,blockY:0}
    ];
    
    let blockB=[
        {blockX:5,blockY:35},
        {blockX:165,blockY:35},
        {blockX:325,blockY:35},
        {blockX:485,blockY:35}
    ];
    
    let blockC=[
        {blockX:5,blockY:70},
        {blockX:165,blockY:70},
        {blockX:325,blockY:70},
        {blockX:485,blockY:70}
    ];
    
    let blockD=[
        {blockX:5,blockY:-35},
        {blockX:165,blockY:-35},
        {blockX:325,blockY:-35},
        {blockX:485,blockY:-35}
    ];
    
    let blockE=[
        {blockX:5,blockY:-70},
        {blockX:165,blockY:-70},
        {blockX:325,blockY:-70},
        {blockX:485,blockY:-70}
    ];


startGame();
function startGame(){
    gscore.textContent = "SCORE : "+Gscore;
    ghscore.textContent = "H SCORE : "+hscore;
    glevel.textContent = "LEVEL : "+level;
    Gover.style.visibility="hidden";
    generator();
    createBlock();
   
}

window.addEventListener("keydown",movePlayer);

function generator(){
    if(running==1){
        let interval = setInterval(()=>{
            clearBord();
            createPlayer();
            createBlock(down);
            moveBall();
            ballColision();
            createBall();
            brickBoom(down);
            clearInterval(interval);
            
           
            generator();
        },10)
    }
    else{
        cxt.font="50px MV Boli";
        cxt.fillStyle="yellow";
        cxt.textAlign="center";
        cxt.fillText("GAME PAUSED!!!" ,Gwidth/2 , Gheight/2);
    }
    
}
function createBlock(down) {
   
    Y=down;
    if(down>=380){
        gameOverFun();
    }
    else if(countBrick==20){
        level+1;
        glevel.textContent='LEVEL : '+level;
        down=0;
        createBlock(down);
    }
    else{
        cxt.fillStyle=blockColor;
    cxt.strokeStyle='black';
    blockA.forEach(block=>{
        blockColor='red';
        cxt.fillStyle=blockColor;
            cxt.fillRect(block.blockX,block.blockY+Y,blockXw,blockYy);
            cxt.strokeRect(block.blockX,block.blockY+Y,blockXw,blockYy);
    });
    blockB.forEach(block=>{
        blockColor ="orange";
        cxt.fillStyle=blockColor;
        cxt.fillRect(block.blockX,block.blockY+Y,blockXw,blockYy);
        cxt.strokeRect(block.blockX,block.blockY+Y,blockXw,blockYy);
    });
    blockC.forEach(block=>{
        blockColor ="green";
        cxt.fillStyle=blockColor;
    cxt.fillRect(block.blockX,block.blockY+Y,blockXw,blockYy);
    cxt.strokeRect(block.blockX,block.blockY+Y,blockXw,blockYy);
    });
    blockD.forEach(block=>{
        blockColor ="purple";
        cxt.fillStyle=blockColor;
        cxt.fillRect(block.blockX,block.blockY+Y,blockXw,blockYy);
        cxt.strokeRect(block.blockX,block.blockY+Y,blockXw,blockYy);
        });
    blockE.forEach(block=>{
        blockColor ="grey";
        cxt.fillStyle=blockColor;
        cxt.fillRect(block.blockX,block.blockY+Y,blockXw,blockYy);
        cxt.strokeRect(block.blockX,block.blockY+Y,blockXw,blockYy);
            });
        }

    }

function createPlayer() {
   cxt.strokeStyle = "black";
   cxt.fillStyle = "gray";
   playerX=x;
   
   cxt.fillRect(playerX,playerY,playerW,playerH);
   cxt.strokeRect(playerX,playerY,playerW,playerH);
}

function movePlayer(event) {
    const keyC=event.keyCode;
    let Mright = 37;
    let Mleft = 39;
    let pauseG = 32;
    
    switch(keyC){
        case Mright:
            if(x>0){
                x-=10;
            createPlayer();
            }
            break;

        case Mleft:
           if(x<Gwidth-playerW){
            x+=10;
            createPlayer();
           }
           break;

        case pauseG:
            pauseFun();
            break;

            

    }
}
function clearBord() {
       cxt.fillStyle = backgroundColor;
   
      cxt.fillStroke = 'red';
      cxt.fillRect(0,0,Gwidth,Gheight);
      cxt.strokeRect(0,0,Gwidth,Gheight);
}
function createBall(){
    cxt.fillStyle = "black";
    cxt.fillStroke = "blue";
     cxt.beginPath();
    cxt.arc(ballX,ballY,ballR,0,2*Math.PI);
    cxt.fill();
    cxt.stroke();
}

function moveBall(){

    ballX +=(ballSpeed * ballXdir);
    ballY +=(ballSpeed * ballYdir);
}

function ballColision(){
    if(ballY <= 0 + ballR){
        ballYdir *= -ballSpeed;
       
    }

    if(ballX<=0){
        ballXdir *= -ballSpeed;
       
       
    }
    if(ballX>=Gwidth-ballR){
        ballXdir *= -ballSpeed;
      
    }
    if(ballY+playerH==playerY+playerH){
        if(ballX>=playerX&&ballX<=playerX+playerW)
        ballYdir*= -ballSpeed;

       }

    if(ballY>Gheight){
         ballX = x+ballW;
         ballY = playerY-ballR;
         createBall();
         moveBall();
         hmd+=1;
         hmdfun();
    }



    }
function brickBoom(down){
   
   
    blockA.forEach(brick=>{
        if(ballY==brick.blockY+blockYy+down||ballY==brick.blockY+down){
            if(ballX>=brick.blockX&&ballX<=brick.blockX+blockXw){
            ballYdir*= -ballSpeed;
            brick.blockX=-1000;
            countBrick+=1;
            Gscore+=1;
            score.textContent="SCORE : "+Gscore;
        }
    }
    });
    blockB.forEach(brick=>{
        if(ballY==brick.blockY+blockYy+down||ballY==brick.blockY+down){
            if(ballX>=brick.blockX&&ballX<=brick.blockX+blockXw){
            ballYdir*= -ballSpeed;
            brick.blockX=-1000;
            countBrick+=1;
            Gscore+=1;
            score.textContent="SCORE : "+Gscore;

        }
    }
    });
    blockC.forEach(brick=>{
        if(ballY==brick.blockY+blockYy+down||ballY==brick.blockY+down){
            if(ballX>=brick.blockX&&ballX<=brick.blockX+blockXw){
            ballYdir*= -ballSpeed;
            brick.blockX=-1000;
            countBrick+=1;
            Gscore+=1;
            score.textContent="SCORE : "+Gscore;

        }
    }
    });
    blockD.forEach(brick=>{
        if(ballY==brick.blockY+blockYy+down||ballY==brick.blockY+down){
            if(ballX>=brick.blockX&&ballX<=brick.blockX+blockXw){
            ballYdir*= -ballSpeed;
            brick.blockX=-1000;
            countBrick+=1;
            Gscore+=1;
            score.textContent="SCORE : "+Gscore;

        }
    }
    });
    blockE.forEach(brick=>{
        if(ballY==brick.blockY+blockYy+down||ballY==brick.blockY+down){
            if(ballX>=brick.blockX&&ballX<=brick.blockX+blockXw){
            ballYdir*= -ballSpeed;
            brick.blockX=-1000;
            countBrick+=1;
            Gscore+=1;
            score.textContent="SCORE : "+Gscore;

        }
    }
    });
  
   
   
}

   
        setInterval(()=>{
            if(running==1){
            down+=15;
            createBlock(down);
            brickBoom(down);
                
            }
            else{
                down+=0;
                createBlock(down);
                brickBoom(down);
            }
           },5000);
        
    
function hmdfun(){
    switch(hmd){
        case 1:
            l1.style.visibility="hidden";
            break;
         
         case 2:
            l2.style.visibility="hidden";
            break;
         
         case 3:
            l3.style.visibility="hidden";
            break;
         
         case 4:
            l4.style.visibility="hidden";
            break;
         
         case 5:
            l5.style.visibility="hidden";
            break;
        case 6:
            gameOverFun();
            break;
        case 0:
            l5.style.visibility="visible";
            l4.style.visibility="visible";
            l3.style.visibility="visible";
            l2.style.visibility="visible";
            l1.style.visibility="visible";
            break;
            
        
         } 
}
function gameOverFun(){
    if(hmd>5){
    
    Gover.style.visibility="visible";
    os.textContent =Gscore;
    ohs.textContent = hscore;
    pauseFun();
    }
    if(down>=380){
        
        Gover.style.visibility="visible";
        os.textContent =Gscore;
        ohs.textContent = hscore;
        pauseFun();
        }
}
function pauseFun(){
    if(running==1){
       
        playg.style.visibility="visible";
        pause.style.visibility="hidden";
        running=0;
        generator();
        

    }
    else if(running==0){
        playg.style.visibility="hidden";
        pause.style.visibility="visible";
        running=1;
        generator();
        

    }
}
function newgfun(){
    hmd=0;
    level=1;
    down=0;
    countBrick=0;
    ballSpeed=0.5;
    playerX =x;
    playerY = Gheight-ballH-1;
    ballX = x+ballW;
     ballY = playerY-ballR;

    ballYdir = -ballSpeed;
    ballXdir = ballSpeed;
    hmdfun();
    
    blockA=[
        {blockX:X,blockY:0},
        {blockX:XX,blockY:0},
        {blockX:XXX,blockY:0},
        {blockX:XXXX,blockY:0}
    ];
    
     blockB=[
        {blockX:5,blockY:35},
        {blockX:165,blockY:35},
        {blockX:325,blockY:35},
        {blockX:485,blockY:35}
    ];
    
     blockC=[
        {blockX:5,blockY:70},
        {blockX:165,blockY:70},
        {blockX:325,blockY:70},
        {blockX:485,blockY:70}
    ];
    
     blockD=[
        {blockX:5,blockY:-35},
        {blockX:165,blockY:-35},
        {blockX:325,blockY:-35},
        {blockX:485,blockY:-35}
    ];
    
     blockE=[
        {blockX:5,blockY:-70},
        {blockX:165,blockY:-70},
        {blockX:325,blockY:-70},
        {blockX:485,blockY:-70}
    ];

    startGame();

    
    
    

}

exit.addEventListener("click",exitgfun);
yes.addEventListener("click",()=>{
    window.close();
});
no.addEventListener("click",()=>{
    exitback.style.display="none";
});
option.addEventListener("click",()=>{
   running=0;
    optionm.style.display="block";
});

optionm.addEventListener("dblclick",()=>{

    optionm.style.display="none";
});
home.addEventListener("click",()=>{
   location.assign("E:\\this me\\java script docs\\project93.html")
});
function exitgfun(){
    running=0;
    exitback.style.display="block";
    
}