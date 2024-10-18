const container = document.getElementById("container");
const uname = document.getElementById("rname");
const email = document.getElementById("remail");
const password = document.getElementById("rpswd");
const lname = document.getElementById("lname");
const lpswd = document.getElementById("lpswd");
const home_name = document.getElementById("home_name");
const balance = document.getElementById("balance");
const expense = document.getElementById("expense");
const itype = document.getElementById("itype");
const etype = document.getElementById("etype");
const amount = document.getElementById("amount");
const eamount = document.getElementById("eamount");
const tbody = document.getElementById("tbody");
const etbody = document.getElementById("e-tbody");
function goLogin() {
  container.classList.add("abc");
}

function goReg() {
  container.classList.remove("abc");
}

function addUser() {
  let user = {
    Name: uname.value,
    Email: email.value,
    Password: password.value,
    balance: 0,
    expense: 0,
    incomeDetails: [],
    expenseDetails: [],
  };
  localStorage.setItem("USER_DATA", JSON.stringify(user));
  alert("Registration successful!");
  uname.value = "";
  email.value = "";
  password.value = "";
}
function login() {
  inputUsername = lname.value;
  inputPassword = lpswd.value;
  console.log(inputPassword, inputUsername);
  // Retrieve the stored user data
  let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  console.log(storedUser.Name);
  console.log(storedUser.Password);
  // Check if the input matches the stored username and password
  if (
    storedUser &&
    storedUser.Name === inputUsername &&
    storedUser.Password === inputPassword
  ) {
    alert("Login successful!");
    window.location = "./home.html";
    return true;
  } else {
    alert("Login failed. Invalid username or password.");
    return false;
  }
}
let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
home_name.innerHTML = storedUser.Name;
resetAll();
function logout() {
  window.location = "./index.html";
}
function addIncome() {
  income_type = itype.value;
  let iamount = Number(amount.value);
  current_date = new Date(2024, 9, 18, 10, 30, 0);
  let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  storedUser.balance += iamount;
  cur_bal = storedUser.balance;
  storedUser.incomeDetails.push({
    income_type,
    iamount,
    cur_bal,
    current_date,
  });
  localStorage.setItem("USER_DATA", JSON.stringify(storedUser));
  let updatedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  itype.value = "";
  amount.value = "";
  resetAll();
}
function addExpense() {
  expense_type = etype.value;
  let examount = Number(eamount.value);
  current_date = new Date('2024-9');
  let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  storedUser.balance -= examount;
  cur_bal = storedUser.balance;
  storedUser.expense += examount;
  total_expense = storedUser.expense;
  storedUser.expenseDetails.push({
    expense_type,
    examount,
    cur_bal,
    current_date,
  });
  localStorage.setItem("USER_DATA", JSON.stringify(storedUser));
  let updatedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  etype.value = "";
  eamount.value = "";
  resetAll();
}
function clearAll() {
  let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  storedUser.balance = 0;
  storedUser.expense = 0;
  storedUser.expenseDetails = [];
  storedUser.incomeDetails = [];
  localStorage.setItem("USER_DATA", JSON.stringify(storedUser));
  resetAll();
}

function resetAll() {
  let storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
  balance.innerHTML = storedUser.balance;
  expense.innerHTML = storedUser.expense;
  tbody.innerHTML = "";
  storedUser.incomeDetails.forEach((data) => {
    htmlData = `
    <tr>
  <td>${data.income_type}</td>
  <td>${data.iamount}</td>
  <td>${data.cur_bal}</td>
  <td>${data.current_date}</td>
       </tr>
    `;
    tbody.innerHTML += htmlData;
  });
  etbody.innerHTML = "";
  storedUser.expenseDetails.map((data) => {
    const htmlData = `
    <tr>
  <td>${data.expense_type}</td>
  <td>${data.examount}</td>
  <td>${data.cur_bal}</td>
  <td>${data.current_date}</td>
       </tr>
    `;
    etbody.innerHTML += htmlData;
  });
}
