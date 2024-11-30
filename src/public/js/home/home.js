document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    {
      id: "main-technology",
      content: [
        {
          icon: "fi fi-tr-hands-heart",
          title: "Quality & Safety",
          description:
            "Our Delmont hospital utilizes state of the art technology and employs a team of true experts.",
        },
        {
          icon: "fi fi-rr-doctor",
          title: "Quality & Safety",
          description:
            "Our Delmont hospital utilizes state of the art technology and employs a team of true experts.",
        },
        {
          icon: "fi fi-tr-user-md",
          title: "Quality & Safety",
          description:
            "Our Delmont hospital utilizes state of the art technology and employs a team of true experts.",
        },
      ],
      render: (item) => {
        const div = document.createElement("div");
        div.className = "inner-technology";

        const span = document.createElement("span");

        const icon = document.createElement("i");
        icon.className = item.icon;

        const h2 = document.createElement("h2");
        h2.textContent = item.title;

        const p = document.createElement("p");
        p.textContent = item.description;

        div.appendChild(span);
        div.appendChild(icon);
        div.appendChild(h2);
        div.appendChild(p);

        return div;
      },
    },
    {
      id: "main-about",
      content: {
        heading: "About Us",
        imageSrc: "/assets/img/about1.png",
        imageAlt: "About Image",
        title:
          "We're setting Standards in Research <br> what's more, Clinical Care.",
        description1:
          "We provide the most full medical services, so every person could have the opportunity to receive qualitative medical help.",
        description2:
          "Our Clinic has grown to provide a world class facility for the treatment of tooth loss, dental cosmetics and more advanced restorative dentistry. We are among the most qualified implant providers in the AUS with over 30 years of quality training and experience.",
        buttonText: "Read More",
      },
      render: (content) => {
        const aboutHeading = document.createElement("div");
        aboutHeading.className = "about-heading";
        aboutHeading.textContent = content.heading;

        const innerMainAbout = document.createElement("div");
        innerMainAbout.className = "inner-main-about";

        const aboutInnerContentLeft = document.createElement("div");
        aboutInnerContentLeft.className = "about-inner-content-left";

        const img = document.createElement("img");
        img.src = content.imageSrc;
        img.alt = content.imageAlt;

        aboutInnerContentLeft.appendChild(img);

        const aboutInnerContent = document.createElement("div");
        aboutInnerContent.className = "about-inner-content";

        const aboutRightContent = document.createElement("div");
        aboutRightContent.className = "about-right-content";

        const h2 = document.createElement("h2");
        h2.innerHTML = content.title;

        const p1 = document.createElement("p");
        p1.textContent = content.description1;

        const p2 = document.createElement("p");
        p2.className = "aboutsec-content";
        p2.textContent = content.description2;

        const button = document.createElement("button");
        button.className = "aboutbtn";
        button.textContent = content.buttonText;

        aboutRightContent.appendChild(h2);
        aboutRightContent.appendChild(p1);
        aboutRightContent.appendChild(p2);
        aboutRightContent.appendChild(button);

        aboutInnerContent.appendChild(aboutRightContent);
        innerMainAbout.appendChild(aboutInnerContentLeft);
        innerMainAbout.appendChild(aboutInnerContent);

        const fragment = document.createDocumentFragment();
        fragment.appendChild(aboutHeading);
        fragment.appendChild(innerMainAbout);

        return fragment;
      },
    },
    {
      id: "main-home",
      content: {
        welcomeText: "welcome to hospital management",
        title: "We take care our<br> Patients Healths",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam veniam porro eius, fugiat vero ut ipsum libero",
        buttons: [
          { href: "", text: "Información" },
          { href: "/doctores", text: "Doctores", class: "homebtnsec" },
        ],
        imageSrc: "/assets/img/hero2.png",
        imageAlt: "Hero Image",
      },
      render: (content) => {
        const homeDiv = document.createElement("div");
        homeDiv.className = "home";

        const homeLeftContent = document.createElement("div");
        homeLeftContent.className = "home-left-content";

        const span = document.createElement("span");
        span.textContent = content.welcomeText;

        const h2 = document.createElement("h2");
        h2.innerHTML = content.title;

        const p = document.createElement("p");
        p.className = "lorem";
        p.textContent = content.description;

        const homeBtnDiv = document.createElement("div");
        homeBtnDiv.className = "home-btn";

        content.buttons.forEach((button) => {
          const a = document.createElement("a");
          a.href = button.href;
          a.textContent = button.text;
          if (button.class) {
            a.className = button.class;
          }
          homeBtnDiv.appendChild(a);
        });

        homeLeftContent.appendChild(span);
        homeLeftContent.appendChild(h2);
        homeLeftContent.appendChild(p);
        homeLeftContent.appendChild(homeBtnDiv);

        const homeRightContent = document.createElement("div");
        homeRightContent.className = "home-right-content";

        const img = document.createElement("img");
        img.src = content.imageSrc;
        img.alt = content.imageAlt;

        homeRightContent.appendChild(img);

        homeDiv.appendChild(homeLeftContent);
        homeDiv.appendChild(homeRightContent);

        return homeDiv;
      },
    },
  ];

  sections.forEach((section) => {
    const container = document.getElementById(section.id);
    if (container) {
      if (Array.isArray(section.content)) {
        section.content.forEach((item) => {
          container.appendChild(section.render(item));
        });
      } else {
        container.appendChild(section.render(section.content));
      }
    }
  });
});
