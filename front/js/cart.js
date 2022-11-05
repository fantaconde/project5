var cart = JSON.parse(localStorage.getItem("cart"));

//console log cart
console.log(cart);

function getPriceandQuantity() {
  //Calculate the total Quantity from the cart
  const totalQuantity = cart.reduce((quantity, product) => {
    return quantity + parseInt(product.productQuantity);
  }, 0);

  //Calculate the total price from the cart
  const totalPrice = cart.reduce((price, product) => {
    return (
      price + parseInt(product.productPrice) * parseInt(product.productQuantity)
    );
  }, 0);

  //Insert total quantity in the cart
  document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;

  //Insert total price in the cart
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
}

//Get cart container
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

  //Call the getPriceandQuantity function
  getPriceandQuantity();
});

//Delete a specific item from the cart

//set timeout to wait for the DOM to load and add the event listener to the delete button
setTimeout(() => {
  const deleteItem = document.getElementsByClassName("deleteItem");
  console.log(deleteItem);
  console.log(deleteItem.length);

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", function () {
      //use closest to get the parent element
      console.log("item deleted");
      const article = this.closest(".cart__item");
      const productid = article.dataset.id;
      const productColor = article.dataset.color;

      //remove the item from the cart
      cart = cart.filter((product) => {
        return (
          product.productid !== productid ||
          product.productColor !== productColor
        );
      });
      //update the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      //remove the article
      article.remove();

      //update the total quantity and total price
      getPriceandQuantity();
    });
  }

  const itemQuantity = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", function () {
      //use closest to get the nearest parent element
      const article = this.closest(".cart__item");
      const productid = article.dataset.id; //get the product attribute
      console.log(productid);
      const productColor = article.dataset.color;
      console.log(productColor);

      console.log("quantity changed");
      console.log(this.value);
      //update the quantity in the cart
      cart = cart.map((product) => {
        if (
          product.productid === productid &&
          product.productColor === productColor
        ) {
          product.productQuantity = this.value;
        }
        return product;
      });

      //update the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      //update the total quantity and total price
      getPriceandQuantity();
    });
  }
}, 1000);

//form validation
function validateForm() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let checkEmail = email.includes("@");

  if (firstName == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "enter your first name";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }

  if (lastName == "") {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "enter your last name";
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
  return true;
}

//add event to order button
document.getElementById("order").addEventListener("click", function () {
  //run the form validation
  if (validateForm() == true) {
    //if the validation is true, get the form data

    //get cart product id
    let products = cart.map((product) => {
      return product.productid;
    });

    //Create the contact object
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    console.log("Method Activated");
    console.log(contact);
    const body = { contact, products };

    //Get the response from the form and make it an JSON Object
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
        console.log(data);
        localStorage.setItem("order", JSON.stringify(data));
        window.location.href = "confirmation.html";
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    //if nor validated pass the error message
    console.log("form validated failed");
  }
});

