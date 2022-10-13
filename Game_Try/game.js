const ST_Button=document.getElementById('StartButton');
ST_Button.addEventListener('click', ()=> this.start());

const ST_Screen=document.getElementById('StartScreen')
const can = document.getElementById("myCanvas");
can.width=window.innerWidth
can.height=window.innerHeight
let ctx = can.getContext("2d");
let imgSize=35;
let mouseX=0,mouseY=0,touchX=0,touchY=0;
let playerImg = new Image();
playerImg.src = "img/ships_ply.png";
let enemieImg = new Image();
enemieImg.src = "img/ships_enemie.png";
const enemies=[];
let anz =10; //aufrgund von bug anz -1 ist anzahl gegner
let spawnrate=anz;
let spawntrap=5;
let spawnN=0;
let movePattern=[0,0,1,1,1,0,0,0,1,1]
let movefort=0;
let moveMax=10;
let TO_RADIANS = Math.PI/180; 
let winkel=20;
let eneWink=0;

// img.onload = function() {
//     alert('loaded')
// };

cnv.addEventListener('touchstart',(evt)=>{
    evt.preventDefault();
    setFingers(evt.changedTouches);
},true);
cnv.addEventListener('touchmove',(evt)=>{
    evt.preventDefault();
    setFingers(evt.changedTouches);
},true);
cnv.addEventListener('touchend',(evt)=>{
    evt.preventDefault();
    rmFingers(evt.changedTouches);
    
},true);
let fingers = [];
function setFingers(touches){
   for(let t of touches){
       fingers[t.identifier]={
           x:t.pageX,
           y:t.pageY,
       };
   }
}
function rmFingers(touches){
    for(let t of touches){
        fingers[t.identifier]=undefined
    }
}

function start(){
    
    ST_Button.style.visibility = 'hidden';
    ST_Screen.style.visibility = 'hidden';
    can.style.visibility = 'visible';
    document.body.style.cursor = 'none';
    this.enemies = createEnemies(spawnrate);
    // console.log(this.enemies[1].gibX())
    animate();
    // setInterval(console.log("tiktak"),100);
    setInterval(() => {
        this.moveallEnemies();
        if(spawntrap==spawnN){
            this.enemies=this.enemies.concat(createEnemies(spawnrate))
            anz += spawnrate;
            // console.log(anz,this.enemies[anz]);
            spawnN=0;
        }
        spawnN++;
    }, 1000);
}

function animate(){

    ctx.clearRect(0,0,can.width,can.height);

    ctx.save(); 

    ctx.translate(mouseX, mouseY);
    ctx.rotate(winkel * TO_RADIANS);
    ctx.drawImage(playerImg,0-imgSize/2,0-imgSize/2, imgSize, imgSize);
    ctx.restore(); 
    winkel++;
    let i
    // alert(anz)
    

    // console.log(movePattern[movefort-1])
    
    for(i=1;i<=anz;i++){
        if(this.enemies[i]){
            
            ctx.save(); 
            ctx.translate(this.enemies[i].gibX(), this.enemies[i].gibY());
            // console.log(movePattern[movefort],eneWink,movefort)
            if(1==movePattern[movefort-1]){
                if(eneWink==-45){
                    eneWink=45
                }
                if(eneWink==0){
                    eneWink=45
                }
            }else{
                if(eneWink==45){
                    eneWink=-45
                }
                if(eneWink==0){
                    eneWink=-45
                }
            }
            ctx.rotate(eneWink * TO_RADIANS);
            ctx.rotate(10*TO_RADIANS)
            // console.log(typeof this.enemies[i])
            if(this.enemies[i].gibX()>=0){
                ctx.drawImage(enemieImg,0-imgSize/2,0-imgSize/2, imgSize, imgSize);
                // console.log("we draw",i,this.enemies[i].gibX())
            }
            ctx.restore();
        }
       }
    requestAnimationFrame(animate);
}
function createEnemies(anz){
    // console.log("create");
    let schrittLinks =20,
    schrittHoRu=10,
    height=window.innerHeight-40
    // let newX=(height/anz)+20, newY = window.innerWidth-10
    let newY=0, newX = window.innerWidth;
    let enemiesAr=[];
    let i;
    for(i=1;i<anz;i++){
        // console.log("before",i);
        newY=(height/anz)*i
        
        enemiesAr[i]= new Enemie(newX,newY,schrittLinks,schrittHoRu);
        // console.log(i,"object:",enemiesAr[i],"\nx:",enemiesAr[i].gibX(),"\ny:",enemiesAr[i].gibY());
    }
    // console.log(i)
    // console.log("object:",enemiesAr[i],"\nx:",enemiesAr[i].gibX(),"\ny:",enemiesAr[i].gibY());
    return enemiesAr;

}
function moveallEnemies(){
    if(movefort==moveMax){
        movefort=0;
    }
    
    let dir=movePattern[movefort];
    // console.log(dir,movefort)
    for(let i=1;i<=anz;i++){
        if(this.enemies[i]){
            this.enemies[i].moveBy(dir);
        }
    }
    movefort++;
    // console.log("in move allene",movefort)
}




function Enemie(x,y,sl,shr){
    this.posX=x;
    this.posY=y;
    this.schrittLinks=sl;
    this.schrittHoRu=shr;

    this.moveBy = function(dir){
        let oben=1,unten=0;
        this.posX-=this.schrittLinks

        switch(dir){
            case oben:
                this.posY-=this.schrittHoRu
                break;
            case unten:           
                this.posY+=this.schrittHoRu
                break;
        }

    };
    this.gibX = function(){
        return this.posX;
    };
    this.gibY =function(){
        return this.posY;
    };
}

