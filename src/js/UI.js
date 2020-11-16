export default function UI() {
  this.sync = function (elem, value) {
    elem.textContent = value;
  };
  this.addClass = function (elem, className) {
    elem.classList.add(className);
  };
  this.removeClass = function (elem, className) {
    elem.classList.remove(className);
  };
  this.closeWidget = function (elem) {
    elem.classList.remove("show");
  };
  this.openWidget = function (elem) {
    elem.classList.add("show");
  };
  this.toggleSection = function (elem, btnArray) {
    btnArray.forEach(function (btn) {
      btn.addEventListener("click", function () {
        elem.classList.toggle("show");
      });
    });
  };
  this.structureUserProfile = function (obj) {
    const figure = document.createElement("figure");
    figure.setAttribute("data-id", obj.id);
    const span = document.createElement("span");
    span.classList.add("users__avatar");
    figure.innerHTML = `
    <input type="checkbox" />
    <span class="users__avatar" style="background: url(${obj.url}) no-repeat center center/cover"></span>
    <figcaption class="users__name">${obj.name}</figcaption>`;
    return figure;
  };
  this.clearChildren = function (parent) {
    parent.innerHTML = "";
  };
  this.appendToParent = function (parent, child) {
    parent.appendChild(child);
  };
}
