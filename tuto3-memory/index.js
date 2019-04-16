var init = '123456654321';
heure_depart = d.getTime();

//split() va diviser la chaine init en un tableau de 12 élem, 1 par caract

//sort() va trier les caractères isolés par split()

//Math.random va obtenir un nombre aléatoire en 0 et 1

//join() va rassembler les caractères pr en faire une chaine unique

var cartes = init.split('').sort(function(){return 0.5-Math.random()}).join('');

// 6 images jpg de 170/170px nommées 1.jpg... 6.jpg le dos= jpeg de 170/170 nommé dos.jpeg

var i,j,k;
var nombre_retourne = 0; //nombre de cartes retournées
var memo_carte = ''; //memorisation de la carte précédente
var memo_position = 0; //memo de la position de la carte precedente
var visible = new Array(0,0,0,0,0,0,0,0,0,0,0,0); //indique si les cartes st visibles (1) ou non (0)
var nombre_clics = 0; // Nombre de cartes retournées
var nombre_apparies = 0; // Nombre de cartes appariées
var d = new Date(); // Pour obtenir l'heure de début de partie
var heure_depart; // Heure de début de partie
var ns; // Nombre de secondes écoulées depuis le début de la partie

function affiche_image(src, id, name) {
        var img = document.createElement("img");
        img.src = src;
        img.id = id;
        img.name = name;
        document.body.appendChild(img);
        img.onclick = function() {
          if (nombre_retourne==2)
          $('#non')[0].play();
          else {
            nombre_retourne++;
            nombre_clics++;
            document.getElementById('ncr').innerHTML = nombre_clics;
            document.getElementById(id).src = name;
            $('#oui')[0].play();
            if (memo_carte == name) {  // Deux cartes identiques retournées
                $('#bravo')[0].play();
                nombre_apparies = nombre_apparies + 2;
                nombre_retourne=0;
                visible[memo_position-1] = 1;
                visible[id-1] = 1;
                if (nombre_apparies == 12) {
                  $('#superbravo')[0].play();
                  var d2 = new Date();
                  ns = (d2.getTime() - heure_depart) / 1000;
                  document.getElementById('temps_ecoule').innerHTML = 'Partie terminée en ' + ns + ' secondes !';
                }
            }
            else {
              memo_carte = name;
              memo_position = id;
              setTimeout(function() {if (visible[id-1]==0) {document.getElementById(id).src = 'dos.jpg'; nombre_retourne--;} if (nombre_retourne==0) memo_carte='';}, 1000);
            }
          }
        }
      }

for(i=1;i<4;i++){
  for(j=1;j<5;j++){
    k = (i-1)*4 + j - 1;
    affiche_image('dos.jpg', k + 1, cartes.charAt(k) + '.jpg');
  }
  document.write('<br>');
}
