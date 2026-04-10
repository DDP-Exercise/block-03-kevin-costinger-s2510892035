"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     You - 2026-03-25
 *******************************************************/

let sumExpenses = 0;

// DOM elements
const form = document.getElementById("expenseForm");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const expenseInput = document.getElementById("expense");
const tableBody = document.querySelector("#expenses tbody");
const sumOutput = document.getElementById("expenseSum");

// events
form.addEventListener("submit", submitForm);
tableBody.addEventListener("click", deleteExpense);


/*******************************************************
 * submit form
 *******************************************************/
function submitForm(e) {
    e.preventDefault();

    let date = dateInput.value;
    let amount = parseFloat(amountInput.value);
    let expense = expenseInput.value.trim();

    // validation (IMPORTANT: isEmpty is used!)
    if (isEmpty(date)) {
        dateInput.focus();
        return;
    }

    if (isEmpty(amount) || amount < 0.01) {
        amountInput.focus();
        return;
    }

    if (isEmpty(expense) || expense.length < 3) {
        expenseInput.focus();
        return;
    }

    addExpense(date, amount, expense);
    form.reset();
}


/*******************************************************
 * add expense row
 *******************************************************/
function addExpense(date, amount, expense) {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${date}</td>
        <td>${formatEuro(amount)}</td>
        <td>${expense}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    tableBody.appendChild(row);

    sumExpenses += amount;
    updateSum();
}


/*******************************************************
 * delete expense (event delegation)
 *******************************************************/
function deleteExpense(e) {
    if (!e.target.classList.contains("delete-btn")) return;

    let row = e.target.closest("tr");

    let amountText = row.children[1].textContent;

    let amount = parseFloat(
        amountText
            .replace("€", "")
            .replace(/\./g, "")
            .replace(",", ".")
    );

    sumExpenses -= amount;
    row.remove();

    updateSum();
}


/*******************************************************
 * update sum
 *******************************************************/
function updateSum() {
    sumOutput.textContent = formatEuro(sumExpenses);
}


/*******************************************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 *******************************************************/

/*******************************************************
 * Checks if variable is empty
 *******************************************************/
function isEmpty(variable) {
    if (Array.isArray(variable))
        return variable.length === 0;
    else if (typeof variable === "object")
        return Object.entries(variable).length === 0;
    else
        return variable === undefined || variable == null || variable === "";
}

/*******************************************************
 * Converts number into currency string.
 *******************************************************/
function formatEuro(number) {
    return number.toLocaleString("de-DE") + " €";
}