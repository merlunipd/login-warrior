// Easter Egg
let DOMHeaderLogo = document.querySelector("#header-logo");
let headerLogoRotation = 0;
DOMHeaderLogo.addEventListener("click", () => {
  headerLogoRotation += Math.random() > 0.5 ? 360 : -360;
  DOMHeaderLogo.style.transform = "rotate(" + headerLogoRotation + "deg)";
});