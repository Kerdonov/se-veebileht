// main.js

// Add event listener to all links in the navbar
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav ul.navbar li a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetPage = event.target.getAttribute("href");
      window.location.href = targetPage;
    });
  });
});
