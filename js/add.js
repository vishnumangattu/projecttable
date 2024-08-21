document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validateForm()) {
                addEmployee();
            }
        });
    }
});

function addEmployee() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    const employee = {
        empId: document.getElementById('empId').value,
        name: document.getElementById('name').value,
        designation: document.getElementById('designation').value,
        salary: document.getElementById('salary').value,
        experience: document.getElementById('experience').value
    };

    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    window.location.href = '../index.html';
}

function validateForm() {
    let isValid = true;

    // Employee ID validation
    const empId = document.getElementById('empId').value;
    if (!empId) {
        displayError('empIdError', 'Employee ID is required.');
        isValid = false;
    } else {
        hideError('empIdError');
    }

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