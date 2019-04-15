//on commence par appeler l'élément qu'on veut modifier
var canvas = document.getElementById("myCanvas");

//variable pour le rendu 2D
var ctx = canvas.getContext("2d");

//code pour afficher un carré rouge
ctx.beginPath();
ctx.rect(20, 40, 50, 50);  //les 2 premieres valeurs sont les coordonnées et les 2 autres la hauteur et largeur
ctx.fillStyle = "#FF0000"; //donne une couleur
ctx.fill(); //rempli le rectangle de la couleur donnée
ctx.closePath();
/*on entre les instructions entr beginpath et closepath*/
