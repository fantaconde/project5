//Obtenir l’URL de la page actuelle
let url = window.location.href;

//Convertir l’URL vers un tableau
let urlArray = new URL(url);

//Obtenir le numéro de commande à partir de l’URL
let orderNumber = urlArray.searchParams.get("id");

//Afficher le numéro de commande sur la page
document.getElementById("orderId").innerHTML = orderNumber;

//Effacer le panier du stockage local
localStorage.removeItem("cart");    