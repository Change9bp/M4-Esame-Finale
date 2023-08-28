//variabili
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.getElementById("product-form");
const tableBody = document.getElementById("table-body");
const titleForm = document.getElementById("title_form");

const nameInput = document.getElementById("name");
const descrInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const alertContainer = document.getElementById("alert-container");

let checkPUT = "";
let idPost = "";

//funzione di chiamata GET per popolare la home al caricamento pagina
getAPI(url);

//chiamata GET + generazione tabella
async function getAPI(url) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTI2NTI5NTQsImV4cCI6MTY5Mzg2MjU1NH0.k7qXFCeocl_uq1sJUOdB9BNP88OllHHrA9L-lKFeOBg",
      },
    });
    const data = await res.json();
    tableBody.innerHTML = "";

    document.querySelector("#spinner_container").classList.remove("d-none");
    setTimeout(() => {
      document.querySelector("#spinner_container").classList.add("d-none");
      addTableRow(data);
    }, 1500);
  } catch (error) {
    console.log("errore nel recupero dati", error);
  }
}
//funzione di creazione rpodotto in tabella
function addTableRow(data) {
  data.forEach((obj) => {
    let row = `<tr>
      <td>${obj._id}</td>
      <td>${obj.name}</td>
      <td>${obj.description}</td>
      <td>${obj.brand}</td>
      <td>${obj.imageUrl}</td>
      <td>${obj.price}</td>
      <td><button id="edit_obj" class="btn" onclick="editData('${obj._id}', this)"><i class="fa-solid fa-pen-to-square fa-xl"></i></button></td>
      <td><button id="del_obj" class="btn" onclick="delData('${obj._id}')"><i class="fa-solid fa-trash fa-xl"></i></button></td></tr>`;

    tableBody.innerHTML += row;
  });
}
//evento in ascolto con submit del form e chiamata fetch di tipo POST o PUT, dipende dalla variabile checkPUT
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const isFormValid = handelFormValidation();
  if (!isFormValid) return false;

  const metodo = !!checkPUT ? "PUT" : "POST";
  console.log(metodo);
  const product = {
    name: nameInput.value,
    description: descrInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };

  try {
    const response = await fetch(url + idPost, {
      method: metodo,
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTI2NTI5NTQsImV4cCI6MTY5Mzg2MjU1NH0.k7qXFCeocl_uq1sJUOdB9BNP88OllHHrA9L-lKFeOBg",
      },
    });

    form.reset();
    checkPUT = "";
    idPost = "";
    getAPI(url);
    setTimeout(() => {
      showAlertContainer(metodo);
    }, 1500);
    titleForm.innerText = "CARICA PRODOTTO";
    //effettuo chiamata GET per popolare la tabella con i risultati della response
  } catch (error) {
    console.log("non sono riusvcito a completare la chiamata", error);
  }
});

//funzioni di validazione del FORM

function handelFormValidation() {
  const validation = validateForm();
  let isValid = true;

  if (!validation.isValid) {
    for (const field in validation.errors) {
      const errorElement = document.getElementById(`${field}-error`);
      errorElement.textContent = "";
      errorElement.textContent = validation.errors[field];
    }

    isValid = false;
  }

  return isValid;
}

function validateForm() {
  const errors = {};

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  if (!name) errors.name = "Il campo nome è obbligatorio.";
  else errors.name = "";

  if (!description) errors.description = "Il campo descrizione è obbligatorio.";
  else errors.description = "";

  if (!brand) errors.brand = "Il campo brand è obbligatorio.";
  else errors.brand = "";

  if (!imageUrl) errors.imageUrl = "Il campo image URL è obbligatorio.";
  else errors.imageUrl = "";

  if (!price) errors.price = "Il campo prezzo è obbligatorio.";
  else errors.price = "";

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  };
}

//funzione di PUT

function editData(id, prop) {
  titleForm.innerText = "MODIFICA PRODOTTO";

  checkPUT = 1;
  idPost = id;

  nameInput.value =
    prop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  descrInput.value =
    prop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  brandInput.value =
    prop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  imageUrlInput.value =
    prop.parentElement.previousElementSibling.previousElementSibling.innerText;
  priceInput.value = prop.parentElement.previousElementSibling.innerText;
}

//funzione di delete
async function delData(id) {
  if (confirm("Sei sicuro di voler cancellare il prodotto selezionato?")) {
    try {
      const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzZDU5OTFmMTc1YzAwMTRjNTU5MTYiLCJpYXQiOjE2OTI2NTI5NTQsImV4cCI6MTY5Mzg2MjU1NH0.k7qXFCeocl_uq1sJUOdB9BNP88OllHHrA9L-lKFeOBg",
        },
      });
      getAPI(url);
      showAlertContainer();
    } catch (error) {
      console.log("non sono riusvcito a completare la chiamata", error);
    }
  }
}

// mostro messaggio se l'operazione di creazione, modifica o cancellazione è andata a buon fine
function showAlertContainer(metodo) {
  console.log(metodo);
  switch (metodo) {
    case "PUT":
      alertContainer.innerText = "PRODOTTO MODIFICATO CORRETTAMENTE";
      alertContainer.classList.remove("d-none");
      break;
    case "POST":
      alertContainer.innerText = "PRODOTTO CARICATO CORRETTAMENTE";
      alertContainer.classList.remove("d-none");
      break;
    default:
      alertContainer.innerText = "PRODOTTO CANCELLATO CORRETTAMENTE";
      alertContainer.classList.remove("d-none");
      break;
  }
  setTimeout(() => {
    alertContainer.classList.add("d-none");
  }, 3000);
}
