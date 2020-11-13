// Imports
import UI from "./UI";
import DB from "./DB";
import dom from "./DOM";
import speak from "./Synthesis";
import User from "./User";
import getSpellingWords from "./Data";

// Instances
const ui = new UI();
const db = new DB();
const ctr = new Control();

// Variables
const wordsArray = getSpellingWords();
const words = iterateWords(wordsArray);
let word = words.next().value;

// Controller
function Control() {
  const incrementScoreBy = 10;
  let correct = 0;
  let incorrect = 0;
  let score = 0;

  // Utilities
  this.listenTo = function (element, evnt, func) {
    element.addEventListener(evnt, func);
  };

  this.runOnStart = function (func) {
    window.onload = func;
  };

  this.syncUI = function () {
    ui.sync(dom.inCorrectElem, incorrect);
    ui.sync(dom.correctElem, correct);
    ui.sync(dom.scoreElem, score);
    // ui.sync(dom.userName, )
  };

  // Implementation
  this.saveUser = function (userObj) {
    const name = dom.registerFormNameInput.value;
    let letterPerWord = dom.registerFormRangeInput.value;
    let score = 0;
    let gender = "";
    dom.registerFormGenderInputs.forEach((i) => {
      if (i.checked) return (gender = i.value);
    });
    console.log(gender);
    const user = new User(name, gender, score, letterPerWord);
    db.saveUser(user);
  };

  this.validateAnswer = function (inputValue, wordToSpell) {
    const value = String(inputValue).toLowerCase().trim();
    const word = String(wordToSpell).toLowerCase().trim();

    if (value === word) {
      // Class
      ui.addClass(document.body, "success");
      ui.addClass(dom.guardImage, "shake");
      ui.addClass(dom.statusMsg, "success");
      setTimeout(() => {
        ui.removeClass(document.body, "success");
        ui.removeClass(dom.guardImage, "shake");
        ui.removeClass(dom.statusMsg, "success");
      }, 3000);

      // Sounds
      new Audio("sounds/correct.mp3").play();

      // value
      correct = correct + 1;
      score = score + incrementScoreBy;
      this.syncUI();
      return console.log("Success! :)");
    }

    // Class
    ui.addClass(document.body, "error");
    ui.addClass(dom.statusMsg, "error");

    setTimeout(() => {
      ui.removeClass(document.body, "error");
      ui.removeClass(dom.statusMsg, "error");
    }, 3000);

    // Sounds
    new Audio("sounds/incorrect.mp3").play();

    // Value
    incorrect = incorrect + 1;
    if (score !== 0) score = score - incrementScoreBy;
    this.syncUI();
    return console.log("Success! :)");
  };

  this.loadProfiles = function () {
    db.getUser().forEach(function (user) {
      ui.appendToParent(dom.profileContainer, ui.structureUserProfile(user));
    });
  };

  this.selectProfile = function (user) {
    ui.sync(dom.userName, user.name);
    ui.sync(dom.userScore, user.score);
    if (user.gender === "boy") {
      dom.userImage.setAttribute("src", "images/boy.png");
      dom.userImage.style.width = "65%";
    } else dom.userImage.setAttribute("src", "images/girl.png");
  };
}

// Controller Methods
ctr.runOnStart(() => {
  ctr.syncUI();
  ctr.loadProfiles();
  ui.openWidget(dom.profileSection);
  if (db.getUser().length === 0) ui.openWidget(dom.register);
});

ctr.listenTo(dom.spellForm, "submit", function (e) {
  e.preventDefault();
  if (!dom.spellInput.value)
    return console.error("Please you need an input to continue :)");

  ctr.validateAnswer(dom.spellInput.value, word);
  dom.spellInput.value = "";

  setTimeout(() => {
    let value = words.next().value;
    word = value;
    speak(value);
  }, 3500);
});

ctr.listenTo(dom.registerForm, "submit", function (e) {
  e.preventDefault();
  ui.saveUser((data) => db.saveUser.call(db, data));
});

ctr.listenTo(dom.speakButton, "click", function () {
  speak(word);
});

ctr.listenTo(dom.registerForm, "submit", function (e) {
  e.preventDefault();
  ctr.saveUser();
  ctr.loadProfiles();
  ui.closeWidget(dom.register);
});

ctr.listenTo(dom.registerFormRangeInput, "change", function () {
  ui.sync(dom.registerFormRangeInfo, dom.registerFormRangeInput.value);
});

ctr.listenTo(dom.profileContainer, "click", function (e) {
  if (!e.target.getAttribute("type") === "checkbox") return false;
  db.getUser().forEach(function (user) {
    if (Number(e.target.parentElement.getAttribute("data-id")) === user.id) {
      ctr.selectProfile(user);
      ui.closeWidget(dom.profileSection);
    }
  });
});

function iterateWords(words) {
  let nextIndex = 0;
  return {
    next: function () {
      return nextIndex < words.length
        ? { value: words[nextIndex++], done: false }
        : { done: true };
    },
  };
}
