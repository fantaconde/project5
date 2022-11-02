//Obtenir l’URL de la page active
//
var url_str = window.location.href;
console.log(url_str);

//Définir l’URL de la page active sur une variable
var url = new URL(url_str);
console.log(url);

//Obtenir l’ID à partir de l’URL
var id = url.searchParams.get("id");

//valeur du magazin
const productDetails = [];

//Consigner le ID de la console
console.log(id);

fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((product) => {
    console.log(product);
    productDetails.push(product);
    //inserer une image de produit
    document.querySelector(".item__img").innerHTML += `
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
        `;

    //inserer le titre du produit
    document.getElementById("title").innerHTML = `${product.name}`;

    //Inserer la description du produit
    document.getElementById("description").innerHTML = `${product.description}`;

    // Obtenir la quantité
    //  let quantity = document.getElementById('quantity').value
    //  let totalprice = product.price * 2;
    //Insérer le prix du produit
    document.getElementById("price").innerHTML = `${product.price}`;

    //Insérer les couleurs du produit
    //document.getElementById('colors').innerHTML = '${product.colors}';
    product.colors.forEach((color) => {
      document.querySelector("#colors").innerHTML += `
                <option value="${color}">${color}</option>
                `;
    });
  })
  .catch((error) => {
    console.log(error);
  });

function addToCart() {
  // panier = []
  // créer un tableau appelé panier Il doit inclure : productid, productColor, productQuantity
  const quantity = document.getElementById("quantity").value;
  const color = document.getElementById("colors").value;
  console.log(quantity);
  console.log(color);

  const basket = {
    productid: `${id}`,
    productQuantity: `${quantity}`,
    productColor: `${color}`,
  };

  //Check Cart => localStorage.getItem(« panier »)
  //write Cart => localStorage.setItem(« cart », JSON.stringify(basket))
  //JSON.stringify => convertir un objet en chaîne
  //JSON.parse => convertir une chaîne en objet

  //Vérifiez si le panier est vide
  if (localStorage.getItem("cart") === null) {
    //Créer un panier
    localStorage.setItem("cart", JSON.stringify([basket]));
    console.log("cart created");
    //si le panier n'est pas vide
  } else {
    //obtenir le panier
    const cart = JSON.parse(localStorage.getItem("cart"));

    //Vérifiez si le produit est déjà dans le panier
    const productInCart = cart.find(
        (product) => product.productid === id && product.productColor === color
        );
      

    //Si le produit est déjà dans le panier
    if (productInCart) {
      console.log(productInCart)
      //mettre à jour la quantité
      productInCart.productQuantity =
      //parseInt => convertir une chaîne en nombre
        parseInt(productInCart.productQuantity) + parseInt(quantity);
      console.log(productInCart.productQuantity);

      //Mettre à jour le panier localStorag
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    //si le produit n’est pas dans le panier
    else {
      //  Ajouter un produit au panier
      localStorage.setItem("cart", JSON.stringify([...cart, basket]));
    }
  }
}