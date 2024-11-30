document.addEventListener("DOMContentLoaded", () => {
  const menubar = document.querySelector("#menu-bars");
  const navbar = document.querySelector(".navbar");

  const links = [
    { href: "/inicio", text: "Inicio" },
    { href: "/doctores", text: "Doctores" },
    { href: "/servicios", text: "Servicios" },
    { href: "/contacto", text: "Contactanos" },
  ];

  const navbarContainer = document.getElementById("navbar");
  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    navbarContainer.appendChild(a);
  });

  menubar.addEventListener("click", () => {
    menubar.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  });
});
