// Create variables targetting the relevant DOM elements here 👇

// Cover Elements:

var cover = document.querySelector(".cover-image");
var title = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");

// Views:

var homeView = document.querySelector(".home-view");
var formView = document.querySelector(".form-view");
var savedView = document.querySelector(".saved-view");
var savedCoversDisplay = document.querySelector(".saved-covers-section");

// Controls:

var btnHome = document.querySelector(".home-button");
var btnRandomCover = document.querySelector(".random-cover-button");
var btnSaveCover = document.querySelector(".save-cover-button");
var btnViewSaved = document.querySelector(".view-saved-button");
var btnNewCover = document.querySelector(".make-new-button");

// Form:

var form = document.querySelector("form");
var btnForm = document.querySelector(".create-new-book-button");
var inputCover = document.querySelector(".user-cover");
var inputTitle = document.querySelector(".user-title");
var inputDesc1 = document.querySelector(".user-desc1");
var inputDesc2 = document.querySelector(".user-desc2");


// We've provided a few variables below
var savedCovers = [];
var currentCover;


// Add your event listeners here 👇

btnRandomCover.addEventListener("click", () => {
  createRandomCover();
  renderMain();
});

btnHome.addEventListener("click", displayHome);

btnNewCover.addEventListener("click", displayMakeOwnCover);

btnViewSaved.addEventListener("click", displaySavedView);

btnForm.addEventListener("click", submitForm);

btnSaveCover.addEventListener("click", saveCover);

savedCoversDisplay.addEventListener("dblclick", deleteSaved);

// Create your event handlers and other functions here 👇

function createRandomCover() {
  var randomImage = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  currentCover = createCover(randomImage, randomTitle, randomDescriptor1, randomDescriptor2);
  return currentCover;
}

function saveCover() {
  var isUnique = true;
  for (let i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id === currentCover.id) {
      isUnique = false;
    }
  }
  if (isUnique) {
    savedCovers.push(currentCover);
  }
  renderSaved();
}

function renderMain() {
  cover.src = currentCover.coverImg;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function renderSaved() {
  savedCoversDisplay.innerHTML = "";
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversDisplay.innerHTML += `
    <section class="mini-cover" id="${savedCovers[i].id}">
      <img src=${savedCovers[i].coverImg} class="mini-cover">
      <h2 class="cover-title">${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
    </section>`
  }
}

function deleteSaved(e) {
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id === +e.target.parentNode.id) {
      savedCovers.splice(i, 1);
    }
  }
  renderSaved();
}

function displayHome() {
  show(homeView);
  hide(formView);
  hide(savedView);
  hide(btnHome);
  show(btnRandomCover);
  show(btnSaveCover);
}

function displayMakeOwnCover() {
  hide(homeView);
  show(formView);
  hide(savedView);
  show(btnHome);
  hide(btnRandomCover);
  hide(btnSaveCover);
}

function displaySavedView() {
  hide(homeView);
  hide(formView);
  show(savedView);
  show(btnHome);
  hide(btnRandomCover);
  hide(btnSaveCover);
  renderSaved();
}

function submitForm(e) {
  e.preventDefault();
  currentCover = createCover(inputCover.value, inputTitle.value, inputDesc1.value, inputDesc2.value);
  covers.push(inputCover.value);
  titles.push(inputTitle.value);
  descriptors.push(inputDesc1.value);
  descriptors.push(inputDesc2.value);
  displayHome();
  renderMain();
}



// Helpful functions

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

// Run on load

createRandomCover();
renderMain();