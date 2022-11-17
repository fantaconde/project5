let cart = JSON.parse(localStorage.getItem("cart"));

//panier de journal de la console
console.log(cart);

function getPriceandQuantity() {
  //Calculer la quantité totale du panier
  const totalQuantity = cart.reduce((quantity, product) => {
    return quantity + parseInt(product.productQuantity);
  }, 0);

  //Calculer le prix total à partir du panier
  const totalPrice = cart.reduce((price, product) => {
    return (
      price + parseInt(product.productPrice) * parseInt(product.productQuantity)
    );
  }, 0);

  //Insérer la quantité totale dans le panier
  document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;

  //Insérer le prix total dans le panier
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
}

//Obtenir le conteneur de panier
const cartContainer = document.getElementById("cart__items");
cart.forEach((product) => {
  fetch(`http://localhost:3000/api/products/${product.productid}`)
    .then((response) => response.json())
    .then((productDetails) => {
      cartContainer.innerHTML += `
            <article class="cart__item" data-id="${product.productid}" data-color="${product.productColor}">
                <div class="cart__item__img">
                  <img src="${productDetails.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productDetails.name}</h2>
                    <p>${product.productColor}</p>
                    <p>${productDetails.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
    });

  //Appelez la fonction getPriceandQuantity
  getPriceandQuantity();
});

//Supprimer un article spécifique du panier

//définir le délai d’attente pour attendre le chargement du DOM et ajouter l’écouteur d’événements au bouton de suppression
setTimeout(() => {
  const deleteItem = document.getElementsByClassName("deleteItem");
  console.log(deleteItem);
  console.log(deleteItem.length);

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", function () {
      //Utilisez le plus proche pour obtenir l’élément parent
      console.log("item deleted");
      const article = this.closest(".cart__item");
      const productid = article.dataset.id;
      const productColor = article.dataset.color;

      //Supprimer l’article du panier
      cart = cart.filter((product) => {
        return (
          product.productid !== productid ||
          product.productColor !== productColor
        );
      });
      //Mettre à jour le panier dans le stockage local
      localStorage.setItem("cart", JSON.stringify(cart));

      //Supprimer l’article
      article.remove();

      //mettre à jour la quantité totale et le prix total
      getPriceandQuantity();
    });
  }

  const itemQuantity = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", function () {
      //Utilisez le plus proche pour obtenir l’élément parent le plus proche
      const article = this.closest(".cart__item");
      const productid = article.dataset.id; //Obtenir l’attribut Product
      console.log(productid);
      const productColor = article.dataset.color;
      console.log(productColor);

      console.log("quantity changed");
      console.log(this.value);
      //Mettre à jour la quantité dans le panier
      cart = cart.map((product) => {
        if (
          product.productid === productid &&
          product.productColor === productColor
        ) {
          product.productQuantity = this.value;
        }
        return product;
      });

      //Mettre à jour le panier dans le stockage local
      localStorage.setItem("cart", JSON.stringify(cart));

      //mettre à jour la quantité totale et le prix total
      getPriceandQuantity();
    });
  }
}, 1000);

//Validation du formulaire
function validateForm() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let checkEmail = email.includes("@");

  //Définir RegEx pour le nombre
  let number = /[0-9]/;

  if (firstName == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "enter your first name";
    return false;
  } else if (number.test(firstName)) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "your first name can't contain numbers";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }

  if (lastName == "") {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "enter your last name";
    return false;
  } else if (number.test(lastName)) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "your last name can't contain numbers";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }

  if (address == "") {
    document.getElementById("addressErrorMsg").innerHTML = "enter your address";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }

  if (city == "") {
    document.getElementById("cityErrorMsg").innerHTML = "enter your city";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }

  if (email == "") {
    document.getElementById("emailErrorMsg").innerHTML = "enter your email";
    return false;
  } else if (checkEmail == false) {
    document.getElementById("emailErrorMsg").innerHTML = "enter a valid email";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }

  //Vérifiez si le nom et l’adresse de l’e-mail ne sont pas un numéro

  return true;
}

//vérifier si la quantité totale de produit est supérieure à 100

function checkQuantity() {
  let totalQuantity = 0;
  cart.forEach((product) => {
    totalQuantity += parseInt(product.productQuantity);
  });
  if (totalQuantity > 100) {
    alert("You can't order more than 100 products");
    return false;
  }
  return true;
}

//Bouton Ajouter un événement à la commande
document.getElementById("order").addEventListener("click", function () {
  //Exécuter la validation du formulaire
  if ((validateForm() == true) & (checkQuantity() == true)) {
    //Si la validation est vraie, obtenir les données du formulaire

    //Obtenir l’ID du produit panier
    let products = cart.map((product) => {
      return product.productid;
    });

    //Créer l’objet contact
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    // console.log("Methode Activatée");
    // console.log(contact);
    const body = { contact, products };

    //Obtenir la réponse du formulaire et en faire un objet JSON
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
      // body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.orderId);
        let orderId = data.orderId;
        // localStorage.setItem(« order », JSON.stringify(data));
        window.location.href = "confirmation.html?id=" + orderId;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    //Si ni validé transmettre le message d’erreur
    console.log("form validated failed");
  }
});