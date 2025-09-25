// ../js/Team.js
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const filterRole = document.getElementById("filterRole");
  const darkModeBtn = document.getElementById("darkModeBtn");

  // NodeList of all cards and sections
  const teamCards = Array.from(document.querySelectorAll(".team-card"));
  const teamSections = Array.from(document.querySelectorAll(".team-section"));

  function filterTeam() {
    const searchText = (searchBox?.value || "").trim().toLowerCase();
    const role = (filterRole?.value || "all").toLowerCase();

    // Show/hide each card
    teamCards.forEach(card => {
      const nameEl = card.querySelector("h3");
      const name = nameEl ? nameEl.innerText.toLowerCase() : "";
      const cardRole = (card.dataset.role || "").toLowerCase();

      const matchesSearch = searchText === "" || name.includes(searchText);
      const matchesRole = role === "all" || role === cardRole;

      if (matchesSearch && matchesRole) {
        // Use empty string to let CSS decide display (keeps layout intact)
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });

    // Now hide whole sections which have no visible .team-card
    teamSections.forEach(section => {
      const container = section.querySelector(".team-container");
      if (!container) return;

      const cards = Array.from(container.querySelectorAll(".team-card"));
      const anyVisible = cards.some(c => getComputedStyle(c).display !== "none");

      section.style.display = anyVisible ? "" : "none";
    });
  }

  // Wire up inputs
  if (searchBox) searchBox.addEventListener("input", filterTeam);
  if (filterRole) filterRole.addEventListener("change", filterTeam);

  // Optional: if you want selecting a role to clear the search box uncomment:
  // filterRole.addEventListener("change", () => { if (searchBox) searchBox.value = ""; filterTeam(); });

  // Dark mode toggle
  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // optional: toggle icon visibility if you have both moon/sun icons
      // darkModeBtn.querySelectorAll('i').forEach(i => i.classList.toggle('hidden'));
    });
  }

  // Load Navbar & Footer (keeps your existing behaviour)
  fetch("Navbar.html")
    .then(response => {
      if (!response.ok) throw new Error("Navbar not found!");
      return response.text();
    })
    .then(data => {
      const el = document.getElementById("navbar");
      if (el) el.innerHTML = data;
      console.log("Navbar loaded successfully!");
    })
    .catch(err => console.error("Error loading navbar:", err));

  fetch("Footer.html")
    .then(response => {
      if (!response.ok) throw new Error("Footer not found!");
      return response.text();
    })
    .then(data => {
      const el = document.getElementById("footer");
      if (el) el.innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

  // Initial filter pass (in case page loads with non-empty inputs)
  filterTeam();
});
