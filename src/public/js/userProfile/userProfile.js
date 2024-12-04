document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tabs-btns button");
    const sections = document.querySelectorAll(".profile-content");
    function showSection(targetId) {
      sections.forEach((section) => {
        if (section.id === targetId) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    }
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        showSection(targetId);
      });
    });
    showSection("profile");
  });
  