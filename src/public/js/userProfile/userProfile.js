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
