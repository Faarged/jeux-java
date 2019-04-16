const cvs = document.getElementById(`snake`);

const ctx = cvs.getContext(`2d`);

// create the unit
const box = 32;

/*==========chargement des images et audio============
==========images
let imageName = new Image();
imageName.src = "path/img.png";
==========audio
let audioName = new Audio();
audioName.src = "path/audio.png";
audioName.play(); */


//===========les images du jeu===========
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


//================les sons du jeu===============
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
/*===============dessin des images============
ctx.drawImage(imageName, X Y, Width, Height); */

// =============creation du serpent=========
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// ==============cration nourriture==========
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// ===========score du joueur=============
let score = 0;



//===============gerer les controles du serpent===============
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}



//===========gerer les collisions====================
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


//================dessiner l'ensemble du jeu ds le canvas==================
function draw(){

    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //=======================position précédente de la tete=================
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //======================direction du serpent=======================
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    //==============si le serpent mange======================
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        //=============on ne fait pas disparaitre la queue (lors du prochain mvt elle aura 1 case de plus)=========
    }else{
        //===============la queue disparait avec le mvt du serpent (il avance sans grandir)===============
        snake.pop();
    }

    //==========ajout d'une nouvelle tete (le serpent avance)===============
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // ===============game over=================
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// =================appelle la fonction draw toutes les 100ms, soit 0.1s==============

let game = setInterval(draw,100);
