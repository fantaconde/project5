
//Call the API
fetch("http://localhost:3000/api/products")
.then(response => response.json())
//Console log the data and use the data on the HTML Page
.then(data => {
    //confirm the data has been received
    console.log(data);

    //Loop through the data and display it on the HTML page
    data.forEach(product => {
        document.querySelector("#items").innerHTML += `
        
         <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `
    })
})
//Return an error if the API call fails
.catch(error => {
    console.error(error);
})