// AQUACHECK location directory: search, point cards and accessible detail panel.
const pointList = document.getElementById("point-list");
const detailsPanel = document.getElementById("point-details");
let allPoints = [];

fetch("data/points.json")
  .then(response => {
    if (!response.ok) throw new Error("Could not load the water-point directory.");
    return response.json();
  })
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const place = params.get("place") || "mess";
    const locationData = data[place];
    const title = document.getElementById("location-title");
    const description = document.getElementById("location-description");

    if (!locationData) {
      title.textContent = "Location not found";
      description.textContent = "Please return to the homepage and select a location.";
      document.getElementById("point-count").textContent = "No location selected";
      return;
    }

    document.title = locationData.name + " | AQUACHECK";
    title.textContent = locationData.name;
    description.textContent = locationData.description;
    allPoints = locationData.points;
    document.getElementById("point-count").textContent = allPoints.length + (allPoints.length === 1 ? " listed water point" : " listed water points");
    renderPoints(allPoints);

    const search = document.getElementById("point-search");
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      const filtered = allPoints.filter(point => (point.name + " " + point.id + " " + point.area).toLowerCase().includes(query));
      renderPoints(filtered);
      document.getElementById("empty-points").hidden = filtered.length !== 0;
    });
  })
  .catch(() => {
    document.getElementById("location-title").textContent = "Unable to load water points";
    document.getElementById("location-description").textContent = "Please open this project using its hosted website or a local web server.";
  });

function renderPoints(points) {
  pointList.replaceChildren();
  points.forEach((point, index) => {
    const card = document.createElement("article");
    card.className = "point-card";
    const top = document.createElement("div");
    top.className = "point-card-top";
    const icon = document.createElement("span");
    icon.className = "point-icon";
    icon.textContent = "⌖";
    const id = document.createElement("span");
    id.className = "point-id";
    id.textContent = point.id;
    top.append(icon, id);
    const heading = document.createElement("h3");
    heading.textContent = point.name;
    const area = document.createElement("p");
    area.textContent = point.area;
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = "Verified report awaited";
    const button = document.createElement("button");
    button.className = "action-button";
    button.type = "button";
    button.innerHTML = '<span>View point information</span><span aria-hidden="true">→</span>';
    button.addEventListener("click", () => showDetails(point));
    card.append(top, heading, area, status, button);
    card.style.animationDelay = (index * 45) + "ms";
    pointList.appendChild(card);
  });
}

function showDetails(point) {
  document.getElementById("detail-name").textContent = point.name + " · " + point.id;
  const content = document.getElementById("detail-content");
  content.replaceChildren();
  const rows = [
    ["Location", point.area, false],
    ["Point identification", point.id, false],
    ["Report status", "Awaiting an authorised, verified report", false],
    ["Test date", "Not provided yet", false],
    ["Report source", "Not provided yet", false],
    ["Water-quality results", "Results will appear here only after the relevant report is received and checked.", true],
    ["Important note", "This page does not determine whether water is safe or unsafe. Please refer to an authorised, current laboratory report.", true]
  ];
  const grid = document.createElement("div");
  grid.className = "detail-grid";
  rows.forEach(([label, value, wide]) => {
    const row = document.createElement("div");
    row.className = "detail-row" + (wide ? " wide" : "");
    const strong = document.createElement("strong");
    strong.textContent = label;
    const span = document.createElement("span");
    span.textContent = value;
    row.append(strong, span);
    grid.appendChild(row);
  });
  content.appendChild(grid);
  detailsPanel.hidden = false;
  detailsPanel.scrollIntoView({behavior:"smooth",block:"start"});
}

document.getElementById("close-details").addEventListener("click", () => {
  detailsPanel.hidden = true;
});
