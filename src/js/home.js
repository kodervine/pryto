const mobileNavContainer = document.getElementById("mobile-nav-container");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
  if (mobileNavContainer.classList.contains("hidden")) {
    mobileNavContainer.classList.remove("hidden");
    mobileNavContainer.classList.add("block");
  } else {
    mobileNavContainer.classList.add("hidden");
  }
});
