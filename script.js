// Load the world map data
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world) {
    const width = 960;
    const height = 500;

    const svg = d3.select("#map-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoNaturalEarth1()
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "country")
        .on("click", function(event, d) {
            displayLegislationInfo(d.properties.name);
        });
});

function displayLegislationInfo(country) {
    // This is where you'd typically fetch data from your backend
    // For now, we'll use placeholder data
    const placeholderData = {
        "United States": [
            { title: "AI Ethics Act", status: "Proposed", date: "2024-01-15" },
            { title: "Facial Recognition Regulation", status: "Enacted", date: "2023-06-30" }
        ],
        "European Union": [
            { title: "AI Act", status: "Enacted", date: "2024-03-01" },
            { title: "Data Governance Act", status: "Enacted", date: "2023-09-24" }
        ]
    };

    const legislationDetails = document.getElementById("legislation-details");
    legislationDetails.innerHTML = `<h3>AI Legislation in ${country}</h3>`;

    if (placeholderData[country]) {
        placeholderData[country].forEach(law => {
            legislationDetails.innerHTML += `
                <div class="law-item">
                    <h4>${law.title}</h4>
                    <p>Status: ${law.status}</p>
                    <p>Date: ${law.date}</p>
                </div>
            `;
        });
    } else {
        legislationDetails.innerHTML += "<p>No legislation data available for this country.</p>";
    }
}

document.getElementById("search-button").addEventListener("click", function() {
    const searchTerm = document.getElementById("search-input").value;
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
    // You would typically send this search term to your backend and display results
});
