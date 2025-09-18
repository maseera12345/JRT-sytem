const searchBox = document.getElementById("searchBox");
const filterRole = document.getElementById("filterRole");
const teamCards = document.querySelectorAll(".team-card");

function filterTeam() {
  const searchText = searchBox.value.toLowerCase();
  const role = filterRole.value;

  teamCards.forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    const cardRole = card.getAttribute("data-role");

    if (
      (name.includes(searchText)) &&
      (role === "all" || role === cardRole)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchBox.addEventListener("input", filterTeam);
filterRole.addEventListener("change", filterTeam);

document.addEventListener("DOMContentLoaded", () => {
  const darkModeBtn = document.getElementById("darkModeBtn");

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
