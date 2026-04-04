let data = JSON.parse(localStorage.getItem("data")) || [];
let editId = null;
let currentFilter = "all"; 

function saveData() {
  localStorage.setItem("data", JSON.stringify(data));
}

function addEntry() {
  const desc = document.getElementById("desc").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (!desc || !amount) return alert("Enter all fields");

  if (editId !== null) {
    data = data.map((item) =>
      item.id === editId
        ? { ...item, desc, amount: +amount, type }
        : item
    );
    editId = null;
  } else {
    data.push({
      id: Date.now(),
      desc,
      amount: +amount,
      type,
    });
  }

  saveData();
  resetForm();
  applyFilter(); 
}

function render(filtered = data) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let income = 0,
    expense = 0;

  
  data.forEach((item) => {
    if (item.type === "income") income += item.amount;
    else expense += item.amount;
  });

 
  filtered.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.desc} - ₹${item.amount} (${item.type})
      <div class="actions">
        <button onclick="editEntry(${item.id})">Edit</button>
        <button onclick="deleteEntry(${item.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("totalIncome").innerText = income;
  document.getElementById("totalExpense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;
}

function deleteEntry(id) {
  data = data.filter((item) => item.id !== id);
  saveData();
  applyFilter(); 
}

function editEntry(id) {
  const item = data.find((item) => item.id === id);

  document.getElementById("desc").value = item.desc;
  document.getElementById("amount").value = item.amount;
  document.getElementById("type").value = item.type;

  editId = id;
}

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  editId = null;
}

function filterData() {
  currentFilter = document.querySelector(
    "input[name='filter']:checked"
  ).value;

  applyFilter();
}


function applyFilter() {
  if (currentFilter === "all") {
    render(data);
  } else {
    const filtered = data.filter(
      (item) => item.type === currentFilter
    );
    render(filtered);
  }
}


applyFilter();