// AQUACHECK homepage location-card search.
const searchInput = document.getElementById("location-search");
const cards = Array.from(document.querySelectorAll(".location-card"));
const emptyMessage = document.getElementById("empty-search");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = (card.dataset.search + " " + card.textContent).toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    });
    emptyMessage.hidden = visible !== 0;
  });
}
