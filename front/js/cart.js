var cart = JSON.parse(localStorage.getItem("cart"));

//console log cart
console.log(cart);

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
});

//Calculate the total Quantity from the cart
const totalQuantity = cart.reduce((acc, product) => {
  return acc + parseInt(product.productQuantity);
}, 0);

//Calculate the total price from the cart
const totalPrice = cart.reduce((price, product) => {
  return (
    price + parseInt(product.productQuantity) * parseInt(product.productPrice)
  );
}, 0);

console.log(totalQuantity);
console.log(totalPrice);

//Insert total quantity in the cart
document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;

//Insert total price in the cart
document.getElementById("totalPrice").innerHTML = `${totalPrice}`;

//Delete item from cart

