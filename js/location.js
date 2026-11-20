// AQUACHECK location page
// This file reads the selected location from the page URL and displays its points.
fetch("data/points.json")
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const place = params.get("place") || "mess";
    const location = data[place];

    const title = document.getElementById("location-title");
    const description = document.getElementById("location-description");
    const list = document.getElementById("point-list");

    if (!location) {
      title.textContent = "Location not found";
      description.textContent = "Please return to the homepage and select a location.";
      return;
    }

    document.title = location.name + " | AQUACHECK";
    title.textContent = location.name;
    description.textContent = location.description;

    location.points.forEach(point => {
      const card = document.createElement("article");
      card.className = "point-card";
      card.innerHTML = `
        <h3>${point.name}</h3>
        <p>${point.area} · ID: ${point.id}</p>
        <span class="status">Verified report awaited</span>
        <p style="margin-top:14px"><button class="action-button" type="button">View information</button></p>
      `;
      card.querySelector("button").addEventListener("click", () => showDetails(point));
      list.appendChild(card);
    });
  })
  .catch(() => {
    document.getElementById("location-title").textContent = "Unable to load water points";
    document.getElementById("location-description").textContent =
      "Please open this project using a local web server or its hosted website.";
  });

function showDetails(point) {
  const panel = document.getElementById("point-details");
  document.getElementById("detail-name").textContent = point.name + " (" + point.id + ")";
  document.getElementById("detail-content").innerHTML = `
    <div class="detail-row"><strong>Location</strong><span>${point.area}</span></div>
    <div class="detail-row"><strong>Report status</strong><span>Awaiting verified report</span></div>
    <div class="detail-row"><strong>Test date</strong><span>Not provided yet</span></div>
    <div class="detail-row"><strong>Report source</strong><span>Not provided yet</span></div>
    <div class="detail-row"><strong>Water-quality results</strong><span>Will appear here after the relevant report is received and checked.</span></div>
    <div class="detail-row"><strong>Important note</strong><span>This page does not determine whether water is safe or unsafe. Please refer to an authorised, current laboratory report.</span></div>
  `;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("close-details").addEventListener("click", () => {
  document.getElementById("point-details").hidden = true;
});
