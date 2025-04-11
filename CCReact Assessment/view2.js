// Array to store added postcodes
let postcodes = [];

// Get references to DOM elements
const addPostcodeBtn = document.getElementById('addPostcodeButton');
const postcodeInput = document.getElementById('postcodeInput');
const postcodeTableBody = document.getElementById('postcodeTableBody');
const calculateJourneyBtn = document.getElementById('calculateJourneyButton');

// Render the postcodes table based on the current list
function renderTable() {
  postcodeTableBody.innerHTML = '';
  postcodes.forEach((postcode, index) => {
    const row = document.createElement('tr');

    // Serial number cell
    const snCell = document.createElement('td');
    snCell.textContent = index + 1;
    row.appendChild(snCell);

    // Postcode cell
    const postcodeCell = document.createElement('td');
    postcodeCell.textContent = postcode;
    row.appendChild(postcodeCell);

    // Edit button cell
    const editCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editRow(index));
    editCell.appendChild(editBtn);
    row.appendChild(editCell);

    // Delete button cell
    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteRow(index));
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    // Up button cell
    const upCell = document.createElement('td');
    const upBtn = document.createElement('button');
    upBtn.textContent = 'Up';
    upBtn.addEventListener('click', () => moveUp(index));
    upCell.appendChild(upBtn);
    row.appendChild(upCell);

    // Down button cell
    const downCell = document.createElement('td');
    const downBtn = document.createElement('button');
    downBtn.textContent = 'Down';
    downBtn.addEventListener('click', () => moveDown(index));
    downCell.appendChild(downBtn);
    row.appendChild(downCell);

    postcodeTableBody.appendChild(row);
  });
}

// Add a new postcode to the list
function addPostcode() {
  const postcode = postcodeInput.value.trim();
  if (postcode !== '') {
    postcodes.push(postcode);
    postcodeInput.value = '';
    renderTable();
  } else {
    alert('Please enter a valid UK postcode.');
  }
}

// Allow user to edit an existing postcode
function editRow(index) {
  const newPostcode = prompt('Edit the postcode:', postcodes[index]);
  if (newPostcode !== null) {
    postcodes[index] = newPostcode.trim();
    renderTable();
  }
}

// Remove a postcode from the list
function deleteRow(index) {
  postcodes.splice(index, 1);
  renderTable();
}

// Move the postcode up in the list
function moveUp(index) {
  if (index > 0) {
    [postcodes[index - 1], postcodes[index]] = [postcodes[index], postcodes[index - 1]];
    renderTable();
  }
}

// Move the postcode down in the list
function moveDown(index) {
  if (index < postcodes.length - 1) {
    [postcodes[index], postcodes[index + 1]] = [postcodes[index + 1], postcodes[index]];
    renderTable();
  }
}

// Event listeners
addPostcodeBtn.addEventListener('click', addPostcode);

calculateJourneyBtn.addEventListener('click', () => {
  if (postcodes.length < 2) {
    alert('Please add at least two postcodes to calculate the journey.');
  } else {
    console.log('Calculating journey for:', postcodes);
    alert('Calculating journey for: ' + postcodes.join(', '));
  }
});