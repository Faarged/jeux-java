//on commence par appeler l'élément qu'on veut modifier
var canvas = document.getElementById("myCanvas");
var body = document.body;
//variable pour le rendu 2D
var ctx = canvas.getContext("2d");

//on définit x et y, valeurs de départ
var x = canvas.width/2;
var y = canvas.height-30

//pour faire droire que la balle bouge, un plus grd chiffre augmente la vitesse
var dx = 3;
var dy = -3;

//fonction contenant le rayon de la balle
var ballRadius = 10;

//je défini la hauteur, longueur et le pt de départ de la raquette
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//pour definir si un bouton est pressé ou non
var rightPressed = false;
var leftPressed = false;

//on défini le nb de ligne et colonne de brique, et leur hauteur largeur et padding pour pas qu'elle se touchent
var brickRowCount = 6;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


//je crée un tableau a 2 dimension qui contient colonne et ligne de briques
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//variable qui comptient le score
var score = 0;

//nombre de vies
var lives = 3;

//les sons du jeu
let perdu = new Audio();
let moinsune = new Audio();
let fanfare = new Audio();
let ladonna = new Audio();
perdu.src = "audio/cri.mp3";
moinsune.src = "audio/wilhem.mp3";
fanfare.src = "audio/fanfare.mp3";
ladonna.src = "audio/la-donna.mp3";

//pour savoir si les touches st pressés
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//savoir si on bouge la souris
document.addEventListener("mousemove", mouseMoveHandler, false);
//contrôle à la souris
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//pour garder le dessin a jour, on définit une fonction draw en continu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //cette ligne va permettre d'effacer l'ancienne position de la balle
  //on appelle les fonctions à afficher
  drawball();
  drawPaddle();
  ladonna.play();
  drawScore();
  drawLives();
  drawBricks();
  collisionDetection();
  //je rassemble les 2 conditions en une pour gérer la collision aves le haut et bas
  /*if(y + dy > canvas.height || y + dy < ballRadius) {
      dy = -dy;
  }*/
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) { //chercher le moyen de changer l'angle en ajoutant un if dans celui la
        dy = -dy;
    }
    else {
          lives--;
          if(!lives) {
            ladonna.pause();
            perdu.play();
            bodychange();
            alert("TU CODES EN HMTL!!!!!");
            document.location.reload();
          }
          else {
            bgchange();
            moinsune.play();
            x = canvas.width/3;
            y = canvas.height-30;
            if(lives === 2){
              dx = -4;
              dy = -4;
            }
            else if(lives === 1){
              dx = 6;
              dy = -6;
            }
            //paddleX = (canvas.width-paddleWidth)/2;  ===> j'annule le replacement au centre de la raquette
          }
    }
  }
  //la meme avec l'axe x
  if(x + dx > canvas.width || x + dx < ballRadius) {
      dx = -dx;
  }
  x += dx; //la balle sera peinte a chaque refresh
  y += dy;
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  requestAnimationFrame(draw); //la fonction s'appelle elle meme
}

draw();



function drawball(){
  ctx.beginPath(); //code pour dessiner la balle
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

}

//fonction pour dessiner la raquette
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "chocolate";
    ctx.fill();
    ctx.closePath();
}


//fonction pour dessiner les briques
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) { //vérifi le statu, si il vaut 1 la brique est dessinée sinon elle disparait
              var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              colorbrik();
              ctx.fill();
              ctx.closePath();
          }
        }
    }
}

//fonction pour detecter les collisions, elle va parcourir les briques et comparer leur position à celle de la balle
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r]; //pour la lisibiilité on définit b comme la variable des briques

            if(b.status == 1) { //si la brique est active, on vérifie si collision, et si oui on change son statut
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) { //si le centre de la balle est ds les coordonnées des briques, chgt de direction
                    dy = -dy;
                    b.status = 0;
                    score++; //va augmenter le score qd on touche une brique
                    if(score == brickRowCount*brickColumnCount) {
                      ladonna.pause();
                      fanfare.play();
                      bodychange();
                      alert("ça va ton projet est pas mal");
                      document.location.reload(); //recharge la page pr relancer le jeu
                      /* je replace cette fontion en commentaire car le code final n'en a plus besoin clearInterval(interval); // pour que chrome termine le jeu */
                    }
                }
            }
        }
    }
}

//fonction qui va compter le score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//fonction qui va afficher les vies
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Projets: "+lives, canvas.width-65, 20);
}

//fonction pour changer le background en fonction du nombre de vie
function bgchange(){
  if(lives === 2){
   canvas.style.backgroundImage = "url(images/red.gif)";

 }
  else if(lives === 1){
    canvas.style.backgroundImage = "url(images/skull.gif)";
  }
}

//fonction qui va changer la couleur des briques en fonction des vies
function colorbrik(){
  if(lives === 2){
    ctx.fillStyle = "#C30B00";
  }
  else if(lives === 1){
    ctx.fillStyle = "#6636C2";
  }
  else{
  ctx.fillStyle = "#255A1C";
  }
}

//fonction qui va changer le background en fonction de victoire ou défaite
function bodychange(){
  if(!lives){
    body.style.backgroundImage = "url(images/jdg.jpeg)";
  }
  else if(score == brickRowCount*brickColumnCount){
    body.style.backgroundImage = "url(images/romain7.gif)";
  }
}
/*
//si la balle touche le mur du haut, sa direction s'inverse
if(y + dy < 0) { //si la position y de la balle est <0, on inverse le signe du déplacement de la balle
    dy = -dy;
}

//là on gère la bas du myCanvas
if(y + dy > canvas.height) {
    dy = -dy;
}*/




/*
//code pour afficher un carré rouge
ctx.beginPath();
ctx.rect(20, 40, 50, 50);  //les 2 premieres valeurs sont les coordonnées et les 2 autres la hauteur et largeur
ctx.fillStyle = "chocolate"; //donne une couleur
ctx.fill(); //rempli le rectangle de la couleur donnée
ctx.closePath();
//on entre les instructions entr beginpath et closepath

//ici on créer un cercle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
//arc() contient les coo x et y du centre; le rayon; angle de départ et de fin en radiant; direction du dessin true= sens trigonométrique

//ici on utilise stroke() pour colorer uniquement le contour du rectangle
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/
