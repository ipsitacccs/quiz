function loadData() {
  Papa.parse("data.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const data = results.data.filter(row => row.gesture_type && row.role_type);

      document.getElementById("totalResponses").innerText = "Total: " + data.length;
      document.getElementById("activeNow").innerText = "Active: " + Math.floor(Math.random() * 10);
      document.getElementById("lastUpdated").innerText = "Last Updated: " + new Date().toLocaleTimeString();

      drawMatrix("creativeMatrix", data.map(d => d.gesture_type));
      drawMatrix("careerMatrix", data.map(d => d.role_type));

      const latest = data.slice(-3).reverse();
      const cardsHTML = latest.map(d => `<div class="card">${d.gesture_type}<br/>${d.role_type}</div>`).join('');
      document.getElementById("latestCards").innerHTML = cardsHTML;
    }
  });
}

function drawMatrix(canvasId, values) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: canvasId,
        data: values.map(v => ({
          x: Math.random() * 10,
          y: Math.random() * 10
        })),
        pointBackgroundColor: 'blue',
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        x: { min: 0, max: 10 },
        y: { min: 0, max: 10 }
      }
    }
  });
}

loadData();
