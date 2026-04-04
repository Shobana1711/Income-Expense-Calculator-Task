let data = JSON.parse(localStorage.getItem("data")) || [];
let editIndex = null;

function saveData() {
  localStorage.setItem("data", JSON.stringify(data));
}

function addEntry() {
  const desc = document.getElementById("desc").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (!desc || !amount) return alert("Enter all fields");

  const entry = { desc, amount: +amount, type };

  if (editIndex !== null) {
    data[editIndex] = entry;
    editIndex = null;
  } else {
    data.push(entry);
  }

  saveData();
  resetForm();
  render();
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
    const actualIndex = data.indexOf(item);
    li.innerHTML = `
      ${item.desc} - ₹${item.amount} (${item.type})
      <div class="actions">
        <button onclick="editEntry(${actualIndex})">Edit</button>
        <button onclick="deleteEntry(${actualIndex})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.getElementById("totalIncome").innerText = income;
  document.getElementById("totalExpense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;
}
function deleteEntry(index) {
  data.splice(index, 1);
  saveData();
  render();
}

function editEntry(index) {
  const item = data[index];
  document.getElementById("desc").value = item.desc;
  document.getElementById("amount").value = item.amount;
  document.getElementById("type").value = item.type;
  editIndex = index;
}

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  editIndex = null;
}

function filterData() {
  const filter = document.querySelector("input[name='filter']:checked").value;
  if (filter === "all") return render(data);
  render(data.filter((item) => item.type === filter));
}
render();
