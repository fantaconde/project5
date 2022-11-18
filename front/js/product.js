//Get the URL of the current page
//
var url_str = window.location.href;
// console.log(url_str);

//Set the URL of the current page to a variable
var url = new URL(url_str);
console.log(url);

//Get the ID from the URL
var id = url.searchParams.get("id");

//Store Values
const productDetails = [];

//Console log the ID
// console.log(id);

fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((product) => {
    // console.log(product);
    productDetails.push(product);
    //insert product image
    document.querySelector(".item__img").innerHTML += `
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
        `;

    //insert product title
    document.getElementById("title").innerHTML = `${product.name}`;

    //Insert product description
    document.getElementById("description").innerHTML = `${product.description}`;

    //get quantity
    // var quantity = document.getElementById('quantity').value;
    // var totalprice = product.price * 2;
    //Insert product price
    document.getElementById("price").innerHTML = `${product.price}`;

    //Insert product colors
    // document.getElementById('colors').innerHTML = `${product.colors}`;
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
  // basket = []
  //create an array called basket it should include : productid, productColor, productQuantity
  const quantity = document.getElementById("quantity").value;
  const color = document.getElementById("colors").value;

  // obtenir le prix depuis le detail de produit
  const price = productDetails[0].price;

  // console.log(quantity);
  // console.log(color);
  // console.log(price)

  const basket = {
    productid: `${id}`,
    productQuantity: `${quantity}`,
    productColor: `${color}`,
    productPrice: `${price}`,
  };

  //Check Cart => localStorage.getItem("cart")
  //write Cart =>  localStorage.setItem("cart", JSON.stringify(basket))
  //JSON.stringify => convert an object to a string
  //JSON.parse => convert a string to an object

  //Check if cart is empty
  if (localStorage.getItem("cart") === null) {
    //Create cart
    localStorage.setItem("cart", JSON.stringify([basket]));
    console.log("cart created");
    //if cart is not empty
  } else {
    //Get cart
    const cart = JSON.parse(localStorage.getItem("cart"));

    //Check if product is already in cart
    const productInCart = cart.find(
      (product) => product.productid === id && product.productColor === color
    );

    //If product is already in cart
    if (productInCart) {
      console.log(productInCart);
      //Update quantity
      productInCart.productQuantity =
        //parseInt => convert a string to a number
        parseInt(productInCart.productQuantity) + parseInt(quantity);
      // console.log(productInCart.productQuantity);

      //Update cart localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    //if product is not in cart
    else {
      //Add product to cart
      localStorage.setItem("cart", JSON.stringify([...cart, basket]));
    }
  }
}
