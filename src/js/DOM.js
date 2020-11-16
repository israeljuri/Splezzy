function DOM() {
  this.spellForm = document.querySelector(".body__form");
  this.spellInput = document.querySelector(".body__form-input");
  this.guardImage = document.querySelector(".user__image img");
  this.statusMsg = document.querySelector(".body__form-msg");
  this.scoreElem = document.querySelector(".user__score .value");
  this.correctElem = document.querySelector(".body__nav-stats .correct .value");
  this.inCorrectElem = document.querySelector(
    ".body__nav-stats .incorrect .value"
  );
  this.speakButton = document.querySelector(".body__form-speak");
  this.appUserSection = document.querySelector(".app-user");
  this.soundCorrect = document.querySelector(".body__sound-correct");
  this.soundIncorrect = document.querySelector(".body__sound-incorrect");

  this.register = document.querySelector(".register");
  this.registerCancelBtn = document.querySelector(".register__form-btn-cancel");
  this.registerSaveBtn = document.querySelector(".register__form-btn-save");
  this.registerForm = document.querySelector(".register__form");
  this.registerFormNameInput = document.querySelector(".register__form-input");
  this.registerFormRangeInput = document.querySelector(
    ".register__form-word-range"
  );
  this.registerFormRangeInfo = document.querySelector(
    ".register__form-info--range .value"
  );
  this.registerFormGenderInputs = document.querySelectorAll(
    ".register__form-gender"
  );

  this.user = document.querySelector(".user");
  this.userName = document.querySelector(".user__player");
  this.userScore = document.querySelector(".user__score .value");
  this.userImageContainer = document.querySelector(".user__image");
  this.userImage = this.userImageContainer.querySelector("img");
  this.profileSection = document.querySelector(".users");
  this.profileContainer = document.querySelector(".users-content");
  this.newUserBtn = document.querySelector(".users__cta .btn");
  this.settingsBtn = document.querySelector(".user__nav-setting");
  this.refreshBtn = document.querySelector(".user__nav-refresh");
}

const dom = new DOM();

export default dom;
