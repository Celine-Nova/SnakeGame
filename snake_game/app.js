window.onload = function(){

var canvas = document.createElement("canvas");
canvas.id = "can";
canvas.width = 900;
canvas.height = 600;
canvas.style.border = '2px solid black';
div = document.querySelector('div');
console.log(div)
// main.textContent = document.body.appendChild(canvas);
div.appendChild(canvas);
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var context = canvas.getContext('2d');



// proprieté du serpent
var colorSnake ="green";
//taille d'un block du serpent
var sizeSnake = 30;

// nombre de block dans le canvas par la largeur et la hauteur
var nbrBlockWidth = canvasWidth/sizeSnake;
var nbrBlockHeight = canvasHeight/sizeSnake;


var xSnake = Math.trunc(Math.random()*nbrBlockWidth)*sizeSnake;
var ySnake = Math.trunc(Math.random()*nbrBlockHeight)*sizeSnake;
var moveX = 0;
var moveY = 0;
//taille du corps du serpent
var sizeBody = 5;
//Corps du serpent
//ex : [{x:2,y:7},{x:2,y:8}]
var bodySnake = []; 
var crash = false;
var n = false;

document.addEventListener("keydown", detectKeys);
// Propriete de la pomme
var colorApple = 'red';
//Calcul du nombre de block de la hauteur et largeur du canvas par rapport à la taille d'un block (taille serpent)
var xApple = Math.trunc(Math.random()*nbrBlockWidth)*sizeSnake;
var yApple = Math.trunc(Math.random()*nbrBlockHeight)*sizeSnake;

//calcul du rayon de la pomme
var rayonApple = sizeSnake/2


var intervalId = setInterval(gameSnake,200);

function gameSnake() {
    createSnake();
    createApple();
    snakeApple()
    crashSnake();
    initSizeSnake();
}

//je gère la position du serpent
function positionSnake(){
     // je calcul les coordonnées du serpent
     xSnake += + moveX*sizeSnake;
     ySnake = ySnake + moveY*sizeSnake;
    //  console.log(xSnake,ySnake);
     // j'insères les coordonnées dans le tableau du corps du serpent
     bodySnake.push({x:xSnake,y:ySnake});
     
     //tant que la longueur du corps du serpent et superieur à la taille du corps(5) je supprime un element
     while (bodySnake.length > sizeBody){
         bodySnake.shift();
     }
}

// fonction qui dessine le serpent
function createSnake(){
    context.clearRect(0,0,canvasWidth,canvasHeight);
   
    positionSnake();
    
    context.fillStyle = colorSnake;
    for (var i = 0; i < bodySnake.length; i++){
        context.fillRect(bodySnake[i].x, bodySnake[i].y, sizeSnake-1, sizeSnake-1);
        // console.log(context.fillRect);
    }

        //  context.fillRect(xSnake,ySnake,sizeSnake, sizeSnake);
}

// fonction qui dessine la pomme
function createApple(){

    //ouvrir un flux (un chemin) dans le canvas
    context.beginPath();
    //créer arc de cercle
    context.arc(xApple+rayonApple,yApple+rayonApple, rayonApple,0, 2*Math.PI);
    context.fillStyle = colorApple;
    //attacher, afficher pomme au canvas
    context.fill();
    context.closePath();

}
// fonction qui initialise la positionn de la pomme
function initPositionApple(){
   
    xApple = Math.trunc(Math.random()*nbrBlockWidth)*sizeSnake;
    yApple = Math.trunc(Math.random()*nbrBlockHeight)*sizeSnake;
   
}
// fonction qui intialise la position du serpent
function initPositionSnake(){
  
    xSnake = Math.trunc(Math.random()*nbrBlockWidth)*sizeSnake;
    ySnake = Math.trunc(Math.random()*nbrBlockHeight)*sizeSnake;
    
}
 
// Detection collision
function crashSnake(){
    //cas1 : le serpent se mord
    if (bodySnake.length > 5){
        for (var i = 0; i < bodySnake.length-1; i++){
            if (bodySnake[i].x == bodySnake[bodySnake.length-1].x && 
                bodySnake[i].y == bodySnake[bodySnake.length-1].y ){
                crash = true;  
                         
                break;
                }
        }
    }           
   
    //cas2 : le serpent sort du cadre
    if (xSnake < 0 || ySnake < 0 || xSnake + sizeSnake > canvasWidth ||  ySnake + sizeSnake > canvasHeight) {
        // n = true;
          
           initPositionSnake();
           sizeBody = 5;
           initPositionApple();
    }
}   

// fonction le serpent mange la pomme
function snakeApple(){
    if(xApple == xSnake && yApple == ySnake) {
        initPositionApple();
        sizeBody += 5;
    }
}

// fonction game over
function initSizeSnake(){
   
if (crash == true){
    crash=false;
    sizeBody = 5;
    initPositionApple();
    // bodySnake = [bodySnake[bodySnake.length-1]];
    
    }
}
 
// detecter les clés des touches clavier
// Direction du serpent
 function detectKeys(){ //event objet récupéré
   
    // console.log(event.keyCode);
    // var moveX = 0;
    // var moveY = 0;
    switch (event.keyCode) {
        //gauche
        case 37:
            moveX = -1;
            moveY = 0;
            break;
        // haut
        case 38:
            moveX = 0;
            moveY = -1;
            break;
        //droite
        case 39:
            moveX = 1;
            moveY = 0;
            break;
        //bas
        case 40:
            moveX = 0;
            moveY = 1;
            break;

        //pause
        case 32:
            moveX = 0;
            moveY = 0;
            break;

        }
    // if(moveX !== undefined && moveY !== undefined) {
    //     app.moveSnake(moveX,moveY);
    // }
    
}
}