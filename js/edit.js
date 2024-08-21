document.addEventListener('DOMContentLoaded', () => {
    populateEditForm();

    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validateForm()) {
                updateEmployee();
            }
        });
    }
});

function populateEditForm() {
    const employee = JSON.parse(localStorage.getItem('editEmployee'));
    if (employee) {
        document.getElementById('empId').value = employee.empId;
        document.getElementById('empId').setAttribute('readonly', true); // Make Employee ID readonly
        document.getElementById('name').value = employee.name;
        document.getElementById('designation').value = employee.designation;
        document.getElementById('salary').value = employee.salary;
        document.getElementById('experience').value = employee.experience;
    }
}

function updateEmployee() {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const empId = document.getElementById('empId').value;

    const updatedEmployee = {
        empId: empId,
        name: document.getElementById('name').value,
        designation: document.getElementById('designation').value,
        salary: document.getElementById('salary').value,
        experience: document.getElementById('experience').value
    };

    const employeeIndex = employees.findIndex(emp => emp.empId === empId);
    if (employeeIndex !== -1) {
        employees[employeeIndex] = updatedEmployee;
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Clear the editEmployee data from localStorage and redirect
    localStorage.removeItem('editEmployee');
    window.location.href = '../index.html';
}

function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById('name').value;
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        displayError('nameError', 'Name is required and should only contain letters and spaces.');
        isValid = false;
    } else {
        hideError('nameError');
    }

    // Designation validation
    const designation = document.getElementById('designation').value;
    if (!designation) {
        displayError('designationError', 'Designation is required.');
        isValid = false;
    } else {
        hideError('designationError');
    }

    // Salary validation
    const salary = document.getElementById('salary').value;
    if (!salary) {
        displayError('salaryError', 'Salary is required.');
        isValid = false;
    } else {
        hideError('salaryError');
    }

    // Experience validation
    const experience = document.getElementById('experience').value;
    if (!experience) {
        displayError('experienceError', 'Experience is required.');
        isValid = false;
    } else {
        hideError('experienceError');
    }

    return isValid;
}

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}
