import data from "../../assets/data/pets.json" assert { type: "json" };

const BODY = document.querySelector("body");
const burgerBtn = document.querySelector(".burger");
const navHead = document.getElementById("nav-menu-header");
const SLIDER_RIGHT = document.querySelector("#slider-btn-right");
const SLIDER_LEFT = document.querySelector("#slider-btn-left");
const SLIDER = document.querySelector("#slider");
const SLIDER_ACTIVE = document.querySelector(".slider-item-active");

let petInfoBtns = document.querySelectorAll(".slider-card");
const popup = document.querySelector(".popup");

//POPUP start
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

//POPUP end

// SLIDER start

const moveLeft = () => {
  SLIDER.classList.add("transition-left");
  SLIDER_LEFT.removeEventListener("click", moveLeft);
  SLIDER_RIGHT.removeEventListener("click", moveRight);

  let itemActive = document.querySelector(".slider-item-active");
  let itemLeft = document.querySelector(".slider-item-left");
  let curTitle = itemActive.querySelectorAll(".title-item");
  let arrPetName = [];
  let arrPetNewName = [];

  curTitle.forEach((element) => {
    arrPetName.push(element.textContent);
  });

  while (arrPetNewName.length < 3) {
    let randomNumber = Math.floor(Math.random() * 8);
    if (
      !arrPetName.includes(data[randomNumber].name) &&
      !arrPetNewName.includes(data[randomNumber].name)
    ) {
      arrPetNewName.push(data[randomNumber].name);
    }
  }

  itemLeft.innerHTML = '';
  itemLeft.append(addSliderCardDiv(arrPetNewName[0]));
  itemLeft.append(addSliderCardDiv(arrPetNewName[1]));
  itemLeft.append(addSliderCardDiv(arrPetNewName[2]));
};

//old case(left and right slide constant)

// const moveRight = () => {
//   SLIDER.classList.add("transition-right");
//   SLIDER_LEFT.removeEventListener("click", moveLeft);
//   SLIDER_RIGHT.removeEventListener("click", moveRight);

//   let itemActive = document.querySelector(".slider-item-active");
//   let itemRight = document.querySelector(".slider-item-right");
//   let itemLeft = document.querySelector(".slider-item-left");
//   let contentItemActive = document.querySelector(
//     ".slider-item-active"
//   ).innerHTML;
//   let contentItemRight = document.querySelector(".slider-item-right").innerHTML;
//   let contentItemLeft = document.querySelector(".slider-item-left").innerHTML;
// };

function addSliderCardDiv (name) {
let newSlideCard = document.createElement('div');
newSlideCard.classList.add('slider-card','flex-container', 'card-container')
data.forEach((element) => {
    if (element.name === name) {
      newSlideCard.innerHTML = `
      <img src='${element.img}' alt=${element.name} class="img">
      <h4 class="title-item">${element.name}</h4>
      <button class="btn pets-btn">Learn more</button>`;
      console.log(newSlideCard);
      
    }
  });
  return newSlideCard;
};

const moveRight = () => {
  SLIDER.classList.add("transition-right");
  SLIDER_LEFT.removeEventListener("click", moveLeft);
  SLIDER_RIGHT.removeEventListener("click", moveRight);

  let itemActive = document.querySelector(".slider-item-active");
  let itemRight = document.querySelector(".slider-item-right");
  let curTitle = itemActive.querySelectorAll(".title-item");
  let arrPetName = [];
  let arrPetNewName = [];

  curTitle.forEach((element) => {
    arrPetName.push(element.textContent);
  });

  while (arrPetNewName.length < 3) {
    let randomNumber = Math.floor(Math.random() * 8);
    if (
      !arrPetName.includes(data[randomNumber].name) &&
      !arrPetNewName.includes(data[randomNumber].name)
    ) {
      arrPetNewName.push(data[randomNumber].name);
    }
  }

  itemRight.innerHTML = '';
  itemRight.append(addSliderCardDiv(arrPetNewName[0]));
  itemRight.append(addSliderCardDiv(arrPetNewName[1]));
  itemRight.append(addSliderCardDiv(arrPetNewName[2]));
};

SLIDER_LEFT.addEventListener("click", moveLeft);
SLIDER_RIGHT.addEventListener("click", moveRight);

SLIDER.addEventListener("animationend", () => {
  SLIDER.classList.remove("transition-left");
});

SLIDER.addEventListener("animationend", (animationEvent) => {
  let itemActive = document.querySelector(".slider-item-active");
  let itemRight = document.querySelector(".slider-item-right");
  let itemLeft = document.querySelector(".slider-item-left");
  let contentItemActive = document.querySelector(
    ".slider-item-active"
  ).innerHTML;


  if (animationEvent.animationName === "move-left") {
    SLIDER.classList.remove("transition-left");
    itemActive.innerHTML = itemLeft.innerHTML;
  } else {
    SLIDER.classList.remove("transition-right");
    itemActive.innerHTML = itemRight.innerHTML;
  }

  SLIDER_LEFT.addEventListener("click", moveLeft);
  SLIDER_RIGHT.addEventListener("click", moveRight);

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
});

//old case
// SLIDER.addEventListener("animationend", (animationEvent) => {
//   let itemActive = document.querySelector(".slider-item-active");
//   let itemRight = document.querySelector(".slider-item-right");
//   let itemLeft = document.querySelector(".slider-item-left");
//   let contentItemActive = document.querySelector(
//     ".slider-item-active"
//   ).innerHTML;

//   let contentItemRight = document.querySelector(".slider-item-right").innerHTML;
//   let contentItemLeft = document.querySelector(".slider-item-left").innerHTML;

//   if (animationEvent.animationName === "move-left") {
//     SLIDER.classList.remove("transition-left");
//     itemActive.innerHTML = contentItemLeft;
//     itemLeft.innerHTML = contentItemRight;
//     itemRight.innerHTML = contentItemActive;
//   } else {
//     SLIDER.classList.remove("transition-right");
//     itemActive.innerHTML = contentItemRight;
//     itemRight.innerHTML = contentItemLeft;
//     itemLeft.innerHTML = contentItemActive;
//   }

//   SLIDER_LEFT.addEventListener("click", moveLeft);
//   SLIDER_RIGHT.addEventListener("click", moveRight);

//   let petInfoBtns = document.querySelectorAll(".slider-card");
//   petInfoBtns.forEach((element) => {
//     element.addEventListener("click", () => {
//       let petName = element.querySelector(".title-item").textContent;

//       data.forEach((element) => {
//         if (element.name === petName) {
//           popup.innerHTML = `
//           <div class="popup-container">
//           <div class="popup-img-container">
//             <img class="popup-img" src= ${element.img}></img>
//           </div>
//           <div class="popup-content">
//             <h3 class="popup-heading heading-section">${element.name}</h3>
//             <h4 class="title-item popup-subheading">${element.type} - ${element.breed}</h4>
//             <p class="popup-text">${element.description}</p>
//             <ul class="popup-list">
//               <li class="popup-list-item"><span class="key">Age: </span><span data-age = 'age' class="popup-span">${element.age}</span></li>
//               <li class="popup-list-item"><span class="key">Inoculations: </span><span data-Inoculations = 'inoculations:' class="popup-span">${element.inoculations}</span></li>
//               <li class="popup-list-item"><span class="key">Diseases: </span><span data-diseases = 'diseases' class="popup-span">${element.diseases}</span></li>
//               <li class="popup-list-item"><span class="key">Parasites: </span><span data-parasites = 'parasites' class="popup-span">${element.parasites}</span></li>
//             </ul>
//           </div>
//           <div class="popup-cross">&#10006</div>
//         </div>`;
//         }
//       });
//       let popupCloseBtn = document.querySelector(".popup-cross");
//       popup.classList.toggle("invisible");
//       BODY.classList.toggle("lock");
//       popupCloseBtn.addEventListener("click", () => {
//         popup.classList.add("invisible");
//         BODY.classList.remove("lock");
//       });
//     });
//   });
// });

// SLIDER end
