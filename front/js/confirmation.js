//get the order number and clear the cart from local storage

var orderNumber = JSON.parse(localStorage.getItem("order"));
console.log(orderNumber.orderId);

document.getElementById("orderId").innerHTML = orderNumber.orderId;

//clear the cart from local storage
localStorage.removeItem("cart");
//clear the order from local storage
localStorage.removeItem("order");