let chemicalData = [
  { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
  { id: 2, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },
  { id: 3, chemicalName: "Dimethylaminopropylamine", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },
  { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },
  { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4154.33 },
  { id: 7, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250, unit: "kg", quantity: 8749.54 },
  { id: 8, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4154.33 },
  { id: 9, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 },
  { id: 10, chemicalName: "Dimethylaminopropylamine", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },
  { id: 11, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100, unit: "kg", quantity: 8751.90 },
  { id: 12, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
  { id: 13, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
  { id: 14, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
  { id: 15, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250, unit: "kg", quantity: 8749.54 },
];

const tableBody = document.querySelector("#chemicalTable tbody");
let selectedRow = null;
let isEditMode = false;
let currentEditIndex = null;

const modal = new bootstrap.Modal(document.getElementById("chemicalModal"));
const chemicalForm = document.getElementById("chemicalForm");


function displayData(data) {
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = `
      <tr class="margin-buttom" data-index="${index}">
        <td><input type="checkbox" class="row-checkbox" onclick="selectRow(this)"></td>
        <td>${item.id}</td>
        <td class="border-right" >${item.chemicalName}</td>
        <td>${item.vendor}</td>
        <td>${item.density}</td>
        <td>${item.viscosity}</td>
        <td>${item.packaging}</td>
        <td>${item.packSize}</td>
        <td>${item.unit}</td>
        <td>${item.quantity}</td>
        <td><button class="btn btn-sm btn-warning" onclick="editRow(${index})">Edit</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

displayData(chemicalData);

function sortTable(columnIndex) {
  chemicalData.sort((a, b) => {
    const keyA = Object.values(a)[columnIndex];
    const keyB = Object.values(b)[columnIndex];
    return keyA > keyB ? 1 : -1;
  });
  displayData(chemicalData);
}

function selectRow(checkbox) {
  const row = checkbox.parentElement.parentElement;
  const isChecked = checkbox.checked;
  
  if (isChecked) {
    row.classList.add("selected");
    selectedRow = row;
  } else {
    row.classList.remove("selected");
    selectedRow = null;
  }
}

document.getElementById("deleteRow").addEventListener("click", () => {
  if (selectedRow) {
    const index = selectedRow.getAttribute("data-index");
    chemicalData.splice(index, 1);
    displayData(chemicalData);
    selectedRow = null;
  } else {
    alert("Please select a row to delete");
  }
});

document.getElementById("moveUp").addEventListener("click", () => {
  if (selectedRow) {
    const index = parseInt(selectedRow.getAttribute("data-index"));
    if (index > 0) {
      const temp = chemicalData[index];
      chemicalData[index] = chemicalData[index - 1];
      chemicalData[index - 1] = temp;
      displayData(chemicalData);
      selectRow(tableBody.rows[index - 1].querySelector(".row-checkbox")); // Update selection
    } else {
      alert("This row is already at the top");
    }
  } else {
    alert("Please select a row to move");
  }
});

document.getElementById("moveDown").addEventListener("click", () => {
  if (selectedRow) {
    const index = parseInt(selectedRow.getAttribute("data-index"));
    if (index < chemicalData.length - 1) {
      const temp = chemicalData[index];
      chemicalData[index] = chemicalData[index + 1];
      chemicalData[index + 1] = temp;
      displayData(chemicalData);
      selectRow(tableBody.rows[index + 1].querySelector(".row-checkbox")); // Update selection
    } else {
      alert("This row is already at the bottom");
    }
  } else {
    alert("Please select a row to move");
  }
});




function refreshTable() {
  location.reload();
}







document.getElementById("addRow").addEventListener("click", () => {
  document.getElementById("modalTitle").textContent = "Add Chemical";
  chemicalForm.reset();
  isEditMode = false;
  modal.show();
});

document.getElementById("saveChanges").addEventListener("click", () => {
  const chemical = {
    chemicalName: document.getElementById("chemicalName").value,
    vendor: document.getElementById("vendor").value,
    density: parseFloat(document.getElementById("density").value),
    viscosity: parseFloat(document.getElementById("viscosity").value),
    packaging: document.getElementById("packaging").value,
    packSize: parseInt(document.getElementById("packSize").value),
    unit: document.getElementById("unit").value,
    quantity: parseFloat(document.getElementById("quantity").value),
  };

  if (isEditMode) {
    chemicalData[currentEditIndex] = { id: chemicalData[currentEditIndex].id, ...chemical };
  } else {
    chemical.id = chemicalData.length + 1;
    chemicalData.push(chemical);
  }

  displayData(chemicalData);
  modal.hide();
});


function editRow(index) {
  isEditMode = true;
  currentEditIndex = index;
  document.getElementById("modalTitle").textContent = "Edit Chemical";

  const selectedChemical = chemicalData[index];
  document.getElementById("chemicalName").value = selectedChemical.chemicalName;
  document.getElementById("vendor").value = selectedChemical.vendor;
  document.getElementById("density").value = selectedChemical.density;
  document.getElementById("viscosity").value = selectedChemical.viscosity;
  document.getElementById("packaging").value = selectedChemical.packaging;
  document.getElementById("packSize").value = selectedChemical.packSize;
  document.getElementById("unit").value = selectedChemical.unit;
  document.getElementById("quantity").value = selectedChemical.quantity;

  modal.show();
}


