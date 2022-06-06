import data from "../../assets/data/pets.json" assert { type: "json" };

const BODY = document.querySelector("BODY");
const burgerBtn = document.querySelector(".burger");
const navHead = document.getElementById("nav-menu-header");
const SLIDER_RIGHT = document.querySelector("#slider-btn-right");
const SLIDER_LEFT = document.querySelector("#slider-btn-left");
const SLIDER = document.querySelector("#slider");
const SLIDER_ACTIVE = document.querySelector(".slider-item-active");
const NEXT_PAGE = document.querySelector(".pagination-btn-next");
const PREVIOUS_PAGE = document.querySelector(".pagination-btn-previous");
const FIRST_PAGE = document.querySelector(".pagination-btn-start");
const LAST_PAGE = document.querySelector(".pagination-btn-end");
let pageNumber = document.querySelector(".pagination-btn-page");
let sliderCards = document.querySelector(".slider-cards");

//pagination start

let setOfPets = [];
let arr = [];

while (setOfPets.length < 48) {
  while (arr.length < 8) {
    let randomNum = Math.floor(Math.random() * 8);
    if (!arr.includes(randomNum)) {
      arr.push(randomNum);
      setOfPets.push(randomNum);
    }
  }
  arr = [];
}

function createPetCard(obj) {
  let div = document.createElement("div");
  console.log();
  div.classList = "slider-card flex-container card-container";
  div.innerHTML = `<img src=${obj.img} alt="${obj.name}" class="img">
  <h4 class="title-item">${obj.name}</h4>
  <button class="btn pets-btn">Learn more</button>`;
  return div;
}

for (let i = 0; i < 8; i++) {
  let newCard = createPetCard(data[setOfPets[i]]);
  sliderCards.appendChild(createPetCard(data[setOfPets[i]]));
}

NEXT_PAGE.addEventListener("click", getNextPage);
LAST_PAGE.addEventListener("click", goLastPage);

function getPreviousPage() {
  let numberOfItemsOnPages;
  if (window.screen.width >= 1280) {
    numberOfItemsOnPages = 8;
  } else if (window.screen.width >= 768) {
    numberOfItemsOnPages = 6;
  } else {
    numberOfItemsOnPages = 3;
  }

  let page = +pageNumber.textContent;
  page -= 1;
  pageNumber.textContent = page;

  sliderCards.innerHTML = "";

  let amountOfPages = setOfPets.length / numberOfItemsOnPages;
  let start = (page - 1) * numberOfItemsOnPages;
  let end = start + numberOfItemsOnPages;
  for (let i = start; i < end; i++) {
    let newCard = createPetCard(data[setOfPets[i]]);
    sliderCards.appendChild(createPetCard(data[setOfPets[i]]));
  }

  if (+pageNumber.textContent === 1) {
    console.log("fuck");
    PREVIOUS_PAGE.classList.add("pagination-btn--inactive");
    FIRST_PAGE.classList.add("pagination-btn--inactive");
    PREVIOUS_PAGE.classList.remove("pagination-btn--active");
    FIRST_PAGE.classList.remove("pagination-btn--active");
    PREVIOUS_PAGE.removeEventListener("click", getPreviousPage);
    FIRST_PAGE.removeEventListener("click", goFirstPage);
  }
  if (+pageNumber.textContent !== 1) {
    console.log("hel");
    PREVIOUS_PAGE.classList.add("pagination-btn--active");
    FIRST_PAGE.classList.add("pagination-btn--active");
    PREVIOUS_PAGE.classList.remove("pagination-btn--inactive");
    FIRST_PAGE.classList.remove("pagination-btn--inactive");
  }

  NEXT_PAGE.classList.add("pagination-btn--active");
  LAST_PAGE.classList.add("pagination-btn--active");
  NEXT_PAGE.classList.remove("pagination-btn--inactive");
  LAST_PAGE.classList.remove("pagination-btn--inactive");

  NEXT_PAGE.addEventListener("click", getNextPage);
  LAST_PAGE.addEventListener("click", goLastPage);

  getPopUp();
}

function getNextPage() {
  let numberOfItemsOnPages;
  if (window.screen.width >= 1280) {
    numberOfItemsOnPages = 8;
  } else if (window.screen.width >= 768) {
    numberOfItemsOnPages = 6;
  } else {
    numberOfItemsOnPages = 3;
  }
  let page = +pageNumber.textContent;
  page += 1;
  pageNumber.textContent = page;
  sliderCards.innerHTML = "";
  let amountOfPages = setOfPets.length / numberOfItemsOnPages;
  let start = (page - 1) * numberOfItemsOnPages;
  let end = start + numberOfItemsOnPages;
  for (let i = start; i < end; i++) {
    let newCard = createPetCard(data[setOfPets[i]]);
    sliderCards.appendChild(createPetCard(data[setOfPets[i]]));
  }

  if (+pageNumber.textContent === amountOfPages) {
    NEXT_PAGE.classList.add("pagination-btn--inactive");
    LAST_PAGE.classList.add("pagination-btn--inactive");
    NEXT_PAGE.classList.remove("pagination-btn--active");
    LAST_PAGE.classList.remove("pagination-btn--active");
    NEXT_PAGE.removeEventListener("click", getNextPage);
    LAST_PAGE.removeEventListener("click", goLastPage);
  }

  if (+pageNumber.textContent !== 1) {
    PREVIOUS_PAGE.classList.add("pagination-btn--active");
    FIRST_PAGE.classList.add("pagination-btn--active");
    PREVIOUS_PAGE.classList.remove("pagination-btn--inactive");
    FIRST_PAGE.classList.remove("pagination-btn--inactive");
    PREVIOUS_PAGE.addEventListener("click", getPreviousPage);
    FIRST_PAGE.addEventListener("click", goFirstPage);
  }

  getPopUp();
}

FIRST_PAGE.addEventListener("click", goFirstPage);

function goFirstPage() {
  let numberOfItemsOnPages;
  if (window.screen.width >= 1280) {
    numberOfItemsOnPages = 8;
  } else if (window.screen.width >= 768) {
    numberOfItemsOnPages = 6;
  } else {
    numberOfItemsOnPages = 3;
  }

  sliderCards.innerHTML = "";
  let amountOfPages = setOfPets.length / numberOfItemsOnPages;
  pageNumber.textContent = "1";
  let start = (1 - 1) * numberOfItemsOnPages;
  let end = start + numberOfItemsOnPages;
  for (let i = start; i < end; i++) {
    let newCard = createPetCard(data[setOfPets[i]]);
    sliderCards.appendChild(createPetCard(data[setOfPets[i]]));
  }

  PREVIOUS_PAGE.classList.add("pagination-btn--inactive");
  FIRST_PAGE.classList.add("pagination-btn--inactive");
  PREVIOUS_PAGE.classList.remove("pagination-btn--active");
  FIRST_PAGE.classList.remove("pagination-btn--active");
  NEXT_PAGE.classList.add("pagination-btn--active");
  LAST_PAGE.classList.add("pagination-btn--active");
  NEXT_PAGE.classList.remove("pagination-btn--inactive");
  LAST_PAGE.classList.remove("pagination-btn--inactive");
  PREVIOUS_PAGE.removeEventListener("click", getPreviousPage);
  LAST_PAGE.removeEventListener("click", goFirstPage);

  NEXT_PAGE.addEventListener("click", getNextPage);
  LAST_PAGE.addEventListener("click", goLastPage);

  getPopUp();
}

function goLastPage() {
  let numberOfItemsOnPages;
  if (window.screen.width >= 1280) {
    numberOfItemsOnPages = 8;
  } else if (window.screen.width >= 768) {
    numberOfItemsOnPages = 6;
  } else {
    numberOfItemsOnPages = 3;
  }

  sliderCards.innerHTML = "";
  let amountOfPages = setOfPets.length / numberOfItemsOnPages;
  pageNumber.textContent = amountOfPages;
  let start = (amountOfPages - 1) * numberOfItemsOnPages;
  let end = start + numberOfItemsOnPages;
  for (let i = start; i < end; i++) {
    let newCard = createPetCard(data[setOfPets[i]]);
    sliderCards.appendChild(createPetCard(data[setOfPets[i]]));
  }

  NEXT_PAGE.classList.add("pagination-btn--inactive");
  LAST_PAGE.classList.add("pagination-btn--inactive");
  NEXT_PAGE.classList.remove("pagination-btn--active");
  LAST_PAGE.classList.remove("pagination-btn--active");
  PREVIOUS_PAGE.classList.add("pagination-btn--active");
  FIRST_PAGE.classList.add("pagination-btn--active");
  PREVIOUS_PAGE.classList.remove("pagination-btn--inactive");
  FIRST_PAGE.classList.remove("pagination-btn--inactive");
  NEXT_PAGE.removeEventListener("click", getNextPage);
  LAST_PAGE.removeEventListener("click", goLastPage);

  PREVIOUS_PAGE.addEventListener("click", getPreviousPage);
  FIRST_PAGE.addEventListener("click", goFirstPage);

  getPopUp();
}

//pagination end

const popup = document.querySelector(".popup");

// BURGER start

burgerBtn.addEventListener("click", () => {
  addClassActiveBurger();
  isVisiabaleNav();
  addClassLockBody();
  document.querySelector(".nav-menu").classList.toggle("is-active");
});

BODY.addEventListener("click", (event) => {
  if (
    event.target !== navHead &&
    burgerBtn.classList.contains("isActive") &&
    event.target !== burgerBtn
  ) {
    addClassActiveBurger();
    isVisiabaleNav();
    addClassLockBody();
    document.querySelector(".nav-menu").classList.remove("is-active");
  }
});

function addClassActiveBurger() {
  burgerBtn.classList.toggle("isActive");
}

function isVisiabaleNav() {
  if (burgerBtn.classList.contains("isActive")) {
    navHead.style.right = "0";
  } else {
    navHead.style.right = "-100%";
  }
}

function addClassLockBody() {
  BODY.classList.toggle("lock");
}

// BURGER end

//popup start

function getPopUp() {
  let petInfoBtns = document.querySelectorAll(".slider-card");
  petInfoBtns.forEach((element) => {
    element.addEventListener("click", () => {
      let petName = element.querySelector(".title-item").textContent;

      data.forEach((element) => {
        if (element.name === petName) {
          popup.innerHTML = `
        <div class="popup-container">
        <div class="popup-img-container">
          <img class="popup-img" src= ${element.img}></img>
        </div>
        <div class="popup-content">
          <h3 class="popup-heading heading-section">${element.name}</h3>
          <h4 class="title-item popup-subheading">${element.type} - ${element.breed}</h4>
          <p class="popup-text">${element.description}</p>
          <ul class="popup-list">
            <li class="popup-list-item"><span class="key">Age: </span><span data-age = 'age' class="popup-span">${element.age}</span></li>
            <li class="popup-list-item"><span class="key">Inoculations: </span><span data-Inoculations = 'inoculations:' class="popup-span">${element.inoculations}</span></li>
            <li class="popup-list-item"><span class="key">Diseases: </span><span data-diseases = 'diseases' class="popup-span">${element.diseases}</span></li>
            <li class="popup-list-item"><span class="key">Parasites: </span><span data-parasites = 'parasites' class="popup-span">${element.parasites}</span></li>
          </ul>
        </div>
        <div class="popup-cross">&#10006</div>
      </div>`;
        }
      });

      let popupCloseBtn = document.querySelector(".popup-cross");
      popup.classList.toggle("invisible");
      BODY.classList.toggle("lock");
      popupCloseBtn.addEventListener("click", () => {
        popup.classList.add("invisible");
        BODY.classList.remove("lock");
      });

      BODY.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup")) {
          popup.classList.add("invisible");
          BODY.classList.remove("lock");
        }
      });
    });
  });
}


getPopUp();
// let petInfoBtns = document.querySelectorAll(".slider-card");
// petInfoBtns.forEach((element) => {
//   element.addEventListener("click", () => {
//     let petName = element.querySelector(".title-item").textContent;

//     data.forEach((element) => {
//       if (element.name === petName) {
//         popup.innerHTML = `
//         <div class="popup-container">
//         <div class="popup-img-container">
//           <img class="popup-img" src= ${element.img}></img>
//         </div>
//         <div class="popup-content">
//           <h3 class="popup-heading heading-section">${element.name}</h3>
//           <h4 class="title-item popup-subheading">${element.type} - ${element.breed}</h4>
//           <p class="popup-text">${element.description}</p>
//           <ul class="popup-list">
//             <li class="popup-list-item"><span class="key">Age: </span><span data-age = 'age' class="popup-span">${element.age}</span></li>
//             <li class="popup-list-item"><span class="key">Inoculations: </span><span data-Inoculations = 'inoculations:' class="popup-span">${element.inoculations}</span></li>
//             <li class="popup-list-item"><span class="key">Diseases: </span><span data-diseases = 'diseases' class="popup-span">${element.diseases}</span></li>
//             <li class="popup-list-item"><span class="key">Parasites: </span><span data-parasites = 'parasites' class="popup-span">${element.parasites}</span></li>
//           </ul>
//         </div>
//         <div class="popup-cross">&#10006</div>
//       </div>`;
//       }
//     });

//     let popupCloseBtn = document.querySelector(".popup-cross");
//     popup.classList.toggle("invisible");
//     BODY.classList.toggle("lock");
//     popupCloseBtn.addEventListener("click", () => {
//       popup.classList.add("invisible");
//       BODY.classList.remove("lock");
//     });

//     BODY.addEventListener("click", (e) => {
//       if (e.target.classList.contains("popup")) {
//         popup.classList.add("invisible");
//         BODY.classList.remove("lock");
//       }
//     });
//   });
// });

//popup end
