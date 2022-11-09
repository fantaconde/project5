
//get url of the current page
var url = window.location.href;

//conver the url to an array
var urlArray = new URL(url);

//get the order number from the url
var orderNumber = urlArray.searchParams.get("id");

//display the order number on the page
document.getElementById("orderId").innerHTML = orderNumber;

//clear the cart from local storage
localStorage.removeItem("cart");    