//on commence par appeler l'élément qu'on veut modifier
var canvas = document.getElementById("myCanvas");

//variable pour le rendu 2D
var ctx = canvas.getContext("2d");

//on définit x et y
var x = canvas.width/2;
var y = canvas.height-30

//pour faire droire que la balle bouge
var dx = 2;
var dy = -2;

//fonction contenant le rayon de la balle
var ballRadius = 10;

//pour garder le dessin a jour, on définit une fonction draw en continu
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height); //cette ligne va permettre d'effacer l'ancienne position de la balle
drawball();
x += dx; //la balle sera peinte a chaque refresh
y += dy;
}
setInterval(draw, 10); //la fonction s'execute toute les 10ms

function drawball(){
  ctx.beginPath(); //code pour dessiner la balle
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
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


//je rassemble les 2 conditions du dessus en une pour gérer la collision aves le haut et bas
if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
}

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
