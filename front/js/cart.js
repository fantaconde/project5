
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
   else {
    //Si ni validé transmettre le message d’erreur
    console.log("form validated failed");
  }
;