//variabili

const url = "https://striveschool-api.herokuapp.com/api/product/";

//fetch async GET
async function getAPI(url) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTI2NTI5NTQsImV4cCI6MTY5Mzg2MjU1NH0.k7qXFCeocl_uq1sJUOdB9BNP88OllHHrA9L-lKFeOBg",
      },
    });
    const data = await res.json();
    console.log("response", data);
    makeCard(data);
  } catch (error) {
    console.log("errore nel recupero dati", error);
  }
}

getAPI(url);

function makeCard(res) {
  res.forEach((element) => {
    const divRow = document.querySelector(".container-fluid .row");
    console.log(divRow);
    const card = `<div class="col-6">
    <div class="card rounded-5">
      <img src="${element.imageUrl}" class="card-img-top rounded-top-5" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          ${element.brand}
        </h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><a href="./details.html?id=${element._id}">Dettagli Prodotto</a></li>
        </ul>
      </div>
    </div>`;

    divRow.innerHTML += card;
  });
}
