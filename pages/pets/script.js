import data from "../../assets/data/pets.json" assert { type: "json" };


let petInfoBtns = document.querySelectorAll(".pets-btn");
const popup = document.querySelector(".popup");

petInfoBtns.forEach((element) => {
  element.addEventListener("click", () => {
    let petName = element.previousSibling.previousSibling.textContent;
    
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
    popupCloseBtn.addEventListener('click', () => {
      popup.classList.add("invisible");
    })
  });
});