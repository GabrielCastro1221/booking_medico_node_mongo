document.addEventListener("DOMContentLoaded", () => {
  const mainFooter = document.getElementById("main-footer");

  const footerContent = [
    {
      heading: "Dummy Links",
      links: ["Home", "Home", "Home", "Home", "Home"],
    },
    {
      heading: "Dummy Links",
      links: ["Home", "Home", "Home", "Home", "Home"],
    },
    {
      heading: "Dummy Links",
      links: ["Home", "Home", "Home", "Home", "Home"],
    },
    {
      heading: "Dummy Links",
      links: ["Home", "Home", "Home", "Home", "Home"],
    },
    {
      heading: "Dummy Links",
      links: ["Home", "Home", "Home", "Home", "Home"],
    },
  ];

  const footerInner = document.createElement("div");
  footerInner.className = "footer-inner";

  footerContent.forEach((section) => {
    const footerDiv = document.createElement("div");
    footerDiv.className = "footer-content";

    const h1 = document.createElement("h1");
    h1.textContent = section.heading;

    const linkDiv = document.createElement("div");
    linkDiv.className = "link";

    section.links.forEach((linkText) => {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = linkText;
      linkDiv.appendChild(a);
    });

    footerDiv.appendChild(h1);
    footerDiv.appendChild(linkDiv);
    footerInner.appendChild(footerDiv);
  });

  mainFooter.appendChild(footerInner);
});
