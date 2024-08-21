document.addEventListener('DOMContentLoaded', () => {
    displayEmployee();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterEmployees);
    }
});

function displayEmployee() {
    const employeeTable = document.querySelector('#employeeTable tbody');
    employeeTable.innerHTML = '';

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.empId}</td>
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>Rs${employee.salary}</td>
            <td>${employee.experience} years</td>
            <td>
                <button class="nav-button" onclick="editEmployee(${index})">Edit</button>
                <button class="nav-buttons" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        employeeTable.appendChild(row);
    });
}

function filterEmployees() {
    const filter = document.getElementById('search').value.toUpperCase();
    const rows = document.querySelectorAll('#employeeTable tbody tr');

    rows.forEach(row => {
        const idCell = row.getElementsByTagName('td')[0];
        if (idCell) {
            const idText = idCell.textContent || idCell.innerText;
            row.style.display = idText.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
    });
}

function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const employee = employees[index];
    localStorage.setItem('editEmployee', JSON.stringify(employee));
    window.location.href = '../pages/edit.html';
}

function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    loadEmployees();
}