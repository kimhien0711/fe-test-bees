// khởi tạo dang sách người dùng
const users = [];
for (let i = 1; i <= 50; i++) {
  users.push({
    id: i,
    name: `User ${i}`,
    balance: Math.floor(Math.random() * 10000),
    email: `user${i}@mail.com`,
    registration: new Date(2020 + i % 5, i % 12, i % 28 + 1).toISOString()
  });
}

let currentPage = 1;
let rowsPerPage = 10;

function formatCurrency(num) {
  return `$${num.toLocaleString()}`;
}

function renderTable() {
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';

  const start = (currentPage - 1) * rowsPerPage;
  const pageUsers = users.slice(start, start + rowsPerPage);

  for (let user of pageUsers) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" /></td>
      <td>${user.name}</td>
      <td>${formatCurrency(user.balance)}</td>
      <td><a href="mailto:${user.email}">${user.email}</a></td>
      <td title="${new Date(user.registration).toLocaleString()}">${user.registration.split('T')[0]}</td>
      <td><button class="status-btn">Status</button></td>
      <td class="actions">
        <img src="edit-svgrepo-com.svg" onclick="editUser(${user.id})" class="icon" alt="Edit">
        <img src="delete-svgrepo-com.svg" onclick="deleteUser(${user.id})" class="icon" alt="Delete">
      </td>
    `;
    tbody.appendChild(tr);
  }
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(users.length / rowsPerPage);
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button onclick="changePage(${i})" ${i === currentPage ? 'disabled' : ''}>${i}</button>`;
  }
  pagination.innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  renderTable();
}

// Modal logic
let editingId = null;
function editUser(id) {
  editingId = id;
  const user = users.find(u => u.id === id);
  document.getElementById('editName').value = user.name;
  document.getElementById('editBalance').value = user.balance;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editDate').value = user.registration.split('T')[0];
  document.getElementById('modal').style.display = 'block';
}

function saveEdit() {
  const user = users.find(u => u.id === editingId);
  user.name = document.getElementById('editName').value;
  user.balance = Number(document.getElementById('editBalance').value);
  user.email = document.getElementById('editEmail').value;
  user.registration = new Date(document.getElementById('editDate').value).toISOString();
  document.getElementById('modal').style.display = 'none';
  renderTable();
}

function deleteUser(id) {
  const index = users.findIndex(u => u.id === id);
  users.splice(index, 1);
  renderTable();
}

document.getElementById('closeModal').onclick = () => {
  document.getElementById('modal').style.display = 'none';
};

renderTable();
