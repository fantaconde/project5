
// Appeler l'API
fetch("http://localhost:3000/api/products")
.then(response => response.json())
//consigner les données et utiliser les données sur la page HTML
.then(data => {
    //confirmer que les données ont été reçues
    console.log(data);

    //Parcourez les données en boucle et affichez-les sur la page HTML
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
//Renvoyer une erreur si l’appel d’API échoue
.catch(error => {
    console.error(error);
})