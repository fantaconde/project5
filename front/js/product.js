//Get the URL of the current page
var url_str = window.location.href;
console.log(url_str);

//Set the URL of the current page to a variable
var url = new URL(url_str);
console.log(url);

//Get the ID from the URL
var id = url.searchParams.get("id");

//Console log the ID
console.log(id);

fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .then(product => {
        console.log(product);
        //insert product image 
        document.querySelector(".item__img").innerHTML += `
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
        `

        //insert product title
        document.getElementById('title').innerHTML = `${product.name}`;

        //Insert product description
        document.getElementById('description').innerHTML = `${product.description}`;

        //get quantity
        // var quantity = document.getElementById('quantity').value;
        // var totalprice = product.price * 2;
        //Insert product price
        document.getElementById('price').innerHTML = `${product.price}`;

        //Insert product colors
        // document.getElementById('colors').innerHTML = `${product.colors}`;
        product.colors.forEach(color => {
                document.querySelector("#colors").innerHTML += `
                <option value="${color}">${color}</option>
                `
            })
            

    })
    .catch(error => {
        console.log(error);
    })



    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //     //use the data
    // })
    // .catch(error => {
    //     //do anything with the error
    // });