document.addEventListener("DOMContentLoaded", () => {
  const mainServices = document.getElementById("main-services");

  const services = [
    {
      icon: "fa-solid fa-truck-medical",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
    {
      icon: "fa-regular fa-hospital",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
    {
      icon: "fa-regular fa-heart",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
    {
      icon: "fa-solid fa-notes-medical",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
    {
      icon: "fa-solid fa-list-check",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
    {
      icon: "fa-solid fa-user-doctor",
      title: "Health Check",
      description:
        "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
    },
  ];

  services.forEach((service) => {
    const div = document.createElement("div");
    div.className = "inner-services";

    const iconDiv = document.createElement("div");
    iconDiv.className = "service-icon";

    const icon = document.createElement("i");
    icon.className = service.icon;

    const h3 = document.createElement("h3");
    h3.textContent = service.title;

    const p = document.createElement("p");
    p.textContent = service.description;

    iconDiv.appendChild(icon);
    div.appendChild(iconDiv);
    div.appendChild(h3);
    div.appendChild(p);

    mainServices.appendChild(div);
  });
});
