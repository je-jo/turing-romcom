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
var savedCovers = [
  createCover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;


// Add your event listeners here 👇

btnRandomCover.addEventListener("click", () => {
  createRandomCover();
  updateDisplay();
});

btnHome.addEventListener("click", displayHome);

btnNewCover.addEventListener("click", displayMakeOwnCover);

btnViewSaved.addEventListener("click", displaySavedView);

btnForm.addEventListener("click", submitForm);

// Create your event handlers and other functions here 👇

function createRandomCover() {
  var randomImage = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  currentCover = createCover(randomImage, randomTitle, randomDescriptor1, randomDescriptor2);
  return currentCover;
}

function updateDisplay() {
  cover.src = currentCover.coverImg;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
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
}

function submitForm(e) {
  e.preventDefault();
  currentCover = createCover(inputCover.value, inputTitle.value, inputDesc1.value, inputDesc2.value);
  covers.push(inputCover.value);
  titles.push(inputTitle.value);
  descriptors.push(inputDesc1.value);
  descriptors.push(inputDesc2.value);
  displayHome();
  updateDisplay();
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
updateDisplay();