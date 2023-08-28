//variabili

const url = "https://striveschool-api.herokuapp.com/api/product/";

//fetch async GET con id query string
async function getAPI(url) {
  const queryStr = new URLSearchParams(window.location.search);
  const productId = queryStr.get("id");
  try {
    const res = await fetch(url + productId, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTI2NTI5NTQsImV4cCI6MTY5Mzg2MjU1NH0.k7qXFCeocl_uq1sJUOdB9BNP88OllHHrA9L-lKFeOBg",
      },
    });
    const data = await res.json();
    console.log("response", data);
    createCard(data);
    getImgPexels(data.name);
  } catch (error) {
    console.log("errore nel recupero dati", error);
  }
}

getAPI(url);

//funzione creazione card richiamata dalla chiamata GET
function createCard(obj) {
  const card = `<div class="col-8">
  <div class="card p-3 rounded-5">
    <div class="d-flex justify-content-between align-items-center">
      <div class="mt-2">
        <h4 class="text-uppercase">${obj.brand}</h4>
        <div class="mt-5">
          <h5 class="text-uppercase mb-0">${obj.name}</h5>
          <h1 class="main-heading mt-0">${obj.price}€</h1>
          <div class="d-flex flex-row user-ratings">
            <div class="ratings">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
            <h6 class="text-muted ml-1">4/5</h6>
          </div>
        </div>
      </div>
      <div class="image">
        <img
          src="${obj.imageUrl}"
          alt="..."
          width="300"
        />
      </div>
    </div>

    <div
      class="d-flex justify-content-between align-items-center mt-2 mb-2"
    >
      <span>Colori disponibili</span>
      <div class="colors">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <p>${obj.description}</p>

    <button class="btn btn-success">Add to cart</button>
  </div>
</div>`;
  const container = document.getElementById("container_card");
  container.innerHTML = card;
}

// chiamata GET ad api pexels, per avere di 15 immagini casuali per nome prodotto nel carosello, non sempre arrivano immagini coerenti :D
async function getImgPexels(query) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}`,
      {
        headers: {
          Authorization:
            "PHJYQsugN2nYDa9lV3hiHLo4HP5mOkfjw21gisuCfDrfOgVHqBXfmiGn",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    makeCarousel(data);
  } catch (error) {
    console.log("non ho potuto effettuare la chiamata pexels", error);
  }
}

//creo carosello dimanico, e randomizzo la scelta dell'immagine tramite math.random
function makeCarousel(objPhoto) {
  let randomValue = Math.floor(Math.random() * objPhoto.photos.length);
  const carouselContainer = document.querySelector(".carousel-inner");
  carouselContainer.innerHTML = `          <div class="carousel-item active">
  <img src="${objPhoto.photos[randomValue].src.landscape}" class="d-block w-100 rounded-5" alt="..." />
</div>`;
  for (let index = 1; index < 4; index++) {
    randomValue = Math.floor(Math.random() * objPhoto.photos.length);
    carouselContainer.innerHTML += `          <div class="carousel-item">
  <img src="${objPhoto.photos[randomValue].src.landscape}" class="d-block w-100 rounded-5" alt="..." />
</div>`;
  }
}
