document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tabs-btns button");
  const sections = document.querySelectorAll(".profile-content");

  const showSection = (targetId) => {
    sections.forEach((section) => {
      section.style.display = section.id === targetId ? "block" : "none";
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      showSection(targetId);
    });
  });

  showSection("profile");

  const token = localStorage.getItem("token");
  if (token) {
    getUserProfile(token);
  }
});

const getUserProfile = async (token) => {
  try {
    const response = await fetch("/api/v1/users/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/";
      } else {
        throw new Error("Error al obtener el perfil del usuario");
      }
    }

    const result = await response.json();
    if (result.success) {
      renderProfile(result.data);
      renderBookings(result.data.bookings);
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const renderProfile = (data) => {
  const profileContainer = document.querySelector(".perfil-usuario-body");
  const fields = {
    name: ".perfil-usuario-bio .titulo",
    email: ".lista-datos li:nth-child(1) span",
    phone: ".lista-datos li:nth-child(2) span",
    gender: ".lista-datos li:nth-child(3) span",
    role: ".lista-datos li:nth-child(4) span",
    blood_type: ".lista-datos li:nth-child(5) span",
  };

  Object.keys(fields).forEach((key) => {
    const element = profileContainer.querySelector(fields[key]);
    if (element) {
      element.textContent = data[key] || "No especificado";
    }
  });

  const avatarImg = document.querySelector(".perfil-usuario-avatar img");
  if (avatarImg) {
    avatarImg.src =
      data.photo ||
      "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png";
  }
};

const renderBookings = (bookings) => {
  const bookingsContainer = document.querySelector("#citas");
  bookingsContainer.innerHTML = "";

  if (bookings.length === 0) {
    bookingsContainer.innerHTML = "<p>No tienes citas agendadas.</p>";
    return;
  }

  const list = document.createElement("ul");
  list.classList.add("lista-citas");

  bookings.forEach((booking) => {
    const listItem = document.createElement("li");
    listItem.classList.add("cita-item");
    listItem.innerHTML = `
      <div class="cita-header">
        <div>
          <span class="cita-date">Fecha: ${new Date(
            booking.appointment_date
          ).toLocaleString()}</span>
        </div>
        <h3>Doctor: <span style="color: black;">${
          booking.doctor.name
        }</span></h3>
      </div>
      <div class="cita-body">
        <h3>Precio: <span style="color: black;">$${
          booking.ticket_price
        } COP</span></h3>
      </div>
      <div class="cita-footer">
        <span class="cita-type">Tipo de cita: ${booking.type}</span>
        ${
          booking.type === "online"
            ? `<a href="/video-consulta/${booking._id}" class="btn-link">Unirse a la cita</a>`
            : ""
        }
      </div>
    `;
    list.appendChild(listItem);
  });

  bookingsContainer.appendChild(list);
};

const datos = [
  { icono: "fa-solid fa-envelope", texto: "Email", valor: "" },
  { icono: "fas fa-phone-alt", texto: "Teléfono", valor: "" },
  { icono: "fa-solid fa-venus-mars", texto: "Género", valor: "" },
  { icono: "fa-solid fa-address-book", texto: "Rol", valor: "" },
  { icono: "fa-solid fa-droplet", texto: "Sangre", valor: "" }
];

const botones = [
  { clase: "group-1", dataTarget: "profile", texto: "Mi Perfil" },
  { clase: "group-1", dataTarget: "citas", texto: "Mis Citas Médicas" },
  { clase: "group-1", dataTarget: "editar", texto: "Editar Perfil" }
];

const perfilBio = {
  titulo: "Biografía del Usuario",
  texto: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
};

const avatarData = {
  imagenUrl: "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png",
  botonTexto: "Cambiar Avatar",
  botonIcono: "far fa-image"
};

const lista = document.querySelector(".lista-datos");

datos.forEach(dato => {
    const li = document.createElement("li");
    const icono = document.createElement("i");
    icono.className = `${dato.icono} icono`;
    const texto = document.createTextNode(` ${dato.texto}: `);
    const span = document.createElement("span");
    span.textContent = dato.valor;
    li.appendChild(icono);
    li.appendChild(texto);
    li.appendChild(span);
    lista.appendChild(li);
});

// Seleccionamos el contenedor donde se agregarán los botones
const contenedorBotones = document.querySelector(".tabs-btns");

// Generamos los botones dinámicamente
botones.forEach(boton => {
    const button = document.createElement("button");
    button.className = boton.clase; // Asignamos la clase
    button.setAttribute("data-target", boton.dataTarget); // Asignamos el atributo data-target
    button.textContent = boton.texto; // Asignamos el texto del botón
    contenedorBotones.appendChild(button); // Agregamos el botón al contenedor
});

// Seleccionamos el contenedor donde se generará la biografía
const perfilUsuarioBio = document.querySelector(".perfil-usuario-bio");

// Generamos dinámicamente el título y el texto
const titulo = document.createElement("h3");
titulo.className = "titulo";
titulo.textContent = perfilBio.titulo; // Asignamos el texto del título

const texto = document.createElement("p");
texto.className = "texto";
texto.textContent = perfilBio.texto; // Asignamos el texto de la biografía

// Agregamos los elementos al contenedor
perfilUsuarioBio.appendChild(titulo);
perfilUsuarioBio.appendChild(texto);

// Seleccionamos el contenedor donde se generará el avatar
const avatarContainer = document.querySelector(".perfil-usuario-avatar");

// Crear la imagen
const imagen = document.createElement("img");
imagen.src = avatarData.imagenUrl; // Asignamos la URL de la imagen
imagen.alt = "img-avatar"; // Texto alternativo

// Crear el botón
const boton = document.createElement("button");
boton.type = "button";
boton.className = "boton-avatar"; // Asignamos clase al botón

// Crear el icono dentro del botón
const icono = document.createElement("i");
icono.className = avatarData.botonIcono; // Asignamos la clase del icono

// Añadir el icono y texto al botón
boton.appendChild(icono);
boton.appendChild(document.createTextNode(` ${avatarData.botonTexto}`)); // Texto del botón

// Añadir la imagen y el botón al contenedor
avatarContainer.appendChild(imagen);
avatarContainer.appendChild(boton);
