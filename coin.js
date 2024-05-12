let arr = [];
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    arr = data;
    renderCoin(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

  function renderCoin(data){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = ''; // Clear existing table rows
  
    data.forEach(element => {
      // Calculate percentage change rounded to 2 decimal places
      const percentageChange = parseFloat(element.price_change_percentage_24h).toFixed(2);
      
      // Determine color based on positive or negative percentage change
      const color = percentageChange >= 0 ? 'green' : 'red';
  
      tbody.innerHTML += `
        <tr>
          <td class="flex"><img src="${element.image}" height="25px" width="25px" alt=""> ${element.name}</td>
          <td>${element.symbol.toUpperCase()}</td>
          <td>${element.current_price}</td>
          <td>${element.fully_diluted_valuation}</td>
          <td style="color: ${color}">${percentageChange}%</td>
          <td>${element.market_cap}</td>
        </tr>
      `; 
    });
  }
  
document.getElementById("input").addEventListener("input", function () {
  let d = document.getElementById("input").value.trim();
  const tr = document.querySelectorAll("#tbody tr");
  tr.forEach((row) => {
    const name = row.querySelector("td:first-child").textContent.toLowerCase();
    const id = row.querySelector(":nth-child(2)").textContent.toLowerCase();
    if (name.includes(d) || id.includes(d)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

document.getElementById("mktCap").addEventListener("click", function () {
  const rows = Array.from(document.querySelectorAll("#tbody tr"));
  console.log(rows);
  // Sort rows by market cap (column index 5)
  rows.sort((row1, row2) => {
    const marketCap1 = parseInt(row1.cells[5].textContent.replace(/[$,]/g, ""));
    const marketCap2 = parseInt(row2.cells[5].textContent.replace(/[$,]/g, ""));
    return marketCap1 - marketCap2; // Sort in descending order
  });

  // Append sorted rows to table body
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Clear existing table rows
  rows.forEach((row) => {
    console.log(row);
    tbody.appendChild(row);
  });
});

document.getElementById("per").addEventListener("click", function () {
  const rows = Array.from(document.querySelectorAll("#tbody tr"));
  rows.sort((row1, row2) => {
    const per1 = parseFloat(row1.cells[4].textContent);
    const per2 = parseFloat(row2.cells[4].textContent);
    return per1 - per2;
  });
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  rows.forEach((row) => {
    tbody.appendChild(row);
  });
});
