const buttons = document.querySelectorAll("button");


for (let i =0; i < buttons.length; i++){
  buttons[i].addEventListener("click", function(){
    const joueur = buttons[i].innerHTML; //const une constant, à l'inverse d'une variable qui peut changer
    const robot = buttons[Math.floor(Math.random() * buttons.length)].innerHTML; //on cherche un aléatoir que l'on arrondi ac mathh.floor
    let resultat = "";

      if (joueur === robot){
        resultat = "Egalité";
      }
      else if (joueur === "Pierre" && robot === "Ciseaux") || (joueur === "Feuille" && robot === "Pierre") || (joueur === "Ciseaux" && robot === "Feuille")){
        resultat = "Gagné";
      }
      else{
        resultat = "Perdu";
      }

      //stop a 15min26 de video

    //console.log('Joueur : ${joueur} VS Robot : ${robot}');
  });
}
